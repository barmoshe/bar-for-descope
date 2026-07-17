'use client';

import { useRef } from 'react';
import { gsap, useGSAP, FULL_MOTION_QUERY } from '../../lib/gsap';
import DescopeMark from './DescopeMark';
import McpHandshake from './McpHandshake';
import './marketing-base.css';
import './descope.css';
import './descope-mcp.css';

/**
 * DescopeMcpApp — an ad-hoc, personalized application page for Bar Moshe's
 * "Senior Software Engineer, MCP" application to Descope (Tel Aviv, hybrid).
 * This is the SECOND Descope role Bar is applying to; the earlier Full-Stack
 * Software Engineer page moved to /fullstack and this became the root.
 *
 * Same live-read Descope brand as the full-stack page (descope.css, computed
 * off descope.com 2026-07-02: near-black navy hero, white weight-500 display
 * with a mint underline, mint CTA pills, the identity-journey flow motif). What
 * changes is the pitch: MCP-forward. The centerpiece (McpHandshake) recasts
 * their identity-journey as an MCP auth handshake — an agent's JSON-RPC call
 * through Descope's identity gate to the MCP server — which is exactly the
 * surface this role owns. English, LTR.
 */

const EMAIL =
  'mailto:1barmoshe1@gmail.com?subject=Senior%20Software%20Engineer%2C%20MCP%20application%20from%20Bar%20Moshe';
const CV = '/Bar_Moshe_CV_Descope_MCP.pdf';

type Proof = {
  tag: string;
  title: string;
  desc: string;
  /** Omitted on credential cards (Joomsy: employer IP, named but never linked). */
  href?: string;
  open?: string;
  visual: React.ReactNode;
};

type Focus = { no: string; k: string; lead: string; body: string };

// Developer tool wired into a host — a panel plugging into an app through a pulsing wire.
const MdpVisual = (
  <svg className="dsc-vis" viewBox="0 0 220 120" aria-hidden="true" focusable="false">
    <rect className="dsc-vis__panel" x="14" y="26" width="78" height="68" rx="8" />
    <rect className="dsc-vis__line" x="24" y="38" width="44" height="6" rx="3" />
    <rect className="dsc-vis__line dsc-vis__line--soft" x="24" y="52" width="58" height="4" rx="2" />
    <rect className="dsc-vis__line dsc-vis__line--soft" x="24" y="62" width="40" height="4" rx="2" />
    <rect className="dsc-vis__line dsc-vis__line--soft" x="24" y="76" width="50" height="4" rx="2" />
    <line className="dsc-vis__wire" x1="94" y1="60" x2="128" y2="60" />
    <line className="dsc-vis__flow" x1="94" y1="60" x2="128" y2="60" />
    <circle className="dsc-vis__pulse" r="3.5" />
    <rect className="dsc-vis__art" x="130" y="22" width="76" height="76" rx="8" />
    <rect className="dsc-vis__art-bar" x="140" y="34" width="46" height="8" rx="3" />
    <rect className="dsc-vis__line dsc-vis__line--soft" x="140" y="50" width="54" height="4" rx="2" />
    <rect className="dsc-vis__chip" x="140" y="74" width="22" height="14" rx="4" />
    <rect className="dsc-vis__chip dsc-vis__chip--b" x="168" y="74" width="22" height="14" rx="4" />
  </svg>
);

// Plugin others install: a plugin panel wired into a durable hub, out to done.
const PluginVisual = (
  <svg className="dsc-vis" viewBox="0 0 220 120" aria-hidden="true" focusable="false">
    <rect className="dsc-vis__panel" x="14" y="34" width="64" height="52" rx="8" />
    <rect className="dsc-vis__art-bar" x="24" y="46" width="34" height="7" rx="3" />
    <rect className="dsc-vis__line dsc-vis__line--soft" x="24" y="60" width="44" height="4" rx="2" />
    <rect className="dsc-vis__line dsc-vis__line--soft" x="24" y="70" width="30" height="4" rx="2" />
    <line className="dsc-vis__wire" x1="80" y1="60" x2="112" y2="60" />
    <line className="dsc-vis__flow" x1="80" y1="60" x2="112" y2="60" />
    <circle className="dsc-vis__hub" cx="130" cy="60" r="16" />
    <circle className="dsc-vis__hub-ring" cx="130" cy="60" r="16" />
    <line className="dsc-vis__edge dsc-vis__edge--out" x1="148" y1="60" x2="186" y2="60" />
    <rect className="dsc-vis__sink" x="186" y="50" width="20" height="20" rx="5" />
  </svg>
);

