import { useEffect, useRef } from "react";

/* Scroll-reveal for sections carrying .reveal-fade-up / .reveal /
   .reveal-scale (index.css). Same battle-tested implementation Enterprise.jsx
   carries inline; extracted here so new pages share one copy instead of
   growing another fork. Returns a ref-callback: attach it to every element
   that should reveal. */
export default function useReveal() {
    const revealRefs = useRef([]);

    const addToRefs = (el) => {
        if (el && !revealRefs.current.includes(el)) {
            revealRefs.current.push(el);
        }
    };

    useEffect(() => {
        const pending = new Set(revealRefs.current);

        const reveal = (el) => {
            el.classList.add("revealed");
            observer.unobserve(el);
            pending.delete(el);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) reveal(entry.target);
            });
        }, {
            /* threshold 0 + margin, not threshold 0.1: requiring 10% of a
               section visible at once means a section taller than ~10 viewports
               can NEVER reveal on a short screen. Edge-triggered reveal works
               at any section height. */
            threshold: 0,
            rootMargin: "0px 0px -10% 0px",
        });
        pending.forEach((el) => observer.observe(el));

        /* IntersectionObserver misses elements that pass entirely through the
           viewport within one frame — fast flick-scrolls, the End key, and
           full-page screenshot tools all do this. This rAF-throttled scroll
           check reveals anything the observer skipped. */
        let raf = null;
        const onScroll = () => {
            if (raf !== null) return;
            raf = requestAnimationFrame(() => {
                raf = null;
                const limit = window.innerHeight;
                pending.forEach((el) => {
                    if (el.getBoundingClientRect().top < limit) reveal(el);
                });
            });
        };
        window.addEventListener("scroll", onScroll, { passive: true });

        /* Failsafe: nothing may stay hidden forever. Lenis owns the scroll
           loop and overrides programmatic native jumps, which starves
           IntersectionObserver under scroll-and-stitch capture tools, print,
           and some assistive tech. */
        const failsafe = setTimeout(() => {
            pending.forEach((el) => reveal(el));
        }, 4000);

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", onScroll);
            if (raf !== null) cancelAnimationFrame(raf);
            clearTimeout(failsafe);
        };
    }, []);

    return addToRefs;
}
