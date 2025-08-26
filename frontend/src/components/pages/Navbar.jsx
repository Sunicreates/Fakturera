import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext";

const API_URL = "http://localhost:5000/navbar-texts";

const Navbar = () => {
  const { lang } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [texts, setTexts] = useState({});
  // Removed unused dropdownOpen and setDropdownOpen
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}?lang=${lang}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const obj = {};
          data.forEach(item => { obj[item.key] = item.text; });
          setTexts(obj);
        } else {
          setTexts({});
          // Optionally handle error: alert(data.error || "Unknown error");
        }
      });
  }, [lang]);

  return (
    <header className="navbar-header">
      <nav className="navbar-nav">
        {/* Hamburger for mobile */}
        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className="navbar-hamburger-icon">&#9776;</span>
        </button>
          {/* Full navbar for desktop, menu for mobile */}
          <div className={`navbar-group${menuOpen ? ' navbar-group-open' : ''}`}>
            <span onClick={() => {navigate("/"); setMenuOpen(false);}} className="navbar-item">{texts.home || "Home"}</span>
            <span onClick={() => {navigate("/order"); setMenuOpen(false);}} className="navbar-item">{texts.order || "Order"}</span>
            <span onClick={() => {navigate("/customers"); setMenuOpen(false);}} className="navbar-item">{texts.customers || "Our Customers"}</span>
            <span onClick={() => {navigate("/about"); setMenuOpen(false);}} className="navbar-item">{texts.about || "About us"}</span>
            <span onClick={() => {navigate("/contact"); setMenuOpen(false);}} className="navbar-item">{texts.contact || "Contact Us"}</span>
          </div>
      </nav>
    </header>
  );
};

export default Navbar;
