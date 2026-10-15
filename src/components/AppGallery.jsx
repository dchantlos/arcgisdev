import { motion } from 'framer-motion';
import {
  LayoutGrid,
  CloudSun,
  ArrowUpRight,
  Clock,
  Sparkles,
  Boxes,
  Radio,
  Layers,
} from 'lucide-react';
import { SectionHeading } from './ui/SectionHeading';
import { TiltCard } from './ui/TiltCard';
import { GithubIcon } from './ui/GithubIcon';
import { fadeUp, stagger, viewport } from '../lib/motion';
import { useI18n } from '../i18n/lang';
import constructionCard from '../assets/ConstructionTimelapseCard.jpg';
import badouziCard from '../assets/BadouziCard2.jpg';
import gaussianSplatCard from '../assets/GaussianSplatCard.jpg';

// Each object below renders one card. Adding an app/toolkit to the catalog is
// just adding an entry here; there is no layout code to touch. Entries flagged
// comingSoon render a placeholder panel.
const APPS = [
  {
    name: 'Construction Timelapse',
    problem:
      'A 4D/5D construction digital twin of Meridian Tower that plays the build schedule back in 3D, audits the IFC model against a buildingSMART IDS, streams live site conditions from ArcGIS Velocity, and reconciles progress to cost with an AIA G702/G703 application for payment.',
    tags: [
      'ArcGIS Maps SDK',
      'buildingSMART',
      'Planning',
      'Construction Monitoring',
      'ERP',
    ],
    status: 'Live',
    glow: 'cyan',
    color: 'var(--color-neon-cyan)',
    image: constructionCard,
    hours: 12,
    badges: [
      { label: 'openBIM IFC-IDS-BCF', icon: Boxes },
      { label: 'Live ArcGIS Velocity Feeds', icon: Radio, zh: { label: 'ArcGIS Velocity 即時資料串流' } },
      { label: '4D & 5D', icon: Layers, zh: { label: '4D 與 5D' } },
    ],
    prompt:
      'Build a 4D construction timelapse of a high-rise digital twin: stream the IFC model as I3S, play the schedule in 3D, audit it against a buildingSMART IDS, export BCF issues, overlay live ArcGIS Velocity site sensors, and tie progress to a 5D cost and payment report.',
    link: 'https://dchantlos.github.io/construction-timelapse/',
    zh: {
      name: '施工縮時數位孿生',
      problem:
        'Meridian Tower 的 4D/5D 施工數位孿生：以 3D 回放施工排程、依據 buildingSMART IDS 稽核 IFC 模型、從 ArcGIS Velocity 串流即時工地狀況，並透過 AIA G702/G703 估驗請款單將進度與成本對帳。',
      tags: ['ArcGIS Maps SDK', 'buildingSMART', '規劃', '施工監測', 'ERP'],
      prompt:
        '為高樓數位孿生建立 4D 施工縮時：將 IFC 模型以 I3S 串流、以 3D 播放施工排程、依據 buildingSMART IDS 進行稽核、匯出 BCF 議題、疊加 ArcGIS Velocity 即時工地感測器，並將進度連結到 5D 成本與請款報表。',
    },
  },
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
    zh: {
      name: '八斗子漁港',
      problem:
        '基隆八斗子漁港的 3D 海岸風險檢視器，融合即時氣象資料與海平面、暴潮情境，即時標示出受威脅的圖徵。',
      tags: ['ArcGIS Maps SDK', '3D 場景', '即時天氣', '風險分析'],
      prompt:
        '為八斗子漁港建立一個 3D ArcGIS 應用程式：串流即時氣象資料、模擬潮汐與暴潮情境、視覺化淹水深度，並回報受威脅資產的預估價值。',
    },
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
    zh: {
      name: '高斯潑濺探索器',
      problem:
        '電影級的探索工具，可瀏覽 11 個公開的 ArcGIS 高斯潑濺實景擷取成果，提供擷取成果圖庫、自動飛覽導覽，以及可直接在潑濺資料上使用的切片、視線、高程剖面與 3D 測量工具。即時氣象資料透過 ArcGIS Maps SDK for JavaScript，驅動場景中的即時降雨與雲層效果。',
      tags: ['ArcGIS Maps SDK', '高斯潑濺', '實景擷取', '即時天氣'],
      prompt:
        '將 Esri 的 Gaussian Splat Explorer 重建為獨立的 3D 應用程式：瀏覽公開的實景擷取潑濺資料、播放電影級飛覽導覽，並直接在高斯潑濺圖層上執行切片、視線、高程剖面與測量。',
    },
  },
];

