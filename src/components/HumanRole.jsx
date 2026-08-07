import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  BarChart3,
  Building2,
  BrainCircuit,
  Camera,
  Compass,
  DatabaseZap,
  Layers,
  Network,
  PencilRuler,
  Radar,
  Radio,
  Satellite,
  Sparkles,
  Warehouse,
} from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { GlassCard } from './ui/GlassCard';
import { TiltCard } from './ui/TiltCard';
import { fadeUp, stagger, viewport, fromRight } from '../lib/motion';

// The data & systems that get fused into a single ArcGIS app. Colour-coded by
// origin: ArcGIS-native (blue) vs. external enterprise data (purple).
const LAYERS = [
  {
    id: 'reality',
    label: 'Reality Capture',
    icon: Camera,
    group: 'native',
    color: 'var(--color-neon-blue)',
    desc: 'Drone photogrammetry & 360° imagery turned into measurable context.',
  },
  {
    id: 'pointcloud',
    label: 'Point Clouds',
    icon: Radar,
    group: 'native',
    color: 'var(--color-neon-blue)',
    desc: 'LiDAR & survey scans, with millions of precise 3D points.',
  },
  {
    id: 'bim',
    label: 'BIM · IFC · CAD',
    icon: Building2,
    group: 'native',
    color: 'var(--color-neon-blue)',
    desc: 'Federated building & engineering models with full metadata.',
  },
  {
    id: 'splat',
    label: 'Gaussian Splats',
    icon: Sparkles,
    group: 'native',
    color: 'var(--color-neon-blue)',
    desc: 'Photoreal radiance-field capture for stunning fidelity.',
  },
  {
    id: 'imagery',
    label: 'Imagery & Rasters',
    icon: Satellite,
    group: 'native',
    color: 'var(--color-neon-blue)',
    desc: 'Satellite, aerial & multiband imagery analysis.',
  },
  {
    id: 'features',
    label: 'Feature Layers',
    icon: Layers,
    group: 'native',
    color: 'var(--color-neon-blue)',
    desc: 'Hosted GIS layers: points, lines, polygons & attributes.',
  },
  {
    id: 'sensor',
    label: 'Sensor / IoT',
    icon: Radio,
    group: 'enterprise',
    color: 'var(--color-neon-violet)',
    desc: 'Live device telemetry streamed straight onto the map.',
  },
  {
    id: 'realtime',
    label: 'Real-Time Streams',
    icon: Activity,
    group: 'enterprise',
    color: 'var(--color-neon-violet)',
    desc: 'Moving assets & events, updating by the second.',
  },
  {
    id: 'databricks',
    label: 'Databricks',
    icon: DatabaseZap,
    group: 'enterprise',
    color: 'var(--color-neon-violet)',
    desc: 'Lakehouse tables & notebooks joined to map features.',
  },
  {
    id: 'warehouse',
    label: 'Lakes & Warehouses',
    icon: Warehouse,
    group: 'enterprise',
    color: 'var(--color-neon-violet)',
    desc: 'Enterprise data lakes and warehouses, spatially enabled.',
  },
  {
    id: 'apis',
    label: 'Business APIs',
    icon: Network,
    group: 'enterprise',
    color: 'var(--color-neon-violet)',
    desc: 'REST services & business systems wired in as live layers.',
  },
  {
    id: 'bi',
    label: 'Analytics & BI',
    icon: BarChart3,
    group: 'enterprise',
    color: 'var(--color-neon-violet)',
    desc: 'KPIs & dashboards rendered on the geography they describe.',
  },
];

