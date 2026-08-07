import { useRef, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { FlipHorizontal2 } from 'lucide-react';
import { fadeUp } from '../../lib/motion';

/**
 * A glassmorphism card that flips on click to reveal a second face.
 * Genuinely interactive (button + aria-pressed) with a visible "flip"
 * affordance, so it never looks clickable without doing anything.
 *
 * @param {string} color     Accent colour (CSS value) for glow + hints.
 * @param {string} height    Tailwind height class for both faces (fixed).
 * @param {string} frontHint Small label on the front flip badge.
 * @param {string} backHint  Small label on the back flip badge.
 * @param {React.ReactNode} front  Front-face content.
 * @param {React.ReactNode} back   Back-face content.
 */
export function FlipCard({
  color = 'var(--color-neon-cyan)',
  height = 'h-72',
  frontHint = 'Flip',
  backHint = 'Back',
  front,
  back,
  className = '',
}) {
  const [flipped, setFlipped] = useState(false);

  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useTransform(px, (v) => `${v * 100}%`);
  const sy = useTransform(py, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(240px circle at ${sx} ${sy}, color-mix(in oklab, ${color} 20%, transparent), transparent 65%)`;

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

  const face =
    'absolute inset-0 flex flex-col overflow-hidden rounded-2xl glass ring-glow p-6';
  const faceStyle = {
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
  };
  const badge =
    'absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider transition-all duration-300';

  return (
    <motion.div
      ref={ref}
      role="button"
      tabIndex={0}
      variants={fadeUp}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.985 }}
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      aria-pressed={flipped}
      style={{ '--glow': color }}
      className={`group relative w-full cursor-pointer select-none text-left transition-shadow duration-300 [perspective:1600px] hover:shadow-[0_0_38px_-8px_var(--glow)] ${height} ${className}`}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative h-full w-full"
      >
        {/* FRONT */}
        <div style={faceStyle} className={`${face} transition-colors duration-300`}>
          {/* cursor-tracking spotlight, the mouse-follow glow used by the tilt cards */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: spotlight }}
          />
          {/* accent border highlight on hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${color} 55%, transparent)`,
            }}
          />
          <div className="relative z-10 flex flex-1 flex-col">{front}</div>
          <span
            className={`${badge} text-slate-400 opacity-70 group-hover:opacity-100`}
            style={{ borderColor: `color-mix(in oklab, ${color} 45%, transparent)` }}
          >
            <FlipHorizontal2 className="h-3 w-3" style={{ color }} />
            {frontHint}
          </span>
        </div>

        {/* BACK */}
        <div
          style={{
            ...faceStyle,
            transform: 'rotateY(180deg)',
            borderColor: `color-mix(in oklab, ${color} 45%, transparent)`,
          }}
          className={face}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-12 -left-12 h-28 w-28 rounded-full opacity-25 blur-3xl"
            style={{ background: color }}
          />
          {back}
          <span
            className={`${badge} border-white/10 text-slate-400`}
          >
            <FlipHorizontal2 className="h-3 w-3" style={{ color }} />
            {backHint}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default FlipCard;
