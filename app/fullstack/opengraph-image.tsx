import { ImageResponse } from 'next/og';

// Dynamic share card for the /fullstack Descope application page, matching the
// page's look — Descope's real brand, read live off descope.com: near-black
// navy surface (#0A101A) with a radial glow, white display type at weight 500,
// a mint (#7DEDED) hexagon-key mark and CTA pill. Rendered at build time by
// next/og (Satori), so it uses a flexbox-only subset of CSS and plain hex
// colours (Latin text only). Next colocates this file with the route and wires
// the og:image / twitter:image tags automatically.

export const alt =
  'Bar Moshe for Descope — Full-Stack Software Engineer. React, Next.js, TypeScript, Node; open-source developer tooling on npm with an MCP server.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// The hexagon-key mark (same idea as DescopeMark on the page).
function Mark({ size: s = 48 }: { size?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <path d="M50 6 L86 27 V73 L50 94 L14 73 V27 Z" fill="none" stroke="#7deded" strokeWidth="6" strokeLinejoin="round" />
      <circle cx="50" cy="50" r="9" fill="#7deded" />
      <rect x="46.5" y="20" width="7" height="16" rx="3.5" fill="#7deded" />
      <rect x="46.5" y="64" width="7" height="16" rx="3.5" fill="#7deded" />
    </svg>
  );
}

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px 48px',
          backgroundColor: '#0a101a',
          backgroundImage:
            'radial-gradient(760px 460px at 50% 8%, rgba(26,41,66,0.95), transparent 62%), radial-gradient(520px 360px at 88% 88%, rgba(125,237,237,0.16), transparent 60%), radial-gradient(500px 360px at 10% 82%, rgba(76,127,240,0.14), transparent 62%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Brand row */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Mark size={50} />
          <div style={{ display: 'flex', fontSize: 40, fontWeight: 600, color: '#eef3f8', marginLeft: 16, letterSpacing: '-0.01em' }}>
            Bar Moshe
          </div>
          <div
            style={{
              display: 'flex',
              marginLeft: 18,
              padding: '8px 18px',
              borderRadius: 999,
              border: '1.5px solid rgba(238,243,248,0.16)',
              backgroundColor: 'rgba(125,237,237,0.08)',
              fontSize: 22,
              fontWeight: 500,
              color: '#7deded',
            }}
          >
            for Descope · Application
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 66,
              fontWeight: 500,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
              maxWidth: '1010px',
            }}
          >
            Full-stack software engineer.
          </div>
          <div style={{ display: 'flex', fontSize: 29, color: 'rgba(238,243,248,0.72)', marginTop: '22px', maxWidth: '960px', lineHeight: 1.35 }}>
            React, Next.js, TypeScript, Node. Open-source tooling on npm with an MCP server, featured on Temporal Code Exchange.
          </div>
        </div>

        {/* Foot meta */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 26, color: 'rgba(238,243,248,0.55)' }}>
          <div style={{ display: 'flex' }}>github.com/barmoshe</div>
          <div
            style={{
              display: 'flex',
              padding: '10px 22px',
              borderRadius: 999,
              backgroundColor: '#7deded',
              fontWeight: 600,
              fontSize: 24,
              color: '#0a3b3b',
            }}
          >
            Full-Stack Software Engineer · Tel Aviv
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
