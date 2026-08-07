import { motion } from 'framer-motion';
import {
  Terminal,
  UserCog,
  Bot,
  ArrowRight,
  Radio,
  Cpu,
  Braces,
  FileCode,
  Sparkles,
} from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { TiltCard } from './ui/TiltCard';
import { SdkLink } from './ui/SdkLink';
import { fadeUp, stagger, viewport, fromLeft, fromRight } from '../lib/motion';

// Line 1 is the human's natural-language instruction; the lines below are
// Copilot's ghosted code suggestion (what shows before you press Tab).
const CODE_LINES = [
  {
    t: '// Copilot: Load my 3D WebScene and add a Daylight widget tied to the Calcite UI.',
    ghost: false,
  },
  { t: 'const view = new SceneView({', ghost: true },
  { t: '  map: webscene,', ghost: true },
  { t: '  container: "viewDiv"', ghost: true },
  { t: '});', ghost: true },
  { t: '', ghost: true },
  { t: 'const daylight = new Daylight({ view: view });', ghost: true },
  { t: 'view.ui.add(daylight, "top-right");', ghost: true },
];

// The pipeline stages between a human idea and AI-generated code
const PIPELINE = [
  { label: 'Human Intent', icon: UserCog, color: 'var(--color-neon-cyan)' },
  { label: 'Structured Prompt', icon: Braces, color: 'var(--color-neon-violet)' },
  { label: 'AI Build', icon: Cpu, color: 'var(--color-neon-pink)' },
];

function TerminalWindow() {
  return (
    <div className="relative overflow-hidden rounded-2xl glass-strong ring-glow">
      {/* scanline sweep */}
      <div className="animate-scan pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-neon-cyan/10 to-transparent" />

      {/* title bar */}
      <div className="relative flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2 font-mono text-xs text-slate-400">
          <FileCode className="h-3.5 w-3.5" />
          App.jsx — GitHub Codespaces
        </span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-neon-green">
          <Radio className="h-3 w-3 animate-pulse" />
          live
        </span>
      </div>

      {/* editor body */}
      <div className="relative min-h-[16rem] p-5 font-mono text-xs leading-relaxed sm:text-[13px]">
        <div className="flex">
          {/* line-number gutter */}
          <div className="select-none pr-4 text-right text-slate-600">
            {CODE_LINES.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* code */}
          <div className="flex-1 overflow-x-auto whitespace-pre">
            {CODE_LINES.map((line, i) => (
              <div
                key={i}
                className={
                  line.ghost ? 'italic text-slate-500' : 'text-neon-cyan'
                }
              >
                {line.t || '\u00A0'}
                {i === 0 && (
                  <span className="animate-blink ml-0.5 inline-block h-3.5 w-[7px] translate-y-0.5 bg-neon-cyan align-middle" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Copilot accept-suggestion hint */}
        <div className="absolute bottom-4 right-5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-300 backdrop-blur">
            <Sparkles className="h-3 w-3 text-neon-pink" />
            Press
            <kbd className="rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-semibold text-white">
              Tab
            </kbd>
            to accept
          </span>
        </div>
      </div>
    </div>
  );
}

export function PromptBridge() {
  return (
    <section id="bridge" className="relative px-4 py-24 sm:px-6 md:py-32">
      {/* subtle divider glow */}
      <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-neon-violet/40 to-transparent" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center gap-3">
          <span className="font-mono text-sm text-neon-violet">03</span>
          <span className="h-px w-12 bg-gradient-to-r from-neon-violet to-transparent" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            The Bridge
          </span>
        </div>

        <SectionHeading
          align="left"
          icon={Terminal}
          eyebrow="Prompt Engineering · The Ask"
          title={
            <>
              The user directs{' '}
              <span className="text-2xl font-medium text-slate-400 sm:text-3xl">
                (plain-language business logic).
              </span>{' '}
              <span className="text-gradient">The AI builds</span>{' '}
              <span className="text-2xl font-medium text-slate-400 sm:text-3xl">
                (complex syntax).
              </span>
            </>
          }
          subtitle={
            <>
              It starts with the ask. You describe what you want in natural
              language, directing the architecture, the UI, the data connections
              and the exact <SdkLink label="ArcGIS Maps SDK" /> behaviour. You
              own the logic, the AI owns the syntax.
            </>
          }
          className="mb-14"
        />

        {/* Pipeline */}
        <motion.div
          variants={stagger(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mb-12 flex flex-wrap items-center justify-center gap-3 sm:gap-6"
        >
          {PIPELINE.map((stage, i) => (
            <motion.div
              key={stage.label}
              variants={fadeUp}
              className="flex items-center gap-3 sm:gap-6"
            >
              <div
                className="flex items-center gap-3 rounded-2xl glass px-5 py-3"
                style={{ boxShadow: `0 0 26px -10px ${stage.color}` }}
              >
                <stage.icon
                  className="h-5 w-5"
                  style={{ color: stage.color }}
                />
                <span className="text-sm font-semibold text-white">
                  {stage.label}
                </span>
              </div>
              {i < PIPELINE.length - 1 && (
                <motion.div
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                >
                  <ArrowRight className="h-5 w-5 text-slate-500" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Terminal + role split */}
        <div className="grid items-stretch gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            variants={fromLeft}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <TerminalWindow />
          </motion.div>

          <motion.div
            variants={fromRight}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="grid gap-6"
          >
            <TiltCard glow="cyan" animate={false} className="p-6">
              <div className="mb-3 inline-flex rounded-xl bg-neon-cyan/15 p-3">
                <UserCog className="h-6 w-6 text-neon-cyan" />
              </div>
              <h3 className="mb-1.5 text-lg font-semibold text-white">
                Architect of the Logic
              </h3>
              <p className="text-sm leading-relaxed text-slate-300/80">
                You define the data flow, component hierarchy, UX and the exact
                ArcGIS behaviours. Every decision that matters is yours.
              </p>
            </TiltCard>

            <TiltCard glow="pink" animate={false} className="p-6">
              <div className="mb-3 inline-flex rounded-xl bg-neon-pink/15 p-3">
                <Bot className="h-6 w-6 text-neon-pink" />
              </div>
              <h3 className="mb-1.5 text-lg font-semibold text-white">
                Builder of the Syntax
              </h3>
              <p className="text-sm leading-relaxed text-slate-300/80">
                The AI turns your structured intent into correct, idiomatic
                React + ArcGIS code, instantly and without typos.
              </p>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default PromptBridge;
