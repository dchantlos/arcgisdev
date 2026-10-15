import { createContext, useContext } from 'react';

export const ZH = 'zh-TW';

export const LanguageContext = createContext({ lang: 'en', setLang: () => {} });

/**
 * tr('English', '繁體中文') picks the copy (string or JSX) for the active
 * language. loc(item) overlays an item's `zh` fields when Chinese is active.
 */
export function useI18n() {
  const { lang, setLang } = useContext(LanguageContext);
  const isZh = lang === ZH;
  return {
    lang,
    setLang,
    isZh,
    tr: (en, zh) => (isZh ? zh : en),
    loc: (item) => (isZh && item.zh ? { ...item, ...item.zh } : item),
  };
}
