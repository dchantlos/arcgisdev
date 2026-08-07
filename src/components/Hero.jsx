import { useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  Box,
  Boxes,
  BrainCircuit,
  Cpu,
  Globe,
  LayoutGrid,
  Terminal,
  Zap,
} from 'lucide-react';
import { EsriIcon } from './ui/EsriIcon';
import { SdkLink, ARCGIS_SDK_URL } from './ui/SdkLink';
import { EASE, fadeUp, stagger } from '../lib/motion';

// The 4-step workflow paradigm, mirrored from the footer recap.
const PARADIGM = [
  { icon: BrainCircuit, label: 'Human', color: 'var(--color-neon-cyan)' },
  { icon: Terminal, label: 'Prompt', color: 'var(--color-neon-violet)' },
  { icon: Cpu, label: 'AI', color: 'var(--color-neon-pink)' },
  { icon: Boxes, label: 'Custom App', color: 'var(--color-neon-blue)' },
];

// Each source is tinted by the kind of data/system it represents, so related
// inputs share a colour and unrelated ones stay visually distinct.
const GROUP_COLORS = {
  gis: 'var(--color-neon-blue)', // Esri / spatial core
  reality: 'var(--color-neon-green)', // reality capture & imagery
  aec: 'var(--color-neon-amber)', // BIM / CAD / engineering design
  data: 'var(--color-neon-violet)', // databases & warehouses
  business: 'var(--color-neon-pink)', // business & SaaS systems
  realtime: 'var(--color-neon-cyan)', // streaming, IoT & APIs
};

// A deliberately overcrowded cloud of everything that can be fused into one
// ArcGIS app: spatial, BIM, engineering, enterprise, cloud & business data.
const SOURCES = [
  { label: 'ArcGIS', group: 'gis', left: '50%', top: '4%' },
  { label: 'Revit', group: 'aec', left: '20%', top: '10%' },
  { label: 'Civil 3D', group: 'aec', left: '79%', top: '10%' },
  { label: 'Microsoft', group: 'business', left: '50%', top: '95%' },
  { label: 'Databricks', group: 'data', left: '11%', top: '28%' },
  { label: 'Reality Capture', group: 'reality', left: '86%', top: '27%' },
  { label: 'Sensor / IoT', group: 'realtime', left: '7%', top: '50%' },
  { label: 'Data Lake', group: 'data', left: '92%', top: '50%' },
  { label: 'BIM', group: 'aec', left: '15%', top: '72%' },
  { label: 'Point Cloud', group: 'reality', left: '84%', top: '72%' },
  { label: 'LiDAR', group: 'reality', left: '31%', top: '90%' },
  { label: 'Imagery', group: 'reality', left: '69%', top: '90%' },
  { label: 'SQL Server', group: 'data', left: '32%', top: '3%' },
  { label: 'Snowflake', group: 'data', left: '69%', top: '3%' },
  { label: 'Power BI', group: 'business', left: '6%', top: '68%' },
  { label: 'REST APIs', group: 'realtime', left: '93%', top: '68%' },
  { label: 'GeoJSON', group: 'gis', left: '24%', top: '45%' },
  { label: 'Oracle', group: 'data', left: '77%', top: '45%' },
  { label: 'Kafka', group: 'realtime', left: '38%', top: '19%' },
  { label: 'SAP', group: 'business', left: '62%', top: '19%' },
  { label: 'Salesforce', group: 'business', left: '40%', top: '81%' },
  { label: 'CAD', group: 'aec', left: '61%', top: '81%' },
  { label: 'IFC', group: 'aec', left: '17%', top: '86%' },
];

// Numeric coordinates (viewBox 0-100) for the connectivity network lines.
const NODES = SOURCES.map((s) => ({
  label: s.label,
  x: parseFloat(s.left),
  y: parseFloat(s.top),
}));

// A single connection from the core to a source. The path curves toward the
// cursor (via the shared `bend` spring + pointer motion values) while the
// dashed overlay keeps the data-flow animation running.
function FlowLine({ node, i, px, py, bend, hovered }) {
  const d = useTransform([px, py, bend], ([mxv, myv, b]) => {
    const midX = (50 + node.x) / 2;
    const midY = (50 + node.y) / 2;
    const dx = mxv - midX;
    const dy = myv - midY;
    const dist = Math.hypot(dx, dy) || 1;
    const influence = Math.max(0, 1 - dist / 42) * b * 0.6;
    const cx = midX + dx * influence;
    const cy = midY + dy * influence;
    return `M50 50Q${cx.toFixed(2)} ${cy.toFixed(2)} ${node.x} ${node.y}`;
  });

  return (
    <g>
      <motion.path
        d={d}
        fill="none"
        stroke="url(#netGrad)"
        strokeWidth="0.2"
        strokeOpacity={hovered ? 0.5 : 0.28}
      />
      <motion.path
        d={d}
        fill="none"
        stroke="var(--color-neon-cyan)"
        strokeWidth="0.4"
        strokeLinecap="round"
        strokeDasharray="2.5 10"
        animate={{ strokeDashoffset: i % 2 === 0 ? [12.5, 0] : [0, 12.5] }}
        transition={{
          duration: (hovered ? 1.4 : 2.6) + (i % 5) * 0.2,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ opacity: hovered ? 0.6 : 0.26 }}
      />
    </g>
  );
}

