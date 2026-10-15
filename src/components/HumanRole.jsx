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
import { useI18n } from '../i18n/lang';

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
    zh: {
      label: '實景擷取',
      desc: '無人機攝影測量與 360° 環景影像，轉化為可量測的空間脈絡。',
    },
  },
  {
    id: 'pointcloud',
    label: 'Point Clouds',
    icon: Radar,
    group: 'native',
    color: 'var(--color-neon-blue)',
    desc: 'LiDAR & survey scans, with millions of precise 3D points.',
    zh: {
      label: '點雲',
      desc: 'LiDAR 與測量掃描資料，包含數百萬個精確的 3D 點位。',
    },
  },
  {
    id: 'bim',
    label: 'BIM · IFC · CAD',
    icon: Building2,
    group: 'native',
    color: 'var(--color-neon-blue)',
    desc: 'Federated building & engineering models with full metadata.',
    zh: {
      desc: '整合後的建築與工程模型，保留完整的詮釋資料。',
    },
  },
  {
    id: 'splat',
    label: 'Gaussian Splats',
    icon: Sparkles,
    group: 'native',
    color: 'var(--color-neon-blue)',
    desc: 'Photoreal radiance-field capture for stunning fidelity.',
    zh: {
      label: '高斯潑濺',
      desc: '以輻射場技術擷取的寫實場景，呈現驚人的逼真度。',
    },
  },
  {
    id: 'imagery',
    label: 'Imagery & Rasters',
    icon: Satellite,
    group: 'native',
    color: 'var(--color-neon-blue)',
    desc: 'Satellite, aerial & multiband imagery analysis.',
    zh: {
      label: '影像與網格',
      desc: '衛星、航空與多波段影像分析。',
    },
  },
  {
    id: 'features',
    label: 'Feature Layers',
    icon: Layers,
    group: 'native',
    color: 'var(--color-neon-blue)',
    desc: 'Hosted GIS layers: points, lines, polygons & attributes.',
    zh: {
      label: '圖徵圖層',
      desc: '託管的 GIS 圖層：點、線、多邊形與屬性。',
    },
  },
  {
    id: 'sensor',
    label: 'Sensor / IoT',
    icon: Radio,
    group: 'enterprise',
    color: 'var(--color-neon-violet)',
    desc: 'Live device telemetry streamed straight onto the map.',
    zh: {
      label: '感測器 / IoT',
      desc: '裝置的即時遙測資料，直接串流到地圖上。',
    },
  },
  {
    id: 'realtime',
    label: 'Real-Time Streams',
    icon: Activity,
    group: 'enterprise',
    color: 'var(--color-neon-violet)',
    desc: 'Moving assets & events, updating by the second.',
    zh: {
      label: '即時串流',
      desc: '移動中的資產與事件，每秒即時更新。',
    },
  },
  {
    id: 'databricks',
    label: 'Databricks',
    icon: DatabaseZap,
    group: 'enterprise',
    color: 'var(--color-neon-violet)',
    desc: 'Lakehouse tables & notebooks joined to map features.',
    zh: {
      desc: 'Lakehouse 資料表與 Notebook，結合到地圖圖徵上。',
    },
  },
  {
    id: 'warehouse',
    label: 'Lakes & Warehouses',
    icon: Warehouse,
    group: 'enterprise',
    color: 'var(--color-neon-violet)',
    desc: 'Enterprise data lakes and warehouses, spatially enabled.',
    zh: {
      label: '資料湖與資料倉儲',
      desc: '為企業資料湖與資料倉儲賦予空間能力。',
    },
  },
  {
    id: 'apis',
    label: 'Business APIs',
    icon: Network,
    group: 'enterprise',
    color: 'var(--color-neon-violet)',
    desc: 'REST services & business systems wired in as live layers.',
    zh: {
      label: '業務 API',
      desc: 'REST 服務與業務系統，串接成即時圖層。',
    },
  },
  {
    id: 'bi',
    label: 'Analytics & BI',
    icon: BarChart3,
    group: 'enterprise',
    color: 'var(--color-neon-violet)',
    desc: 'KPIs & dashboards rendered on the geography they describe.',
    zh: {
      label: '分析與 BI',
      desc: '將 KPI 與儀表板呈現在其所描述的地理範圍上。',
    },
  },
];

