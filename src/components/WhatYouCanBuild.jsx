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
import { useI18n } from '../i18n/lang';

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
    zh: {
      title: '即時營運',
      body: '將感測器、IoT 與遙測的即時資料呈現在每秒更新的地圖上，隨時隨地監控任何事物。',
      tags: ['感測器', '串流', 'KPI'],
      examples: ['車隊與資產追蹤', '公用事業管網監控', '緊急應變作業'],
      roi: '以即時的營運全貌取代靜態狀態報告，讓團隊在問題發生的當下就能採取行動。',
    },
  },
  {
    icon: Boxes,
    color: 'var(--color-neon-violet)',
    title: '3D Digital Twins',
    body: 'Gaussian splats, BIM/IFC and point clouds fused into a photoreal, explorable 3D scene of a site, city or asset.',
    tags: ['Gaussian Splats', 'BIM/IFC', 'Reality Capture'],
    examples: ['Campus & facility twins', 'Construction progress', 'Urban & city planning'],
    roi: 'Differentiate your firm during the RFP process by delivering interactive, 3D proof-of-concepts in hours.',
    zh: {
      title: '3D 數位孿生',
      body: '將高斯潑濺、BIM/IFC 與點雲融合成寫實且可探索的 3D 場景，呈現場址、城市或資產。',
      tags: ['高斯潑濺', 'BIM/IFC', '實景擷取'],
      examples: ['園區與設施孿生', '施工進度', '都市與城市規劃'],
      roi: '在提案（RFP）階段，只需數小時就能交付互動式 3D 概念驗證，讓您的公司脫穎而出。',
    },
  },
  {
    icon: BarChart3,
    color: 'var(--color-neon-pink)',
    title: 'Analytics & BI Maps',
    body: 'Databricks, warehouses and data lakes joined to features and visualised on the geography they describe.',
    tags: ['Databricks', 'Warehouse', 'Charts'],
    examples: ['Sales territory analysis', 'Risk & exposure heatmaps', 'Demand forecasting'],
    roi: 'Uncovers hidden market trends directly from Databricks/Snowflake lakes.',
    zh: {
      title: '分析與 BI 地圖',
      body: '將 Databricks、資料倉儲與資料湖結合到圖徵上，並在其所描述的地理範圍中視覺化呈現。',
      tags: ['Databricks', '資料倉儲', '圖表'],
      examples: ['銷售轄區分析', '風險與曝險熱區圖', '需求預測'],
      roi: '直接從 Databricks/Snowflake 資料湖中發掘隱藏的市場趨勢。',
    },
  },
  {
    icon: Target,
    color: 'var(--color-neon-green)',
    title: 'Site Selection & Suitability',
    body: 'Weighted overlays, drive-time and demographic layers combined into an interactive tool that ranks the best locations on demand.',
    tags: ['Weighted Overlay', 'Drive-Time', 'Demographics'],
    examples: ['Retail & branch siting', 'Renewables & infrastructure', 'Land acquisition screening'],
    roi: 'Turns weeks of manual suitability analysis into an interactive tool stakeholders can rerun in seconds.',
    zh: {
      title: '選址與適宜性分析',
      body: '結合加權疊加、行車時間與人口統計圖層，打造可隨時排序最佳地點的互動工具。',
      tags: ['加權疊加', '行車時間', '人口統計'],
      examples: ['零售與分店選址', '再生能源與基礎設施', '土地取得篩選'],
      roi: '將數週的人工適宜性分析，轉化為利害關係人幾秒內就能重新執行的互動工具。',
    },
  },
  {
    icon: Users,
    color: 'var(--color-neon-amber)',
    title: 'Public Engagement Viewers',
    body: 'Lightweight, shareable 2D maps that tell a clear story to any audience, no GIS expertise required.',
    tags: ['2D', 'Story', 'Share'],
    examples: ['Community planning', 'Story-driven maps', 'Transparency portals'],
    roi: 'Accelerates stakeholder buy-in and reduces public-consultation overhead.',
    zh: {
      title: '民眾參與檢視器',
      body: '輕量、可分享的 2D 地圖，向任何受眾清楚說明故事，不需要 GIS 專業知識。',
      tags: ['2D', '故事', '分享'],
      examples: ['社區規劃', '故事導向地圖', '資訊公開入口網站'],
      roi: '加速取得利害關係人的支持，並降低公眾諮詢的成本。',
    },
  },
  {
    icon: Workflow,
    color: 'var(--color-neon-blue)',
    title: 'System-of-Systems Integration',
    body: 'Business APIs, databases and platforms wired together behind one map: the single pane of glass.',
    tags: ['APIs', 'Databases', 'Platforms'],
    examples: ['ERP + GIS bridges', 'IoT platform hubs', 'Common operating picture'],
    roi: 'Unblock enterprise sales by easily wiring ArcGIS into SAP, Salesforce, or Databricks without needing massive dev teams.',
    zh: {
      title: '跨系統整合',
      body: '業務 API、資料庫與平台全部串接在同一張地圖背後，打造單一的整合檢視介面。',
      tags: ['API', '資料庫', '平台'],
      examples: ['ERP + GIS 橋接', 'IoT 平台中樞', '共同作業圖像（COP）'],
      roi: '不需龐大的開發團隊，就能輕鬆將 ArcGIS 串接到 SAP、Salesforce 或 Databricks，突破企業銷售的瓶頸。',
    },
  },
];

