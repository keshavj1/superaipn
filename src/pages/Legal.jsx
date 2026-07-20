import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/legal.css";

/* ─── Legal pages (privacy / terms / cookies) ─────────────────────
   Placeholder documents so the footer links resolve to real routes.
   The copy below is a skeleton, NOT reviewed legal text — replace each
   section body before launch. Every page shares this one component;
   the content for each lives in LEGAL_DOCS. */

const LEGAL_DOCS = {
  privacy: {
    title: "Privacy Policy",
    intro:
      "This policy explains what information Super AI Polaris collects, how it is used, and the choices available to you.",
    sections: [
      { heading: "Information We Collect", body: "Details of the personal and usage data collected through our websites, platforms, and services." },
      { heading: "How We Use Information", body: "The purposes for which collected data is processed, including service delivery, support, and product improvement." },
      { heading: "Data Sharing & Disclosure", body: "The circumstances under which information may be shared with partners, service providers, or authorities." },
      { heading: "Data Security & Retention", body: "The safeguards applied to stored data and how long records are retained." },
      { heading: "Your Rights", body: "How to access, correct, export, or request deletion of your personal data." },
    ],
  },
  terms: {
    title: "Terms of Service",
    intro:
      "These terms govern access to and use of the Super AI Polaris platforms, products, and related services.",
    sections: [
      { heading: "Acceptance of Terms", body: "By accessing our services you agree to be bound by these terms." },
      { heading: "Use of Services", body: "Permitted and prohibited uses of the platform, and account responsibilities." },
      { heading: "Intellectual Property", body: "Ownership of platform software, content, trademarks, and customer data." },
      { heading: "Service Availability", body: "Provisions covering uptime, maintenance windows, and service changes." },
      { heading: "Limitation of Liability", body: "The limits of our liability arising from use of the services." },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    intro:
      "This policy describes the cookies and similar technologies used across our websites and how to manage them.",
    sections: [
      { heading: "What Are Cookies", body: "An explanation of cookies and similar tracking technologies." },
      { heading: "Cookies We Use", body: "The categories in use — strictly necessary, functional, analytics, and preference cookies." },
      { heading: "Managing Preferences", body: "How to control or disable cookies through your browser or our preference settings." },
      { heading: "Third-Party Cookies", body: "Cookies set by embedded services and analytics providers." },
    ],
  },
};

export default function Legal({ doc }) {
  const content = LEGAL_DOCS[doc];

  // Keep the browser tab title in step with the document being viewed.
  useEffect(() => {
    if (!content) return;
    const previous = document.title;
    document.title = `${content.title} · Super AI Polaris`;
    return () => { document.title = previous; };
  }, [content]);

  if (!content) return null;

  return (
    <div className="legal-page">
      <div className="legal-inner">
        <Link to="/" className="legal-back">← Back to home</Link>

        <h1 className="legal-title">{content.title}</h1>
        <p className="legal-intro">{content.intro}</p>

        <div className="legal-notice">
          This document is a placeholder awaiting final legal review. It is not
          yet a binding statement of our practices.
        </div>

        {content.sections.map((s) => (
          <section className="legal-section" key={s.heading}>
            <h2>{s.heading}</h2>
            <p>{s.body}</p>
          </section>
        ))}

        <section className="legal-section">
          <h2>Contact</h2>
          <p>
            Questions about this document? Reach us via the{" "}
            <Link to="/Contact" className="legal-link">contact page</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
