// Line-art plates for the public site, drawn for Tabularium in the brand palette.
// Every stroke that should "draw itself" when its Reveal enters the viewport carries
// `className="plate-draw"` and `pathLength={1}` (see `.plate-draw` in globals.css).
// Strokes use currentColor (Walnut on light fields, Parchment on Ebony); Amber marks the one
// meaningful detail of each plate.
import type { SVGProps } from "react";

type PlateProps = SVGProps<SVGSVGElement>;

const AMBER = "var(--amber)";

function Plate({ children, ...props }: PlateProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Hero emblem: the brand's column on a timeline, inside a dial, the amber segment marking "now". */
export function EmblemColumn(props: PlateProps) {
  const ticks = Array.from({ length: 60 }, (_, i) => i * 6);

  return (
    <Plate viewBox="0 0 320 320" {...props}>
      <defs>
        <radialGradient id="emblem-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#b8773d" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#b8773d" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="160" cy="160" r="158" fill="url(#emblem-glow)" stroke="none" />
      <circle className="plate-draw" pathLength={1} cx="160" cy="160" r="122" strokeOpacity="0.28" strokeWidth={1.5} />
      <g strokeOpacity="0.32" strokeWidth={1}>
        {ticks.map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const inner = deg % 30 === 0 ? 106 : 113;
          return (
            <line
              key={deg}
              x1={160 + Math.cos(rad) * inner}
              y1={160 + Math.sin(rad) * inner}
              x2={160 + Math.cos(rad) * 120}
              y2={160 + Math.sin(rad) * 120}
            />
          );
        })}
      </g>
      <g strokeOpacity="0.85">
        <path className="plate-draw" pathLength={1} d="M118 72h84M126 82h68" strokeWidth={3} />
        <path className="plate-draw" pathLength={1} d="M138 92v126M182 92v126" />
        <path className="plate-draw" pathLength={1} d="M152 104v42h18v18M168 216v-42h-18v-18" strokeWidth={1.75} />
        <path className="plate-draw" pathLength={1} d="M126 228h68M118 240h84" strokeWidth={3} />
      </g>
      <g strokeOpacity="0.7" strokeWidth={4} strokeLinecap="butt">
        <line x1="40" y1="160" x2="72" y2="160" />
        <line x1="82" y1="160" x2="122" y2="160" />
        <line x1="198" y1="160" x2="238" y2="160" />
        <line x1="248" y1="160" x2="280" y2="160" />
      </g>
      <rect className="emblem-now" x="138" y="155" width="44" height="10" rx="1.5" fill={AMBER} stroke="none" />
    </Plate>
  );
}

/** The queue's waiting time: an hourglass whose lower bulb is filling. */
export function PlateHourglass(props: PlateProps) {
  return (
    <Plate viewBox="0 0 160 220" {...props}>
      <defs>
        <pattern id="hourglass-hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <line x1="0" y1="0" x2="0" y2="5" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1" />
        </pattern>
      </defs>
      <path className="plate-draw" pathLength={1} d="M18 12h124M18 208h124" strokeWidth={2.5} />
      <path className="plate-draw" pathLength={1} d="M30 12v196M130 12v196" strokeOpacity="0.55" />
      <path className="plate-draw" pathLength={1} d="M42 16c0 54 36 76 38 94-2 18-38 40-38 94M118 16c0 54-36 76-38 94 2 18 38 40 38 94" />
      <path d="M50 30h60L80 90z" fill="url(#hourglass-hatch)" stroke="none" />
      <path d="M80 112v50" stroke={AMBER} strokeWidth={1.5} />
      <circle cx="80" cy="166" r="2.5" fill={AMBER} stroke="none" />
      <path d="M52 198q28-46 56 0z" fill={AMBER} fillOpacity="0.55" stroke="none" />
    </Plate>
  );
}

/** The Tabularium itself: a pediment over seven columns, one per post-MVP pillar. */
export function PlateTabularium(props: PlateProps) {
  const columns = Array.from({ length: 7 }, (_, i) => 52 + i * 36);

  return (
    <Plate viewBox="0 0 320 210" {...props}>
      <path className="plate-draw" pathLength={1} d="M36 64 160 20l124 44z" />
      <path className="plate-draw" pathLength={1} d="M66 58 160 28l94 30" strokeOpacity="0.4" strokeWidth={1.25} />
      <circle cx="160" cy="46" r="6" fill={AMBER} stroke="none" />
      <rect className="plate-draw" pathLength={1} x="32" y="64" width="256" height="12" />
      {columns.map((x) => (
        <g key={x}>
          <rect className="plate-draw" pathLength={1} x={x - 11} y="76" width="22" height="7" />
          <rect className="plate-draw" pathLength={1} x={x - 7} y="83" width="14" height="86" />
          <path d={`M${x - 2.5} 88v76M${x + 2.5} 88v76`} strokeOpacity="0.35" strokeWidth={1} />
          <rect className="plate-draw" pathLength={1} x={x - 11} y="169" width="22" height="7" />
        </g>
      ))}
      <rect className="plate-draw" pathLength={1} x="24" y="176" width="272" height="9" />
      <rect className="plate-draw" pathLength={1} x="14" y="185" width="292" height="9" />
      <path d="M4 202h312" strokeOpacity="0.45" strokeWidth={1.25} />
    </Plate>
  );
}

