import { useEffect, useState } from 'react';
import { LanguageContext, ZH } from './lang';

const STORAGE_KEY = 'lang';

// A ?lang=zh-TW link (e.g. from a QR code) wins over the remembered choice.
function initialLang() {
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (fromUrl?.toLowerCase() === ZH.toLowerCase()) return ZH;
  if (fromUrl === 'en') return 'en';
  try {
    return localStorage.getItem(STORAGE_KEY) === ZH ? ZH : 'en';
  } catch {
    return 'en';
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = lang === ZH ? '使用 ArcGIS 開發' : 'Develop with ArcGIS';
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Storage blocked: the toggle still works for this visit.
    }
    // Keep a shared ?lang= link in sync so a reload honours the latest toggle.
    const url = new URL(window.location.href);
    if (url.searchParams.has('lang')) {
      url.searchParams.set('lang', lang);
      window.history.replaceState(null, '', url);
    }
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;
