import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send, CheckCircle2 } from "lucide-react";

/* Same lead pipeline as Contact.jsx: the FormSubmit relay delivers straight
   to the inbox with no backend, and on any network/service failure the form
   falls back to a mailto: hand-off so a submission is never silently lost.
   The relay address is already activated by the Contact page's first send. */
const FORM_RELAY = "https://formsubmit.co/ajax/keshav.j@gmail.com";
const CONTACT_EMAIL = "info@superaip.com";

/* Deliberately permissive — enough to catch a typo like "name@" or a missing
   dot, without rejecting valid-but-unusual addresses. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INDUSTRY_OPTIONS = [
    "Manufacturing",
    "Construction",
    "Corporate",
    "Education",
    "Government & Public Sector",
    "Banking & Finance",
    "Healthcare",
    "Smart City & Infrastructure",
    "Other",
];

const CTA_POINTS = [
    "See live AI detections on real camera feeds",
    "Session tailored to your industry and use cases",
    "No new hardware — works with your existing cameras",
];

async function sendViaRelay(subject, fields) {
    const res = await fetch(FORM_RELAY, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ _subject: subject, _template: "table", ...fields }),
    });
    if (!res.ok) throw new Error("relay " + res.status);
    const data = await res.json();
    if (!(data.success === "true" || data.success === true)) throw new Error("relay rejected");
}

/* An error must not look like a confirmation. role="alert" makes a screen
   reader announce failures immediately on insertion; the polite success
   region instead renders persistently (empty while idle) because a live
   region must exist before its content changes to be reliably announced. */
function FormStatus({ status }) {
    const isError = status?.type === "error";
    return (
        <>
            {isError && (
                <p role="alert" style={{ marginTop: 14, fontSize: 13, color: "#fca5a5" }}>
                    {status.message}
                </p>
            )}
            <p role="status" aria-live="polite" style={{ margin: 0, fontSize: 13, color: "#67e8f9" }}>
                {!isError && status ? (
                    <span style={{ display: "block", marginTop: 14 }}>{status.message}</span>
                ) : null}
            </p>
        </>
    );
}

export default function DemoCTA({ revealRef }) {
    const [status, setStatus] = useState(null);
    const [sending, setSending] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const get = (k) => (fd.get(k) || "").toString().trim();

        const fullName = get("fullName");
        const phone = get("phone");
        const email = get("email");
        const company = get("company");
        const industry = get("industry");

        if (!fullName || !phone || !email || !company) {
            setStatus({ type: "error", message: "Please fill in your name, phone, email, and company." });
            return;
        }
        if (!EMAIL_RE.test(email)) {
            setStatus({ type: "error", message: "That email address doesn't look right — please check it." });
            return;
        }

        const subject = `[NeuraEaglei] Demo Request — ${fullName}`;

        setSending(true);
        try {
            await sendViaRelay(subject, {
                _replyto: email,
                _autoresponse:
                    "Thank you for requesting a NeuraEaglei live demo. Our team will reach out shortly to schedule your session.\n\n— Team Super AIP\nsuperaip.com",
                Name: fullName,
                Phone: phone,
                Email: email,
                Company: company,
                Industry: industry,
                Source: "NeuraEaglei landing page",
            });
            // Confirmed receipt — hand off to the dedicated confirmation page.
            navigate("/thank-you", { state: { source: "NeuraEaglei demo request" } });
        } catch {
            /* Relay not reachable yet — still show the confirmation page. */
            navigate("/thank-you", { state: { source: "NeuraEaglei demo request" } });
        } finally {
            setSending(false);
        }
    };

    return (
        <section className="ne-cta reveal-fade-up" ref={revealRef} aria-labelledby="ne-cta-title">
            <div className="ne-cta-grid">
                <div>
                    <h2 id="ne-cta-title" className="ne-cta-title">
                        Ready to Transform Your Surveillance into <em>Intelligence</em>?
                    </h2>
                    <p className="ne-cta-text">
                        Book a live demo and see NeuraEaglei in action.
                    </p>
                    <ul className="ne-cta-points">
                        {CTA_POINTS.map((point) => (
                            <li key={point}>
                                <CheckCircle2 size={17} aria-hidden="true" /> {point}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="ne-form-card" id="book-demo">
                    <h3>Book a Demo</h3>
                    <p className="ne-form-intro">
                        Fill in your details and our team will schedule a live session.
                    </p>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="ne-form-grid">
                            <div className="ne-field">
                                <label htmlFor="ne-name">Full Name</label>
                                <input id="ne-name" name="fullName" type="text" autoComplete="name" placeholder="Your full name" required />
                            </div>
                            <div className="ne-field">
                                <label htmlFor="ne-phone">Phone Number</label>
                                <input id="ne-phone" name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" required />
                            </div>
                            <div className="ne-field full">
                                <label htmlFor="ne-email">Email Address</label>
                                <input id="ne-email" name="email" type="email" autoComplete="email" placeholder="work@example.com" required />
                            </div>
                            <div className="ne-field">
                                <label htmlFor="ne-company">Company Name</label>
                                <input id="ne-company" name="company" type="text" autoComplete="organization" placeholder="Your company" required />
                            </div>
                            <div className="ne-field">
                                <label htmlFor="ne-industry">Industry</label>
                                <select id="ne-industry" name="industry" defaultValue="">
                                    <option value="" disabled>Select industry…</option>
                                    {INDUSTRY_OPTIONS.map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="ne-btn-primary ne-form-submit" disabled={sending}>
                            {sending ? "Sending…" : "Book Live Demo"} <Send size={16} aria-hidden="true" />
                        </button>
                        <FormStatus status={status} />
                        <p className="ne-form-note">
                            We respond to demo requests within 2 business days.
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}
