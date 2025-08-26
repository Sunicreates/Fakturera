import React, { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('app_lang') || 'en';
    } catch { return 'en'; }
  });

  useEffect(() => {
    try { localStorage.setItem('app_lang', lang); } catch { /* ignore */ }
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};