export function Hero() {
  const ref = useRef(null);

  // Mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    stiffness: 120,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), {
    stiffness: 120,
    damping: 18,
  });

  const handleMouse = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  // Local pointer tracking so the flow lines can bend toward the cursor.
  const objRef = useRef(null);
  const px = useMotionValue(50);
  const py = useMotionValue(50);
  const bend = useSpring(0, { stiffness: 140, damping: 18 });
  const [hovered, setHovered] = useState(false);

  const handleObjMouse = (e) => {
    const rect = objRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set(((e.clientX - rect.left) / rect.width) * 100);
    py.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={handleMouse}
      className="relative flex min-h-screen items-center overflow-hidden px-4 pt-24 pb-10 sm:px-6"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* ---------------- Left: copy ---------------- */}
        <motion.div
          variants={stagger(0.12, 0.1)}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start gap-6 text-left"
        >
          <motion.span
            variants={fadeUp}
            className="text-sm font-semibold uppercase tracking-wider text-teal-400"
          >
            Interactive Methodology Guide
          </motion.span>

          <motion.div variants={fadeUp} className="space-y-3">
            <h1 className="text-4xl font-bold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Unlock the Full Power of{' '}
              <span className="text-gradient-animated">
                ArcGIS APIs
              </span>
            </h1>
            <p className="text-xl font-semibold text-slate-200 sm:text-2xl">
              How to Build Custom ArcGIS Web Apps
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="max-w-xl space-y-4">
            <p className="text-base leading-relaxed text-slate-300/85">
              You already know how to build great maps. Now, you can build
              incredible web apps to go with them.
            </p>
            <p className="text-base leading-relaxed text-slate-300/85">
              By pairing your GIS domain expertise with AI assistants, you can
              skip the steep coding learning curve. AI acts as your personal
              translator. You describe what you want the map to do in natural
              language, and the AI writes the complex syntax required to build it
              using the <SdkLink />.
            </p>
            <p className="text-base leading-relaxed text-slate-300/85">
              This interactive guide provides you with the framework to learn
              how it&apos;s done, an inside look at the process from idea to
              deployed app.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-6 inline-flex items-center gap-2.5 rounded-xl border border-neon-amber/30 bg-neon-amber/[0.06] px-3 py-2 text-xs shadow-[0_0_28px_-10px_var(--color-neon-amber)] lg:whitespace-nowrap"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-neon-amber/15">
              <Zap className="h-3.5 w-3.5 text-neon-amber" />
            </span>
            <span className="text-slate-200">
              <span className="font-semibold text-neon-amber">
                Your New Superpower:
              </span>{' '}
              Go from an idea in your head to a live, custom web app{' '}
              <span className="font-semibold text-white">in an afternoon.</span>
            </span>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#human"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-neon-cyan to-neon-blue px-6 py-3 text-sm font-semibold text-ink-950 transition-transform hover:scale-[1.03]"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover:translate-x-full" />
              See the Workflow
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="#solutions"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-neon-violet/50 hover:shadow-glow-violet"
            >
              <LayoutGrid className="h-4 w-4" />
              Jump to App Catalog
            </a>
          </motion.div>

          {/* tech pill */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 pt-4">
            <a
              href={ARCGIS_SDK_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-neon-cyan/30 bg-white/5 px-3 py-1.5 font-mono text-xs text-slate-200 transition-colors hover:border-neon-cyan/60 hover:text-white"
            >
              <EsriIcon className="h-3.5 w-3.5 text-neon-cyan" />
              ArcGIS Maps SDK
            </a>
          </motion.div>
        </motion.div>

        {/* -------- Right: floating diagram + workflow paradigm -------- */}
        <div className="flex flex-col items-center gap-12">
        <motion.div
          ref={objRef}
          onMouseMove={handleObjMouse}
          onMouseEnter={() => {
            setHovered(true);
            bend.set(1);
          }}
          onMouseLeave={() => {
            setHovered(false);
            bend.set(0);
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          style={{ perspective: 1200 }}
          className="relative mx-auto hidden aspect-square w-full max-w-md lg:block"
        >
          <motion.div
            style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
            className="relative h-full w-full"
          >
            {/* central glowing core cube */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="animate-pulse-glow absolute -inset-10 rounded-full bg-neon-blue/40 blur-3xl" />
              <motion.div
                className="relative grid h-28 w-28 place-items-center"
                style={{ z: 60 }}
              >
                {/* rotating hexagon (face + outline) */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 26,
                    ease: 'linear',
                    repeat: Infinity,
                  }}
                  className="absolute inset-0"
                >
                  {/* dark, glassy hexagon face (matches the wordmark badge) */}
                  <div
                    className="absolute inset-0 glass-strong"
                    style={{
                      clipPath:
                        'polygon(50% 0%, 93.3% 25%, 93.3% 75%, 50% 100%, 6.7% 75%, 6.7% 25%)',
                      background: 'rgba(10, 14, 20, 0.7)',
                      filter: 'drop-shadow(0 8px 20px rgba(0, 0, 0, 0.45))',
                    }}
                  />
                  {/* subtle hexagon outline */}
                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="absolute inset-0 h-full w-full overflow-visible"
                    fill="none"
                  >
                    <polygon
                      points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.14)"
                      strokeWidth="1.5"
                    />
                  </svg>
                </motion.div>
                {/* static, always-upright icon (size unchanged) */}
                <Globe
                  className="relative h-16 w-16 text-neon-cyan"
                  strokeWidth={1.1}
                />
              </motion.div>
            </div>

            {/* orbit rings */}
            <div className="animate-spin-slow absolute inset-4 rounded-full border border-neon-cyan/20" />
            <div className="animate-spin-rev absolute inset-10 rounded-full border border-neon-violet/20" />

            {/* data-connectivity network: lines from the core to every source
                with pulses of data flowing along them */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              style={{ transform: 'translateZ(30px)' }}
              fill="none"
            >
              <defs>
                <radialGradient
                  id="netGrad"
                  gradientUnits="userSpaceOnUse"
                  cx="50"
                  cy="50"
                  r="55"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--color-neon-cyan)"
                    stopOpacity="0.32"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-neon-violet)"
                    stopOpacity="0.03"
                  />
                </radialGradient>
              </defs>

              {NODES.map((n, i) => (
                <FlowLine
                  key={n.label}
                  node={n}
                  i={i}
                  px={px}
                  py={py}
                  bend={bend}
                  hovered={hovered}
                />
              ))}
            </svg>

            {/* overcrowded cloud of data & system chips */}
            {SOURCES.map((s, i) => {
              const color = GROUP_COLORS[s.group];
              return (
                <div
                  key={s.label}
                  className="absolute"
                  style={{
                    left: s.left,
                    top: s.top,
                    transform: 'translate(-50%, -50%) translateZ(70px)',
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 4.5 + (i % 5) * 0.6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: (i % 7) * 0.35,
                    }}
                    className="flex items-center gap-1.5 whitespace-nowrap rounded-lg glass px-2.5 py-1.5 text-[11px] font-medium text-white"
                    style={{
                      boxShadow: `0 0 18px -8px ${color}`,
                      borderColor: `color-mix(in oklab, ${color} 45%, transparent)`,
                    }}
                  >
                    <Box className="h-3 w-3 shrink-0" style={{ color }} />
                    {s.label}
                  </motion.div>
                </div>
              );
            })}

          </motion.div>
        </motion.div>

        {/* the new development paradigm flowchart */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="w-full"
        >
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            {PARADIGM.map((step, i) => (
              <div
                key={step.label}
                className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
              >
                <div className="flex flex-col items-center gap-2">
                  <span
                    className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 glass"
                    style={{ boxShadow: `0 0 26px -8px ${step.color}` }}
                  >
                    <step.icon className="h-6 w-6" style={{ color: step.color }} />
                  </span>
                  <span className="text-xs font-medium text-slate-300 sm:text-sm">
                    {step.label}
                  </span>
                </div>
                {i < PARADIGM.length - 1 && (
                  <ArrowRight
                    className="h-5 w-5 shrink-0 rotate-90 text-neon-cyan sm:mb-6 sm:rotate-0"
                    style={{
                      filter:
                        'drop-shadow(0 0 6px color-mix(in oklab, var(--color-neon-cyan) 70%, transparent))',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#human"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute inset-x-0 bottom-6 mx-auto flex w-max flex-col items-center gap-2 text-xs uppercase tracking-[0.25em] text-slate-400"
      >
        Scroll
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1"
        >
          <span className="h-2 w-1 rounded-full bg-neon-cyan" />
        </motion.span>
      </motion.a>
    </section>
  );
}

export default Hero;
