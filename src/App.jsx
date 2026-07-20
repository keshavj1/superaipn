// import { useState, useEffect } from "react";
import './App.css';
import { Routes, Route } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Loader from './components/Loader';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Partners from './pages/Partners';
import Research from './pages/Research';
import Products from './pages/Products';
import Education from './pages/Education';
import Enterprise from './pages/Enterprise';
import Careers from './pages/Careers';
import Team from './pages/Team';
import Legal from './pages/Legal';
import NotFound from './pages/NotFound';
import PageMeta from './components/PageMeta';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";


function App() {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => setLoading(false), 1000);
  //   return () => clearTimeout(timer);
  // }, []);

  // if (loading) return <Loader />;

  return (
    <>
      <div >
        {/* Resets scroll on every route change — must sit inside the router. */}
        <ScrollToTop />
        {/* Per-route <title>/description/canonical. */}
        <PageMeta />
        {/* First focusable element on the page: lets keyboard users bypass the
            ~12 navbar tab stops that repeat on every route (WCAG 2.4.1). */}
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Partners" element={<Partners />} />
            <Route path="/Research" element={<Research />} />
            <Route path="/Products" element={<Products />} />
            <Route path="/Education" element={<Education />} />
            <Route path="/Enterprise" element={<Enterprise />} />
            <Route path="/solutions/enterprise" element={<Enterprise />} />
            <Route path="/Careers" element={<Careers />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/Team" element={<Team />} />
            <Route path="/team" element={<Team />} />
            <Route path="/privacy" element={<Legal doc="privacy" />} />
            <Route path="/terms" element={<Legal doc="terms" />} />
            <Route path="/cookies" element={<Legal doc="cookies" />} />
            {/* Catch-all: previously an unknown URL rendered a blank page. */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>

      {/* Floating AI assistant — fixed-position widget, overlays every route */}
      <Chatbot />
    </>
  );
}

export default App;
