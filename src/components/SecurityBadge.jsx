import { motion } from 'framer-motion';
import { ShieldCheck, Lock } from 'lucide-react';
import { fadeUp, viewport } from '../lib/motion';
import { useI18n } from '../i18n/lang';

/**
 * Prominent enterprise-security banner for the Toolchain section, reassuring
 * that proprietary data stays inside the customer's ArcGIS environment.
 */
export function SecurityBadge() {
  const { tr } = useI18n();
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className="relative overflow-hidden rounded-2xl glass-strong ring-glow p-6 sm:p-8"
    >
      {/* security glow + accent rail */}
      <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-neon-green/20 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1"
        style={{
          background: 'linear-gradient(var(--color-neon-green), transparent)',
        }}
      />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-neon-green/15"
          style={{ boxShadow: '0 0 34px -8px var(--color-neon-green)' }}
        >
          <ShieldCheck className="h-8 w-8 text-neon-green" />
        </div>
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-white sm:text-xl">
            <Lock className="h-4 w-4 text-neon-green" />
            {tr('Enterprise-Grade Data Privacy', '企業級資料隱私')}
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300/85">
            {tr(
              <>
                Your domain logic and prompt engineering direct the build.
                Proprietary client data and secured feature services never leave your
                ArcGIS environment.{' '}
                <span className="font-semibold text-white">
                  The AI writes the code; ArcGIS secures the data.
                </span>
              </>,
              <>
                由您的領域邏輯與提示工程主導建置。客戶的專有資料與受保護的圖徵服務，絕不會離開您的 ArcGIS 環境。
                <span className="font-semibold text-white">
                  AI 撰寫程式碼，ArcGIS 守護資料。
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default SecurityBadge;
