
import React, { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

const API_URL = "http://localhost:5000/home-texts";

const Home = () => {
  const { lang } = useContext(LanguageContext);
  const [texts, setTexts] = useState({});

  useEffect(() => {
    fetch(`${API_URL}?lang=${lang}`)
      .then(res => res.json())
      .then(data => setTexts(data));
  }, [lang]);

  return (
    <>
      <div className="home-terms">
        <span className="home-terms-text">{texts.terms || "Terms"}</span>
      </div>
      <div className="home-close-btn-container">
        <button className="home-close-btn" onClick={() => window.history.back()}>
          {texts.close || "Close and Go Back"}
        </button>
      </div>
      <div className="home-container">
        <p style={{ whiteSpace: 'pre-line' }}>
          {texts.main || ""}
        </p>
      </div>
            <div className="home-close-btn-container">
        <button className="home-close-btn" onClick={() => window.history.back()}>
          {texts.close || "Close and Go Back"}
        </button>
      </div>
    </>
  );
}
export default Home;