export function AppGallery() {
  const { tr, loc } = useI18n();
  return (
    <section id="solutions" className="relative px-4 py-24 sm:px-6 md:py-32">
      <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center gap-3">
          <span className="font-mono text-sm text-neon-cyan">07</span>
          <span className="h-px w-12 bg-gradient-to-r from-neon-cyan to-transparent" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            {tr('App Catalog', '應用程式目錄')}
          </span>
        </div>

        <SectionHeading
          align="left"
          icon={LayoutGrid}
          eyebrow={tr('Apps · Toolkits · Demos', '應用程式 · 工具套件 · 展示')}
          title={tr(
            <>
              A living{' '}
              <span className="text-gradient">catalog of what&apos;s built</span>
            </>,
            <>
              持續成長的<span className="text-gradient">成果目錄</span>
            </>
          )}
          subtitle={tr(
            'Here is a live example built on the ArcGIS Maps SDK for JavaScript, a purpose-built coastal risk experience, with more on the way.',
            '這是以 ArcGIS Maps SDK for JavaScript 打造的實際範例，一個專為海岸風險量身打造的體驗，更多作品即將推出。'
          )}
          className="mb-14"
        />

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {APPS.map((source, i) => {
            const app = loc(source);
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
                      {tr('Coming soon...', '即將推出…')}
                    </h3>
                    <p className="max-w-[16rem] text-sm leading-relaxed text-slate-500">
                      {tr(
                        'Another app is in the works. This catalog grows as new builds ship.',
                        '另一個應用程式正在開發中。隨著新作品上線，這份目錄將持續擴充。'
                      )}
                    </p>
                  </div>
                </TiltCard>
              );
            }

            return (
              <TiltCard key={source.name} glow={app.glow}>
                {/* whole-card link */}
                <a
                  href={app.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={tr(`Open ${app.name}`, `開啟${app.name}`)}
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
                      alt={tr(`${app.name} preview`, `${app.name}預覽畫面`)}
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
                  {(app.hours || app.liveWeather || app.badges) && (
                    <div className="flex flex-wrap items-center gap-2">
                      {app.hours && (
                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-neon-amber/40 bg-neon-amber/[0.06] px-2.5 py-1 text-[11px] font-semibold text-neon-amber">
                          <Clock className="h-3 w-3" />
                          {tr(
                            `Built by 1 user in ${app.hours} ${app.hours === 1 ? 'hour' : 'hours'}`,
                            `1 位使用者 ${app.hours} 小時打造完成`
                          )}
                        </span>
                      )}
                      {app.liveWeather && (
                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-neon-cyan/40 bg-neon-cyan/[0.06] px-2.5 py-1 text-[11px] font-semibold text-neon-cyan">
                          <CloudSun className="h-3 w-3" />
                          {tr('Live weather data', '即時氣象資料')}
                        </span>
                      )}
                      {app.badges?.map((b) => (
                        <span
                          key={b.label}
                          className="inline-flex w-fit items-center gap-1.5 rounded-full border border-neon-cyan/40 bg-neon-cyan/[0.06] px-2.5 py-1 text-[11px] font-semibold text-neon-cyan"
                        >
                          <b.icon className="h-3 w-3" />
                          {loc(b).label}
                        </span>
                      ))}
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
                      {tr('The Prompt:', '提示詞：')}
                    </div>
                    <p className="font-mono text-[11px] leading-relaxed text-slate-300/90">
                      {tr(<>&ldquo;{app.prompt}&rdquo;</>, `「${app.prompt}」`)}
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
          {tr(
            'Click the live card to launch the demo. More apps coming soon.',
            '點選卡片即可開啟展示。更多應用程式即將推出。'
          )}
        </motion.p>
      </div>
    </section>
  );
}
