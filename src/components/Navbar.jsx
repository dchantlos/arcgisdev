import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Languages, Menu, X } from 'lucide-react';
import { GithubIcon } from './ui/GithubIcon';
import esriDevelopers from '../assets/esri-developers.png';
import { useI18n, ZH } from '../i18n/lang';

const LINKS = [
  { label: 'How It Works', href: '#ensemble', zh: { label: '運作方式' } },
  { label: 'The Human', href: '#human', zh: { label: '人的角色' } },
  { label: 'The Toolchain', href: '#toolchain', zh: { label: '工具鏈' } },
  { label: 'App Catalog', href: '#solutions', zh: { label: '應用程式目錄' } },
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
  const { isZh, setLang, tr, loc } = useI18n();

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
        <a
          href="https://developers.arcgis.com/"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-3"
        >
          <span className="relative flex h-9 w-9 items-center justify-center">
            <img
              src={esriDevelopers}
              alt="Esri Developers"
              className="h-9 w-9 rounded-xl transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 -z-10 rounded-xl bg-neon-blue/40 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
          </span>
          <span className="block break-keep text-sm font-semibold tracking-tight text-white">
            {tr(
              <>Develop with <span className="text-gradient">ArcGIS</span></>,
              <>使用 <span className="text-gradient">ArcGIS</span> 開發</>
            )}
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
              <span className="relative z-10">{loc(l).label}</span>
              <span className="absolute inset-0 -z-0 scale-90 rounded-lg bg-white/5 opacity-0 transition-all duration-200 hover:scale-100 hover:opacity-100" />
            </a>
          ))}
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Label is in the target language so each audience can find it */}
          <button
            type="button"
            onClick={() => setLang(isZh ? 'en' : ZH)}
            lang={isZh ? 'en' : ZH}
            aria-label={isZh ? 'Switch to English' : '切換為繁體中文'}
            title={isZh ? 'Switch to English' : '切換為繁體中文'}
            className="group inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl border border-white/10 bg-white/5 px-2.5 py-2 text-sm font-semibold text-white transition-all hover:border-neon-cyan/50 hover:shadow-glow-cyan sm:px-3"
          >
            <Languages className="hidden h-4 w-4 text-neon-cyan transition-transform group-hover:scale-110 sm:block" />
            {isZh ? 'EN' : '中文'}
          </button>
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
            aria-label={tr('Toggle menu', '切換選單')}
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
              {loc(l).label}
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
