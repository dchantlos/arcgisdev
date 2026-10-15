import { RotateCcw, Smartphone } from 'lucide-react';
import { useI18n } from '../i18n/lang';

/**
 * Full-screen prompt shown only on phones held in landscape. Visibility is
 * driven entirely by a CSS media query (see `.rotate-gate` in index.css) that
 * is guarded by touch-device + phone-width checks, so desktop and tablets are
 * never affected. The markup is always present; CSS decides when to reveal it.
 */
export function RotateGate() {
  const { tr } = useI18n();
  return (
    <div
      className="rotate-gate"
      role="alertdialog"
      aria-label={tr(
        'Please rotate your device to portrait mode',
        '請將裝置轉為直向模式'
      )}
    >
      <div className="rotate-gate__inner">
        <div className="rotate-gate__icon">
          <Smartphone strokeWidth={1.4} />
          <RotateCcw className="rotate-gate__spin" strokeWidth={1.6} />
        </div>
        <h2 className="rotate-gate__title">
          {tr('Rotate your device', '請旋轉您的裝置')}
        </h2>
        <p className="rotate-gate__text">
          {tr(
            'This experience is built for portrait mode. Turn your phone upright to continue.',
            '此體驗專為直向模式設計，請將手機轉為直向以繼續瀏覽。'
          )}
        </p>
      </div>
    </div>
  );
}

export default RotateGate;
