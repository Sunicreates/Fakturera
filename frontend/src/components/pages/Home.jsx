
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
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

  const handleClose = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate('/');
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
