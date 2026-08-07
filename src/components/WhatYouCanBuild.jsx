import { motion } from 'framer-motion';
import {
  Gauge,
  Boxes,
  BarChart3,
  Target,
  Users,
  Workflow,
  Blocks,
  Check,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { GlassCard } from './ui/GlassCard';
import { GithubIcon } from './ui/GithubIcon';
import { FlipCard } from './ui/FlipCard';
import { fadeUp, stagger, viewport } from '../lib/motion';

const BOILERPLATE_URL = 'https://github.com/Esri';

// The same pipeline produces very different outputs (2D or 3D), across
// industries and data/systems. No single case study; the breadth is the point.
// Each card flips to reveal real-world examples.
const ARCHETYPES = [
  {
    icon: Gauge,
    color: 'var(--color-neon-cyan)',
    title: 'Real-Time Operations',
    body: 'Live sensor, IoT and telemetry feeds on a map that updates by the second, for monitoring anything, anywhere.',
    tags: ['Sensors', 'Streams', 'KPIs'],
    examples: ['Fleet & asset tracking', 'Utility network monitoring', 'Emergency response ops'],
    roi: 'Replaces static status reports with a live operational picture, so teams can act on issues the moment they happen.',
  },
  {
    icon: Boxes,
    color: 'var(--color-neon-violet)',
    title: '3D Digital Twins',
    body: 'Gaussian splats, BIM/IFC and point clouds fused into a photoreal, explorable 3D scene of a site, city or asset.',
    tags: ['Gaussian Splats', 'BIM/IFC', 'Reality Capture'],
    examples: ['Campus & facility twins', 'Construction progress', 'Urban & city planning'],
    roi: 'Differentiate your firm during the RFP process by delivering interactive, 3D proof-of-concepts in hours.',
  },
  {
    icon: BarChart3,
    color: 'var(--color-neon-pink)',
    title: 'Analytics & BI Maps',
    body: 'Databricks, warehouses and data lakes joined to features and visualised on the geography they describe.',
    tags: ['Databricks', 'Warehouse', 'Charts'],
    examples: ['Sales territory analysis', 'Risk & exposure heatmaps', 'Demand forecasting'],
    roi: 'Uncovers hidden market trends directly from Databricks/Snowflake lakes.',
  },
  {
    icon: Target,
    color: 'var(--color-neon-green)',
    title: 'Site Selection & Suitability',
    body: 'Weighted overlays, drive-time and demographic layers combined into an interactive tool that ranks the best locations on demand.',
    tags: ['Weighted Overlay', 'Drive-Time', 'Demographics'],
    examples: ['Retail & branch siting', 'Renewables & infrastructure', 'Land acquisition screening'],
    roi: 'Turns weeks of manual suitability analysis into an interactive tool stakeholders can rerun in seconds.',
  },
  {
    icon: Users,
    color: 'var(--color-neon-amber)',
    title: 'Public Engagement Viewers',
    body: 'Lightweight, shareable 2D maps that tell a clear story to any audience, no GIS expertise required.',
    tags: ['2D', 'Story', 'Share'],
    examples: ['Community planning', 'Story-driven maps', 'Transparency portals'],
    roi: 'Accelerates stakeholder buy-in and reduces public-consultation overhead.',
  },
  {
    icon: Workflow,
    color: 'var(--color-neon-blue)',
    title: 'System-of-Systems Integration',
    body: 'Business APIs, databases and platforms wired together behind one map: the single pane of glass.',
    tags: ['APIs', 'Databases', 'Platforms'],
    examples: ['ERP + GIS bridges', 'IoT platform hubs', 'Common operating picture'],
    roi: 'Unblock enterprise sales by easily wiring ArcGIS into SAP, Salesforce, or Databricks without needing massive dev teams.',
  },
];

export function WhatYouCanBuild() {
  return (
    <section id="build" className="relative px-4 py-24 sm:px-6 md:py-32">
      <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center gap-3">
          <span className="font-mono text-sm text-neon-cyan">06</span>
          <span className="h-px w-12 bg-gradient-to-r from-neon-cyan to-transparent" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            What You Can Build
          </span>
        </div>

        <SectionHeading
          align="left"
          icon={Blocks}
          eyebrow="The Payoff · Any Industry"
          title={
            <>
              Same process, <span className="text-gradient">endless outputs</span>
            </>
          }
          subtitle="Esri's out-of-the-box configurable apps such as Experience Builder, Instant Apps and ArcGIS Solutions fit many use cases. But when you need a highly specific UI, deep third-party database integration, or complex interactive 3D, those out-of-the-box tools hit their limits. This AI-assisted workflow is your bridge to limitless customization. If you can imagine it, you can build it."
          className="mb-14"
        />

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ARCHETYPES.map((a) => (
            <FlipCard
              key={a.title}
              color={a.color}
              height="h-96"
              frontHint="Examples"
              backHint="Back"
              front={
                <>
                  <div className="mb-4 flex items-center gap-3">
                    <motion.span
                      whileHover={{ rotate: 8, scale: 1.08 }}
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-xl"
                      style={{
                        background: `color-mix(in oklab, ${a.color} 18%, transparent)`,
                        boxShadow: `0 0 24px -8px ${a.color}`,
                      }}
                    >
                      <a.icon className="h-6 w-6" style={{ color: a.color }} />
                    </motion.span>
                  </div>
                  <h3 className="mb-2 pr-20 text-lg font-semibold leading-snug text-white">
                    {a.title}
                  </h3>
                  <p className="mb-3 text-sm leading-relaxed text-slate-300/80">
                    {a.body}
                  </p>
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {a.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[11px] text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div
                    className="mt-auto flex items-start gap-2 rounded-lg border-l-2 bg-neon-green/[0.06] px-3 py-2"
                    style={{ borderColor: 'var(--color-neon-green)' }}
                  >
                    <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-neon-green" />
                    <p className="text-xs leading-snug text-slate-200">
                      <span className="font-semibold text-neon-green">
                        Value:
                      </span>{' '}
                      {a.roi}
                    </p>
                  </div>
                </>
              }
              back={
                <>
                  <h3 className="mb-4 pr-20 text-base font-semibold leading-snug text-white">
                    {a.title}
                  </h3>
                  <p
                    className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: a.color }}
                  >
                    Where it&apos;s used
                  </p>
                  <ul className="space-y-2.5">
                    {a.examples.map((ex) => (
                      <li
                        key={ex}
                        className="flex items-start gap-2 text-sm text-slate-200"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0"
                          style={{ color: a.color }}
                        />
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </>
              }
            />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-10"
        >
          <GlassCard glow="violet" animate={false} className="p-6 sm:p-8">
            <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                <h3 className="text-lg font-semibold text-white sm:text-xl">
                  This is just a slice of what&apos;s possible.
                </h3>
                <p className="mt-1 text-sm text-slate-300/80">
                  Every repository is the same process in action: a real
                  problem, real data, and AI-built ArcGIS code.
                </p>
              </div>
              <a
                href={BOILERPLATE_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-neon-violet to-neon-blue px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
              >
                <GithubIcon className="h-4 w-4" />
                Visit Esri on GitHub
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

export default WhatYouCanBuild;
