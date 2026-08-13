import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SOCIAL_URLS } from "../data/social";
import "../styles/contact.css";
import {
  Mail, Phone, MapPin, Handshake, Newspaper, Briefcase, Send,
  ArrowRight, MessageSquare, Monitor, Users, Building, Video,
  MapPinned, Rocket, Check, Clock, Calendar, FileText,
  Linkedin, Twitter, Youtube, Instagram, Eye, Brain, Bot,
  GraduationCap, Cog, Sparkles, ChevronRight,
} from "lucide-react";

/* Deliberately permissive — enough to catch a typo like "name@" or a missing
   dot, without rejecting the valid-but-unusual addresses a strict regex does. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* FormSubmit relay: delivers submissions straight to the inbox with no
   backend and no API key. NOTE — the FIRST submission triggers a one-time
   activation email to this address; until its link is clicked, nothing is
   delivered. On failure the forms show an inline error instead of the
   thank-you page, so a visitor is never told "sent" when nothing went out. */
const FORM_RELAY = "https://formsubmit.co/ajax/info@superaip.com";

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

/* An error must not look like a confirmation. role="alert" also makes a
   screen reader announce failures immediately rather than politely. */
function FormStatus({ status }) {
  if (!status) return null;
  const isError = status.type === "error";
  return (
    <p
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
      style={{
        marginTop: 14,
        fontSize: 13,
        color: isError ? "#fca5a5" : "#67e8f9",
      }}
    >
      {status.message}
    </p>
  );
}

/* ─── Scroll-reveal hook ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─── Data ─── */
/* `to` values are router paths. "Careers" previously pointed at #careers,
   which has no matching element on this page — it belongs on /Careers. */
const quickCards = [
  { icon: <Mail size={22} />, label: "Contact Us", to: "/Contact#contact-us", color: "#06b6d4" },
  { icon: <Monitor size={22} />, label: "Request a Demo", to: "/Contact#request-demo", color: "#8b5cf6" },
  { icon: <Briefcase size={22} />, label: "Careers", to: "/Careers", color: "#ec4899" },
  { icon: <Handshake size={22} />, label: "Partner With Us", to: "/Partners", color: "#10b981" },
];

const contactDetails = [
  { icon: <MapPin size={18} />, title: "Registered Office", value: "Super AI Polaris (Super AIP), India", color: "#8b5cf6" },
  { icon: <Mail size={18} />, title: "General Enquiries", value: "info@superaip.com", link: "mailto:info@superaip.com", color: "#06b6d4" },
  /* Hidden on request (2026-08-07) — restore by uncommenting:
  { icon: <Handshake size={18} />, title: "Partnership & Alliances", value: "partners@superaip.com", link: "mailto:partners@superaip.com", color: "#10b981" },
  { icon: <Newspaper size={18} />, title: "Media & Press", value: "media@superaip.com", link: "mailto:media@superaip.com", color: "#f59e0b" },
  { icon: <Briefcase size={18} />, title: "Careers", value: "careers@superaip.com", link: "mailto:careers@superaip.com", color: "#ec4899" },
  */
];

const responseCommitments = [
  { time: "1 Day", label: "General Enquiries", color: "#06b6d4" },
  { time: "2 Days", label: "Demo Requests — Scheduled", color: "#8b5cf6" },
  { time: "3 Days", label: "Partnership — Initial Call", color: "#10b981" },
];

/* URLs come from data/social.js — profiles left unset there are filtered
   out below rather than rendered as links that go nowhere. */
const socials = [
  { icon: <Linkedin size={22} />, name: "LinkedIn", desc: "Thought Leadership", color: "#0a66c2", href: SOCIAL_URLS.linkedin },
  { icon: <Youtube size={22} />, name: "YouTube", desc: "Product Demos", color: "#ff0000", href: SOCIAL_URLS.youtube },
  { icon: <Twitter size={22} />, name: "Twitter / X", desc: "Updates", color: "#1da1f2", href: SOCIAL_URLS.x },
  { icon: <Instagram size={22} />, name: "Instagram", desc: "Culture & Events", color: "#e4405f", href: SOCIAL_URLS.instagram },
].filter((s) => s.href);

