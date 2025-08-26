import React, { useContext, useState } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

const LanguageButton = () => {
  const { lang, setLang } = useContext(LanguageContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="background-lang-wrapper" style={{ position: "absolute", top: 40, right: 40, zIndex: 1000 }}>
      <span className="background-lang-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
        <img
          src={lang === "sv"
            ? "https://storage.123fakturere.no/public/flags/SE.png"
            : "https://storage.123fakturere.no/public/flags/GB.png"}
          alt={lang === "sv" ? "Swedish" : "English"}
          className="navbar-flag"
        />
        {lang === "sv" ? "Swedish" : "English"}
        <span className="navbar-lang-dropdown">▼</span>
      </span>
      {dropdownOpen && (
        <div className="navbar-lang-menu">
          <div className="navbar-lang-option" onClick={() => { setLang("sv"); setDropdownOpen(false); }}>
            <img src="https://storage.123fakturere.no/public/flags/SE.png" alt="Swedish" className="navbar-flag" />
            Swedish
          </div>
          <div className="navbar-lang-option" onClick={() => { setLang("en"); setDropdownOpen(false); }}>
            <img src="https://storage.123fakturere.no/public/flags/GB.png" alt="English" className="navbar-flag" />
            English
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageButton;
