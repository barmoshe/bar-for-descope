'use client';

/**
 * McpHandshake — the centerpiece for the "Senior Software Engineer, MCP"
 * application page. It reframes Descope's signature "identity-journey" motif
 * (coloured-border node cards wired by connectors) as an MCP auth handshake —
 * the exact surface this role owns: an AI agent's JSON-RPC `tools/call` carries
 * a token, passes through Descope's identity gate (verify + scope), reaches the
 * MCP server, and returns an authorized result. The middle node is Descope's own
 * hexagon-key mark, so the picture reads: your product is the gate in the middle
 * of the MCP calls I already build.
 *
 * Built from scratch as one inline SVG in Descope's live palette. No canvas, no
 * GSAP; all motion is CSS and drops to a clean static frame under
 * prefers-reduced-motion. Coords are literal + rounded so SSR and client strings
 * match (no hydration mismatch). Reuses the shared `.dsc-flow*` / `.dsc-node*` /
 * `.dsc-wire*` classes from descope.css; MCP-only bits live in descope-mcp.css.
 */

type Node = {
  x: number;
  title: string;
  color: 'blue' | 'mint' | 'purple' | 'orange';
  sub: string;
  glyph: React.ReactNode;
};

const NW = 150; // node width
const NH = 100; // node height
const NY = 62; // node top
const CY = NY + NH / 2; // connector centre-line

// simple line glyphs, drawn inside a 20×20 chip at the node's top-left
const glyphAgent = (
  <path
    className="dsc-node__glyph dsc-node__glyph--blue"
    d="M10 2 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 l6 -2 z"
  />
);
// Descope's hexagon-key, scaled into the 20×20 chip.
const glyphDescope = (
  <>
    <path className="dsc-node__glyph dsc-node__glyph--mint" d="M10 2 l7 4 v8 l-7 4 l-7 -4 v-8 z" />
    <circle className="dsc-mcp-key" cx="10" cy="10" r="2.1" />
    <path className="dsc-node__glyph dsc-node__glyph--mint" d="M10 4.4 v2.4 M10 13.2 v2.4" />
  </>
);
const glyphServer = (
  <>
    <rect className="dsc-node__glyph dsc-node__glyph--purple" x="3" y="4" width="14" height="5" rx="1.6" />
    <rect className="dsc-node__glyph dsc-node__glyph--purple" x="3" y="11" width="14" height="5" rx="1.6" />
    <path className="dsc-node__glyph dsc-node__glyph--purple" d="M6 6.5 h0.01 M6 13.5 h0.01" />
  </>
);
const glyphResult = (
  <>
    <path className="dsc-node__glyph dsc-node__glyph--orange" d="M7 3 q-3 0 -3 3 v2 q0 2 -2 2 q2 0 2 2 v2 q0 3 3 3" />
    <path className="dsc-node__glyph dsc-node__glyph--orange" d="M13 3 q3 0 3 3 v2 q0 2 2 2 q-2 0 -2 2 v2 q0 3 -3 3" />
  </>
);

const NODES: Node[] = [
  { x: 16, title: 'AI agent', color: 'blue', sub: 'client · tools/call', glyph: glyphAgent },
  { x: 214, title: 'Descope', color: 'mint', sub: 'verify · scope', glyph: glyphDescope },
  { x: 412, title: 'MCP server', color: 'purple', sub: 'tools · resources', glyph: glyphServer },
  { x: 610, title: 'Result', color: 'orange', sub: 'authorized payload', glyph: glyphResult },
];

// the mono label sitting over each connector gap (the auth step on the wire)
const SEG = ['token', '✓ scope', 'result'];

export default function McpHandshake() {
  return (
    <div
      className="dsc-flow"
      role="img"
      aria-label="An MCP authorization handshake drawn in Descope's identity-journey style: an AI agent makes a JSON-RPC tools/call carrying a token, Descope verifies the identity and scope, the MCP server runs the tool, and an authorized result flows back."
    >
      <div className="dsc-flow__bar" aria-hidden="true">
        <span className="dsc-flow__dot" />
        <span className="dsc-flow__dot" />
        <span className="dsc-flow__dot" />
        <span className="dsc-flow__name">bar-moshe // mcp-auth</span>
        <span className="dsc-flow__stage">
          <span className="dsc-flow__pip" />
          <span className="dsc-flow__stagelabel">HANDSHAKE</span>
        </span>
        <span className="dsc-flow__badge">agent → identity → tool</span>
      </div>

      {/* the JSON-RPC request line, in Descope's mono register */}
      <div className="dsc-mcp-req" aria-hidden="true">
        <span className="dsc-mcp-req__arrow">→</span>
        <span className="dsc-mcp-req__method">tools/call</span>
        <span className="dsc-mcp-req__sep">·</span>
        <span className="dsc-mcp-req__key">Authorization:</span>
        <span className="dsc-mcp-req__val">Bearer ****</span>
        <span className="dsc-mcp-req__sep">·</span>
        <span className="dsc-mcp-req__ok">200 authorized</span>
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
          {/* travelling packet — the JSON-RPC message */}
          <circle className="dsc-flow__packet" cx={(NODES[0].x + NW).toFixed(2)} cy={CY} r="3.5" />

          {/* per-segment auth labels, centred in each connector gap */}
          {NODES.slice(0, -1).map((n, i) => {
            const x1 = n.x + NW;
            const x2 = NODES[i + 1].x;
            const cx = ((x1 + x2) / 2).toFixed(2);
            return (
              <text key={`s${i}`} className="dsc-mcp-seg" x={cx} y={CY - 8}>
                {SEG[i]}
              </text>
            );
          })}

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
                {n.sub}
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
        How MCP should work: <b>every agent call carries an identity</b>, every tool checks it.
      </p>
    </div>
  );
}
