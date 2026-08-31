import { Fragment, useState, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Music,
  Music4,
  Users,
  Guitar,
  Workflow,
  BrainCircuit,
  Layers,
  Terminal,
  Cpu,
  Rocket,
  ChevronsRight,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { TiltCard } from './ui/TiltCard';
import { fadeUp } from '../lib/motion';

// ---------------------------------------------------------------------------
// Path 1 - the straightforward version: five plain-language beats of the
// process, colour-coded across the palette so it reads like the rest of the
// site instead of a wall of blue.
// ---------------------------------------------------------------------------
const STEPS = [
  {
    n: '01',
    title: 'Curate & Integrate',
    icon: Layers,
    glow: 'cyan',
    color: 'var(--color-neon-cyan)',
    body: 'You curate all your information and know where it resides, integrating business systems, design data and spatial context that define all aspects of the project.',
  },
  {
    n: '02',
    title: 'Input & Understand',
    icon: BrainCircuit,
    glow: 'violet',
    color: 'var(--color-neon-violet)',
    body: 'You define the problem worth solving and the business outcome that matters.',
  },
  {
    n: '03',
    title: 'Direct in Plain Language',
    icon: Terminal,
    glow: 'pink',
    color: 'var(--color-neon-pink)',
    body: 'You describe the app, UI and ArcGIS behaviour in natural language. You own the logic; the AI writes the syntax.',
  },
  {
    n: '04',
    title: 'Build & Validate',
    icon: Cpu,
    glow: 'amber',
    color: 'var(--color-neon-amber)',
    body: 'AI builds the application using ArcGIS Developer SDKs and other necessary toolkits to build the code, then checks and debugs its own work.',
  },
  {
    n: '05',
    title: 'Deploy-Ready App',
    icon: Rocket,
    glow: 'green',
    color: 'var(--color-neon-green)',
    body: 'A finished, custom ArcGIS web app, clean and deploy-ready in one command.',
  },
];

// ---------------------------------------------------------------------------
// Path 2 - the orchestra metaphor: you direct, Copilot plays, and the
// developer toolkits are the instruments.
// ---------------------------------------------------------------------------
const ROLES = [
  {
    title: 'The Director (You)',
    body: (
      <>
        You provide the vision, business logic and prompt engineering. You also
        bring the{' '}
        <span className="font-semibold text-neon-amber">
          ArcGIS web services, maps, scenes and other data integrations you have
          already authored
        </span>
        , the foundation Copilot combines into a custom app.
      </>
    ),
    icon: Music4,
    glow: 'amber',
    color: 'var(--color-neon-amber)',
    gradient: 'bg-gradient-to-b from-neon-amber/10 to-transparent',
  },
  {
    title: 'The Band (GitHub Copilot)',
    body: (
      <>
        The AI reads your direction and writes the complex syntax and
        boilerplate. It even{' '}
        <span className="font-semibold text-neon-cyan">
          checks and debugs its own code
        </span>
        , then packages the app into a{' '}
        <span className="font-semibold text-neon-cyan">
          clean, deploy-ready build
        </span>
        .
      </>
    ),
    icon: Users,
    glow: 'cyan',
    color: 'var(--color-neon-cyan)',
    gradient: 'bg-gradient-to-b from-neon-cyan/10 to-transparent',
  },
  {
    title: 'The Instruments (Developer Toolkits)',
    body: (
      <>
        The{' '}
        <span className="font-semibold text-neon-blue">
          ArcGIS Maps SDK for JavaScript
        </span>{' '}
        is the lead instrument, carrying the melody of maps, scenes and spatial
        analysis. React and Vite are the supporting section that frame and
        deliver it.
      </>
    ),
    icon: Guitar,
    glow: 'blue',
    color: 'var(--color-neon-blue)',
    gradient: 'bg-gradient-to-b from-neon-blue/10 to-transparent',
    pills: [
      { label: 'ArcGIS Maps SDK', lead: true },
      { label: 'React', lead: false },
      { label: 'Vite', lead: false },
    ],
  },
];

const BARS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

function Equalizer() {
  return (
    <div className="flex h-14 items-end justify-center gap-1.5" aria-hidden>
      {BARS.map((i) => (
        <motion.span
          key={i}
          className="h-full w-1.5 origin-bottom rounded-full bg-gradient-to-t from-neon-blue via-neon-violet to-neon-cyan"
          animate={{ scaleY: [0.2, 0.85, 0.4, 1, 0.3, 0.2] }}
          transition={{
            duration: 1.6 + (i % 5) * 0.22,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: (i % 6) * 0.12,
          }}
        />
      ))}
    </div>
  );
}

function badgeStyle(color) {
  return {
    color,
    background: `color-mix(in oklab, ${color} 14%, transparent)`,
    borderColor: `color-mix(in oklab, ${color} 35%, transparent)`,
  };
}

function StepCard({ step }) {
  const Icon = step.icon;
  return (
    <TiltCard glow={step.glow} animate={false} className="p-5">
      <span
        className="select-none font-display text-4xl font-bold leading-none"
        style={{ WebkitTextStroke: `1.5px ${step.color}`, color: 'transparent' }}
      >
        {step.n}
      </span>
      <span
        className="mt-4 inline-flex rounded-xl p-2.5"
        style={{ background: `color-mix(in oklab, ${step.color} 16%, transparent)` }}
      >
        <Icon className="h-7 w-7" style={{ color: step.color }} />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
      <span
        className="mt-3 block h-px w-8"
        style={{ background: `color-mix(in oklab, ${step.color} 60%, transparent)` }}
      />
      <p className="mt-3 text-sm leading-relaxed text-slate-300/80">
        {step.body}
      </p>
    </TiltCard>
  );
}

function StraightPath({ onMetaphor }) {
  return (
    <div>
      {/* kicker */}
      <motion.div variants={fadeUp} className="mb-8 flex items-center gap-4">
        <span className="text-sm font-semibold uppercase tracking-[0.28em] text-neon-cyan">
          AI-Assisted Engineering
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-neon-cyan/40 to-transparent" />
        <span className="hidden text-xs font-medium uppercase tracking-[0.2em] text-slate-500 sm:block">
          The Next Leap
        </span>
      </motion.div>

      {/* five-step pipeline */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
        {STEPS.map((step, i) => (
          <Fragment key={step.n}>
            <motion.div variants={fadeUp} className="flex-1">
              <StepCard step={step} />
            </motion.div>
            {i < STEPS.length - 1 && (
              <div className="hidden shrink-0 items-center justify-center lg:flex">
                <ChevronsRight className="h-6 w-6 text-slate-600" />
              </div>
            )}
          </Fragment>
        ))}
      </div>

      {/* progress rail */}
      <motion.div
        variants={fadeUp}
        className="relative mt-8 overflow-hidden rounded-2xl border border-white/10 glass px-5 py-4"
      >
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-neon-cyan/15 to-transparent"
          animate={{ x: ['-120%', '420%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
        <div className="relative flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center">
          {STEPS.map((step) => (
            <div key={step.n} className="flex items-center gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-300 sm:text-xs">
                {step.title}
              </span>
              <ChevronsRight
                className="h-4 w-4"
                style={{ color: `color-mix(in oklab, ${step.color} 70%, transparent)` }}
              />
            </div>
          ))}
          <span
            className="rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider sm:text-xs"
            style={{
              color: 'var(--color-neon-green)',
              borderColor:
                'color-mix(in oklab, var(--color-neon-green) 50%, transparent)',
              background:
                'color-mix(in oklab, var(--color-neon-green) 15%, transparent)',
            }}
          >
            Ready to Ship
          </span>
        </div>
      </motion.div>

      {/* choose-your-path nudge */}
      <motion.div
        variants={fadeUp}
        className="mt-10 flex flex-col items-center gap-3 text-center"
      >
        <button
          type="button"
          onClick={onMetaphor}
          className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 glass px-5 py-3 text-sm font-semibold text-slate-200 transition-all hover:border-neon-violet/50 hover:text-white hover:shadow-glow-violet"
        >
          <Music className="h-4 w-4 text-neon-violet" />
          Understand this same process in terms of how an orchestra operates
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </motion.div>
    </div>
  );
}

function OrchestraPath({ onBack }) {
  return (
    <div>
      {/* back control + lead-in */}
      <motion.div
        variants={fadeUp}
        className="mb-8 flex flex-wrap items-center gap-4"
      >
        <button
          type="button"
          onClick={onBack}
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 glass px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-300 transition-all hover:border-neon-cyan/50 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          Back to the straightforward version
        </button>
        <span className="text-sm font-semibold uppercase tracking-[0.28em] text-neon-violet">
          The Orchestra
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-neon-violet/40 to-transparent" />
      </motion.div>

      <motion.p
        variants={fadeUp}
        className="mb-10 max-w-3xl text-base leading-relaxed text-slate-300/85 sm:text-lg"
      >
        Building modern GIS applications with AI is like conducting an orchestra.
        You don&apos;t need to know how to play every instrument (code) to create
        a masterpiece (ROI). You direct, Copilot plays, and the developer
        toolkits are the instruments.
      </motion.p>

      {/* three roles: director, band, instruments */}
      <div className="grid gap-6 md:grid-cols-3">
        {ROLES.map((s) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.title} variants={fadeUp}>
              <TiltCard glow={s.glow} animate={false} className={s.gradient}>
                <div className="flex h-full flex-col gap-4 p-6 sm:p-7">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl border"
                    style={badgeStyle(s.color)}
                  >
                    <Icon className="h-8 w-8" />
                  </span>
                  <h3 className="text-xl font-bold text-white">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-300/85 sm:text-base">
                    {s.body}
                  </p>
                  {s.pills && (
                    <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-2">
                      {s.pills.map((p) =>
                        p.lead ? (
                          <span
                            key={p.label}
                            className="inline-flex items-center gap-1.5 rounded-md border border-neon-blue/50 bg-neon-blue/15 px-2 py-0.5 text-[11px] font-semibold text-white"
                          >
                            <span className="text-[9px] font-bold uppercase tracking-wider text-neon-blue">
                              Lead
                            </span>
                            {p.label}
                          </span>
                        ) : (
                          <span
                            key={p.label}
                            className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-slate-400"
                          >
                            {p.label}
                          </span>
                        )
                      )}
                    </div>
                  )}
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>

      {/* performance visualiser + executive takeaway */}
      <motion.div
        variants={fadeUp}
        className="mt-14 flex flex-col items-center gap-6 rounded-2xl glass-strong border border-neon-cyan/40! px-6 py-10 text-center shadow-glow-cyan sm:px-12"
      >
        <Equalizer />
        <p className="text-xl font-semibold text-slate-200 sm:text-2xl">
          Your expertise is the score.{' '}
          <span className="text-gradient">Everything else just plays it.</span>
        </p>
      </motion.div>
    </div>
  );
}

export function Ensemble() {
  const [flipped, setFlipped] = useState(false);
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const [heights, setHeights] = useState({ front: 0, back: 0 });

  // Size the flip card to whichever face is showing so the two stacked,
  // absolutely-positioned faces never overlap the sections around them.
  useLayoutEffect(() => {
    const measure = () =>
      setHeights({
        front: frontRef.current?.offsetHeight ?? 0,
        back: backRef.current?.offsetHeight ?? 0,
      });
    measure();
    const ro = new ResizeObserver(measure);
    if (frontRef.current) ro.observe(frontRef.current);
    if (backRef.current) ro.observe(backRef.current);
    return () => ro.disconnect();
  }, []);

  const activeHeight = flipped ? heights.back : heights.front;

  return (
    <section id="ensemble" className="relative px-4 pt-24 pb-8 sm:px-6 md:pt-32 md:pb-10">
      <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center gap-3">
          <span className="font-mono text-sm text-neon-cyan">01</span>
          <span className="h-px w-12 bg-gradient-to-r from-neon-cyan to-transparent" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            How It Works
          </span>
        </div>

        <SectionHeading
          align="left"
          icon={Workflow}
          eyebrow="Prompt Engineering, Explained"
          title={
            <>
              How to build custom ArcGIS apps{' '}
              <span className="text-gradient">without being a developer.</span>
            </>
          }
          className="mb-14"
        />

        {/* Flip card: the two paths are the two faces of one card. Clicking
            rotates it 180deg so one side turns away as the other turns in. */}
        <div style={{ perspective: '2200px' }}>
          <motion.div
            className="relative"
            animate={{ rotateY: flipped ? 180 : 0, height: activeHeight }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div
              ref={frontRef}
              aria-hidden={flipped}
              className={`absolute inset-x-0 top-0 ${flipped ? 'pointer-events-none' : ''}`}
              style={{ backfaceVisibility: 'hidden' }}
            >
              <StraightPath onMetaphor={() => setFlipped(true)} />
            </div>

            <div
              ref={backRef}
              aria-hidden={!flipped}
              className={`absolute inset-x-0 top-0 ${flipped ? '' : 'pointer-events-none'}`}
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <OrchestraPath onBack={() => setFlipped(false)} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
