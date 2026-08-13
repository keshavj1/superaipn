import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Send, CheckCircle2 } from "lucide-react";

/* Same lead pipeline as Contact.jsx: the FormSubmit relay delivers straight
   to the inbox with no backend. On failure the form shows an inline error
   instead of the thank-you page, so a visitor is never told "sent" when
   nothing went out. */
const FORM_RELAY = "https://formsubmit.co/ajax/info@superaip.com";
const CONTACT_EMAIL = "info@superaip.com";

/* Deliberately permissive — enough to catch a typo like "name@" or a missing
   dot, without rejecting valid-but-unusual addresses. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* The industries this page names, so the dropdown mirrors the section above. */
const INDUSTRY_OPTIONS = [
    "Government",
    "Healthcare",
    "Banking & Financial Services",
    "Education",
    "Retail",
    "Logistics",
    "Technology",
    "Hospitality",
    "Other",
];

const CTA_POINTS = [
    "Guidance on the right chatbot type for your goals",
    "Cloud, private cloud, or secure on-premise deployment",
    "One continuous conversation across every channel",
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

export default function BotDemoCTA({ revealRef }) {
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

        const subject = `[NeuraBOT] Demo Request — ${fullName}`;

        setSending(true);
        try {
            await sendViaRelay(subject, {
                _replyto: email,
                _autoresponse:
                    "Thank you for requesting a personalized NeuraBOT demo. Our team will reach out shortly to schedule your session.\n\n— Team Super AIP\nsuperaip.com",
                Name: fullName,
                Phone: phone,
                Email: email,
                Company: company,
                Industry: industry,
                Source: "NeuraBOT landing page",
            });
            // Confirmed receipt — hand off to the dedicated confirmation page.
            navigate("/thank-you", { state: { source: "NeuraBOT demo request" } });
        } catch {
            /* Relay failed — surface the error instead of a false confirmation. */
            setStatus({
                type: "error",
                message: `Your request could not be sent right now. Please try again in a moment, or email us directly at ${CONTACT_EMAIL}.`,
            });
        } finally {
            setSending(false);
        }
    };

    return (
        <section className="nb-cta reveal-fade-up" ref={revealRef} aria-labelledby="nb-cta-title">
            <div className="nb-cta-grid">
                <div>
                    <h2 id="nb-cta-title" className="nb-cta-title">
                        Ready to Transform <em>Business Conversations</em>?
                    </h2>
                    <p className="nb-cta-text">
                        Discover the right Enterprise AI Chatbot solution with a
                        personalized NeuraBot consultation.
                    </p>
                    <ul className="nb-cta-points">
                        {CTA_POINTS.map((point) => (
                            <li key={point}>
                                <CheckCircle2 size={17} aria-hidden="true" /> {point}
                            </li>
                        ))}
                    </ul>
                    <Link to="/Contact#contact-us" className="nb-btn-secondary">
                        Speak to Our AI Experts
                    </Link>
                </div>

                <div className="nb-form-card" id="book-demo">
                    <h3>Book Your Personalized Demo</h3>
                    <p className="nb-form-intro">
                        Fill in your details and our team will schedule a personalized
                        session.
                    </p>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="nb-form-grid">
                            <div className="nb-field">
                                <label htmlFor="nb-name">Full Name</label>
                                <input id="nb-name" name="fullName" type="text" autoComplete="name" placeholder="Your full name" required />
                            </div>
                            <div className="nb-field">
                                <label htmlFor="nb-phone">Phone Number</label>
                                <input id="nb-phone" name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" required />
                            </div>
                            <div className="nb-field full">
                                <label htmlFor="nb-email">Email Address</label>
                                <input id="nb-email" name="email" type="email" autoComplete="email" placeholder="work@example.com" required />
                            </div>
                            <div className="nb-field">
                                <label htmlFor="nb-company">Company Name</label>
                                <input id="nb-company" name="company" type="text" autoComplete="organization" placeholder="Your organization" required />
                            </div>
                            <div className="nb-field">
                                <label htmlFor="nb-industry">Industry</label>
                                <select id="nb-industry" name="industry" defaultValue="">
                                    <option value="" disabled>Select industry…</option>
                                    {INDUSTRY_OPTIONS.map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="nb-btn-primary nb-form-submit" disabled={sending}>
                            {sending ? "Sending…" : "Book Your Personalized Demo"} <Send size={16} aria-hidden="true" />
                        </button>
                        <FormStatus status={status} />
                        <p className="nb-form-note">
                            We respond to demo requests within 2 business days.
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}
