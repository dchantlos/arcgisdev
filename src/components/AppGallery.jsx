import { motion } from 'framer-motion';
import {
  LayoutGrid,
  CloudSun,
  ArrowUpRight,
  Clock,
  Sparkles,
} from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { TiltCard } from './ui/TiltCard';
import { GithubIcon } from './ui/GithubIcon';
import { fadeUp, stagger, viewport } from '../lib/motion';
import badouziCard from '../assets/BadouziCard2.jpg';
import gaussianSplatCard from '../assets/GaussianSplatCard.jpg';

// Each object below renders one card. Adding an app/toolkit to the catalog is
// just adding an entry here; there is no layout code to touch. Entries flagged
// comingSoon render a placeholder panel.
const APPS = [
  {
    name: 'Badouzi Fishing Port',
    problem:
      'A 3D coastal risk viewer for Badouzi Fishing Port (Keelung) that fuses live weather data with sea-level and storm-surge scenarios to flag at-risk features in real time.',
    tags: ['ArcGIS Maps SDK', '3D Scene', 'Live Weather', 'Risk Analysis'],
    status: 'Live',
    glow: 'blue',
    color: 'var(--color-neon-blue)',
    image: badouziCard,
    liveWeather: true,
    hours: 3,
    prompt:
      'Build a 3D ArcGIS app for Badouzi Fishing Port that streams in live weather data, simulates tidal and storm-surge scenarios, visualizes inundation depth, and reports estimated value at risk.',
    link: 'https://dchantlos.github.io/Badouzi/',
  },
  {
    name: 'Gaussian Splat Explorer',
    problem:
      'A cinematic explorer for 11 public ArcGIS Gaussian Splat reality captures, with a capture gallery, auto-fly tour, and Slice, Line of sight, Elevation profile and 3D Measure tools that work directly on the splats. Live weather data drives real-time rain and cloud effects in the scene via the ArcGIS Maps SDK for JavaScript.',
    tags: ['ArcGIS Maps SDK', 'Gaussian Splats', 'Reality Capture', 'Live Weather'],
    status: 'Live',
    glow: 'violet',
    color: 'var(--color-neon-violet)',
    image: gaussianSplatCard,
    liveWeather: true,
    hours: 1,
    prompt:
      "Rebuild Esri's Gaussian Splat Explorer as a standalone 3D app that browses public reality-capture splats, flies a cinematic tour, and runs Slice, Line of sight, Elevation profile and Measure directly on the Gaussian Splat layers.",
    link: 'https://dchantlos.github.io/3dgs/',
  },
  { comingSoon: true, glow: 'pink' },
];

export function AppGallery() {
  return (
    <section id="solutions" className="relative px-4 py-24 sm:px-6 md:py-32">
      <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center gap-3">
          <span className="font-mono text-sm text-neon-cyan">07</span>
          <span className="h-px w-12 bg-gradient-to-r from-neon-cyan to-transparent" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            App Catalog
          </span>
        </div>

        <SectionHeading
          align="left"
          icon={LayoutGrid}
          eyebrow="Apps · Toolkits · Demos"
          title={
            <>
              A living{' '}
              <span className="text-gradient">catalog of what&apos;s built</span>
            </>
          }
          subtitle="Here is a live example built on the ArcGIS Maps SDK for JavaScript, a purpose-built coastal risk experience, with more on the way."
          className="mb-14"
        />

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {APPS.map((app, i) => {
            if (app.comingSoon) {
              return (
                <TiltCard key={`soon-${i}`} glow={app.glow}>
                  <div className="flex h-full min-h-[19rem] flex-col items-center justify-center gap-3 p-8 text-center">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl border border-dashed border-white/15 bg-white/[0.04]">
                      <Sparkles
                        className="h-6 w-6 text-slate-500"
                        strokeWidth={1.4}
                      />
                    </span>
                    <h3 className="text-lg font-semibold text-slate-300">
                      Coming soon...
                    </h3>
                    <p className="max-w-[16rem] text-sm leading-relaxed text-slate-500">
                      Another app is in the works. This catalog grows as new
                      builds ship.
                    </p>
                  </div>
                </TiltCard>
              );
            }

            return (
              <TiltCard key={app.name} glow={app.glow}>
                {/* whole-card link */}
                <a
                  href={app.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${app.name}`}
                  className="absolute inset-0 z-20"
                />

                {/* thumbnail (square = full app preview, no crop) */}
                <div
                  className={`relative flex ${
                    app.image ? 'aspect-square' : 'aspect-video'
                  } shrink-0 items-center justify-center overflow-hidden`}
                >
                  {app.image ? (
                    <img
                      src={app.image}
                      alt={`${app.name} preview`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <>
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `radial-gradient(120% 120% at 50% 0%, color-mix(in oklab, ${app.color} 32%, transparent), transparent 70%)`,
                        }}
                      />
                      <span
                        className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold"
                        style={{
                          color: app.color,
                          borderColor: `color-mix(in oklab, ${app.color} 45%, transparent)`,
                          background: `color-mix(in oklab, ${app.color} 22%, black)`,
                        }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {app.status}
                      </span>
                    </>
                  )}
                </div>

                {/* body */}
                <div className="flex flex-1 flex-col gap-3 p-5">
                  {/* proof badges */}
                  {(app.hours || app.liveWeather) && (
                    <div className="flex flex-wrap items-center gap-2">
                      {app.hours && (
                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-neon-amber/40 bg-neon-amber/[0.06] px-2.5 py-1 text-[11px] font-semibold text-neon-amber">
                          <Clock className="h-3 w-3" />
                          Built by 1 user in {app.hours} {app.hours === 1 ? 'hour' : 'hours'}
                        </span>
                      )}
                      {app.liveWeather && (
                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-neon-cyan/40 bg-neon-cyan/[0.06] px-2.5 py-1 text-[11px] font-semibold text-neon-cyan">
                          <CloudSun className="h-3 w-3" />
                          Live weather data
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-white">
                      {app.name}
                    </h3>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-500 transition-colors group-hover:text-white" />
                  </div>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {app.problem}
                  </p>

                  {/* the plain-language prompt that generated it */}
                  <div className="rounded-lg border-l-2 border-neon-cyan/50 bg-white/[0.03] px-3 py-2">
                    <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-neon-cyan">
                      The Prompt:
                    </div>
                    <p className="font-mono text-[11px] leading-relaxed text-slate-300/90">
                      &ldquo;{app.prompt}&rdquo;
                    </p>
                  </div>

                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {app.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-10 flex items-center justify-center gap-2 text-center text-sm text-slate-500"
        >
          <GithubIcon className="h-4 w-4" />
          Click the live card to launch the demo. More apps coming soon.
        </motion.p>
      </div>
    </section>
  );
}
