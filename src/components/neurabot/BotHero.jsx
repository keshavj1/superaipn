import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquareText, CheckCircle2, MessageCircle, Database, Clock } from "lucide-react";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

/* Served from public/videos — not bundled, so large media never enters the
   build (same convention as EagleHero.jsx). */
const DEMO_VIDEO = "/videos/NeuraBot_PP.mp4";

const TRUST_POINTS = [
    "Enterprise Security",
    "Multi-language Support",
    "Omnichannel Conversations",
    "Cloud or On-Premise",
];

/* Lenis (main.jsx) owns the scroll loop; native scrollIntoView gets snapped
   back on its next frame, so in-page scrolls must go through the instance. */
function scrollToTarget(target, reduced) {
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(target, { offset: -90, immediate: reduced });
    else target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}

export default function BotHero() {
    const prefersReduced = usePrefersReducedMotion();

    const handleBookDemo = (e) => {
        const form = document.getElementById("book-demo");
        if (!form) return; // fall through to the native #book-demo jump
        e.preventDefault();
        scrollToTarget(form, prefersReduced);
    };

    return (
        <section className="nb-hero" aria-labelledby="nb-hero-title">
            <div className="nb-hero-grid">
                <div>
                    <div className="about-hero-badge nb-hero-badge">
                        <span className="pulse-dot" />
                        NeuraBOT — Conversational AI
                    </div>
                    <h1 id="nb-hero-title" className="nb-hero-title">
                        NeuraBot:{" "}
                        <span className="nb-hero-highlight">
                            Enterprise AI Chatbot Solutions
                        </span>{" "}
                        for Every Business Need
                    </h1>
                    <p className="nb-hero-sub">
                        Whether you need an AI Customer Support Chatbot, a secure Enterprise
                        AI Chatbot, or an omnichannel Conversational AI Platform, NeuraBot
                        helps you automate interactions with customers, employees, and
                        citizens while keeping your business data secure.
                    </p>
                    <div className="nb-hero-ctas">
                        <a href="#book-demo" onClick={handleBookDemo} className="nb-btn-primary">
                            Book a Personalized Demo <ArrowRight size={18} aria-hidden="true" />
                        </a>
                        <Link to="/Contact#contact-us" className="nb-btn-secondary">
                            <MessageSquareText size={18} aria-hidden="true" /> Talk to an AI Expert
                        </Link>
                    </div>
                    <ul className="nb-trust-points">
                        {TRUST_POINTS.map((point) => (
                            <li key={point}>
                                <CheckCircle2 size={16} aria-hidden="true" /> {point}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* The proof, not a screenshot: the demo reel framed as the
                    platform's own conversation console. Chips are illustrative
                    demo states (aria-hidden, pointer-events: none). */}
                <div className="nb-console">
                    <div className="nb-console-head">
                        <span className="nb-console-dots" aria-hidden="true">
                            <span /><span /><span />
                        </span>
                        <span className="nb-console-title">NeuraBOT Console — Product Preview</span>
                        <span className="nb-console-live">
                            <span className="nb-live-dot" aria-hidden="true" /> Live Demo
                        </span>
                    </div>
                    <div className="nb-console-body">
                        <video
                            src={DEMO_VIDEO}
                            aria-label="NeuraBOT product demo"
                            className="nb-console-video"
                            controls
                            muted
                            playsInline
                            preload="metadata"
                        />
                        <div className="nb-console-chips" aria-hidden="true">
                            <span className="nb-chip"><MessageCircle size={12} /> WhatsApp — Connected</span>
                            <span className="nb-chip"><Database size={12} /> Knowledge Base — Synced</span>
                            <span className="nb-chip"><Clock size={12} /> 24×7 — Online</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