/** The public roadmap: an open ledger with a few lines marked. */
export function PlateLedger(props: PlateProps) {
  const rows = Array.from({ length: 9 }, (_, i) => 62 + i * 14);
  const marked = new Set([1, 4, 6]);

  return (
    <Plate viewBox="0 0 300 220" {...props}>
      <path className="plate-draw" pathLength={1} d="M150 40c-30-12-90-14-130-4v160c40-10 100-8 130 4zM150 40c30-12 90-14 130-4v160c-40-10-100-8-130 4z" />
      <path d="M150 40v160" strokeOpacity="0.6" />
      <g strokeOpacity="0.35" strokeWidth={1.25}>
        {rows.map((y) => (
          <path key={y} d={`M36 ${y}h100M164 ${y}h100`} />
        ))}
      </g>
      {rows.map((y, i) =>
        marked.has(i) ? (
          <rect key={`m${y}`} x={i % 2 ? 226 : 108} y={y - 4} width="24" height="7" rx="1" fill={AMBER} fillOpacity="0.7" stroke="none" />
        ) : null,
      )}
    </Plate>
  );
}

/** Security: a vault door, its dial set to the one combination the server keeps. */
export function PlateVault(props: PlateProps) {
  const ticks = Array.from({ length: 8 }, (_, i) => (i * Math.PI) / 4);

  return (
    <Plate viewBox="0 0 240 240" {...props}>
      <rect className="plate-draw" pathLength={1} x="8" y="8" width="224" height="224" rx="14" />
      <rect className="plate-draw" pathLength={1} x="26" y="26" width="188" height="188" rx="8" strokeOpacity="0.6" />
      <circle className="plate-draw" pathLength={1} cx="120" cy="120" r="54" />
      <circle cx="120" cy="120" r="38" strokeOpacity="0.55" />
      {ticks.map((a) => (
        <line key={a} x1={120 + Math.cos(a) * 62} y1={120 + Math.sin(a) * 62} x2={120 + Math.cos(a) * 80} y2={120 + Math.sin(a) * 80} />
      ))}
      <circle cx="120" cy="120" r="11" fill={AMBER} fillOpacity="0.55" stroke="none" />
    </Plate>
  );
}

/** Direction: a compass whose north needle is the one amber mark. */
export function PlateCompass(props: PlateProps) {
  return (
    <Plate viewBox="0 0 200 200" {...props}>
      <circle className="plate-draw" pathLength={1} cx="100" cy="100" r="90" />
      <circle cx="100" cy="100" r="78" strokeOpacity="0.4" strokeWidth={1.25} />
      <path d="M100 22v156M22 100h156" strokeOpacity="0.25" strokeWidth={1} />
      <path d="M100 26 113 96H87z" fill={AMBER} stroke="none" />
      <path className="plate-draw" pathLength={1} d="M100 174 113 104H87z" strokeWidth={1.5} />
      <circle cx="100" cy="100" r="6" fill="var(--parchment)" />
    </Plate>
  );
}

/** Section ornament: two leaves and an amber seed between hairlines. */
export function Ornament(props: PlateProps) {
  return (
    <Plate viewBox="0 0 240 24" strokeWidth={1.5} {...props}>
      <path d="M0 12h78M162 12h78" strokeOpacity="0.45" strokeWidth={1} />
      <path d="M86 12c12-10 28-10 34 0-6 10-22 10-34 0zM154 12c-12-10-28-10-34 0 6 10 22 10 34 0z" />
      <circle cx="120" cy="12" r="3.5" fill={AMBER} stroke="none" />
    </Plate>
  );
}

/** Faint astrolabe rings used as a background texture on quote and Ebony fields. */
export function Rings(props: PlateProps) {
  return (
    <Plate viewBox="0 0 400 400" strokeWidth={1} {...props}>
      <circle cx="200" cy="200" r="196" />
      <circle cx="200" cy="200" r="150" />
      <circle cx="200" cy="200" r="70" />
      <ellipse cx="200" cy="200" rx="196" ry="70" />
      <ellipse cx="200" cy="200" rx="70" ry="196" />
      <ellipse cx="200" cy="200" rx="196" ry="130" transform="rotate(35 200 200)" />
      <path d="M200 4v392M4 200h392" />
      <circle cx="200" cy="200" r="16" fill="currentColor" fillOpacity="0.5" stroke="none" />
    </Plate>
  );
}
