import { motion } from 'framer-motion';
import { fadeUp, viewport } from '../../lib/motion';

const glowMap = {
  cyan: 'hover:shadow-glow-cyan hover:border-neon-cyan/40',
  violet: 'hover:shadow-glow-violet hover:border-neon-violet/40',
  pink: 'hover:shadow-glow-pink hover:border-neon-pink/40',
  blue: 'hover:shadow-glow-cyan hover:border-neon-blue/40',
};

/**
 * Glassmorphism card with an animated gradient hairline, scroll reveal,
 * and a colour-coded hover glow.
 *
 * @param {'cyan'|'violet'|'pink'|'blue'} glow  Accent colour on hover.
 * @param {boolean} animate  Wrap in a scroll-reveal motion.div (default true).
 * @param {boolean} interactive  Lift slightly on hover (default true).
 */
export function GlassCard({
  children,
  glow = 'cyan',
  className = '',
  animate = true,
  interactive = true,
  ...rest
}) {
  // Always render a motion.div so `whileHover` is a recognised prop even when
  // scroll-reveal is disabled (animate={false}); only the reveal variants are
  // applied conditionally.
  const motionProps = animate
    ? {
        variants: fadeUp,
        initial: 'hidden',
        whileInView: 'show',
        viewport,
      }
    : {};

  return (
    <motion.div
      {...motionProps}
      {...(interactive ? { whileHover: { y: -6 } } : {})}
      className={`group relative overflow-hidden rounded-2xl glass ring-glow transition-colors duration-300 ${glowMap[glow]} ${className}`}
      {...rest}
    >
      {/* top hairline highlight */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      {/* corner accent glow that intensifies on hover */}
      <span className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-current opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20" />
      {children}
    </motion.div>
  );
}

export default GlassCard;
