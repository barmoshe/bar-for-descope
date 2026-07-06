'use client';

import { useRef } from 'react';
import { gsap, useGSAP, FULL_MOTION_QUERY } from '../../lib/gsap';
import DescopeMark from './DescopeMark';
import IdentityJourney from './IdentityJourney';
import './marketing-base.css';
import './descope.css';

/**
 * DescopeApp — an ad-hoc, personalized application page for Bar Moshe's
 * "Full-Stack Software Engineer" application to Descope (Tel Aviv, hybrid).
 * Built in Descope's REAL visual language, read live off descope.com (computed
 * styles, 2026-07-02): near-black navy hero (#0A101A) with a radial glow, white
 * display type at weight 500 with a mint underline highlight, mint CTA pills
 * (#7DEDED, ink text), and their signature "identity-journey" flow — coloured-
 * border node cards wired by connectors — rebuilt from scratch as Bar's own
 * ship pipeline (IdentityJourney). English, LTR.
 *
 * Self-contained: mounts `.mp-root` only to inherit the marketing reset / focus
 * base (carried locally as marketing-base.css), then overrides everything via
 * `.dsc-root`. All motion is gated on prefers-reduced-motion and the page is
 * fully legible with no JS. Standalone sibling (the ADR-0132 pattern).
 */

const EMAIL =
  'mailto:1barmoshe1@gmail.com?subject=Full-Stack%20Software%20Engineer%20application%20from%20Bar%20Moshe';
const CV = '/Bar_Moshe_CV_Descope.pdf';

type Proof = {
  tag: string;
  title: string;
  desc: string;
  /** Omitted on credential cards (Joomsy: employer IP, named but never linked). */
  href?: string;
  open?: string;
  visual: React.ReactNode;
};

type ProofGroup = { label: string; items: Proof[] };

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

// Full-stack app: streaming rows with a now-playing accent bar.
const AppVisual = (
  <svg className="dsc-vis" viewBox="0 0 220 120" aria-hidden="true" focusable="false">
    <rect className="dsc-vis__panel" x="14" y="16" width="192" height="88" rx="9" />
    <circle className="dsc-vis__disc" cx="40" cy="40" r="13" />
    <rect className="dsc-vis__line" x="62" y="32" width="80" height="6" rx="3" />
    <rect className="dsc-vis__line dsc-vis__line--soft" x="62" y="44" width="54" height="4" rx="2" />
    <rect className="dsc-vis__row" x="26" y="68" width="168" height="9" rx="4.5" />
    <rect className="dsc-vis__row dsc-vis__row--play" x="26" y="84" width="110" height="9" rx="4.5" />
    <g className="dsc-vis__eq" aria-hidden="true">
      <rect x="150" y="82" width="4" height="12" rx="2" />
      <rect x="158" y="78" width="4" height="16" rx="2" />
      <rect x="166" y="84" width="4" height="10" rx="2" />
      <rect x="174" y="80" width="4" height="14" rx="2" />
    </g>
  </svg>
);

// Side-by-side comparison with a highlighted winner.
const CompareVisual = (
  <svg className="dsc-vis" viewBox="0 0 220 120" aria-hidden="true" focusable="false">
    <rect className="dsc-vis__panel" x="14" y="20" width="90" height="80" rx="8" />
    <rect className="dsc-vis__art" x="116" y="20" width="90" height="80" rx="8" />
    <rect className="dsc-vis__line" x="26" y="34" width="40" height="6" rx="3" />
    <rect className="dsc-vis__art-bar" x="128" y="34" width="40" height="6" rx="3" />
    <rect className="dsc-vis__row" x="26" y="52" width="66" height="8" rx="4" />
    <rect className="dsc-vis__row" x="26" y="68" width="48" height="8" rx="4" />
    <rect className="dsc-vis__row dsc-vis__row--play" x="128" y="52" width="66" height="8" rx="4" />
    <rect className="dsc-vis__row dsc-vis__row--play" x="128" y="68" width="56" height="8" rx="4" />
    <rect className="dsc-vis__chip dsc-vis__chip--b" x="128" y="84" width="26" height="10" rx="4" />
  </svg>
);

