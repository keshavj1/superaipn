import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/* ─── Meta Pixel PageView on client-side navigation ───────────────
   The base pixel in index.html only sees the initial page load; React
   Router swaps routes without reloading, so those views would be
   invisible to Meta. This fires a PageView per route change instead.

   The first render is skipped: index.html's own fbq('track','PageView')
   already covered it, and the ref guard also keeps the count stable if
   StrictMode (double-mount) is ever re-enabled in main.jsx. */

export default function PixelTracker() {
    const { pathname } = useLocation();
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        window.fbq?.("track", "PageView");
    }, [pathname]);

    return null;
}