const demoProducts = [
  { name: "NeuraEdge", desc: "Sovereign LLM Platform", ideal: "Government · Regulated Enterprises", icon: <Brain size={22} />, color: "#8b5cf6" },
  { name: "NeuraEaglei", desc: "Vision & Cognitive Analytics", ideal: "Smart Cities · Industrial Safety · Retail", icon: <Eye size={22} />, color: "#06b6d4" },
  { name: "NeuraBOT", desc: "Conversational AI Platform", ideal: "Citizen Services · Customer Support · HR", icon: <Bot size={22} />, color: "#10b981" },
  { name: "NeuraEduBOT", desc: "Education AI Platform", ideal: "Schools · Universities · EdTech", icon: <GraduationCap size={22} />, color: "#f59e0b" },
  { name: "Physical AI & Robotics", desc: "Autonomous Intelligence", ideal: "Industrial Safety · Surveillance · Education Labs", icon: <Cog size={22} />, color: "#ec4899" },
  { name: "Agentic AI", desc: "Autonomous Workflow Intelligence", ideal: "Enterprise Ops · Government · Finance", icon: <Sparkles size={22} />, color: "#6366f1" },
];

const expectSteps = [
  { num: 1, title: "We Review Your Request", desc: "Our solutions team reviews your demo request and prepares a session tailored to your industry and use case. Usually within 24 hours.", color: "#ffffff" },
  { num: 2, title: "Personalized Demo Session", desc: "A 45–60 minute live session with a Super AIP solutions engineer — focused on your specific challenges, not a generic walkthrough.", color: "#ffffff" },
  { num: 3, title: "Follow-Up & Next Steps", desc: "Post-demo, you receive a summary deck, relevant case studies, and a clear path to pilot or deployment if you choose to proceed.", color: "#ffffff" },
];

const demoFormats = [
  { icon: <Video size={22} />, title: "Online Demo", desc: "Live video call with screen share. Flexible scheduling across time zones. Ideal for initial discovery and cross-geography teams.", color: "#06b6d4" },
  { icon: <MapPinned size={22} />, title: "On-Site Demo", desc: "Super AIP solutions engineer visits your location. Full product walkthrough in your environment. Available across India and select international locations.", color: "#8b5cf6" },
  { icon: <Rocket size={22} />, title: "Pilot Deployment", desc: "For organizations ready to move beyond a demo — a time-bound, scoped pilot deployment in your actual infrastructure. Discuss eligibility with our team.", color: "#10b981" },
];

const iAmOptions = ["Enterprise", "Government Body", "Educational Institution", "Technology Partner", "Investor", "Media", "Individual", "Other"];
const subjectOptions = ["Product Enquiry", "Partnership", "Demo Request", "Research Collaboration", "Media & Press", "Careers", "General"];
const industryOptions = ["Government & Public Sector", "Education", "Enterprise & Corporate", "Banking & Finance", "Healthcare", "Energy & Utilities", "Smart City & Infrastructure", "Other"];
const demoFormatOptions = ["Online Video Call", "In-Person at Your Location", "Super AIP Office Visit"];
const teamSizeOptions = ["Just Me", "2–5", "6–15", "15+"];

