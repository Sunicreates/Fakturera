
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './components/contexts/LanguageContext';
import Navbar from './components/pages/Navbar';
import BackgroundLayout from './components/background/BackgroundLayout';
import Home from './components/pages/Home';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <BackgroundLayout>
          <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
        </BackgroundLayout>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;

