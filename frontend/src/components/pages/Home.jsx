
import React, { useEffect, useState, useContext, useCallback } from "react";
import { LanguageContext } from "../contexts/LanguageContext";

const API_URL = "https://fakturera-bohg.onrender.com/home-texts";

const Home = () => {
  const { lang } = useContext(LanguageContext);
  const [texts, setTexts] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}?lang=${lang}`, { signal: controller.signal });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setTexts(data || {});
      } catch (e) {
        if (e.name !== 'AbortError') {
          setError(e.message || 'Failed to load');
        }
      } finally {
        // Only end loading if not aborted
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    load();
    return () => controller.abort();
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
        <h1 className="home-terms-text">{texts.terms || (loading ? '' : 'Terms')}</h1>
      </div>
      <div aria-live="polite" style={{position:'absolute', left:'-9999px', height:0, overflow:'hidden'}}>
        {loading ? 'Loading content' : ''}
        {error ? `Error: ${error}` : ''}
      </div>
      <div className="home-close-btn-container">
        <button className="home-close-btn go-back-button" onClick={handleGoBack}>
          {texts.close || "Close and Go Back"}
        </button>
      </div>
      <div className="home-container">
        {loading && (
          <p style={{margin:0}}>Loading...</p>
        )}
        {error && !loading && (
          <p style={{color:'#b00020', margin:0}}>Could not load content. {error}</p>
        )}
        {!loading && !error && (
          <p style={{ whiteSpace: 'pre-line', margin:0 }}>
            {texts.main || ''}
          </p>
        )}
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
