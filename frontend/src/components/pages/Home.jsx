
import React, { useEffect, useState, useContext, useCallback } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

const API_URL = "https://fakturera-bohg.onrender.com/home-texts";

const Home = () => {
  const { lang } = useContext(LanguageContext);
  const [texts, setTexts] = useState({});

  useEffect(() => {
    fetch(`${API_URL}?lang=${lang}`)
      .then(res => res.json())
      .then(data => setTexts(data));
  }, [lang]);

  const handleGoBack = useCallback(() => {
    // Attempt to emulate: window.close('', '_self', ''); history.back()
    // Some browsers require opening self first before close (especially iOS Safari / older Chrome variants)
    try { window.open('', '_self'); } catch(e) { /* ignore */ }
    let wasClosed = false;
    try {
      window.close();
      // There's no reliable sync flag; we can check later
      wasClosed = window.closed === true;
    } catch(e) { /* ignore */ }
    // If not actually closed (normal case for user-typed URL tabs), use history/back fallback.
    if (!wasClosed) {
      if (window.history.length > 1) {
        window.history.back();
      } else if (document.referrer) {
        window.location.href = document.referrer;
      } else {
        window.location.href = '/';
      }
    }
  }, []);

  return (
    <>
      <div className="home-terms">
        <span className="home-terms-text">{texts.terms || "Terms"}</span>
      </div>
      <div className="home-close-btn-container">
        <button className="home-close-btn go-back-button" onClick={handleGoBack}>
          {texts.close || "Close and Go Back"}
        </button>
      </div>
      <div className="home-container">
        <p style={{ whiteSpace: 'pre-line' }}>
          {texts.main || ""}
        </p>
      </div>
      <div className="home-close-btn-container">
        <button className="home-close-btn go-back-button" onClick={handleGoBack}>
          {texts.close || "Close and Go Back"}
        </button>
      </div>
    </>
  );
}
export default Home;
