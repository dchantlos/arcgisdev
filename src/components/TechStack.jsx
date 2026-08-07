import { motion } from 'framer-motion';
import {
  Atom,
  Zap,
  Bot,
  Wrench,
  ArrowRight,
  LayoutDashboard,
  Rocket,
  Sparkles,
  Globe,
  Map as MapIcon,
  Boxes,
  Image as ImageIcon,
  Radio,
  Component,
  SlidersHorizontal,
  ChartLine,
  Package,
  Server,
  Gauge,
  Code,
  WandSparkles,
  MessageSquare,
} from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { FlipCard } from './ui/FlipCard';
import { EsriIcon } from './ui/EsriIcon';
import esriDevelopers from '../assets/esri-developers.png';
import { ARCGIS_SDK_URL } from './ui/SdkLink';
import { CopyPromptButton } from './ui/CopyPromptButton';
import { SecurityBadge } from './SecurityBadge';
import { fadeUp, stagger, viewport } from '../lib/motion';

// A boilerplate prompt SEs can copy to kick-start an ArcGIS + React prototype.
const COPILOT_STARTER_PROMPT = `Scaffold a Vite + React app that uses the ArcGIS Maps SDK for JavaScript.
- Load a WebMap (2D) or WebScene (3D) by portalItem id via @arcgis/core.
- Lazy-load the SDK and show a branded loading state while it streams.
- Add a Legend, a Search widget, and a responsive glassmorphism side panel.
- Keep ArcGIS view/layer objects out of React state; drive UI state with hooks.
- Use an accessible dark theme and prepare the build for GitHub Pages.`;

// Plain-language explanation of what each tool actually does.
// Each card flips to a concrete "in practice" example.
const TOOLS = [
  {
    icon: EsriIcon,
    color: 'var(--color-neon-blue)',
    featured: true,
    brandLogo: esriDevelopers,
    name: 'ArcGIS Maps SDK',
    role: 'The core engine',
    features: [
      { icon: MapIcon, label: '2D Maps' },
      { icon: Boxes, label: '3D Scenes' },
      { icon: ImageIcon, label: 'Imagery' },
      { icon: Radio, label: 'Real-time' },
    ],
    body: 'The ArcGIS Maps SDK for JavaScript renders interactive 2D maps and 3D scenes, connects to feature services, imagery and real-time streams, and ships ready-made widgets and spatial analysis, so any data source becomes an explorable map.',
    note: (
      <a
        href={ARCGIS_SDK_URL}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="inline-flex items-center gap-1 text-neon-blue underline decoration-neon-blue/40 underline-offset-2 transition-colors hover:text-white"
      >
        developers.arcgis.com ↗
      </a>
    ),
    practiceIcon: Globe,
    practiceColor: '#34D399',
    practiceTitle: 'The Premium Developer Toolkit.',
    practice:
      'Esri’s core API brings high-performance location intelligence directly into the browser. It combines lightning-fast rendering of massive 2D and 3D datasets with a rich library of ready-to-use spatial widgets. This allows us to rapidly build tailored, highly interactive apps where your team can visualize, analyze, and edit data without needing desktop GIS.',
  },
  {
    icon: Atom,
    color: 'var(--color-neon-cyan)',
    name: 'React',
    role: 'The interface layer',
    features: [
      { icon: Component, label: 'Components' },
      { icon: LayoutDashboard, label: 'Dashboards' },
      { icon: SlidersHorizontal, label: 'Filters' },
      { icon: ChartLine, label: 'Charts' },
    ],
    body: 'React is the supporting interface layer we wrap around the map: reusable panels, filters and charts that stay in sync with your data. It is a popular choice for this, not a requirement. The SDK runs just as happily with Angular, Vue, web components or plain JavaScript.',
    note: '// supporting UI layer',
    practiceIcon: LayoutDashboard,
    practiceColor: '#61DAFB',
    practiceTitle: 'Seamless User Experience.',
    practice:
      'React is the frontend chassis wrapped around the ArcGIS engine. It binds custom dashboards to the map and delivers the fast, intuitive experience your users expect, without page reloads.',
  },
  {
    icon: Zap,
    color: 'var(--color-neon-amber)',
    name: 'Vite',
    role: 'The build tool & dev server',
    features: [
      { icon: Zap, label: 'Instant HMR' },
      { icon: Package, label: 'Bundling' },
      { icon: Server, label: 'Dev Server' },
      { icon: Gauge, label: 'Fast Builds' },
    ],
    body: 'Vite is the supporting build tooling. It serves the project instantly while you develop and, for release, bundles everything (including the heavy ArcGIS SDK) into small static files any host can serve. Fast, and swappable for any modern bundler.',
    note: 'npm run dev · npm run build',
    practiceIcon: Rocket,
    practiceColor: '#FDB813',
    practiceTitle: 'Lightning-Fast Delivery.',
    practice:
      'Vite is the modern build tool that makes rapid prototyping possible. It allows us to iterate on custom solutions live, meaning you get to see, tweak, and interact with your digital deliverables in days, not months.',
  },
  {
    icon: Bot,
    color: 'var(--color-neon-violet)',
    featured: true,
    brandIcon: Bot,
    name: 'GitHub Copilot',
    role: 'The AI pair-programmer',
    features: [
      { icon: Sparkles, label: 'Autocomplete' },
      { icon: Code, label: 'Writes Code' },
      { icon: WandSparkles, label: 'Scaffolding' },
      { icon: MessageSquare, label: 'Prompt-driven' },
    ],
    body: 'Copilot reads the user’s prompt and the surrounding code, then writes the React + ArcGIS implementation, scaffolding files, wiring APIs and completing whole functions. It turns plain-language intent into working code, with the user steering every decision.',
    note: 'prompt → working code',
    action: <CopyPromptButton prompt={COPILOT_STARTER_PROMPT} />,
    practiceIcon: Sparkles,
    practiceColor: '#2dd4bf',
    practiceTitle: 'The Force Multiplier.',
    practice:
      'You define the plain-language business requirements; the AI handles the complex syntax. Copilot instantly generates the underlying code structure, turning hours of manual development into rapid, precise solutions tailored exactly to your workflows.',
  },
];

