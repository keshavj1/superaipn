import { lazy, Suspense, useEffect, useRef, useState } from "react";
import HeroSection from "../components/Herosection";
import ErrorBoundary from "../components/ErrorBoundary";
import VideoShowcase from "../components/VideoShowcase";
import AIEcosystem from "../components/AIEcosystem";
import ProvenTraction from "../components/ProvenTraction";
import KeyMilestones from "../components/KeyMilestones";
import WhySuperAIP from "../components/WhySuperAIP";
import ClientsSection from "../components/ClientsSection";
import FAQSection from "../components/FAQSection";
import FinalCTA from "../components/FinalCTA";

/* three.js is 653 kB (176 kB gzipped) — by far the heaviest dependency in the
   app, and it exists for one decorative section that sits below the hero and is
   not visible on first paint. Importing it statically meant every homepage
   visitor waited on it before anything rendered. */
const GalaxyEffect1 = lazy(() => import("../components/GalaxyEffect1"));

/* Mounts its children only once they are near the viewport, so the three.js
   chunk is requested as the user approaches it rather than on page load.
   rootMargin starts the fetch a screen early, so it is normally ready by the
   time the section is actually reached. */
function LazyOnApproach({ children, minHeight }) {
  const ref = useRef(null);
  /* Without IntersectionObserver there is no way to detect approach, so render
     immediately rather than leaving a permanent blank band. Decided at mount —
     this is initial state, not something to synchronise in an effect. */
  const [show, setShow] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    const el = ref.current;
    if (!el || show) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [show]);

  // minHeight reserves the space so the page below does not jump when it mounts.
  return <div ref={ref} style={{ minHeight }}>{show ? children : null}</div>;
}

function Home() {
  return (
    <>
      <HeroSection />

      {/* Purely decorative. If three.js or WebGL fails, drop the section
          silently rather than letting the throw blank the whole homepage. */}
      <ErrorBoundary silent>
        <LazyOnApproach minHeight="100vh">
          <Suspense fallback={null}>
            <GalaxyEffect1 />
          </Suspense>
        </LazyOnApproach>
      </ErrorBoundary>

      <VideoShowcase />
      <AIEcosystem />
      <ProvenTraction />
      <KeyMilestones />
      <WhySuperAIP />
      {/* Re-enabled: the three invented endorsements this shipped with have
          been replaced by real, attributable partner quotes. */}
      <ClientsSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}

export default Home;
