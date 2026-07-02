'use client';

/**
 * DescopeMark — a rounded hexagon holding an inset "key/asterisk" glyph, in
 * mint on ink. It riffs on the visual language of Descope's real lockup (the
 * hexagon-key that replaces the "o" in their lowercase "descope" wordmark,
 * read live off descope.com) without copying their exact logo: same hexagon +
 * key idea, different composition. Pure SVG, colored via descope.css tokens.
 * `float` adds a gentle bob (CSS only, disabled under prefers-reduced-motion).
 */

export default function DescopeMark({
  float = false,
  className,
}: {
  float?: boolean;
  className?: string;
}) {
  const cls = ['dsc-mark', float ? 'dsc-mark--float' : null, className]
    .filter(Boolean)
    .join(' ');
  return (
    <svg className={cls} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      {/* rounded hexagon shell */}
      <path
        className="dsc-mark__hex"
        d="M50 6 L86 27 V73 L50 94 L14 73 V27 Z"
      />
      {/* inset key/asterisk spokes */}
      <g className="dsc-mark__key">
        <circle cx="50" cy="50" r="9" />
        <rect x="46.5" y="20" width="7" height="16" rx="3.5" />
        <rect x="46.5" y="64" width="7" height="16" rx="3.5" />
        <rect x="20" y="46.5" width="16" height="7" rx="3.5" transform="rotate(30 28 50)" />
        <rect x="64" y="46.5" width="16" height="7" rx="3.5" transform="rotate(30 72 50)" />
        <rect x="20" y="46.5" width="16" height="7" rx="3.5" transform="rotate(-30 28 50)" />
        <rect x="64" y="46.5" width="16" height="7" rx="3.5" transform="rotate(-30 72 50)" />
      </g>
    </svg>
  );
}
