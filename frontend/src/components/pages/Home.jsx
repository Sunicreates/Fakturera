
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
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

  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    /*
      Strategy:
      1. If SPA history index > 0 -> navigate(-1)
      2. Else if not already at root -> go root
      3. Else final fallback: replace location (can set external landing)
    */
    const canGoBackSPA = window.history.state && typeof window.history.state.idx === 'number' && window.history.state.idx > 0;
    if (canGoBackSPA) {
      navigate(-1);
      return;
    }
    if (location.pathname !== '/') {
      navigate('/');
      return;
    }
    // Attempt to close the tab (will only work if this tab was script‑opened)
    window.open('', '_self');
    window.close();
    // If still open, fallback: navigate to a neutral blank page (may show blank tab) or external URL.
    if (!document.hidden) {
      window.location.replace('about:blank');
    }
  };

  return (
    <>
      <div className="home-terms">
        <span className="home-terms-text">{texts.terms || "Terms"}</span>
      </div>
      <div className="home-close-btn-container">
        <button className="home-close-btn" onClick={handleClose}>
          {texts.close || "Close and Go Back"}
        </button>
      </div>
      <div className="home-container">
        <p style={{ whiteSpace: 'pre-line' }}>
          {texts.main || ""}
        </p>
      </div>
      <div className="home-close-btn-container">
        <button className="home-close-btn" onClick={handleClose}>
          {texts.close || "Close and Go Back"}
        </button>
      </div>
    </>
  );
}
export default Home;
