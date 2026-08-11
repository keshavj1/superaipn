import React, { useRef } from "react";
import { ArrowRight, PlayCircle, CheckCircle2, ScanFace, Flame, ShieldAlert } from "lucide-react";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

/* Served from public/videos — not bundled, so large media never enters the
   build (same convention as Enterprise.jsx). */
const DEMO_VIDEO = "/videos/NeuraEaglei_PP.mp4";

const TRUST_POINTS = [
    "No New Hardware",
    "Works with Existing Cameras",
    "On-Premise Deployment",
    "Enterprise Grade Security",
];

/* Lenis (main.jsx) owns the scroll loop; native scrollIntoView gets snapped
   back on its next frame, so in-page scrolls must go through the instance. */
function scrollToTarget(target, reduced) {
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(target, { offset: -90, immediate: reduced });
    else target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}

export default function EagleHero() {
    const videoRef = useRef(null);
    const prefersReduced = usePrefersReducedMotion();

    const handleBookDemo = (e) => {
        const form = document.getElementById("book-demo");
        if (!form) return; // fall through to the native #book-demo jump
        e.preventDefault();
        scrollToTarget(form, prefersReduced);
    };

    const handleWatchDemo = () => {
        const video = videoRef.current;
        if (!video) return;
        scrollToTarget(video, prefersReduced);
        const playing = video.play();
        /* An autoplay-policy refusal is fine — the video is in view with
           native controls showing. */
        if (playing?.catch) playing.catch(() => { });
    };

    return (
        <section className="ne-hero" aria-labelledby="ne-hero-title">
            <div className="ne-hero-grid">
                <div>
                    <div className="about-hero-badge ne-hero-badge">
                        <span className="pulse-dot" />
                        NeuraEaglei — Vision Intelligence
                    </div>
                    <h1 id="ne-hero-title" className="ne-hero-title">
                        Turn Existing CCTV Cameras into{" "}
                        <span className="ne-hero-highlight">
                            {/* no-break: the browser otherwise splits at the
                                hyphen and strands "AI-" at a line end */}
                            <span style={{ whiteSpace: "nowrap" }}>AI-Powered</span>{" "}
                            Enterprise Intelligence
                        </span>
                    </h1>
                    <p className="ne-hero-sub">
                        Detect safety risks, security incidents, compliance violations, and
                        operational events in real time.
                    </p>
                    <div className="ne-hero-ctas">
                        <a href="#book-demo" onClick={handleBookDemo} className="ne-btn-primary">
                            Book Live Demo <ArrowRight size={18} aria-hidden="true" />
                        </a>
                        <button type="button" onClick={handleWatchDemo} className="ne-btn-secondary">
                            <PlayCircle size={18} aria-hidden="true" /> Watch 2-Min Demo
                        </button>
                    </div>
                    <ul className="ne-trust-points">
                        {TRUST_POINTS.map((point) => (
                            <li key={point}>
                                <CheckCircle2 size={16} aria-hidden="true" /> {point}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* The proof, not a screenshot: the demo reel framed as the
                    product's own monitoring console. Chips are illustrative
                    demo states (aria-hidden, pointer-events: none). */}
                <div className="ne-console">
                    <div className="ne-console-head">
                        <span className="ne-console-dots" aria-hidden="true">
                            <span /><span /><span />
                        </span>
                        <span className="ne-console-title">NeuraEaglei Console — Product Preview</span>
                        <span className="ne-console-live">
                            <span className="ne-live-dot" aria-hidden="true" /> Live Demo
                        </span>
                    </div>
                    <div className="ne-console-body">
                        <video
                            ref={videoRef}
                            src={DEMO_VIDEO}
                            aria-label="NeuraEaglei two-minute product demo"
                            className="ne-console-video"
                            controls
                            muted
                            playsInline
                            preload="metadata"
                        />
                        <div className="ne-console-chips" aria-hidden="true">
                            <span className="ne-chip"><Flame size={12} /> Fire Watch — Clear</span>
                            <span className="ne-chip"><ScanFace size={12} /> PPE Check — Active</span>
                            <span className="ne-chip"><ShieldAlert size={12} /> Zone Secure</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