export function WhatYouCanBuild() {
  const { tr, loc } = useI18n();
  return (
    <section id="build" className="relative px-4 py-24 sm:px-6 md:py-32">
      <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center gap-3">
          <span className="font-mono text-sm text-neon-cyan">06</span>
          <span className="h-px w-12 bg-gradient-to-r from-neon-cyan to-transparent" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            {tr('What You Can Build', '您能打造什麼')}
          </span>
        </div>

        <SectionHeading
          align="left"
          icon={Blocks}
          eyebrow={tr('The Payoff · Any Industry', '成果 · 適用各行各業')}
          title={tr(
            <>
              Same process, <span className="text-gradient">endless outputs</span>
            </>,
            <>
              相同流程，<span className="text-gradient">無限成果</span>
            </>
          )}
          subtitle={tr(
            "Esri's out-of-the-box configurable apps such as Experience Builder, Instant Apps and ArcGIS Solutions fit many use cases. But when you need a highly specific UI, deep third-party database integration, or complex interactive 3D, those out-of-the-box tools hit their limits. This AI-assisted workflow is your bridge to limitless customization. If you can imagine it, you can build it.",
            'Esri 開箱即用、可自行設定的應用程式，例如 Experience Builder、Instant Apps 與 ArcGIS Solutions，已能滿足許多使用情境。但當您需要高度特定的使用者介面、深度整合第三方資料庫，或複雜的互動式 3D 時，這些現成工具就會遇到極限。這套 AI 輔助工作流程，正是您通往無限客製化的橋梁。只要想得到，就做得出來。'
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
          {ARCHETYPES.map(loc).map((a, i) => (
            <FlipCard
              key={ARCHETYPES[i].title}
              color={a.color}
              height="h-96"
              frontHint={tr('Examples', '應用範例')}
              backHint={tr('Back', '返回')}
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
                        {tr('Value:', '價值：')}
                      </span>
                      {tr(' ', '')}
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
                    {tr(<>Where it&apos;s used</>, '應用場域')}
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
                  {tr(
                    <>This is just a slice of what&apos;s possible.</>,
                    '這只是眾多可能性中的一小部分。'
                  )}
                </h3>
                <p className="mt-1 text-sm text-slate-300/80">
                  {tr(
                    'Every repository is the same process in action: a real problem, real data, and AI-built ArcGIS code.',
                    '每個儲存庫都是這套流程的實際演練：真實的問題、真實的資料，以及由 AI 打造的 ArcGIS 程式碼。'
                  )}
                </p>
              </div>
              <a
                href={BOILERPLATE_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-neon-violet to-neon-blue px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
              >
                <GithubIcon className="h-4 w-4" />
                {tr('Visit Esri on GitHub', '前往 Esri 的 GitHub')}
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
