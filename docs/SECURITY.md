# Security Baseline

This document defines the non-negotiable security rules for Tabularium. It applies from the first line of authentication, API, or data-handling code — not only once a feature is "finished." Authentication, authorization, and payments are not implemented yet (see `bts.jsonc`), so most of this is a baseline the team commits to *before* writing that code, not a description of something already built.

Every rule here maps to a known class of real-world breach. Treat this as mandatory, not aspirational.

## 1. Credentials and secrets never reach the frontend

- Nothing under `NEXT_PUBLIC_*` may hold a secret, API key, database credential, or signing key — that prefix is bundled into client-side JavaScript and is publicly readable by anyone who opens dev tools. Only non-secret, genuinely public values belong there.
- Database access, third-party API calls that require a secret key, and any signing/verification logic run exclusively in Server Components, Route Handlers, or Server Actions — never in client components (`"use client"` files).
- `packages/env/src/server.ts` is the only place server secrets are declared and validated (already the case for `DATABASE_URL`). `packages/env/src/web.ts` must stay empty of anything sensitive; it exists for genuinely public client config only.
- Do not `console.log` tokens, connection strings, or request bodies containing credentials, not even in development. Logs get shipped to aggregators and outlive the debugging session.
- Local secrets live only in the root `.env` (gitignored). `.env.example` documents variable names with safe placeholders, never real values. See `docs/HOW-IT-WORKS.md` for the environment variable convention.
- In production, prefer a secrets manager (e.g., your hosting provider's environment/secret store) over plain environment variables where available, so credentials can be rotated without a redeploy.

## 2. Authentication tokens: backend-only, never in frontend-readable storage

When authentication is implemented, this is the required shape — it is not optional or a "v2 hardening" step:

- **Never store access or refresh tokens in `localStorage`, `sessionStorage`, or a JS-readable cookie.** Any of those are readable by any script on the page, so a single XSS bug anywhere in the app becomes full account takeover. This is the single most common auth mistake in web apps and the one this project must not repeat.
- Issue the session as an `httpOnly`, `Secure`, `SameSite=Strict` (or `Lax` if a cross-site redirect flow requires it) cookie, set directly by a Route Handler. The browser sends it automatically; client-side JavaScript never touches the token value.
- Access tokens are short-lived (5–15 minutes is a reasonable target). Refresh tokens are longer-lived but must be:
  - Rotated on every use — issue a new refresh token and invalidate the old one each time it's redeemed, so a stolen-but-unused old token becomes worthless after the next legitimate refresh.
  - Stored server-side (hashed, e.g. SHA-256, never in plaintext) so a database leak doesn't hand out usable tokens directly.
  - Revocable: a sign-out or a detected compromise must be able to invalidate a refresh token immediately, server-side.
  - Scoped to a narrow cookie `path` (e.g. `/api/auth/refresh`) so it isn't sent on every request.
- Every Route Handler, Server Action, and data-access function re-checks identity and authorization itself. Middleware may do coarse, edge-level redirects, but it is not the authorization boundary — the real check lives next to the data it protects (the Data Access Layer / query functions in `packages/db`).
- Server Actions are POST-only and Next.js already compares `Origin` to `Host` to reject cross-site invocations — keep relying on that instead of disabling or working around it.

## 3. Rate limiting and abuse protection

- Every public-facing Route Handler (auth endpoints especially: login, refresh, password reset, signup) must be rate-limited before it ships. Unlimited auth endpoints are a standing invitation to credential stuffing and brute force.
- Prefer a sliding-window or token-bucket limiter over a naive fixed window (fixed windows allow a burst of `2x` the limit right at the window boundary).
- Return `429 Too Many Requests` with a `Retry-After` header, and where relevant expose `X-RateLimit-Limit` / `X-RateLimit-Remaining` / `X-RateLimit-Reset` so well-behaved clients can back off on their own.
- Apply stricter limits to unauthenticated/anonymous requests than to authenticated ones, and stricter limits still to state-changing (`POST`/`PUT`/`DELETE`) endpoints than to reads.
- Rate limiting must be enforced server-side and be effective across multiple server instances (a per-process in-memory counter is not sufficient once the app runs on more than one instance) — use a shared store (e.g. Redis-backed limiter) once the app is deployed to more than a single instance.

## 4. Input validation and injection

- Validate every external input (request bodies, query params, headers, webhook payloads) at the boundary with `zod`, the schema library already used in `packages/env`. Reject invalid input outright; do not attempt to "sanitize and continue."
- Never build a raw SQL string by concatenating user input. Prisma's query builder parameterizes queries by default — use it, and treat any `$queryRaw`/`$executeRaw` as an exception requiring explicit review and bound parameters, never string interpolation.
- Encode/escape output appropriately for its context (HTML, URL, attribute) to prevent XSS. React escapes JSX children by default — the danger zone is `dangerouslySetInnerHTML`, which must not render unsanitized user content.

## 5. Access control

- Default-deny: a new endpoint or Server Action has no access until an authorization check explicitly grants it. Broken access control is consistently the most common real-world web vulnerability class (OWASP Top 10, #1) — most incidents are a missing check, not a broken algorithm.
- Authorization decisions are made server-side, close to the data (the Data Access Layer in `packages/db`), not inferred from what the UI happens to show or hide.
- Object-level checks matter as much as route-level checks: confirm the authenticated user is allowed to act on *this specific* demand/record, not just that they're logged in and hitting a route they're generally allowed to reach.

## 6. Transport and browser security headers

Once the app serves real traffic, configure (via Next.js `headers()` in `next.config.ts` or middleware):

- `Strict-Transport-Security` (HSTS) — forces HTTPS for the domain. Start with a short `max-age` and increase it once HTTPS is confirmed stable across all subdomains.
- `Content-Security-Policy` — start in `Content-Security-Policy-Report-Only` mode with `default-src 'self'` and nonces for any inline script, then move to enforcing. Never reach for `'unsafe-inline'`/`'unsafe-eval'` as a shortcut.
- `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy` scoped to only the browser features the app actually uses.
- `frame-ancestors 'self'` via CSP (supersedes the older `X-Frame-Options` and is the current standard for clickjacking protection).
- Configure CORS explicitly and narrowly — an allowlist of known origins, not a wildcard `*`, on any endpoint that reads or mutates authenticated data.

## 7. Supply chain and dependencies

- Keep dependencies current; enable GitHub's Dependabot alerts and secret scanning on the repository.
- Review the diff of any new dependency before adding it — supply-chain compromise (a malicious or hijacked package) is now a top-ranked real-world risk category, not a theoretical one.
- Lock dependency versions through `pnpm-lock.yaml` (already committed) and avoid `latest`/unpinned ranges for anything security-sensitive (auth libraries, crypto, the Prisma/database layer).
- Audit CI/CD and build configuration with the same scrutiny as application code — a compromised build step has the same blast radius as a compromised dependency.

## 8. Error handling and logging

- Do not leak stack traces, internal error messages, database error text, or file paths to the client. Return a generic error message and log the detail server-side.
- Fail closed, not open: if an authorization check, a rate limiter, or a validation step throws or errors unexpectedly, the request must be denied, not silently allowed through.
- Log security-relevant events (failed logins, authorization denials, rate-limit trips) with enough context to investigate, but never log the credential/token/secret itself.
- Treat unexpected/exceptional conditions (a null where one shouldn't occur, a third-party API timeout, a partially-failed transaction) as things to handle explicitly, not ignore — mishandled exceptional conditions are their own recognized vulnerability class.

## 9. Database and infrastructure

- The application's database role should have least-privilege access — only the schema and operations it actually needs, not a superuser/owner role, once the project moves beyond local development.
- Never commit a database connection string, even to a private repository or a documentation file. This includes example values in docs — use placeholders like `postgresql://user:password@host:5432/db`, never a real credential (past or present; rotate immediately if one is ever exposed).
- Back up the production database and periodically verify the backup is actually restorable.

## 10. Review checklist before shipping an endpoint

- [ ] No secret or token is reachable from client-side JavaScript.
- [ ] Session/refresh tokens are `httpOnly` cookies, rotated, and revocable.
- [ ] Every input is validated with `zod` at the boundary.
- [ ] Every query goes through Prisma's parameterized query builder.
- [ ] Authorization is checked server-side, at the object level, default-deny.
- [ ] Rate limiting is applied, especially to auth and write endpoints.
- [ ] Errors return generic messages to the client; details are logged server-side only.
- [ ] No secret, credential, or connection string appears in the diff.

## References

- [OWASP Top 10:2025](https://owasp.org/Top10/2025/)
- [OWASP Top Ten Project](https://owasp.org/www-project-top-ten/)
- [Next.js: Data Security guide](https://nextjs.org/docs/app/guides/data-security)
- [Stop Leaking API Keys: The Backend for Frontend (BFF) Pattern](https://blog.gitguardian.com/stop-leaking-api-keys-the-backend-for-frontend-bff-pattern-explained/)
- [Ultimate Guide to Securing JWT Authentication with httpOnly Cookies](https://www.wisp.blog/blog/ultimate-guide-to-securing-jwt-authentication-with-httponly-cookies)
- [API Rate Limiting Best Practices](https://zuplo.com/learning-center/10-best-practices-for-api-rate-limiting-in-2026)
- [HTTP Security Headers Implementation Guide](https://playfulsparkle.com/en-gb/insights/http-security-headers-an-implementation-guide/)
