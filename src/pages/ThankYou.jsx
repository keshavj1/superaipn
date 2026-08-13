import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, ClipboardCheck, PhoneCall, CalendarCheck, Home, ArrowRight } from "lucide-react";
import "../styles/thankyou.css";

/* Landed on after any site form succeeds via the FormSubmit relay. The
   submitting form passes its label through router state so the copy names
   what was received; a direct visit (no state) falls back to the generic
   line. Deliberately noindex (see PageMeta) and absent from the sitemap —
   a confirmation page must not appear in search results. */

const STEPS = [
    { icon: ClipboardCheck, text: "Our team reviews your request" },
    { icon: PhoneCall, text: "We reach out within 2 business days" },
    { icon: CalendarCheck, text: "You get a session tailored to your needs" },
];

export default function ThankYou() {
    const { state } = useLocation();
    const source = state?.source; // e.g. "NeuraBOT demo request"

    /* Meta Pixel conversion. Gated on router state so only an arrival from a
       real successful form submit counts — a direct visit, refresh, or shared
       link has no state and must not inflate the numbers. The ref keeps it to
       one event per arrival even if the component re-mounts. */
    const conversionFired = useRef(false);
    useEffect(() => {
        if (!source || conversionFired.current) return;
        conversionFired.current = true;
        window.fbq?.("track", "CompleteRegistration", { content_name: source });
    }, [source]);

    return (
        <div className="thankyou-page">
            <section className="ty-card" aria-labelledby="ty-title">
                <div className="ty-icon">
                    <CheckCircle2 size={36} aria-hidden="true" />
                </div>
                <h1 id="ty-title" className="ty-title">Thank You!</h1>
                <p className="ty-text">
                    {source
                        ? `Your ${source} has been received.`
                        : "Your request has been received."}{" "}
                    Our team will reach out shortly.
                </p>
                <ul className="ty-steps">
                    {STEPS.map((step) => (
                        <li key={step.text}>
                            <step.icon size={18} aria-hidden="true" /> {step.text}
                        </li>
                    ))}
                </ul>
                <div className="ty-ctas">
                    <Link to="/" className="ty-btn-primary">
                        <Home size={17} aria-hidden="true" /> Back to Home
                    </Link>
                    <Link to="/Products" className="ty-btn-secondary">
                        Explore Products <ArrowRight size={17} aria-hidden="true" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
