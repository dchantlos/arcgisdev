import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cog,
  Boxes,
  Rocket,
  GitBranch,
  Braces,
  Folder,
  FolderOpen,
  FileCode2,
  FileJson,
  Package,
  Cpu,
  Layers3,
  Server,
} from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { GlassCard } from './ui/GlassCard';
import { TiltCard } from './ui/TiltCard';
import { SdkLink } from './ui/SdkLink';
import { fadeUp, stagger } from '../lib/motion';

/* ------------------------- Executive view ------------------------- */
const EXEC_CARDS = [
  {
    icon: Rocket,
    color: 'var(--color-neon-cyan)',
    glow: 'cyan',
    title: 'Instant Setup',
    body: 'GitHub Copilot and AI agents stand up the entire Vite + React environment (config, structure and tooling) in seconds instead of hours.',
  },
  {
    icon: Boxes,
    color: 'var(--color-neon-violet)',
    glow: 'violet',
    title: 'ArcGIS SDK Integration',
    body: (
      <>
        The latest <SdkLink label="ArcGIS Maps SDK for JavaScript" /> comes
        wired in and pointed at your WebMap or WebScene, feature services and
        live data, in 2D or 3D.
      </>
    ),
  },
  {
    icon: Layers3,
    color: 'var(--color-neon-pink)',
    glow: 'pink',
    title: 'State & Logic',
    body: 'Component hierarchy, state and API calls are all handled by the AI, following your direction, so you never touch the wiring.',
  },
  {
    icon: GitBranch,
    color: 'var(--color-neon-blue)',
    glow: 'blue',
    title: 'Deploy-Ready',
    body: 'The file structure and build config come ready for a clean, one-command GitHub Pages deployment, so you can ship the same day.',
  },
];

/* --------------------------- Geek view ---------------------------- */
const TREE = [
  { depth: 0, type: 'folder-open', name: 'arcgis-app/' },
  { depth: 1, type: 'file-json', name: 'package.json' },
  { depth: 1, type: 'file-code', name: 'vite.config.js' },
  { depth: 1, type: 'file-code', name: 'index.html' },
  { depth: 1, type: 'folder', name: 'public/' },
  { depth: 1, type: 'folder-open', name: 'src/' },
  { depth: 2, type: 'file-code', name: 'main.jsx' },
  { depth: 2, type: 'file-code', name: 'App.jsx' },
  { depth: 2, type: 'folder-open', name: 'components/' },
  { depth: 3, type: 'file-code', name: 'MapView.jsx' },
  { depth: 3, type: 'file-code', name: 'DataPanel.jsx' },
  { depth: 3, type: 'file-code', name: 'Dashboard.jsx' },
  { depth: 2, type: 'folder', name: 'hooks/' },
  { depth: 2, type: 'folder', name: 'services/' },
];

const DEPS = [
  { name: '@arcgis/core', version: '^4.34.0', hot: true },
  { name: 'react', version: '^19.2.0' },
  { name: 'react-dom', version: '^19.2.0' },
  { name: 'framer-motion', version: '^12.0.0' },
  { name: 'tailwindcss', version: '^4.1.0' },
  { name: 'lucide-react', version: '^0.400.0' },
];

const CODE = `import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

// The user’s curated basemap (2D or 3D) as the foundation
const map = new WebMap({ portalItem: { id: "b4f…9c2" } });

// AI wired a live source (sensors, Databricks, a warehouse…)
map.add(new FeatureLayer({ url: liveDataServiceUrl }));

const view = new MapView({ container: "viewDiv", map });
view.ui.add(new Legend({ view }), "bottom-left");`;

function TreeIcon({ type }) {
  const cls = 'h-4 w-4 shrink-0';
  switch (type) {
    case 'folder-open':
      return <FolderOpen className={`${cls} text-neon-cyan`} />;
    case 'folder':
      return <Folder className={`${cls} text-neon-blue`} />;
    case 'file-json':
      return <FileJson className={`${cls} text-neon-amber`} />;
    default:
      return <FileCode2 className={`${cls} text-neon-violet`} />;
  }
}

