import React, { useState, useEffect, useRef } from "react";

const faqs = [
  {
    question: "What is Super AI Polaris?",
    answer:
      "Super AI Polaris is a sovereign artificial intelligence platform delivering an integrated ecosystem of AI products designed for education, governance, and enterprise operations. Our solutions can run offline, support multiple languages, and operate securely within your own infrastructure.",
  },
  {
    question: "How is Super AIP different from other AI platforms?",
    answer:
      "Super AI Polaris is designed with sovereign AI principles. Our systems are offline-ready, multilingual (22+ Indian languages), and secure with on-premise deployment. We are also AICTE-empanelled, a Microsoft co-marketing partner, and the only startup invited to the Prime Minister's Closed AI Conference.",
  },
  {
    question: "Who can use Super AIP?",
    answer:
      "Super AI Polaris is built for government departments, K-12 schools, universities and higher education institutions, and enterprises in manufacturing, retail, logistics, and healthcare. Our AI platforms support organizations that require secure, scalable, and domain-specific artificial intelligence solutions.",
  },
  {
    question: "Is Super AIP secure and compliant?",
    answer:
      "Yes. Security and compliance are core to our platform design. Super AI Polaris holds five ISO certifications, including ISO 27001:2022 for information security. Our AI systems can be deployed fully on-premise, ensuring sensitive data never leaves your infrastructure.",
  },
  {
    question: "How can I get started with Super AI Polaris?",
    answer:
      "Getting started is simple. Reach out to us at info@superaip.com or call +91 85959 12427. Our team will connect with you within 24 hours to understand your requirements and recommend the right AI platform for your organization.",
  },
];

function FAQItem({ faq, index, isActive, onToggle, visible }) {
  return (
    <div
      className={`faq-item group relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_30px_-15px_rgba(139,92,246,0.3)] ${isActive ? "faq-active border-purple-500/50 shadow-[0_10px_30px_-15px_rgba(139,92,246,0.4)]" : "border-white/10 hover:border-purple-500/30"}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 100}ms`,
      }}
    >
      {/* Subtle hover gradient aura */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Was a <div onClick> — the accordion could not be opened by keyboard at
          all. A real <button> gives Enter/Space and focus for free; aria-expanded
          and aria-controls report state to screen readers. */}
      <button
        type="button"
        id={`faq-trigger-${index}`}
        aria-expanded={isActive}
        aria-controls={`faq-panel-${index}`}
        className="faq-question relative z-10 w-full text-left transition-colors duration-300 group-hover:text-purple-300"
        onClick={onToggle}
      >
        <span>{faq.question}</span>
        <span aria-hidden="true" className={`faq-icon flex items-center justify-center relative w-8 h-8 rounded-full transition-all duration-300 ${isActive ? "bg-purple-500/20 text-purple-400 rotate-45 scale-110" : "bg-white/5 text-gray-400 group-hover:bg-purple-500/10 group-hover:text-purple-400 group-hover:scale-110"}`}>
          <span className="relative z-10">+</span>
          {!isActive && <div className="absolute inset-0 rounded-full animate-ping bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animationDuration: '2s' }} />}
        </span>
      </button>

      <div
        id={`faq-panel-${index}`}
        role="region"
        aria-labelledby={`faq-trigger-${index}`}
        className={`faq-answer-wrapper ${isActive ? "open" : ""}`}
      >
        <div className="faq-answer">{faq.answer}</div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="faq-section bg-glow">
      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <div
          className="text-center mb-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="section_sectsbtns inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/[0.06] text-amber-300 text-xs font-semibold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            FAQ
          </div>
          <br></br>

          <h2 className="faq-title gradient-text mb-3">
            Frequently Asked Questions
          </h2>
          <p className="faq-subtitle">
            Everything you need to know about our services.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isActive={activeIndex === index}
              onToggle={() => toggleFAQ(index)}
              visible={visible}
            />
          ))}
        </div>

      </div>
    </section >
  );
}