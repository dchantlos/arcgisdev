import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  BrainCircuit,
  Terminal,
  Cpu,
  Boxes,
  ArrowRight,
} from 'lucide-react';
import { GithubIcon } from './ui/GithubIcon';
import esriDevelopers from '../assets/esri-developers.png';
import { fadeUp, stagger, viewport } from '../lib/motion';

const BOILERPLATE_URL = 'https://github.com/Esri';

const RECAP = [
  { icon: BrainCircuit, label: 'Human', color: 'var(--color-neon-cyan)' },
  { icon: Terminal, label: 'Prompt', color: 'var(--color-neon-violet)' },
  { icon: Cpu, label: 'AI', color: 'var(--color-neon-pink)' },
  { icon: Boxes, label: 'Custom App', color: 'var(--color-neon-blue)' },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden px-4 pt-24 sm:px-6">
      {/* glow floor */}
      <div className="absolute inset-x-0 bottom-0 h-96 bg-[radial-gradient(ellipse_60%_100%_at_50%_100%,rgba(59,130,246,0.22),transparent_70%)]" />

      <motion.div
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="relative mx-auto max-w-4xl text-center"
      >
        {/* pipeline recap */}
        <motion.div
          variants={fadeUp}
          className="mb-10 flex items-center justify-center gap-2 sm:gap-4"
        >
          {RECAP.map((step, i) => (
            <div key={step.label} className="flex items-center gap-2 sm:gap-4">
              <div className="flex flex-col items-center gap-2">
                <span
                  className="grid h-12 w-12 place-items-center rounded-2xl glass"
                  style={{ boxShadow: `0 0 24px -8px ${step.color}` }}
                >
                  <step.icon className="h-5 w-5" style={{ color: step.color }} />
                </span>
                <span className="text-[11px] font-medium text-slate-400">
                  {step.label}
                </span>
              </div>
              {i < RECAP.length - 1 && (
                <ArrowRight className="mb-5 h-4 w-4 text-slate-600" />
              )}
            </div>
          ))}
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl"
        >
          Let&apos;s build the{' '}
          <span className="text-gradient-animated">future of mapping</span>
          <br className="hidden sm:block" /> together.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-5 max-w-xl text-base text-slate-300/80 sm:text-lg"
        >
          Your domain expertise, assisted by AI, rendered into powerful business
          value applications. Use this framework and explore the architecture
          examples to start building your own custom ArcGIS solutions today.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={BOILERPLATE_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-blue px-6 py-3 text-sm font-semibold text-ink-950 transition-transform hover:scale-[1.03]"
          >
            <GithubIcon className="h-4 w-4" />
            Visit Esri on GitHub
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </motion.div>

      {/* Powered-by / leveraging pills */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mx-auto mt-16 flex max-w-4xl flex-wrap items-center justify-center gap-2.5"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
          Leveraging
        </span>
        {[
          {
            label: 'ArcGIS Maps SDK for JavaScript',
            href: 'https://developers.arcgis.com/javascript/latest/',
          },
          {
            label: 'Esri Calcite Design System',
            href: 'https://developers.arcgis.com/calcite-design-system/',
          },
          { label: 'React', href: 'https://react.dev/' },
          { label: 'Vite', href: 'https://vite.dev/' },
        ].map((t) => (
          <a
            key={t.label}
            href={t.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-neon-blue/25 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-neon-cyan/50 hover:text-white"
          >
            {t.label}
          </a>
        ))}
      </motion.div>

      {/* bottom bar */}
      <div className="relative mx-auto mt-20 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 py-8 sm:flex-row">
        <div className="flex items-center gap-3">
          <img
            src={esriDevelopers}
            alt="Esri Developers"
            className="h-7 w-7 rounded-lg"
          />
          <span className="text-sm font-semibold text-white">
            Develop with <span className="text-gradient">ArcGIS</span>
          </span>
        </div>
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} · ArcGIS × Data × AI
        </p>
      </div>
    </footer>
  );
}

export default Footer;
