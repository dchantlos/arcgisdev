import { motion } from 'framer-motion';
import { fadeUp, stagger, viewport } from '../../lib/motion';

/**
 * Consistent section heading: a small glowing "eyebrow" pill, a large
 * gradient title, and an optional subtitle, all with a staggered
 * scroll reveal.
 *
 * @param {string} eyebrow   Small label above the title.
 * @param {React.ReactNode} title
 * @param {React.ReactNode} subtitle
 * @param {'left'|'center'} align
 * @param {React.ReactNode} icon  Optional icon shown inside the eyebrow pill.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  icon: Icon,
  className = '',
}) {
  const alignment =
    align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';

  return (
    <motion.div
      variants={stagger(0.14)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={`flex max-w-3xl flex-col gap-5 ${alignment} ${className}`}
    >
      {eyebrow && (
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-neon-cyan"
        >
          {Icon && <Icon className="h-3.5 w-3.5" />}
          {eyebrow}
        </motion.span>
      )}

      <motion.h2
        variants={fadeUp}
        className="text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={fadeUp}
          className="max-w-2xl text-base leading-relaxed text-slate-300/80 sm:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

export default SectionHeading;
