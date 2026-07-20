import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/* ─── Scroll management on navigation ─────────────────────────────
   Handles both halves of "clicking a link lands you in the right place":

   • No hash  → reset to the top. React Router keeps the previous scroll
     offset across route changes, so without this a navbar click drops
     you mid-page.
   • With hash → scroll to that element, e.g. /Enterprise#neuraedge.
     The browser only resolves hashes on a full page load; during a
     client-side navigation the target does not exist yet when the URL
     changes, so nothing happens unless we do it here.

   Two environment details shape the implementation:

   1. Lenis (main.jsx) runs its own animation loop and tracks a virtual
      scroll position. `window.scrollTo` moves only the real one, so
      Lenis snaps back on its next frame — it has to be driven directly
      through the instance exposed as `window.__lenis`.
   2. The browser's own scroll restoration fires asynchronously after a
      history change and would undo our work, so it is set to manual. */

/* Cleared by the fixed navbar so anchored headings are not hidden
   underneath it. Matches the offset Products.jsx already used. */
const NAV_OFFSET = 90;

/* Sections animate in on scroll-reveal, so a target can mount a frame or
   two after the route does. Retry across a few frames before giving up
   rather than scrolling to a stale position. */
const MAX_LOOKUP_FRAMES = 30;

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    const lenis = window.__lenis;

    const scrollTo = (top) => {
      // `immediate` skips the easing: navigation should feel instant
      // rather than animating through the whole previous page.
      if (lenis) lenis.scrollTo(top, { immediate: true, force: true });
      else window.scrollTo(0, top);
    };

    if (!hash) {
      scrollTo(0);
      window.scrollTo(0, 0); // covers the first paint, before Lenis is ready
      return;
    }

    const id = decodeURIComponent(hash.slice(1));
    let frame;
    let attempts = 0;

    const findAndScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
        scrollTo(Math.max(0, top));
        return;
      }
      if (attempts++ < MAX_LOOKUP_FRAMES) {
        frame = requestAnimationFrame(findAndScroll);
      }
    };

    findAndScroll();
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
