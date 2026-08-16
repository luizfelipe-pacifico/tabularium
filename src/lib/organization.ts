// Placeholder for the future multi-tenant auth session. Every request is scoped
// to this single local organization until real registration/login exists.
export const LOCAL_ORGANIZATION_ID = "org_local_dev";

export function getCurrentOrganizationId(): string {
  return LOCAL_ORGANIZATION_ID;
}