export function TechStack() {
  return (
    <section
      id="toolchain"
      className="relative px-4 py-24 sm:px-6 md:py-32"
    >
      <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-neon-blue/40 to-transparent" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center gap-3">
          <span className="font-mono text-sm text-neon-blue">05</span>
          <span className="h-px w-12 bg-gradient-to-r from-neon-blue to-transparent" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            The Toolchain
          </span>
        </div>

        <SectionHeading
          align="left"
          icon={Wrench}
          eyebrow="Under the Hood"
          title={
            <>
              What each tool is{' '}
              <span className="text-gradient">actually doing</span>
            </>
          }
          subtitle="The stack is deliberately small. One tool does the heavy lifting, the ArcGIS Maps SDK for JavaScript, while React, Vite and GitHub Copilot are the lean supporting cast that make building with it fast. Flip a card to see each in practice."
          className="mb-14"
        />

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid gap-6 sm:grid-cols-2"
        >
          {TOOLS.map((t) => (
            <FlipCard
              key={t.name}
              color={t.color}
              height="h-[22rem]"
              className={t.featured ? 'sm:col-span-2' : ''}
              frontHint="In practice"
              backHint="Back"
              front={
                <>
                  {/* featured brand visual fills the empty right side */}
                  {(t.brandLogo || t.brandIcon) && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 right-0 hidden w-2/5 items-center justify-center lg:flex"
                    >
                      <div className="relative">
                        <span
                          className="absolute inset-0 rounded-full opacity-40 blur-3xl"
                          style={{ background: t.color }}
                        />
                        {t.brandLogo ? (
                          <img
                            src={t.brandLogo}
                            alt=""
                            className="relative h-32 w-32 drop-shadow-[0_8px_30px_rgba(0,0,0,0.55)]"
                          />
                        ) : (
                          <t.brandIcon
                            className="relative h-28 w-28"
                            strokeWidth={1.1}
                            style={{ color: t.color }}
                          />
                        )}
                      </div>
                    </div>
                  )}

                  <div className="relative mb-5 flex items-center gap-4 pr-24">
                    <span
                      className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl"
                      style={{
                        background: `color-mix(in oklab, ${t.color} 18%, transparent)`,
                        boxShadow: `0 0 26px -8px ${t.color}`,
                      }}
                    >
                      <t.icon className="h-7 w-7" style={{ color: t.color }} />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {t.name}
                      </h3>
                      <p
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: t.color }}
                      >
                        {t.role}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`relative flex-1 ${t.featured ? 'max-w-2xl' : ''}`}
                  >
                    <p className="text-sm leading-relaxed text-slate-300/85">
                      {t.body}
                    </p>
                    {t.features && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {t.features.map((f) => (
                          <span
                            key={f.label}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300"
                          >
                            <f.icon
                              className="h-3.5 w-3.5"
                              style={{ color: t.color }}
                            />
                            {f.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div
                    className={`relative mt-5 border-t border-white/10 pt-4 ${
                      t.featured ? 'max-w-2xl' : ''
                    }`}
                  >
                    {t.action ? (
                      t.action
                    ) : (
                      <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{
                            background: t.color,
                            boxShadow: `0 0 8px ${t.color}`,
                          }}
                        />
                        {t.note}
                      </div>
                    )}
                  </div>
                </>
              }
              back={
                <>
                  <p
                    className="mb-3 flex items-center gap-2 pr-20 text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: t.color }}
                  >
                    <t.icon
                      className="h-4 w-4 shrink-0"
                      style={{ color: t.color }}
                    />
                    {t.name} · In practice
                  </p>
                  <div className="mb-2.5 flex items-center gap-2.5 pr-16">
                    <span
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
                      style={{
                        background: `color-mix(in oklab, ${t.practiceColor} 16%, transparent)`,
                      }}
                    >
                      <t.practiceIcon
                        className="h-5 w-5"
                        style={{ color: t.practiceColor }}
                      />
                    </span>
                    <h3 className="text-base font-semibold leading-tight text-white">
                      {t.practiceTitle}
                    </h3>
                  </div>
                  <p
                    className={`text-sm leading-relaxed text-slate-200 ${
                      t.featured ? 'max-w-2xl' : ''
                    }`}
                  >
                    {t.practice}
                  </p>
                </>
              }
            />
          ))}
        </motion.div>

        {/* Enterprise security */}
        <div className="mt-8">
          <SecurityBadge />
        </div>

        {/* how they fit together */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-2xl glass px-6 py-5 text-center text-sm text-slate-300"
        >
          <span className="font-semibold text-neon-cyan">The user</span>
          <span className="text-slate-500">directs</span>
          <span className="font-semibold text-neon-violet">Copilot</span>
          <span className="text-slate-500">to build on the</span>
          <span className="font-semibold text-neon-blue">ArcGIS Maps SDK</span>
          <ArrowRight className="h-4 w-4 text-slate-600" />
          <span className="text-slate-500">wrapped in</span>
          <span className="font-semibold text-neon-cyan">React</span>
          <span className="text-slate-500">, served by</span>
          <span className="font-semibold text-neon-amber">Vite</span>
          <ArrowRight className="h-4 w-4 text-slate-600" />
          <span className="font-semibold text-white">a shipped app</span>
        </motion.div>
      </div>
    </section>
  );
}

export default TechStack;