// Auth: a sign-in panel, a key chip, an issued session token row. On-brand for Descope.
const AuthVisual = (
  <svg className="dsc-vis" viewBox="0 0 220 120" aria-hidden="true" focusable="false">
    <rect className="dsc-vis__panel" x="14" y="18" width="104" height="84" rx="9" />
    <rect className="dsc-vis__art" x="26" y="30" width="26" height="26" rx="7" />
    <path className="dsc-vis__glyphline" d="M34 45 a5 5 0 1 1 10 0 M39 45 v7" />
    <rect className="dsc-vis__line" x="62" y="34" width="44" height="6" rx="3" />
    <rect className="dsc-vis__line dsc-vis__line--soft" x="26" y="66" width="80" height="7" rx="3.5" />
    <rect className="dsc-vis__line dsc-vis__line--soft" x="26" y="80" width="60" height="7" rx="3.5" />
    <line className="dsc-vis__wire" x1="118" y1="60" x2="150" y2="60" />
    <line className="dsc-vis__flow" x1="118" y1="60" x2="150" y2="60" />
    <rect className="dsc-vis__sink" x="150" y="46" width="56" height="28" rx="7" />
    <rect className="dsc-vis__art-bar" x="160" y="56" width="36" height="7" rx="3" />
  </svg>
);

// Orchestration: three language workers feeding one durable pipeline node.
const OrchestrateVisual = (
  <svg className="dsc-vis" viewBox="0 0 220 120" aria-hidden="true" focusable="false">
    <line className="dsc-vis__edge" x1="40" y1="26" x2="110" y2="60" />
    <line className="dsc-vis__edge" x1="40" y1="60" x2="110" y2="60" />
    <line className="dsc-vis__edge" x1="40" y1="94" x2="110" y2="60" />
    <line className="dsc-vis__edge dsc-vis__edge--out" x1="110" y1="60" x2="186" y2="60" />
    <g className="dsc-vis__worker"><rect x="14" y="18" width="36" height="16" rx="5" /><text x="32" y="30">Go</text></g>
    <g className="dsc-vis__worker"><rect x="14" y="52" width="36" height="16" rx="5" /><text x="32" y="64">Py</text></g>
    <g className="dsc-vis__worker"><rect x="14" y="86" width="36" height="16" rx="5" /><text x="32" y="98">TS</text></g>
    <circle className="dsc-vis__hub" cx="110" cy="60" r="16" />
    <circle className="dsc-vis__hub-ring" cx="110" cy="60" r="16" />
    <rect className="dsc-vis__sink" x="186" y="50" width="20" height="20" rx="5" />
  </svg>
);

// Premises converging on a verified conclusion.
const LogicVisual = (
  <svg className="dsc-vis" viewBox="0 0 220 120" aria-hidden="true" focusable="false">
    <rect className="dsc-vis__row" x="14" y="22" width="76" height="9" rx="4.5" />
    <rect className="dsc-vis__row" x="14" y="56" width="76" height="9" rx="4.5" />
    <rect className="dsc-vis__row" x="14" y="90" width="76" height="9" rx="4.5" />
    <line className="dsc-vis__edge" x1="90" y1="26" x2="150" y2="60" />
    <line className="dsc-vis__edge" x1="90" y1="60" x2="150" y2="60" />
    <line className="dsc-vis__edge" x1="90" y1="94" x2="150" y2="60" />
    <rect className="dsc-vis__sink" x="150" y="48" width="24" height="24" rx="6" />
    <g className="dsc-vis__worker"><rect x="184" y="51" width="22" height="18" rx="5" /><text x="195" y="64">✓</text></g>
  </svg>
);

