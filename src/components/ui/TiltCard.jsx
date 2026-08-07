import { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { fadeUp, viewport } from '../../lib/motion';

const glowMap = {
  cyan: 'hover:shadow-glow-cyan hover:border-neon-cyan/40',
  violet: 'hover:shadow-glow-violet hover:border-neon-violet/40',
  pink: 'hover:shadow-glow-pink hover:border-neon-pink/40',
  blue: 'hover:shadow-glow-cyan hover:border-neon-blue/40',
  green: 'hover:shadow-glow-cyan hover:border-neon-green/40',
  amber: 'hover:shadow-glow-cyan hover:border-neon-amber/40',
};

const glowColor = {
  cyan: 'var(--color-neon-cyan)',
  violet: 'var(--color-neon-violet)',
  pink: 'var(--color-neon-pink)',
  blue: 'var(--color-neon-blue)',
  green: 'var(--color-neon-green)',
  amber: 'var(--color-neon-amber)',
};

/**
 * A glass card that tilts in 3D toward the cursor and reveals a spotlight
 * glow that tracks the mouse, the same "follows your mouse" feel as the
 * hero. A tactile hover response for otherwise non-clickable content cards.
 */
export function TiltCard({
  children,
  glow = 'cyan',
  className = '',
  animate = true,
  max = 8,
}) {
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const spring = { stiffness: 150, damping: 18, mass: 0.3 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);

  const sx = useTransform(px, (v) => `${v * 100}%`);
  const sy = useTransform(py, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(220px circle at ${sx} ${sy}, color-mix(in oklab, ${glowColor[glow]} 22%, transparent), transparent 65%)`;

  const handleMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const reveal = animate
    ? { variants: fadeUp, initial: 'hidden', whileInView: 'show', viewport }
    : {};

  return (
    <motion.div {...reveal} style={{ perspective: '1000px' }} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY }}
        className={`group relative h-full overflow-hidden rounded-2xl border border-white/10 glass ring-glow transition-[box-shadow,border-color] duration-300 ${glowMap[glow]} ${className}`}
      >
        {/* cursor-tracking spotlight */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlight }}
        />
        {/* top hairline highlight */}
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="relative z-10 flex h-full flex-col">{children}</div>
      </motion.div>
    </motion.div>
  );
}

export default TiltCard;
