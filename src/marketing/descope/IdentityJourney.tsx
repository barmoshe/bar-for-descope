'use client';

/**
 * IdentityJourney — the centerpiece. It reframes Descope's signature motif
 * (the drag-and-drop "identity journey" flow builder: coloured-border node
 * cards wired by connectors) as Bar's own ship pipeline — Brief, Frontend,
 * Full-stack, Shipped. Built from scratch as one inline SVG in Descope's live
 * palette (ink surface, blue/orange/purple node borders, a mint dashed flow
 * with a travelling packet). No canvas, no GSAP; all motion is CSS and drops
 * to a clean static frame under prefers-reduced-motion. Coords are literal and
 * rounded so the SSR and client strings match (no hydration mismatch).
 */

type Node = {
  x: number;
  title: string;
  color: 'blue' | 'orange' | 'purple' | 'mint';
  glyph: React.ReactNode;
};

const NW = 150; // node width
const NH = 100; // node height
const NY = 62; // node top
const CY = NY + NH / 2; // connector centre-line

// simple line glyphs, drawn inside a 20×20 chip at the node's top-left
const glyphBrief = (
  <>
    <path className="dsc-node__glyph dsc-node__glyph--blue" d="M4 5 h12 v8 h-7 l-3 3 v-3 h-2 z" />
  </>
);
const glyphFrontend = (
  <>
    <rect className="dsc-node__glyph dsc-node__glyph--orange" x="4" y="4" width="12" height="12" rx="2" />
    <path className="dsc-node__glyph dsc-node__glyph--orange" d="M4 8 h12" />
  </>
);
const glyphStack = (
  <>
    <path className="dsc-node__glyph dsc-node__glyph--purple" d="M10 3 l6 3.5 l-6 3.5 l-6 -3.5 z" />
    <path className="dsc-node__glyph dsc-node__glyph--purple" d="M4 10.5 l6 3.5 l6 -3.5" />
  </>
);
const glyphShip = (
  <>
    <path className="dsc-node__glyph dsc-node__glyph--mint" d="M4 10.5 l3.5 3.5 l8 -8.5" />
  </>
);

const NODES: Node[] = [
  { x: 16, title: 'Brief', color: 'blue', glyph: glyphBrief },
  { x: 214, title: 'Frontend', color: 'orange', glyph: glyphFrontend },
  { x: 412, title: 'Full-stack', color: 'purple', glyph: glyphStack },
  { x: 610, title: 'Shipped', color: 'mint', glyph: glyphShip },
];

// node-under-the-title captions
const SUB: Record<string, string> = {
  Brief: 'intake · scope',
  Frontend: 'React · TS · UI',
  'Full-stack': 'API · data · auth',
  Shipped: 'deploy · run',
};

export default function IdentityJourney() {
  return (
    <div className="dsc-flow" role="img" aria-label="A build-pipeline flow in Descope's identity-journey style: a brief flows into frontend work in React, into a full-stack build with API, data and auth, and out to a shipped, deployed product.">
      <div className="dsc-flow__bar" aria-hidden="true">
        <span className="dsc-flow__dot" />
        <span className="dsc-flow__dot" />
        <span className="dsc-flow__dot" />
        <span className="dsc-flow__name">bar-moshe // build-journey</span>
        <span className="dsc-flow__stage">
          <span className="dsc-flow__pip" />
          <span className="dsc-flow__stagelabel">FLOW</span>
        </span>
        <span className="dsc-flow__badge">idea → production</span>
      </div>

      <div className="dsc-flow__canvas">
        <svg className="dsc-flow__svg" viewBox="0 0 760 224" xmlns="http://www.w3.org/2000/svg">
          {/* connector wires between the nodes (curved elbows, their style) */}
          {NODES.slice(0, -1).map((n, i) => {
            const x1 = n.x + NW;
            const x2 = NODES[i + 1].x;
            const mid = ((x1 + x2) / 2).toFixed(2);
            const d = `M${x1.toFixed(2)} ${CY} C${mid} ${CY} ${mid} ${CY} ${x2.toFixed(2)} ${CY}`;
            return <path key={`w${i}`} className="dsc-wire" d={d} />;
          })}
          {/* mint dashed "flow" overlay across the whole track */}
          <path
            className="dsc-wire__flow"
            d={`M${(NODES[0].x + NW).toFixed(2)} ${CY} H${NODES[NODES.length - 1].x.toFixed(2)}`}
          />
          {/* travelling packet */}
          <circle className="dsc-flow__packet" cx={(NODES[0].x + NW).toFixed(2)} cy={CY} r="3.5" />

          {/* nodes */}
          {NODES.map((n) => (
            <g key={n.title}>
              <rect
                className={`dsc-node__box dsc-node__box--${n.color}`}
                x={n.x}
                y={NY}
                width={NW}
                height={NH}
                rx="12"
              />
              {/* icon chip */}
              <rect
                className={`dsc-node__chip--${n.color}`}
                x={n.x + 14}
                y={NY + 14}
                width="24"
                height="24"
                rx="7"
                strokeWidth="1.2"
              />
              <g transform={`translate(${n.x + 16} ${NY + 16})`}>{n.glyph}</g>
              {/* title + caption */}
              <text className="dsc-node__title" x={n.x + 48} y={NY + 27}>
                {n.title}
              </text>
              <text className="dsc-node__sub" x={n.x + 48} y={NY + 40}>
                {SUB[n.title]}
              </text>
              {/* skeleton rows */}
              <rect className="dsc-node__row" x={n.x + 16} y={NY + 52} width={NW - 32} height="9" rx="4.5" />
              <rect className="dsc-node__row--soft" x={n.x + 16} y={NY + 68} width={NW - 58} height="8" rx="4" />
              <rect className="dsc-node__row--soft" x={n.x + 16} y={NY + 82} width={NW - 44} height="8" rx="4" />
            </g>
          ))}
        </svg>
      </div>

      <p className="dsc-flow__foot">
        How I work: <b>brief to shipped</b>, front end through services.
      </p>
    </div>
  );
}
