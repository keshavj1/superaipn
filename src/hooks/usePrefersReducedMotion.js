import { useEffect, useState } from "react";

/* The global `@media (prefers-reduced-motion: reduce)` guard in index.css only
   reaches CSS animations and transitions. Three things on this site animate
   from JavaScript and slip past it entirely:
     - the three.js galaxy's autoRotate (a full-viewport scene, spinning forever)
     - the hero's mousemove parallax
     - the testimonial carousel's autoplay
   Those are exactly the kinds of continuous motion WCAG 2.3.3 is about, so
   they need to read the preference directly.

   Also subscribes to changes: a user toggling the OS setting should not have to
   reload the page. */
export default function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e) => setPrefersReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return prefersReduced;
}