/* ═══════════════ CONTACT PAGE ═══════════════ */
export default function Contact() {
  const [heroRef, heroVis] = useReveal(0.2);
  const [formRef, formVis] = useReveal(0.08);
  const [demoRef, demoVis] = useReveal(0.08);
  const [demoFormRef, demoFormVis] = useReveal(0.08);

  /* Demo product multi-select */
  const [selectedProducts, setSelectedProducts] = useState([]);
  const toggleProduct = (name) => {
    setSelectedProducts((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    );
  };

  /* ─── Contact form → email submission ─── */
  const CONTACT_EMAIL = "info@superaip.com";
  /* { type: "error" | "success", message } rather than a bare string: a
     validation failure and a successful hand-off previously rendered in the
     identical cyan, so users could not tell them apart. */
  const [contactStatus, setContactStatus] = useState(null);
  const navigate = useNavigate();

  const [contactSending, setContactSending] = useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k) => (fd.get(k) || "").toString().trim();

    const fullName = get("fullName");
    const email = get("email");
    const message = get("message");
    if (!fullName || !email || !message) {
      setContactStatus({ type: "error", message: "Please fill in your name, email, and message." });
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setContactStatus({ type: "error", message: "That email address doesn't look right — please check it." });
      return;
    }

    const subject = `[Super AIP Contact] ${get("subject") || "General"} — ${fullName}`;

    setContactSending(true);
    try {
      await sendViaRelay(subject, {
        /* Reply-To = the visitor, so hitting Reply in the inbox answers them
           directly instead of the relay. */
        _replyto: email,
        /* Branded confirmation the visitor receives from the Super AIP side. */
        _autoresponse:
          "Thank you for contacting Super AI Polaris (Super AIP). We have received your message and our team will get back to you shortly.\n\n— Team Super AIP\nsuperaip.com",
        Name: fullName,
        "Designation / Role": get("role"),
        Organization: get("organization"),
        "Work Email": email,
        Phone: get("phone"),
        Country: get("country"),
        "I am a": get("iam"),
        Subject: get("subject"),
        Message: message,
      });
      // Confirmed receipt — hand off to the dedicated confirmation page.
      navigate("/thank-you", { state: { source: "message" } });
    } catch {
      /* Relay failed (network down, or FormSubmit activation pending). Do NOT
         show the confirmation page for a message that never went out. */
      setContactStatus({
        type: "error",
        message: `Your message could not be sent right now. Please try again in a moment, or email us directly at ${CONTACT_EMAIL}.`,
      });
    } finally {
      setContactSending(false);
    }
  };

  /* Demo request → same mailto hand-off as the contact form above. The 13
     inputs now carry name attributes so FormData can read them. */
  const [demoStatus, setDemoStatus] = useState(null);

  const [demoSending, setDemoSending] = useState(false);

  const handleDemoSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k) => (fd.get(k) || "").toString().trim();

    const fullName = get("fullName");
    const email = get("email");
    if (!fullName || !email) {
      setDemoStatus({ type: "error", message: "Please fill in your name and work email." });
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setDemoStatus({ type: "error", message: "That email address doesn't look right — please check it." });
      return;
    }

    const subject = `[Super AIP Demo Request] ${fullName}${get("organization") ? ` — ${get("organization")}` : ""}`;

    setDemoSending(true);
    try {
      await sendViaRelay(subject, {
        _replyto: email,
        _autoresponse:
          "Thank you — your demo request has reached Super AI Polaris (Super AIP). Our team will contact you to schedule it.\n\n— Team Super AIP\nsuperaip.com",
        Name: fullName,
        "Designation / Role": get("role"),
        Organization: get("organization"),
        "Work Email": email,
        Phone: get("phone"),
        Country: get("country"),
        Industry: get("industry"),
        "Products of interest": selectedProducts.length ? selectedProducts.join(", ") : "Not specified",
        "Preferred format": get("format"),
        "Team size": get("teamSize"),
        "Preferred date": get("date"),
        "Preferred time": get("time"),
        "Primary use case": get("useCase"),
        "Anything specific": get("specific"),
      });
      // Confirmed receipt — hand off to the dedicated confirmation page.
      navigate("/thank-you", { state: { source: "demo request" } });
    } catch {
      /* Relay failed — surface the error instead of a false confirmation. */
      setDemoStatus({
        type: "error",
        message: `Your demo request could not be sent right now. Please try again in a moment, or email us directly at ${CONTACT_EMAIL}.`,
      });
    } finally {
      setDemoSending(false);
    }
  };

  return (
    <div>
      {/* ══════════ HERO ══════════ */}
      <section className="contact-hero" ref={heroRef} id="contact-hero">
        <div className="contact-hero-grid" />
        <div className="contact-glow" style={{ width: 500, height: 500, background: "rgba(6,182,212,0.08)", top: "20%", left: "10%" }} />
        <div className="contact-glow" style={{ width: 400, height: 400, background: "rgba(139,92,246,0.06)", bottom: "10%", right: "15%" }} />

        <div className="contact-hero-content" style={{
          opacity: heroVis ? 1 : 0,
          transform: heroVis ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
          transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <div className="contact-badge" style={{ borderColor: "rgba(6,182,212,0.25)", background: "rgba(6,182,212,0.06)", color: "#67e8f9" }}>
            <span className="pulse-dot" style={{ background: "#22d3ee" }} />
            Get in Touch
          </div>
          <h1 className="contact-hero-title">
            Connect with <br className="hidden md:block" />
            <span className="hero-title-highlight">
              Super AI Polaris
            </span>
          </h1>
          <p className="contact-hero-subtitle">
            Whether you are an enterprise exploring AI deployment, a government body evaluating sovereign solutions, an institution seeking education AI, or a talent looking to build India's AI future - Super AI Polaris is ready to connect.
          </p>

          <div className="contact-quickselect">
            {quickCards.map((card, i) => (
              <Link key={i} to={card.to} className="quickselect-card" style={{
                opacity: heroVis ? 1 : 0,
                transform: heroVis ? "translateY(0)" : "translateY(15px)",
                transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${(i + 2) * 100}ms`,
              }}>
                <div className="quickselect-icon" style={{ background: `${card.color}15`, border: `1px solid ${card.color}25`, color: card.color }}>
                  {card.icon}
                </div>
                <span>{card.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CONTACT US ══════════ */}
      <section className="contact-section contact-section-dark" ref={formRef} id="contact-us">
        <div className="contact-glow" style={{ width: 600, height: 600, background: "rgba(6,182,212,0.04)", top: "20%", right: "0" }} />
        <div className="contact-section-inner">
          <div className="contact-section-header" style={{
            opacity: formVis ? 1 : 0,
            transform: formVis ? "translateY(0)" : "translateY(25px)",
            transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <div className="contact-badge" style={{ borderColor: "rgba(6,182,212,0.25)", background: "rgba(6,182,212,0.06)", color: "#67e8f9" }}>
              <span className="pulse-dot" style={{ background: "#22d3ee" }} />
              Contact Us
            </div>
            <h2 className="section-title">
              Every Conversation Starts Here{" "}
              <span style={{
                background: "linear-gradient(135deg, #22d3ee, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}></span>
            </h2>
            <p className="section-subtitle" style={{ marginTop: 16 }}>
              Reach out for product enquiries, partnership discussions, media requests, or general information - we respond within one business day.
            </p>
          </div>

          <div className="contact-form-layout" style={{
            opacity: formVis ? 1 : 0,
            transform: formVis ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 200ms",
          }}>
            {/* Left: Form */}
            <div className="contact-form-card">
              <h3>Send Us a Message</h3>
              <p className="form-intro">Fill in the form below and our team will get back to you promptly.</p>
              <form onSubmit={handleContactSubmit} noValidate>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="cf-name">Full Name</label>
                    <input id="cf-name" name="fullName" type="text" placeholder="Your full name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cf-role">Designation / Role</label>
                    <input id="cf-role" name="role" type="text" placeholder="e.g. CTO, Principal" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cf-org">Organization Name</label>
                    <input id="cf-org" name="organization" type="text" placeholder="Your organization" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cf-email">Work Email</label>
                    <input id="cf-email" name="email" type="email" placeholder="work@example.com" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cf-phone">Phone Number</label>
                    <input id="cf-phone" name="phone" type="tel" placeholder="+91 98765 43210" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cf-country">Country</label>
                    <input id="cf-country" name="country" type="text" placeholder="India" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cf-iam">I Am a</label>
                    <select id="cf-iam" name="iam" defaultValue="">
                      <option value="" disabled>Select type…</option>
                      {iAmOptions.map((o, i) => <option key={i} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="cf-subject">Subject</label>
                    <select id="cf-subject" name="subject" defaultValue="">
                      <option value="" disabled>Select subject…</option>
                      {subjectOptions.map((o, i) => <option key={i} value={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="form-group full-width">
                    <label htmlFor="cf-message">Message</label>
                    <textarea id="cf-message" name="message" rows={4} placeholder="Tell us how we can help…" required />
                  </div>
                </div>
                {/* Centred to match the demo form's submit block below — the two
                    forms sit on the same page and previously disagreed. */}
                <div style={{ textAlign: "center", marginTop: 24 }}>
                  <button type="submit" className="form-submit-btn" id="submit-enquiry" disabled={contactSending}>
                    {contactSending ? "Sending…" : "Submit Enquiry"} <Send size={16} />
                  </button>
                  <FormStatus status={contactStatus} />
                </div>
              </form>
            </div>

            {/* Right: Contact Details */}
            <div className="contact-details-col">
              {contactDetails.map((d, i) => (
                <div className="contact-detail-card" key={i}>
                  <div className="detail-icon" style={{ background: `${d.color}15`, border: `1px solid ${d.color}25`, color: d.color }}>
                    {d.icon}
                  </div>
                  <div>
                    <h4>{d.title}</h4>
                    {d.link
                      ? <p><a href={d.link}>{d.value}</a></p>
                      : <p>{d.value}</p>
                    }
                  </div>
                </div>
              ))}

              {/* Map Placeholder */}
              <div style={{
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)",
                height: 180,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}>
                <iframe
                  title="Super AIP Office"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.8860285693454!2d77.2090212!3d28.5528944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce20f9ddd4c75%3A0xe1d7e1e1f1e1e1e1!2sNew%20Delhi%2C%20India!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="180"
                  style={{ border: 0, borderRadius: 16, filter: "invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Response Commitment */}
          <div className="response-strip" style={{
            opacity: formVis ? 1 : 0,
            transform: formVis ? "translateY(0)" : "translateY(15px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 400ms",
          }}>
            {responseCommitments.map((r, i) => (
              <div className="response-card" key={i}>
                <div className="response-time" style={{ color: r.color }}>{r.time}</div>
                <div className="response-label">{r.label}</div>
              </div>
            ))}
          </div>

          {/* Social Links — the whole strip is omitted while no profile URL
              is configured in data/social.js, so there is no empty row. */}
          {socials.length > 0 && (
          <div className="social-strip" style={{
            opacity: formVis ? 1 : 0,
            transform: formVis ? "translateY(0)" : "translateY(15px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 500ms",
          }}>
            {socials.map((s, i) => (
              <a key={i} href={s.href} className="social-link" target="_blank" rel="noopener noreferrer">
                <div className="social-icon" style={{ background: `${s.color}18`, border: `1px solid ${s.color}30`, color: s.color }}>
                  {s.icon}
                </div>
                <span className="social-name">{s.name}</span>
                <span className="social-desc">{s.desc}</span>
              </a>
            ))}
          </div>
          )}

          {/* CTA */}
          <div className="contact-cta-block" style={{ marginTop: 48 }}>
            <h3>Have a Quick Question?</h3>
            <div className="contact-cta-buttons">
              {/* Opens the floating assistant mounted in App.jsx. */}
              <button
                type="button"
                className="cta-btn-pri"
                id="start-chat"
                onClick={() => window.dispatchEvent(new Event("superaip:open-chat"))}
              >
                Start a Chat <MessageSquare size={16} />
              </button>
              <a href="mailto:info@superaip.com" className="cta-btn-sec" id="send-email-cta">Send an Email <Mail size={16} /></a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ REQUEST A DEMO ══════════ */}
      <section className="contact-section contact-section-alt" ref={demoRef} id="request-demo">
        <div className="contact-glow" style={{ width: 600, height: 600, background: "rgba(139,92,246,0.05)", top: "10%", left: "5%" }} />
        <div className="contact-glow" style={{ width: 400, height: 400, background: "rgba(6,182,212,0.04)", bottom: "15%", right: "10%" }} />
        <div className="contact-section-inner">
          <div className="contact-section-header" style={{
            opacity: demoVis ? 1 : 0,
            transform: demoVis ? "translateY(0)" : "translateY(25px)",
            transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <div className="contact-badge" style={{ borderColor: "rgba(139,92,246,0.25)", background: "rgba(139,92,246,0.06)", color: "#c4b5fd" }}>
              <span className="pulse-dot" style={{ background: "#a78bfa" }} />
              Request a Demo
            </div>
            <h2 className="section-title">
              See Super AIP in Action{" "}
              <span style={{
                background: "linear-gradient(135deg, #a78bfa, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}></span>
            </h2>
            <p className="section-subtitle" style={{ marginTop: 16 }}>
              Request a live, personalized demonstration of any Super AIP product — tailored to your industry, use case, and team. Our solutions engineers will walk you through exactly what matters to you.
            </p>
          </div>

          {/* Product Selector */}
          <div style={{
            opacity: demoVis ? 1 : 0,
            transform: demoVis ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 200ms",
          }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <h3 id="demo-product-heading" style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Choose Your Product Demo</h3>
              <p style={{ fontSize: 14, color: "#94a3b8" }}>Select one or more products you'd like to see in action</p>
            </div>

            {/* role="group" + aria-labelledby ties the six checkbox cards to
                their heading, so a screen reader announces the set as one
                labelled group rather than six loose checkboxes. */}
            <div className="demo-product-grid" role="group" aria-labelledby="demo-product-heading">
              {demoProducts.map((prod, i) => {
                const isSelected = selectedProducts.includes(prod.name);
                return (
                  /* Was a <div onClick> with the selected state shown only by a
                     tick icon — unreachable by keyboard and invisible to screen
                     readers. role="checkbox" + aria-checked reports state; a
                     <button> supplies Enter/Space and focus. */
                  <button
                    key={i}
                    type="button"
                    role="checkbox"
                    aria-checked={isSelected}
                    className={`demo-product-card${isSelected ? " selected" : ""}`}
                    onClick={() => toggleProduct(prod.name)}
                    style={{
                      opacity: demoVis ? 1 : 0,
                      transform: demoVis ? "translateY(0)" : "translateY(15px)",
                      transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${(i + 1) * 80}ms`,
                    }}
                  >
                    <div className="demo-select-indicator">
                      {isSelected && <Check size={14} />}
                    </div>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12, display: "flex",
                      alignItems: "center", justifyContent: "center", marginBottom: 14,
                      background: `${prod.color}15`, border: `1px solid ${prod.color}25`, color: prod.color,
                    }}>
                      {prod.icon}
                    </div>
                    <h4>{prod.name}</h4>
                    <p className="demo-desc">{prod.desc}</p>
                    <span className="demo-ideal">Ideal for: {prod.ideal}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* What to Expect */}
          <div className="expect-strip" style={{
            opacity: demoVis ? 1 : 0,
            transform: demoVis ? "translateY(0)" : "translateY(15px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 400ms",
          }}>
            <h3>What to Expect</h3>
            <div className="expect-steps">
              {expectSteps.map((s, i) => (
                <div className="expect-step" key={i}>
                  <div className="expect-step-num" style={{
                    background: `${s.color}15`, border: `2px solid ${s.color}40`, color: s.color,
                  }}>
                    {s.num}
                  </div>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Demo Request Form */}
          <div className="demo-form-card" ref={demoFormRef} style={{
            opacity: demoFormVis ? 1 : 0,
            transform: demoFormVis ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <h3>Demo Request Form</h3>
            {/* Was onSubmit={(e) => e.preventDefault()} with no name attributes
                on any input — the button did nothing and the data existed
                nowhere, not even client-side. */}
            <form onSubmit={handleDemoSubmit} noValidate>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="df-name">Full Name</label>
                  <input id="df-name" name="fullName" required type="text" placeholder="Your full name" />
                </div>
                <div className="form-group">
                  <label htmlFor="df-role">Designation / Role</label>
                  <input id="df-role" name="role" type="text" placeholder="e.g. CTO, VP Engineering" />
                </div>
                <div className="form-group">
                  <label htmlFor="df-org">Organization Name</label>
                  <input id="df-org" name="organization" type="text" placeholder="Your organization" />
                </div>
                <div className="form-group">
                  <label htmlFor="df-email">Work Email</label>
                  <input id="df-email" name="email" required type="email" placeholder="work@example.com" />
                </div>
                <div className="form-group">
                  <label htmlFor="df-phone">Phone Number</label>
                  <input id="df-phone" name="phone" type="tel" placeholder="+91 98765 43210" />
                </div>
                <div className="form-group">
                  <label htmlFor="df-country">Country</label>
                  <input id="df-country" name="country" type="text" placeholder="India" />
                </div>
                <div className="form-group">
                  <label htmlFor="df-industry">Industry / Sector</label>
                  <select id="df-industry" name="industry" defaultValue="">
                    <option value="" disabled>Select industry…</option>
                    {industryOptions.map((o, i) => <option key={i} value={o}>{o}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  {/* The label had no htmlFor and the input no id, so they were
                      never associated. Empty-state colour was #64748b (4.26:1). */}
                  <label htmlFor="df-products">Product of Interest</label>
                  <input
                    id="df-products"
                    name="products"
                    type="text"
                    readOnly
                    value={selectedProducts.length > 0 ? selectedProducts.join(", ") : "Select products above ↑"}
                    style={{ cursor: "default", color: selectedProducts.length > 0 ? "#67e8f9" : "var(--color-text-muted)" }}
                  />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="df-usecase">Primary Use Case</label>
                  <textarea id="df-usecase" name="useCase" rows={3} placeholder="Briefly describe what you are trying to solve…" />
                </div>
                <div className="form-group">
                  <label htmlFor="df-format">Preferred Demo Format</label>
                  <select id="df-format" name="format" defaultValue="">
                    <option value="" disabled>Select format…</option>
                    {demoFormatOptions.map((o, i) => <option key={i} value={o}>{o}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="df-team">Team Size for Demo</label>
                  <select id="df-team" name="teamSize" defaultValue="">
                    <option value="" disabled>Select size…</option>
                    {teamSizeOptions.map((o, i) => <option key={i} value={o}>{o}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="df-date">Preferred Date</label>
                  <input id="df-date" name="date" type="date" />
                </div>
                <div className="form-group">
                  <label htmlFor="df-time">Preferred Time</label>
                  <input id="df-time" name="time" type="time" />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="df-specific">Anything Specific You Want Us to Cover? (Optional)</label>
                  <textarea id="df-specific" name="specific" rows={3} placeholder="Any specific topics, features, or scenarios you'd like us to demonstrate…" />
                </div>
              </div>
              <div style={{ textAlign: "center", marginTop: 24 }}>
                <button type="submit" className="form-submit-btn" id="request-demo-btn" disabled={demoSending}>
                  {demoSending ? "Sending…" : "Request My Demo"} <Rocket size={16} />
                </button>
                <FormStatus status={demoStatus} />
              </div>
            </form>
          </div>

          {/* Demo Formats */}
          <div style={{
            opacity: demoFormVis ? 1 : 0,
            transform: demoFormVis ? "translateY(0)" : "translateY(15px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 200ms",
          }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Demo Formats Available</h3>
              <p style={{ fontSize: 14, color: "#94a3b8" }}>Choose the format that works best for your team</p>
            </div>
            <div className="demo-formats-grid">
              {demoFormats.map((fmt, i) => (
                <div className="demo-format-card" key={i}>
                  <div className="format-icon" style={{ background: `${fmt.color}15`, border: `1px solid ${fmt.color}25`, color: fmt.color }}>
                    {fmt.icon}
                  </div>
                  <h4>{fmt.title}</h4>
                  <p>{fmt.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="contact-cta-block">
            <h3>Not Ready for a Demo Yet?</h3>
            <div className="contact-cta-buttons">
              <Link to="/Products" className="cta-btn-pri" id="explore-products-cta">Explore Product Pages <ArrowRight size={16} /></Link>
              <Link to="/Contact#contact-us" className="cta-btn-sec" id="download-whitepaper">Request a Whitepaper <FileText size={16} /></Link>
              <Link to="/Contact#contact-us" className="cta-btn-sec" id="talk-sales-cta">Talk to Sales <Phone size={16} /></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}