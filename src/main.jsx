import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
// Vendor CSS first — bootstrap's reboot sets `body { background-color: var(--bs-body-bg) }`,
// which would otherwise override our dark background in index.css.
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css'
import './styles/theme-light.css'

import App from './App.jsx'

// Initialize Lenis smooth scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// Lenis drives its own scroll loop, so overlays that lock body scroll (the
// Careers dialog) have to pause it explicitly.
window.__lenis = lenis

createRoot(document.getElementById('root')).render(
  //  <StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </StrictMode>
)
