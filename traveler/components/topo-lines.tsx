/**
 * Faint concentric contour lines rendered behind the hero. A single
 * deliberate texture moment, not reused elsewhere on the page.
 */
export function TopoLines() {
  return (
    <svg
      viewBox="0 0 800 500"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <g fill="none" stroke="#EEF0EA" strokeOpacity="0.35" strokeWidth="1.5">
        <path d="M -50 420 Q 200 340 420 400 T 900 360" />
        <path d="M -50 360 Q 220 280 440 340 T 900 300" />
        <path d="M -50 300 Q 240 220 460 280 T 900 240" />
        <path d="M -50 240 Q 260 160 480 220 T 900 180" />
        <path d="M -50 180 Q 280 100 500 160 T 900 120" />
      </g>
    </svg>
  );
}