export function HumanRole() {
  const { tr, loc } = useI18n();
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

  const activeLayers = LAYERS.filter((l) => active.has(l.id)).map(loc);
  const hoveredLayer = LAYERS.find((l) => l.id === hovered);
  const detail = hoveredLayer && loc(hoveredLayer);

  return (
    <section id="human" className="relative px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Step marker */}
        <div className="mb-6 flex items-center gap-3">
          <span className="font-mono text-sm text-neon-cyan">02</span>
          <span className="h-px w-12 bg-gradient-to-r from-neon-cyan to-transparent" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            {tr('The Human Brain', '人類大腦')}
          </span>
        </div>

        <SectionHeading
          align="left"
          icon={BrainCircuit}
          eyebrow={tr("The User's Role · The Visionary", '使用者的角色 · 願景擘劃者')}
          title={tr(
            <>
              It starts with{' '}
              <span className="text-gradient">domain expertise</span>
            </>,
            <>
              一切始於<span className="text-gradient">領域專業</span>
            </>
          )}
          subtitle={tr(
            'Before a single line of code exists, the user defines the problem worth solving and curates the data: reality capture, sensors, Databricks, warehouses, GIS layers and more, georeferencing and aligning wildly different systems into one coherent foundation.',
            '在寫下第一行程式碼之前，使用者先定義值得解決的問題並彙整資料：實景擷取、感測器、Databricks、資料倉儲、GIS 圖層等，並透過地理參考，將差異極大的各種系統對齊，整合為一致的基礎。'
          )}
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
                {tr('The Visionary', '願景擘劃者')}
              </h3>
              <p className="text-sm leading-relaxed text-slate-300/80">
                {tr(
                  'The user translates real business problems, such as operational risk, faster decisions, and public engagement, into a clear product vision with tangible value, across any industry.',
                  '使用者將實際的業務問題，例如營運風險、加速決策與民眾參與，轉化為具有實質價值的清晰產品願景，適用於各行各業。'
                )}
              </p>
            </TiltCard>

            <TiltCard glow="violet" animate={false} className="p-6">
              <Compass className="mb-4 h-8 w-8 text-neon-violet" />
              <h3 className="mb-2 text-xl font-semibold text-white">
                {tr('The GIS Expert', 'GIS 專家')}
              </h3>
              <p className="text-sm leading-relaxed text-slate-300/80">
                {tr(
                  <>
                    Deep spatial expertise goes far beyond putting dots on a map.
                    They integrate complex enterprise systems, maintain
                    authoritative data integrity, and perform the advanced spatial
                    analysis that drives daily business operations. They build the
                    robust &apos;single source of truth&apos; that powers the final
                    application.
                  </>,
                  '深厚的空間專業遠不只是在地圖上標點。GIS 專家整合複雜的企業系統、維護權威資料的完整性，並執行驅動日常業務運作的進階空間分析，打造出支撐最終應用程式的穩固「單一事實來源」。'
                )}
              </p>
            </TiltCard>

            {/* live scene summary */}
            <TiltCard glow="blue" animate={false} className="p-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                  {tr('Data Integration', '資料整合')}
                </h3>
                <span className="rounded-md bg-neon-cyan/15 px-2 py-1 font-mono text-xs text-neon-cyan">
                  {activeLayers.length} / {LAYERS.length} {tr('sources', '個來源')}
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
                    {tr('Toggle sources to compose an app →', '切換資料來源，組合出應用程式 →')}
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
                {tr('Integrate any data or system', '整合任何資料或系統')}
              </h3>
              {/* legend: ArcGIS-native vs external enterprise data */}
              <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-neon-blue"
                    style={{ boxShadow: '0 0 8px var(--color-neon-blue)' }}
                  />
                  {tr('ArcGIS Native', 'ArcGIS 原生')}
                </span>
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-neon-violet"
                    style={{ boxShadow: '0 0 8px var(--color-neon-violet)' }}
                  />
                  {tr('Enterprise Data', '企業資料')}
                </span>
                <span className="ml-auto hidden font-mono text-slate-400 sm:block">
                  {tr('click to toggle', '點選即可切換')}
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
                        {loc(l).label}
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
                        {tr(
                          <>
                            One georeferenced foundation: any data, any system,
                            aligned by hand before AI writes a line of code.
                          </>,
                          '單一的地理參考基礎：任何資料、任何系統，都在 AI 寫下第一行程式碼之前，由人工完成對齊。'
                        )}
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
