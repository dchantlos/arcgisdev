import { motion } from 'framer-motion';
import { Music, Music4, Users, Guitar } from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { TiltCard } from './ui/TiltCard';
import { fadeUp, stagger, viewport } from '../lib/motion';

// The orchestra metaphor, used to explain prompt engineering to non-coders:
// you direct, Copilot plays, and the developer toolkits are the instruments.
const STEPS = [
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

export function Ensemble() {
  return (
    <section id="ensemble" className="relative px-4 py-24 sm:px-6 md:py-32">
      <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center gap-3">
          <span className="font-mono text-sm text-neon-cyan">01</span>
          <span className="h-px w-12 bg-gradient-to-r from-neon-cyan to-transparent" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            The Ensemble
          </span>
        </div>

        <SectionHeading
          align="left"
          icon={Music}
          eyebrow="Prompt Engineering, Explained"
          title={
            <>
              How to build custom ArcGIS apps{' '}
              <span className="text-gradient">without being a developer.</span>
            </>
          }
          subtitle="Building modern GIS applications with AI is like conducting an orchestra. You don't need to know how to play every instrument (code) to create a masterpiece (ROI). Here is the new development model."
          className="mb-14"
        />

        {/* lead-in above the three role cards */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mb-8 flex items-center gap-4"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.28em] text-neon-cyan">
            How it Works
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-neon-cyan/40 to-transparent" />
        </motion.div>

        {/* three roles: director, band, instruments */}
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid gap-6 md:grid-cols-3"
        >
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <TiltCard key={s.title} glow={s.glow} className={s.gradient}>
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
            );
          })}
        </motion.div>

        {/* performance visualiser + executive takeaway */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 flex flex-col items-center gap-6 rounded-2xl glass-strong border border-neon-cyan/40! px-6 py-10 text-center shadow-glow-cyan sm:px-12"
        >
          <Equalizer />
          <p className="text-xl font-semibold text-slate-200 sm:text-2xl">
            Your expertise is the score.{' '}
            <span className="text-gradient">Everything else just plays it.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