function GeekView() {
  return (
    <motion.div
      key="geek"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4 }}
      className="grid gap-6 lg:grid-cols-3"
    >
      {/* File tree */}
      <GlassCard glow="cyan" animate={false} className="p-5 lg:col-span-1">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <Folder className="h-4 w-4" /> File Structure
        </div>
        <motion.ul
          variants={stagger(0.05)}
          initial="hidden"
          animate="show"
          className="font-mono text-[13px]"
        >
          {TREE.map((node, i) => (
            <motion.li
              key={i}
              variants={fadeUp}
              className="flex items-center gap-2 rounded py-1 text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              style={{ paddingLeft: `${node.depth * 16}px` }}
            >
              <TreeIcon type={node.type} />
              {node.name}
            </motion.li>
          ))}
        </motion.ul>
      </GlassCard>

      {/* Code snippet */}
      <GlassCard glow="violet" animate={false} className="overflow-hidden lg:col-span-2">
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2.5 font-mono text-xs text-slate-400">
          <FileCode2 className="h-3.5 w-3.5 text-neon-violet" />
          src/components/MapView.jsx
          <span className="ml-auto flex items-center gap-1.5 text-neon-green">
            <Cpu className="h-3 w-3" /> AI-generated
          </span>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-slate-300">
          <code>{CODE}</code>
        </pre>

        {/* dependencies */}
        <div className="border-t border-white/10 p-5">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <Package className="h-4 w-4" /> package.json · dependencies
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {DEPS.map((d) => (
              <div
                key={d.name}
                className={`flex items-center justify-between rounded-lg border px-3 py-2 font-mono text-xs ${
                  d.hot
                    ? 'border-neon-cyan/40 bg-neon-cyan/5 shadow-glow-cyan'
                    : 'border-white/10 bg-white/[0.02]'
                }`}
              >
                <span className={d.hot ? 'text-neon-cyan' : 'text-slate-300'}>
                  {d.name}
                </span>
                <span className="text-slate-500">{d.version}</span>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

function ExecView() {
  return (
    <motion.div
      key="exec"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4 }}
      variants={stagger(0.1)}
      className="grid gap-6 sm:grid-cols-2"
    >
      {EXEC_CARDS.map((c) => (
        <TiltCard key={c.title} glow={c.glow} className="p-6">
          <div
            className="mb-4 inline-flex rounded-xl p-3"
            style={{
              background: `color-mix(in oklab, ${c.color} 18%, transparent)`,
            }}
          >
            <c.icon className="h-7 w-7" style={{ color: c.color }} />
          </div>
          <h3 className="mb-2 text-xl font-semibold text-white">{c.title}</h3>
          <p className="text-sm leading-relaxed text-slate-300/80">{c.body}</p>
        </TiltCard>
      ))}
    </motion.div>
  );
}

export function AIEngine() {
  const [geek, setGeek] = useState(false);

  return (
    <section
      id="ai-engine"
      className="relative overflow-hidden px-4 py-24 sm:px-6 md:py-32"
    >
      {/* ambient gears */}
      <Cog className="animate-spin-slow pointer-events-none absolute -right-16 top-24 h-64 w-64 text-white/[0.03]" />
      <Cog className="animate-spin-rev pointer-events-none absolute -left-10 bottom-10 h-40 w-40 text-white/[0.03]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-6 flex items-center gap-3">
          <span className="font-mono text-sm text-neon-pink">04</span>
          <span className="h-px w-12 bg-gradient-to-r from-neon-pink to-transparent" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            The AI Engine Room
          </span>
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="left"
            icon={Server}
            eyebrow="GitHub Copilot + AI Agents · The Result"
            title={
              <>
                From your prompt to a{' '}
                <span className="text-gradient">finished app</span>
              </>
            }
            subtitle="Now here's what comes back. From that one prompt, the AI scaffolds the whole project, wires in your data and hands you a complete, deploy-ready app in seconds."
          />

          {/* View toggle */}
          <div className="flex shrink-0 items-center gap-1 rounded-2xl glass p-1.5">
            {[
              { key: false, label: 'Executive', icon: Braces },
              { key: true, label: 'Geek', icon: FileCode2 },
            ].map((opt) => {
              const activeState = geek === opt.key;
              return (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setGeek(opt.key)}
                  className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                    activeState ? 'text-ink-950' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {activeState && (
                    <motion.span
                      layoutId="view-toggle"
                      className="absolute inset-0 -z-0 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-blue"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <opt.icon className="relative z-10 h-4 w-4" />
                  <span className="relative z-10">{opt.label} View</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-14">
          <AnimatePresence mode="wait">
            {geek ? <GeekView /> : <ExecView />}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default AIEngine;