// A product console: header, working rows, status chips. No source exposed.
const StartupVisual = (
  <svg className="dsc-vis" viewBox="0 0 220 120" aria-hidden="true" focusable="false">
    <rect className="dsc-vis__panel" x="14" y="16" width="192" height="88" rx="9" />
    <rect className="dsc-vis__art-bar" x="26" y="28" width="58" height="8" rx="3" />
    <rect className="dsc-vis__line dsc-vis__line--soft" x="26" y="46" width="120" height="4" rx="2" />
    <rect className="dsc-vis__row" x="26" y="60" width="168" height="9" rx="4.5" />
    <rect className="dsc-vis__row dsc-vis__row--play" x="26" y="76" width="126" height="9" rx="4.5" />
    <rect className="dsc-vis__chip" x="160" y="28" width="22" height="12" rx="4" />
    <rect className="dsc-vis__chip dsc-vis__chip--b" x="184" y="28" width="12" height="12" rx="4" />
  </svg>
);

// The four JD buckets, mapped to Bar's evidence. Plain, factual, no posting-echo.
const FOCUS: Focus[] = [
  {
    no: '01',
    k: 'MCP, in production',
    lead: 'Servers and tools others run',
    body:
      'MDP ships its own MCP server on npm, plus Claude Code and Codex plugins, and I wire project-scoped MCP servers through .mcp.json. Working software people install, not a spec I have read.',
  },
  {
    no: '02',
    k: 'Protocols and real time',
    lead: 'JSON-RPC, streaming, durable state',
    body:
      "MCP's wire format is JSON-RPC. I have built stateful real-time systems and durable Temporal pipelines that survive restarts, across Go, Python, and TypeScript workers.",
  },
  {
    no: '03',
    k: 'Identity is the point',
    lead: 'Auth around every call',
    body:
      'I shipped user auth and middleware in product (Israelify). This role wires Descope identity into the MCP connections I already build, so the ramp is into your auth domain, not into MCP.',
  },
  {
    no: '04',
    k: 'Open by default',
    lead: 'On npm and GitHub, public',
    body:
      'MDP, entailer, temporal-plugin, and whereami are all open source. The role asks for open-source MCP contribution; that is already how I work.',
  },
];

// Flat proof grid, ordered backend / protocol / auth / OSS forward for this role.
const PROOF: Proof[] = [
  {
    tag: 'OPEN SOURCE · NPM · MCP SERVER',
    title: 'MDP',
    desc: 'Markdown-to-document compiler on npm. Ships an MCP server plus Claude Code and Codex plugins so other tools and agents call it. TypeScript.',
    href: 'https://barmoshe.github.io/mdp/',
    open: 'Open MDP',
    visual: MdpVisual,
  },
  {
    tag: 'OPEN SOURCE · TEMPORAL.IO · GO',
    title: 'temporal-plugin',
    desc: 'Temporal.io orchestration plugin for Claude Code: durable, restartable workflows for long-running agent tasks.',
    href: 'https://github.com/Base67-AI/temporal-plugin',
    open: 'View the code',
    visual: PluginVisual,
  },
  {
    tag: 'FULL STACK · AUTH + MIDDLEWARE',
    title: 'Israelify',
    desc: 'Full-stack app: React over a Node and MongoDB API, with user authentication, middleware, and a custom logger.',
    href: 'https://github.com/barmoshe/Israelify-backend',
    open: 'View the code',
    visual: AuthVisual,
  },
  {
    tag: 'MICROSERVICES · TEMPORAL CODE EXCHANGE',
    title: 'Cross-language orchestration',
    desc: 'One Temporal workflow over Go, Python, and TypeScript workers. Featured on Temporal’s Code Exchange.',
    href: 'https://temporal.io/code-exchange/cross-language-data-processing-service-with-temporal',
    open: 'See the writeup',
    visual: OrchestrateVisual,
  },
  {
    tag: 'OPEN SOURCE · VERIFICATION',
    title: 'entailer',
    desc: 'Open-source logic-validity toolkit: checks whether a conclusion actually follows from its premises. Published on npm.',
    href: 'https://github.com/barmoshe/entailer',
    open: 'View the code',
    visual: LogicVisual,
  },
  {
    tag: 'CURRENT ROLE · 2025 TO PRESENT',
    title: 'Joomsy',
    desc: 'Primary engineer at a five-person early-stage startup. Full-stack product plus the DevOps that runs it, design to deploy.',
    visual: StartupVisual,
  },
];

