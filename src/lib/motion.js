// Shared Framer Motion variants + easings used across sections.
// Keeping them here keeps the section components clean and consistent.

export const EASE = [0.22, 1, 0.36, 1]; // "easeOutExpo"-ish

// Fade + rise, great for scroll reveals
export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

export const fromLeft = {
  hidden: { opacity: 0, x: -48 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

export const fromRight = {
  hidden: { opacity: 0, x: 48 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

// Parent that staggers its children
export const stagger = (staggerChildren = 0.12, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

// Sensible default for scroll-triggered sections
export const viewport = { once: true, amount: 0.25 };
