import { memo, useEffect, useMemo } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';

/**
 * Full-viewport ambient backdrop that sits behind all content.
 * Layers: base gradient wash → animated aurora blobs → blueprint grid
 * → drifting particles → subtle vignette. Purely decorative.
 */
function AnimatedBackgroundBase() {
  // Deterministic particle field (no re-randomising between renders)
  const particles = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        left: `${(i * 37.5) % 100}%`,
        top: `${(i * 53.3) % 100}%`,
        size: 1 + ((i * 7) % 3),
        delay: `${(i % 9) * -0.9}s`,
        duration: `${5 + ((i * 3) % 7)}s`,
        color:
          i % 4 === 0
            ? 'var(--color-neon-cyan)'
            : i % 4 === 1
              ? 'var(--color-neon-violet)'
              : i % 4 === 2
                ? 'var(--color-neon-blue)'
                : 'var(--color-neon-pink)',
      })),
    []
  );

  // Ambient mouse parallax: the whole backdrop drifts toward the cursor.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sp = { stiffness: 50, damping: 20, mass: 0.6 };
  const bx1 = useSpring(useTransform(mx, [-0.5, 0.5], [-30, 30]), sp);
  const by1 = useSpring(useTransform(my, [-0.5, 0.5], [-30, 30]), sp);
  const bx2 = useSpring(useTransform(mx, [-0.5, 0.5], [42, -42]), sp);
  const by2 = useSpring(useTransform(my, [-0.5, 0.5], [42, -42]), sp);
  const bx3 = useSpring(useTransform(mx, [-0.5, 0.5], [-22, 22]), sp);
  const by3 = useSpring(useTransform(my, [-0.5, 0.5], [22, -22]), sp);

  useEffect(() => {
    const reduce = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reduce) return undefined;
    const onMove = (e) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base gradient wash: Esri blue + mapping teal */}
      <div className="absolute inset-0 bg-ink-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,121,193,0.22),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_90%_20%,rgba(20,184,166,0.13),transparent_55%)]" />

      {/* Animated aurora blobs that drift with the cursor for depth */}
      <motion.div
        style={{ x: bx1, y: by1 }}
        className="absolute -left-32 top-20 h-[42rem] w-[42rem]"
      >
        <div className="animate-aurora h-full w-full rounded-full bg-neon-blue/20 blur-[120px]" />
      </motion.div>
      <motion.div
        style={{ x: bx2, y: by2 }}
        className="absolute right-[-10rem] top-[30rem] h-[38rem] w-[38rem]"
      >
        <div
          className="animate-aurora h-full w-full rounded-full bg-neon-violet/20 blur-[120px]"
          style={{ animationDelay: '-6s' }}
        />
      </motion.div>
      <motion.div
        style={{ x: bx3, y: by3 }}
        className="absolute bottom-[-8rem] left-1/3 h-[34rem] w-[34rem]"
      >
        <div
          className="animate-aurora h-full w-full rounded-full bg-neon-cyan/15 blur-[120px]"
          style={{ animationDelay: '-12s' }}
        />
      </motion.div>

      {/* Cartographic graticule grid + radial fade mask */}
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] opacity-60" />

      {/* Topographic contour motif: faint concentric "elevation" rings */}
      <div
        className="absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(ellipse_at_center,black,transparent_82%)]"
        style={{
          backgroundImage:
            'repeating-radial-gradient(circle at 16% 28%, transparent 0 43px, color-mix(in oklab, var(--color-neon-blue) 13%, transparent) 43px 45px), repeating-radial-gradient(circle at 84% 72%, transparent 0 52px, color-mix(in oklab, var(--color-neon-cyan) 10%, transparent) 52px 54px)',
        }}
      />

      {/* Drifting particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="animate-float absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 8px ${p.color}`,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: 0.7,
          }}
        />
      ))}

      {/* Vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(3,5,9,0.85))]" />
    </div>
  );
}

export const AnimatedBackground = memo(AnimatedBackgroundBase);
export default AnimatedBackground;
