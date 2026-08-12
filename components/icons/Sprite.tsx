/**
 * Sprite SVG local — renderizado uma vez no layout. Os componentes referenciam
 * por `<Icon name="rocket" />`, sem biblioteca de ícones e sem requisição extra.
 */

export const ICON_NAMES = [
  "menu", "search", "play", "arrow", "spark", "rocket", "briefcase", "funnel",
  "radar", "plug", "chart", "code", "help", "mic", "trophy", "bulb",
  "building", "share", "linkedin", "list", "close",
] as const;

export type IconName = (typeof ICON_NAMES)[number];

export function Icon({
  name,
  size = 20,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg width={size} height={size} className={className} aria-hidden="true" focusable="false">
      <use href={`#i-${name}`} />
    </svg>
  );
}

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const };

export default function Sprite() {
  return (
    <svg width={0} height={0} style={{ position: "absolute" }} aria-hidden="true">
      <symbol id="i-menu" viewBox="0 0 24 24" {...S} strokeWidth={2}><path d="M4 7h16M4 12h16M4 17h16" /></symbol>
      <symbol id="i-close" viewBox="0 0 24 24" {...S} strokeWidth={2}><path d="M6 6l12 12M18 6L6 18" /></symbol>
      <symbol id="i-search" viewBox="0 0 24 24" {...S} strokeWidth={2}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></symbol>
      <symbol id="i-play" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z" /></symbol>
      <symbol id="i-arrow" viewBox="0 0 24 24" {...S} strokeWidth={2} strokeLinejoin="round"><path d="M5 12h14m-6-6 6 6-6 6" /></symbol>
      <symbol id="i-spark" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l1.9 5.6L19.5 9l-5.6 1.9L12 16.5l-1.9-5.6L4.5 9l5.6-1.4z" />
        <path d="M18.5 15l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9z" />
      </symbol>
      <symbol id="i-rocket" viewBox="0 0 24 24" {...S} strokeLinejoin="round">
        <path d="M5 15c-1 2-1 4-1 4s2 0 4-1" /><path d="M9 15l-3-3c0-6 5-9 12-9 0 7-3 12-9 12z" /><circle cx="14.5" cy="9.5" r="1.6" />
      </symbol>
      <symbol id="i-briefcase" viewBox="0 0 24 24" {...S}>
        <rect x="3" y="7.5" width="18" height="12" rx="2.5" /><path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3 13h18" />
      </symbol>
      <symbol id="i-funnel" viewBox="0 0 24 24" {...S} strokeLinejoin="round"><path d="M4 5h16l-6.2 7.4V19l-3.6-2v-4.6z" /></symbol>
      <symbol id="i-radar" viewBox="0 0 24 24" {...S}><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><path d="M12 12l6-6" /></symbol>
      <symbol id="i-plug" viewBox="0 0 24 24" {...S}><path d="M9 3v5M15 3v5M7 8h10v3a5 5 0 0 1-10 0z" /><path d="M12 16v5" /></symbol>
      <symbol id="i-chart" viewBox="0 0 24 24" {...S}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></symbol>
      <symbol id="i-code" viewBox="0 0 24 24" {...S} strokeLinejoin="round"><path d="m9 8-5 4 5 4M15 8l5 4-5 4" /></symbol>
      <symbol id="i-help" viewBox="0 0 24 24" {...S}>
        <circle cx="12" cy="12" r="9" /><path d="M9.3 9.2A2.8 2.8 0 0 1 12 7.2c1.6 0 2.8 1 2.8 2.4 0 1.7-2.3 2-2.7 3.4" /><path d="M12 16.8h.01" />
      </symbol>
      <symbol id="i-mic" viewBox="0 0 24 24" {...S}><rect x="9" y="3" width="6" height="10" rx="3" /><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" /></symbol>
      <symbol id="i-trophy" viewBox="0 0 24 24" {...S}>
        <path d="M8 4h8v4.5a4 4 0 0 1-8 0z" /><path d="M8 5.5H5.5v1A3.5 3.5 0 0 0 8 9.8M16 5.5h2.5v1A3.5 3.5 0 0 1 16 9.8M12 12.5V16M9 20h6" />
      </symbol>
      <symbol id="i-bulb" viewBox="0 0 24 24" {...S}>
        <path d="M9 17h6M10 20.5h4" /><path d="M12 3a5.5 5.5 0 0 1 3.4 9.8c-.6.5-.9 1.1-.9 1.8h-5c0-.7-.3-1.3-.9-1.8A5.5 5.5 0 0 1 12 3z" />
      </symbol>
      <symbol id="i-building" viewBox="0 0 24 24" {...S}>
        <rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 8h1M14 8h1M9 12h1M14 12h1M9.5 20v-4h5v4" />
      </symbol>
      <symbol id="i-share" viewBox="0 0 24 24" {...S}>
        <circle cx="18" cy="5.5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="18.5" r="2.5" /><path d="m8.3 10.7 7.4-4M8.3 13.3l7.4 4" />
      </symbol>
      <symbol id="i-linkedin" viewBox="0 0 24 24" {...S}>
        <rect x="4" y="4" width="16" height="16" rx="3" /><path d="M8 10.5V16M8 8v.01M12 16v-3.2a1.8 1.8 0 0 1 3.6 0V16" />
      </symbol>
      <symbol id="i-list" viewBox="0 0 24 24" {...S}><path d="M4 7h11M4 12h11M4 17h7M19 14v6M16 17h6" /></symbol>
    </svg>
  );
}
