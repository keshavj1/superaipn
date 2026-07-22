import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
/* Bootstrap removed entirely. Nothing imported it on purpose anymore (its
   only consumers — the Bootstrap carousel and Collapse examples — were deleted),
   but its stylesheet was still loaded globally and, being unlayered CSS with
   !important utilities, it silently overrode Tailwind across the site:
   `.mb-5` became 3rem!important instead of 20px (the icon-to-title gap on every
   home card), bare h3s inflated to 28px, and p/heading margins were Bootstrap's,
   not ours. Removing it restores the spacing the JSX actually declares and
   drops ~300KB of dead CSS+JS from every page load. */
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
