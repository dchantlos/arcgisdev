import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { GithubIcon } from './ui/GithubIcon';
import esriDevelopers from '../assets/esri-developers.png';

const LINKS = [
  { label: 'The Ensemble', href: '#ensemble' },
  { label: 'The Human', href: '#human' },
  { label: 'The Toolchain', href: '#toolchain' },
  { label: 'App Catalog', href: '#solutions' },
];

const GITHUB_PROFILE = 'https://github.com/Esri';

export function Navbar() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300 sm:px-6 ${
          scrolled
            ? 'my-3 rounded-2xl glass-strong py-2.5 shadow-glow-cyan'
            : 'my-4 py-3'
        }`}
      >
        {/* Brand */}
        <a href="#top" className="group flex items-center gap-3">
          <span className="relative flex h-9 w-9 items-center justify-center">
            <img
              src={esriDevelopers}
              alt="Esri Developers"
              className="h-9 w-9 rounded-xl transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 -z-10 rounded-xl bg-neon-blue/40 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
          </span>
          <span className="hidden text-sm font-semibold tracking-tight text-white sm:block">
            Develop with <span className="text-gradient">ArcGIS</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative rounded-lg px-3.5 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              <span className="relative z-10">{l.label}</span>
              <span className="absolute inset-0 -z-0 scale-90 rounded-lg bg-white/5 opacity-0 transition-all duration-200 hover:scale-100 hover:opacity-100" />
            </a>
          ))}
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-2">
          <a
            href={GITHUB_PROFILE}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm font-semibold text-white transition-all hover:border-neon-cyan/50 hover:shadow-glow-cyan"
          >
            <GithubIcon className="h-4 w-4 transition-transform group-hover:scale-110" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mb-2 flex flex-col gap-1 rounded-2xl glass-strong p-2 lg:hidden"
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium text-slate-200 transition-colors hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </motion.div>
      )}

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="h-0.5 origin-left bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-violet"
      />
    </motion.header>
  );
}

export default Navbar;
