/**
 * Faint technical drawing of pipework (runs, elbows, tees, unions, valves and a gauge), drawn as
 * outlined double-line pipes like a plumbing schematic. Parent section must be `relative isolate`.
 *
 * `bg` must match the section background so the pipe interiors read as hollow.
 */
export function PipeSchematic({
  bg = "var(--color-cloud)",
  side = "right",
  className = "text-tide-deep/[0.13]",
}: {
  bg?: string;
  side?: "left" | "right";
  className?: string;
}) {
  const runs = [
    "M-20 120 H 360 Q 420 120 420 180 V 360 Q 420 420 480 420 H 1240",
    "M760 -20 V 260 Q 760 300 800 300 H 1240",
    "M620 420 V 640",
    "M980 300 V 120 Q 980 80 1020 80 H 1240",
  ];
  const valves = [
    { x: 250, y: 120 },
    { x: 1080, y: 420 },
    { x: 760, y: 140 },
  ];
  const unions = [
    { x: 560, y: 420, v: false },
    { x: 420, y: 270, v: true },
    { x: 900, y: 300, v: false },
    { x: 1140, y: 80, v: false },
  ];
  const mask =
    side === "right"
      ? "linear-gradient(to right, transparent 0%, transparent 30%, black 80%)"
      : "linear-gradient(to left, transparent 0%, transparent 30%, black 80%)";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    >
      <svg
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        className={`h-full w-full ${side === "left" ? "-scale-x-100" : ""}`}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Pipe walls: a wide stroke with a slightly narrower background-coloured stroke on top. */}
        <g stroke="currentColor" strokeWidth="22">
          {runs.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <g stroke={bg} strokeWidth="18">
          {runs.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>

        {/* Tee where the vertical drop leaves the main run */}
        <rect x="604" y="404" width="32" height="32" rx="4" fill={bg} stroke="currentColor" strokeWidth="2" />

        {/* Unions / couplings */}
        {unions.map((u) =>
          u.v ? (
            <rect key={`${u.x}-${u.y}`} x={u.x - 16} y={u.y - 7} width="32" height="14" rx="3" fill={bg} stroke="currentColor" strokeWidth="2" />
          ) : (
            <rect key={`${u.x}-${u.y}`} x={u.x - 7} y={u.y - 16} width="14" height="32" rx="3" fill={bg} stroke="currentColor" strokeWidth="2" />
          ),
        )}

        {/* Valves: bow-tie body with a handwheel */}
        {valves.map((v) => (
          <g key={`${v.x}-${v.y}`} stroke="currentColor" strokeWidth="2" fill={bg}>
            <path d={`M${v.x - 22} ${v.y - 16} L ${v.x + 22} ${v.y + 16} V ${v.y - 16} L ${v.x - 22} ${v.y + 16} Z`} />
            <line x1={v.x} y1={v.y} x2={v.x} y2={v.y - 34} />
            <circle cx={v.x} cy={v.y - 40} r="10" />
          </g>
        ))}

        {/* Pressure gauge on a short stub */}
        <g stroke="currentColor" strokeWidth="2" fill={bg}>
          <line x1="1180" y1="300" x2="1180" y2="250" />
          <circle cx="1180" cy="226" r="24" />
          <line x1="1180" y1="226" x2="1194" y2="214" />
          <path d="M1162 236 A 20 20 0 0 1 1198 236" fill="none" />
        </g>

        {/* Dimension line, as on a drawing */}
        <g stroke="currentColor" strokeWidth="1.5">
          <line x1="480" y1="470" x2="1040" y2="470" strokeDasharray="6 8" />
          <line x1="480" y1="460" x2="480" y2="480" />
          <line x1="1040" y1="460" x2="1040" y2="480" />
        </g>
      </svg>
    </div>
  );
}