// An itinerary route: stops wired in sequence toward a destination.
const TripVisual = (
  <svg className="dsc-vis" viewBox="0 0 220 120" aria-hidden="true" focusable="false">
    <line className="dsc-vis__edge" x1="34" y1="88" x2="90" y2="52" />
    <line className="dsc-vis__edge" x1="90" y1="52" x2="140" y2="76" />
    <line className="dsc-vis__edge dsc-vis__edge--out" x1="140" y1="76" x2="188" y2="36" />
    <circle className="dsc-vis__hub" cx="34" cy="88" r="9" />
    <circle className="dsc-vis__hub" cx="90" cy="52" r="9" />
    <circle className="dsc-vis__hub" cx="140" cy="76" r="9" />
    <rect className="dsc-vis__sink" x="178" y="26" width="20" height="20" rx="5" />
    <rect className="dsc-vis__line dsc-vis__line--soft" x="24" y="102" width="60" height="4" rx="2" />
    <rect className="dsc-vis__line dsc-vis__line--soft" x="92" y="102" width="40" height="4" rx="2" />
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

const PROOF_GROUPS: ProofGroup[] = [
  {
    label: 'Developer tools and AI',
    items: [
      {
        tag: 'OPEN SOURCE · NPM · MCP SERVER',
        title: 'MDP',
        desc: 'Markdown-to-document compiler on npm. Ships an MCP server and Claude Code and Codex plugins. TypeScript.',
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
        tag: 'OPEN SOURCE · VERIFICATION',
        title: 'entailer',
        desc: 'Open-source logic-validity toolkit: checks whether a conclusion actually follows from its premises.',
        href: 'https://github.com/barmoshe/entailer',
        open: 'View the code',
        visual: LogicVisual,
      },
    ],
  },
  {
    label: 'Frontend and product',
    items: [
      {
        tag: 'LIVE · REACT · THREE.JS · TONE.JS',
        title: 'Biome Synth',
        desc: 'Browser instrument with an AI DJ across five states. Real-time React over Tone.js, Three.js, and Canvas2D. Live.',
        href: 'https://biome-synth.lovable.app/',
        open: 'Play it live',
        visual: AppVisual,
      },
      {
        tag: 'LIVE · REACT + TYPESCRIPT',
        title: 'Apartment Hunter',
        desc: 'Real-estate decision tool: side-by-side comparison, Israeli purchase-tax brackets, mortgage calculator. React + TypeScript.',
        href: 'https://apartment-hunter-one.vercel.app',
        open: 'Open the app',
        visual: CompareVisual,
      },
      {
        tag: 'LIVE · FULL PRODUCT CYCLE',
        title: 'Trip Planner',
        desc: 'Itinerary, budget, and logistics planner with live currency conversion. Brief to deployed in days.',
        href: 'https://trip-planner-six-iota.vercel.app',
        open: 'Open the app',
        visual: TripVisual,
      },
    ],
  },
  {
    label: 'Full stack and systems',
    items: [
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
        tag: 'CURRENT ROLE · 2025 TO PRESENT',
        title: 'Joomsy',
        desc: 'Primary engineer at a five-person early-stage startup. Full-stack product plus the DevOps that runs it, design to deploy.',
        visual: StartupVisual,
      },
    ],
  },
];

export default function DescopeApp() {
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
          <span className="dsc-nav__tag">for Descope</span>
          <nav className="dsc-nav__links" aria-label="Sections">
            <a className="dsc-nav__link" href="#journey">Journey</a>
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
        {/* ── Hero (dark navy, centred, flow beneath) ────────── */}
        <section className="dsc-hero">
          <div className="dsc-hero__inner">
            <div className="dsc-hero__copy">
              <p className="dsc-eyebrow" data-rise>
                <span className="dsc-eyebrow__dot" />
                BAR MOSHE · FULL-STACK SOFTWARE ENGINEER APPLICATION
              </p>
              <h1 className="dsc-title" data-rise>
                Full-stack <span className="dsc-hl">software engineer</span>.
              </h1>
              <p className="dsc-lede" data-rise>
                React, Next.js, TypeScript, Node. Primary developer at Joomsy since 2025.
                Open-source tooling on npm with an MCP server, and a pipeline on
                Temporal&rsquo;s Code Exchange.
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
                <strong>B.Sc. Computer Science</strong>, Afeka College · React · TypeScript · Node · Go · Tel Aviv
              </p>
            </div>
          </div>
          {/* the signature identity-journey flow, as Bar's ship pipeline */}
          <div className="dsc-hero__flow" id="journey">
            <IdentityJourney />
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
              {PROOF_GROUPS.flatMap((g) => g.items).map((p) => {
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
              Applying for the Full-Stack Software Engineer role at Descope. Happy to walk
              through my background. Tel Aviv, open to hybrid.
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
              An application page Bar Moshe built for the Full-Stack Software Engineer
              role at Descope, Tel Aviv. Not affiliated with Descope.
            </p>
          </div>
          <div className="dsc-footer__col">
            <p className="dsc-footer__h">The work</p>
            <ul>
              <li><a className="dsc-footer__link" href="https://barmoshe.github.io/mdp/" target="_blank" rel="noopener noreferrer">MDP + MCP server</a></li>
              <li><a className="dsc-footer__link" href="https://temporal.io/code-exchange/cross-language-data-processing-service-with-temporal" target="_blank" rel="noopener noreferrer">Temporal Code Exchange</a></li>
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