export function HumanRole() {
  const [active, setActive] = useState(
    () => new Set(['reality', 'sensor', 'databricks', 'features'])
  );
  const [hovered, setHovered] = useState(null);

  const toggle = (id) => {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const activeLayers = LAYERS.filter((l) => active.has(l.id));
  const detail = LAYERS.find((l) => l.id === hovered);

  return (
    <section id="human" className="relative px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Step marker */}
        <div className="mb-6 flex items-center gap-3">
          <span className="font-mono text-sm text-neon-cyan">02</span>
          <span className="h-px w-12 bg-gradient-to-r from-neon-cyan to-transparent" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            The Human Brain
          </span>
        </div>

        <SectionHeading
          align="left"
          icon={BrainCircuit}
          eyebrow="The User's Role · The Visionary"
          title={
            <>
              It starts with{' '}
              <span className="text-gradient">domain expertise</span>
            </>
          }
          subtitle="Before a single line of code exists, the user defines the problem worth solving and curates the data: reality capture, sensors, Databricks, warehouses, GIS layers and more, georeferencing and aligning wildly different systems into one coherent foundation."
          className="mb-14"
        />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* ---- Left: role cards ---- */}
          <motion.div
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="flex flex-col gap-6"
          >
            <TiltCard glow="cyan" animate={false} className="p-6">
              <PencilRuler className="mb-4 h-8 w-8 text-neon-cyan" />
              <h3 className="mb-2 text-xl font-semibold text-white">
                The Visionary
              </h3>
              <p className="text-sm leading-relaxed text-slate-300/80">
                The user translates real business problems, such as operational
                risk, faster decisions, and public engagement, into a clear
                product vision with tangible value, across any industry.
              </p>
            </TiltCard>

            <TiltCard glow="violet" animate={false} className="p-6">
              <Compass className="mb-4 h-8 w-8 text-neon-violet" />
              <h3 className="mb-2 text-xl font-semibold text-white">
                The GIS Expert
              </h3>
              <p className="text-sm leading-relaxed text-slate-300/80">
                Deep spatial expertise goes far beyond putting dots on a map.
                They integrate complex enterprise systems, maintain
                authoritative data integrity, and perform the advanced spatial
                analysis that drives daily business operations. They build the
                robust &apos;single source of truth&apos; that powers the final
                application.
              </p>
            </TiltCard>

            {/* live scene summary */}
            <TiltCard glow="blue" animate={false} className="p-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                  Data Integration
                </h3>
                <span className="rounded-md bg-neon-cyan/15 px-2 py-1 font-mono text-xs text-neon-cyan">
                  {activeLayers.length} / {LAYERS.length} sources
                </span>
              </div>
              {/* stacked layer bars */}
              <div className="flex flex-col gap-1.5">
                <AnimatePresence mode="popLayout">
                  {activeLayers.map((l) => (
                    <motion.div
                      key={l.id}
                      layout
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12 }}
                      className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-3 py-2"
                    >
                      <l.icon className="h-4 w-4" style={{ color: l.color }} />
                      <span className="text-xs text-slate-200">{l.label}</span>
                      <span
                        className="ml-auto h-1.5 w-1.5 rounded-full"
                        style={{
                          background: l.color,
                          boxShadow: `0 0 8px ${l.color}`,
                        }}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
                {activeLayers.length === 0 && (
                  <p className="py-3 text-center text-xs text-slate-500">
                    Toggle sources to compose an app →
                  </p>
                )}
              </div>
            </TiltCard>
          </motion.div>

          {/* ---- Right: interactive layer grid ---- */}
          <motion.div
            variants={fromRight}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <GlassCard glow="cyan" animate={false} className="h-full p-6">
              <h3 className="mb-3 text-lg font-semibold text-white">
                Integrate any data or system
              </h3>
              {/* legend: ArcGIS-native vs external enterprise data */}
              <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-neon-blue"
                    style={{ boxShadow: '0 0 8px var(--color-neon-blue)' }}
                  />
                  ArcGIS Native
                </span>
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-neon-violet"
                    style={{ boxShadow: '0 0 8px var(--color-neon-violet)' }}
                  />
                  Enterprise Data
                </span>
                <span className="ml-auto hidden font-mono text-slate-400 sm:block">
                  click to toggle
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {LAYERS.map((l, i) => {
                  const on = active.has(l.id);
                  return (
                    <motion.button
                      key={l.id}
                      type="button"
                      variants={fadeUp}
                      custom={i}
                      onClick={() => toggle(l.id)}
                      onMouseEnter={() => setHovered(l.id)}
                      onMouseLeave={() => setHovered(null)}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.96 }}
                      className={`relative flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border p-2 text-center transition-colors duration-300 ${
                        on ? 'bg-white/10' : 'bg-white/[0.02] hover:bg-white/5'
                      }`}
                      style={{
                        borderColor: on
                          ? `color-mix(in oklab, ${l.color} 55%, transparent)`
                          : `color-mix(in oklab, ${l.color} 22%, transparent)`,
                        boxShadow: on ? `0 0 24px -6px ${l.color}` : undefined,
                      }}
                    >
                      <span
                        className="grid h-10 w-10 place-items-center rounded-lg transition-colors"
                        style={{
                          background: on
                            ? `color-mix(in oklab, ${l.color} 22%, transparent)`
                            : 'rgba(255,255,255,0.04)',
                        }}
                      >
                        <l.icon
                          className="h-5 w-5 transition-colors"
                          style={{ color: on ? l.color : '#94a3b8' }}
                        />
                      </span>
                      <span
                        className={`text-[11px] font-medium leading-tight ${
                          on ? 'text-white' : 'text-slate-400'
                        }`}
                      >
                        {l.label}
                      </span>
                      {on && (
                        <motion.span
                          layoutId={`dot-${l.id}`}
                          className="absolute right-2 top-2 h-2 w-2 rounded-full"
                          style={{
                            background: l.color,
                            boxShadow: `0 0 8px ${l.color}`,
                          }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* hover detail / assembled preview */}
              <div className="mt-4 min-h-[7rem] rounded-xl border border-white/10 bg-ink-950/60 p-4">
                <AnimatePresence mode="wait">
                  {detail ? (
                    <motion.div
                      key={detail.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-start gap-3"
                    >
                      <detail.icon
                        className="mt-0.5 h-5 w-5 shrink-0"
                        style={{ color: detail.color }}
                      />
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {detail.label}
                        </p>
                        <p className="text-sm text-slate-400">{detail.desc}</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="assembled"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex h-full items-center justify-center gap-3 text-center"
                    >
                      {/* mini stacked-scene visual */}
                      <div className="relative h-16 w-24">
                        {activeLayers.slice(0, 6).map((l, idx) => (
                          <motion.span
                            key={l.id}
                            layout
                            className="absolute left-1/2 h-8 w-20 -translate-x-1/2 rounded-md border"
                            style={{
                              bottom: idx * 6,
                              borderColor: `color-mix(in oklab, ${l.color} 60%, transparent)`,
                              background: `color-mix(in oklab, ${l.color} 14%, transparent)`,
                              transform: `translateX(-50%) skewX(-32deg)`,
                              boxShadow: `0 0 16px -8px ${l.color}`,
                            }}
                          />
                        ))}
                      </div>
                      <p className="max-w-[16rem] text-left text-xs text-slate-400">
                        One georeferenced foundation: any data, any system,
                        aligned by hand before AI writes a line of code.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HumanRole;
