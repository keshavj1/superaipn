import { lazy, Suspense } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Home from './pages/Home';
import PageMeta from './components/PageMeta';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import PixelTracker from './components/PixelTracker';
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import ErrorBoundary from "./components/ErrorBoundary";

/* Every route used to be a static import, so a visitor landing on the homepage
   downloaded and parsed all 14 pages — including three.js, Swiper and
   slick-carousel — before anything rendered. Splitting per route lets each page
   arrive on navigation instead.

   Home stays eagerly imported: it is the most common entry point, and lazily
   loading it would only add a network round trip before the first paint. */
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Partners = lazy(() => import('./pages/Partners'));
const Research = lazy(() => import('./pages/Research'));
const Products = lazy(() => import('./pages/Products'));
const Education = lazy(() => import('./pages/Education'));
const Enterprise = lazy(() => import('./pages/Enterprise'));
const NeuraEaglei = lazy(() => import('./pages/NeuraEaglei'));
const Neurabot = lazy(() => import('./pages/Neurabot'));
const ThankYou = lazy(() => import('./pages/ThankYou'));
const Careers = lazy(() => import('./pages/Careers'));
const Team = lazy(() => import('./pages/Team'));
const Legal = lazy(() => import('./pages/Legal'));
const VerifyCertificate = lazy(() => import('./pages/VerifyCertificate'));
const NotFound = lazy(() => import('./pages/NotFound'));

/* Shown while a route chunk is in flight. Deliberately minimal — a spinner that
   appears for 100ms reads as a flicker, so this just holds the viewport height
   to stop the footer jumping up and back down. role="status" announces the wait
   to screen readers. */
function RouteFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page"
      style={{ minHeight: '70vh' }}
    />
  );
}

function App() {
  return (
    <>
      <div>
        {/* Resets scroll on every route change — must sit inside the router. */}
        <ScrollToTop />
        {/* Per-route <title>/description/canonical. */}
        <PageMeta />
        {/* Meta Pixel PageView per client-side route change. */}
        <PixelTracker />
        {/* First focusable element on the page: lets keyboard users bypass the
            ~12 navbar tab stops that repeat on every route (WCAG 2.4.1). */}
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          {/* A route that throws now shows a recovery message instead of
              blanking the page. Inside <main> so the navbar, footer and skip
              link survive the failure and the user can still navigate out. */}
          <ErrorBoundary>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/About" element={<About />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/Partners" element={<Partners />} />
                <Route path="/Research" element={<Research />} />
                <Route path="/Products" element={<Products />} />
                <Route path="/Education" element={<Education />} />
                <Route path="/Enterprise" element={<Enterprise />} />
                <Route path="/NeuraEaglei" element={<NeuraEaglei />} />
                <Route path="/Neurabot" element={<Neurabot />} />
                {/* Post-submit confirmation for every site form. */}
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path="/Careers" element={<Careers />} />
                <Route path="/Team" element={<Team />} />
                <Route path="/privacy" element={<Legal doc="privacy" />} />
                <Route path="/terms" element={<Legal doc="terms" />} />
                <Route path="/cookies" element={<Legal doc="cookies" />} />
                {/* A scanned QR opens the certificate directly: /certificate?id=<number>.
                    /verify kept as an alias so any earlier links still resolve. */}
                <Route path="/certificate" element={<VerifyCertificate />} />
                <Route path="/verify" element={<VerifyCertificate />} />
                {/* Catch-all: previously an unknown URL rendered a blank page. */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>

      {/* Floating AI assistant — fixed-position widget, overlays every route */}
      <ErrorBoundary silent>
        <Chatbot />
      </ErrorBoundary>
    </>
  );
}

export default App;