export default function DescopeMcpApp() {
  const scope = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!matchMedia(FULL_MOTION_QUERY).matches) return;

      gsap.from('.dsc-hero__copy > [data-rise]', {
        yPercent: 16,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.06,
      });

      const reveals = gsap.utils.toArray<HTMLElement>('[data-reveal]');
      reveals.forEach((el) => {
        gsap.from(el, {
          y: 26,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%' },
        });
      });
    },
    { scope },
  );

  return (
    <div className="mp-root dsc-root" ref={scope}>
      <a className="dsc-skip" href="#main">Skip to content</a>

      {/* ── Top navigation ──────────────────────────────────── */}
      <header className="dsc-nav">
        <div className="dsc-nav__inner">
          <a className="dsc-brand" href="#main" aria-label="Bar Moshe">
            <DescopeMark className="dsc-nav__mark" />
            <span className="dsc-wordmark">Bar Moshe</span>
          </a>
          <span className="dsc-nav__tag">for Descope · MCP</span>
          <nav className="dsc-nav__links" aria-label="Sections">
            <a className="dsc-nav__link" href="#handshake">Handshake</a>
            <a className="dsc-nav__link" href="#focus">Fit</a>
            <a className="dsc-nav__link" href="#work">Work</a>
          </nav>
          <div className="dsc-nav__cta">
            <a className="dsc-btn dsc-btn--dark dsc-btn--sm" href={CV} target="_blank" rel="noopener noreferrer">Download CV</a>
            <a className="dsc-btn dsc-btn--primary dsc-btn--sm" href={EMAIL}>
              <span className="dsc-nav__full">Start a conversation</span>
              <span className="dsc-nav__short">Let’s talk</span>
            </a>
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        {/* ── Hero (dark navy, centred, handshake beneath) ───── */}
        <section className="dsc-hero">
          <div className="dsc-hero__inner">
            <div className="dsc-hero__copy">
              <p className="dsc-eyebrow" data-rise>
                <span className="dsc-eyebrow__dot" />
                BAR MOSHE · SENIOR SOFTWARE ENGINEER, MCP · APPLICATION
              </p>
              <h1 className="dsc-title" data-rise>
                I build <span className="dsc-hl">MCP servers</span>.
              </h1>
              <p className="dsc-lede" data-rise>
                Backend engineer in Tel Aviv. I build MCP servers and the tooling agents call:
                MDP on npm ships its own MCP server, and my pipelines run durably on Temporal
                across Go, Python, and TypeScript. Securing those calls with identity is the job
                you are hiring for. Every link below is live.
              </p>
              <div className="dsc-hero__cta" data-rise>
                <a className="dsc-btn dsc-btn--primary" href={EMAIL}>
                  Start a conversation
                  <span className="dsc-btn__arrow" aria-hidden="true">→</span>
                </a>
                <a className="dsc-btn dsc-btn--oninvert-ghost" href={CV} target="_blank" rel="noopener noreferrer">
                  Download CV
                </a>
              </div>
              <p className="dsc-hero__trust" data-rise>
                <strong>B.Sc. Computer Science</strong>, Afeka College · JSON-RPC · OAuth / JWT ·
                TypeScript · Python · Go · Tel Aviv
              </p>
            </div>
          </div>
          {/* the signature identity-journey flow, recast as an MCP auth handshake */}
          <div className="dsc-hero__flow" id="handshake">
            <McpHandshake />
          </div>
        </section>

        {/* ── Focus areas (dark band, 4 cards mapped to the JD) ── */}
        <section id="focus" className="dsc-section dsc-section--dark">
          <div className="dsc-wrap">
            <header className="dsc-section__head" data-reveal>
              <p className="dsc-kicker">Why this role</p>
              <h2 className="dsc-h2">The role is what I already do.</h2>
              <p className="dsc-sub">
                Four things the posting is really asking for, and where I have shipped each one.
              </p>
            </header>
            <div className="dsc-fit__grid">
              {FOCUS.map((f) => (
                <article key={f.no} className="dsc-fcard" data-reveal>
                  <span className="dsc-fcard__no">{f.no}</span>
                  <h3 className="dsc-fcard__k">{f.k}</h3>
                  <p className="dsc-fcard__lead">{f.lead}</p>
                  <p className="dsc-fcard__body">{f.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Selected work (light, one flat grid) ───────────── */}
        <section id="work" className="dsc-section dsc-section--soft">
          <div className="dsc-wrap">
            <header className="dsc-section__head" data-reveal>
              <p className="dsc-kicker">Selected work</p>
              <h2 className="dsc-h2">Shipped work, mapped to the role.</h2>
              <p className="dsc-sub">Live links where available; employer work is named, not shown.</p>
            </header>
            <div className="dsc-proof__grid">
              {PROOF.map((p) => {
                const body = (
                  <>
                    <div className="dsc-pcard__screen">{p.visual}</div>
                    <div className="dsc-pcard__body">
                      <span className="dsc-pcard__tag">{p.tag}</span>
                      <h3 className="dsc-pcard__title">{p.title}</h3>
                      <p className="dsc-pcard__desc">{p.desc}</p>
                      {p.href ? (
                        <span className="dsc-pcard__link" aria-hidden="true">{p.open} →</span>
                      ) : (
                        <span className="dsc-pcard__link dsc-pcard__link--muted">Named, not linked. Employer IP.</span>
                      )}
                    </div>
                  </>
                );
                return p.href ? (
                  <a
                    key={p.title}
                    className="dsc-pcard"
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-reveal
                  >
                    {body}
                  </a>
                ) : (
                  <article key={p.title} className="dsc-pcard dsc-pcard--static" data-reveal>
                    {body}
                  </article>
                );
              })}
            </div>
            <p className="dsc-proof__more">
              More in{' '}
              <a href="https://github.com/barmoshe" target="_blank" rel="noopener noreferrer">
                my portfolio
              </a>
              .
            </p>
          </div>
        </section>

        {/* ── Close band (dark, centred) ─────────────────────── */}
        <section className="dsc-cta">
          <div className="dsc-cta__inner" data-reveal>
            <DescopeMark className="dsc-cta__mark" float />
            <h2 className="dsc-cta__title">Let’s talk.</h2>
            <p className="dsc-cta__sub">
              Applying for the Senior Software Engineer, MCP role at Descope. I already build MCP
              servers; I want to build the identity layer around them with you. Tel Aviv, open to hybrid.
            </p>
            <div className="dsc-cta__links">
              <a className="dsc-btn dsc-btn--oninvert" href={EMAIL}>Email me</a>
              <a className="dsc-btn dsc-btn--oninvert-ghost" href="https://www.linkedin.com/in/barmoshe/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="dsc-btn dsc-btn--oninvert-ghost" href="https://github.com/barmoshe" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a className="dsc-btn dsc-btn--oninvert-ghost" href={CV} target="_blank" rel="noopener noreferrer">Download CV</a>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer (dark) ───────────────────────────────────── */}
      <footer className="dsc-footer">
        <div className="dsc-footer__inner">
          <div className="dsc-footer__brand">
            <span className="dsc-footer__mark">
              <DescopeMark className="dsc-nav__mark" />
              <span className="dsc-wordmark">Bar Moshe</span>
            </span>
            <p className="dsc-footer__tag">
              An application page Bar Moshe built for the Senior Software Engineer, MCP role at
              Descope, Tel Aviv. Not affiliated with Descope.{' '}
              <a className="dsc-footer__link" href="/fullstack" style={{ textDecoration: 'underline' }}>
                My full-stack application is here.
              </a>
            </p>
          </div>
          <div className="dsc-footer__col">
            <p className="dsc-footer__h">The work</p>
            <ul>
              <li><a className="dsc-footer__link" href="https://barmoshe.github.io/mdp/" target="_blank" rel="noopener noreferrer">MDP + MCP server</a></li>
              <li><a className="dsc-footer__link" href="https://github.com/Base67-AI/temporal-plugin" target="_blank" rel="noopener noreferrer">temporal-plugin</a></li>
              <li><a className="dsc-footer__link" href="https://github.com/barmoshe" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </div>
          <div className="dsc-footer__col">
            <p className="dsc-footer__h">Get in touch</p>
            <ul>
              <li><a className="dsc-footer__link" href={EMAIL}>1barmoshe1@gmail.com</a></li>
              <li><a className="dsc-footer__link" href="https://www.linkedin.com/in/barmoshe/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a className="dsc-footer__link" href={CV} target="_blank" rel="noopener noreferrer">Download CV</a></li>
            </ul>
          </div>
        </div>
        <div className="dsc-footer__bottom">
          <div className="dsc-footer__bottom-inner">
            <span>Built by Bar Moshe for this application.</span>
            <span>Tel Aviv · 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
