import { RotateCcw, Smartphone } from 'lucide-react';

/**
 * Full-screen prompt shown only on phones held in landscape. Visibility is
 * driven entirely by a CSS media query (see `.rotate-gate` in index.css) that
 * is guarded by touch-device + phone-width checks, so desktop and tablets are
 * never affected. The markup is always present; CSS decides when to reveal it.
 */
export function RotateGate() {
  return (
    <div
      className="rotate-gate"
      role="alertdialog"
      aria-label="Please rotate your device to portrait mode"
    >
      <div className="rotate-gate__inner">
        <div className="rotate-gate__icon">
          <Smartphone strokeWidth={1.4} />
          <RotateCcw className="rotate-gate__spin" strokeWidth={1.6} />
        </div>
        <h2 className="rotate-gate__title">Rotate your device</h2>
        <p className="rotate-gate__text">
          This experience is built for portrait mode. Turn your phone upright to
          continue.
        </p>
      </div>
    </div>
  );
}

export default RotateGate;
