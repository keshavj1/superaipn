import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/about.css";
import FinalCTA from "../components/FinalCTA";
import ClientsSection from "../components/ClientsSection";
// Used only by the hidden "Meet the People" section — restore alongside it.
// import PersonCard from "../components/PersonCard";
// `employees` is still exported from data/team.js — re-add it here to restore
// the hidden "Meet the People" section below.
// `truncate` was only used by the hidden tagline block below — re-add it to
// this import if that block is restored.
import { founders, educationAdvisors, techAdvisors, getInitials } from "../data/team";
import SuperAI_NeuraEdge from "../assets/SuperAI_NeuraEdge.png";
import NeuraEaglei from "../assets/NeuraEaglei.png";
import ai_robot from "../assets/ai_robot.png";
import cap_education from "../assets/cap_education.png";
import Physical_AI from "../assets/Physical_AI.png";
import vision1 from "../assets/vision.png";
import rocket from "../assets/rocket.png";
import Artificial_Intelligence1 from "../assets/Artificial_Intelligence.png";
import Government_Enterprise_Ready from "../assets/Government_Enterprise_Ready.png";
import Multilingual_1 from "../assets/Multilingual_1.png";
import heart from "../assets/heart.png";
import trophy from "../assets/trophy.png";
/* ─── Scroll‑reveal hook ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─── Typewriter hook ─── */
function useTypewriter(text, speed = 18) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    if (!text) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return displayed;
}
const associations = [
  {
    title: "Government & Policy Bodies", desc: "Aligned with national AI programs, AICTE initiatives, NCERT digital learning frameworks, and the KVS ecosystem for K-12 AI deployment.",
    image: Artificial_Intelligence1,
    // icon: "🏛️",
    color: "#8b5cf6"
  },
  {
    title: "Academic Institutions",
    desc: "Partnerships with leading universities and research bodies including University of Delhi and NIT networks for AI research and curriculum co-development.",
    // icon: "🎓",
    image: cap_education,
    color: "#6366f1"
  },
  {
    title: "Industry Associations",
    desc: "Connected to the NASSCOM ecosystem and global technology leaders, enabling enterprise-grade credibility and channel reach.",
    // icon: "🏢", 
    image: Government_Enterprise_Ready,
    color: "#06b6d4"
  },
  {
    title: "Global Technology Partners",
    desc: "Advisory strength from alumni of Microsoft, Oracle, Nokia, AWS, and Gillette, bringing world-class technology and GTM expertise.",
    // icon: "🌐",
    image: Multilingual_1,
    color: "#10b981"
  },
  {
    title: "Social Impact Ecosystem",
    desc: "Committed to inclusive AI, with advisory linkages to diversity, social development, and women-in-tech initiatives including HerKey.",
    //  icon: "💜", 
    image: heart,
    color: "#ec4899"
  },
  {
    title: "Recognitions", desc: "Super AI Polaris is actively earning recognitions across India's AI, EdTech, and GovTech ecosystems. Announcements forthcoming.",
    // icon: "🏆",
    image: trophy,
    color: "#f59e0b"
  },
];
/* ─── Data ─── */
const products = [
  {
    name: "SuperAI NeuraEdge", desc: "AI-driven learning platform for smart education delivery at scale.",
    // icon: "🧠",
    image: SuperAI_NeuraEdge, color: "#8b5cf6"
  },
  {
    name: "NeuraEaglei", desc: "Enterprise-grade analytics and intelligent surveillance solutions.",
    // icon: "🧠",
    image: NeuraEaglei, color: "#6366f1"
  },
  {
    name: "NeuraBOT", desc: "Intelligent automation bots for enterprise workflow transformation.",  // icon: "🧠",
    image: ai_robot, color: "#06b6d4"
  },
  {
    name: "NeuraEduBOT", desc: "AI-powered educational chatbot for personalized learning support.",  // icon: "🧠",
    image: cap_education, color: "#10b981"
  },
  {
    name: "Physical AI", desc: "Robotics and physical AI systems for real-world industrial deployment.",  // icon: "🧠",
    image: Physical_AI, color: "#f59e0b"
  },
];

/* founders, educationAdvisors, techAdvisors, employees and getInitials
   now live in src/data/team.js — shared with the Team page (/team). */


/* ─── All team members flat list for the interactive viewer ─── */
const allTeamCategories = [
  { label: "Founders & Core Leadership", members: founders },
  { label: "Education & Policy Advisors", members: educationAdvisors },
  { label: "", members: techAdvisors },
];

/* ─── Interactive Leadership Section ─── */
function LeadershipSection({ visible }) {
  const [activePerson, setActivePerson] = useState(founders[0]);
  const typedBio = useTypewriter(activePerson?.bio || "", 14);
  const initials = activePerson ? getInitials(activePerson.name) : "";

  return (
    <div className="leadership-interactive" style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(25px)",
      transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 200ms",
    }}>
      {/* Left: Hover Cards */}
      {/* data-lenis-prevent hands wheel events back to the browser inside
          this box. Lenis (main.jsx) captures them globally, so without it
          scrolling over this list moved the page instead of the list. */}
      <div className="leadership-cards-col" data-lenis-prevent>
        {allTeamCategories.map((cat, ci) => (
          <div key={ci} className="leadership-cat-group">
            {/* techAdvisors is an empty array with an empty label, which
                rendered a stray empty group. TeamViewer already guarded
                this; the guard was never back-ported here. */}
            {cat.label && <div className="leadership-cat-label">{cat.label}</div>}
            {cat.members.map((person, pi) => {
              const isActive = activePerson && activePerson.name === person.name;
              return (
                /* Was a <div onMouseEnter> with no keyboard or touch path, so
                   those users were permanently stuck on founders[0].
                   A <button> adds focus, Enter/Space and tap; onFocus mirrors
                   the hover so arrowing through the list updates the panel.
                   aria-pressed reports which person is currently shown. */
                <button
                  key={pi}
                  type="button"
                  aria-pressed={isActive}
                  className={`leadership-hover-card${isActive ? " active" : ""}`}
                  onMouseEnter={() => setActivePerson(person)}
                  onFocus={() => setActivePerson(person)}
                  onClick={() => setActivePerson(person)}
                  style={{ borderLeftColor: isActive ? person.color : "transparent" }}
                >
                  <h4>{person.name}</h4>
                  <p>{person.role}</p>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Right: Profile Viewer */}
      <div className="leadership-profile-col">
        {/* aria-live: selecting a different person swaps this panel's content
            with no page change, so screen readers need it announced. */}
        <div className="leadership-profile-card" aria-live="polite">
          {/* Gradient top bar */}
          <div className="profile-gradient-bar" style={{
            background: `linear-gradient(90deg, ${activePerson?.color || "#8b5cf6"}, ${activePerson?.color || "#8b5cf6"}88, transparent)`,
          }} />

          {/* Header */}
          <div className="profile-header">
            <div className="profile-avatar" style={{
              background: `${activePerson?.color}18`,
              border: `2px solid ${activePerson?.color}40`,
              color: activePerson?.color,
            }}>
              {activePerson?.image ? <img src={activePerson.image} alt={activePerson.name} style={{ objectPosition: activePerson?.imgPosition || "center" }} /> : initials}
            </div>
            <div>
              <h3 className="profile-name">{activePerson?.name}</h3>
              <div className="profile-role" style={{ color: activePerson?.color }}>{activePerson?.role}</div>
            </div>
          </div>

          {/* Tagline hidden by request — it was rendering repeated/stacked
              entries in the browser. `tagline` is still on every person in
              data/team.js, and the .profile-tagline styles remain, so this
              block can be restored as-is:

              {activePerson?.tagline && (
                <div
                  className="profile-tagline"
                  key={activePerson?.name}
                  style={{ borderLeftColor: activePerson?.color }}
                  title={activePerson.tagline}
                >
                  {truncate(activePerson.tagline)}
                </div>
              )}
          */}

          {/* Bio with typewriter */}
          <div className="profile-bio-area">
            <div className="profile-bio-label">
              <span className="sparkle-icon">✨</span>
              Profile
            </div>
            <div className="profile-bio-text">
              {typedBio}
              <span className="typing-cursor">|</span>
            </div>
          </div>

          {/* Decorative tags — role-specific, coloured to the person's accent */}
          <div className="profile-tags" key={activePerson?.name}>
            {(activePerson?.tags || ["Leadership", "Super AIP", "AI"]).map((t, i) => (
              <span
                key={i}
                className="profile-tag"
                style={{
                  background: `${activePerson?.color}14`,
                  borderColor: `${activePerson?.color}45`,
                  color: activePerson?.color,
                  animationDelay: `${i * 70}ms`,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Reusable interactive team viewer (cloned from LeadershipSection) ─── */
function TeamViewer({ visible, categories, tags = ["Team", "Super AIP", "AI"] }) {
  const firstCat = categories.find((c) => c.members.length > 0);
  const [activePerson, setActivePerson] = useState(firstCat ? firstCat.members[0] : null);
  const role = activePerson?.role || activePerson?.profile || "";
  const typedBio = useTypewriter(activePerson?.bio || "", 14);
  const initials = activePerson ? getInitials(activePerson.name) : "";

  return (
    <div className="leadership-interactive" style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(25px)",
      transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 200ms",
    }}>
      {/* Left: Hover Cards */}
      {/* data-lenis-prevent hands wheel events back to the browser inside
          this box. Lenis (main.jsx) captures them globally, so without it
          scrolling over this list moved the page instead of the list. */}
      <div className="leadership-cards-col" data-lenis-prevent>
        {categories.map((cat, ci) => (
          <div key={ci} className="leadership-cat-group">
            {cat.label && <div className="leadership-cat-label">{cat.label}</div>}
            {cat.members.map((person, pi) => {
              const isActive = activePerson === person;
              return (
                <div
                  key={pi}
                  className={`leadership-hover-card${isActive ? " active" : ""}`}
                  onMouseEnter={() => setActivePerson(person)}
                  style={{ borderLeftColor: isActive ? person.color : "transparent" }}
                >
                  <h4>{person.name}</h4>
                  <p>{person.role || person.profile}</p>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Right: Profile Viewer */}
      <div className="leadership-profile-col">
        {/* aria-live: selecting a different person swaps this panel's content
            with no page change, so screen readers need it announced. */}
        <div className="leadership-profile-card" aria-live="polite">
          <div className="profile-gradient-bar" style={{
            background: `linear-gradient(90deg, ${activePerson?.color || "#8b5cf6"}, ${activePerson?.color || "#8b5cf6"}88, transparent)`,
          }} />

          <div className="profile-header">
            <div className="profile-avatar" style={{
              background: `${activePerson?.color}18`,
              border: `2px solid ${activePerson?.color}40`,
              color: activePerson?.color,
            }}>
              {activePerson?.image ? <img src={activePerson.image} alt={activePerson.name} style={{ objectPosition: activePerson?.imgPosition || "center" }} /> : initials}
            </div>
            <div>
              <h3 className="profile-name">{activePerson?.name}</h3>
              <div className="profile-role" style={{ color: activePerson?.color }}>{role}</div>
            </div>
          </div>

          <div className="profile-bio-area">
            <div className="profile-bio-label">
              <span className="sparkle-icon">✨</span>
              Profile
            </div>
            <div className="profile-bio-text">
              {typedBio}
              <span className="typing-cursor">|</span>
            </div>
          </div>

          <div className="profile-tags">
            {tags.map((t, i) => <span key={i} className="profile-tag">{t}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* PersonCard (with its social-link metadata) now lives in
   src/components/PersonCard.jsx — shared with the Team page. */

/* ═══════════════ ABOUT PAGE ═══════════════ */
export default function About() {
  const [heroRef, heroVis] = useReveal(0.2);
  const [whatRef, whatVis] = useReveal(0.15);
  const [vmRef, vmVis] = useReveal(0.15);
  const [teamRef, teamVis] = useReveal(0.08);
  // const [empRef, empVis] = useReveal(0.1); // hidden "Meet the People" section
  const [assocRef, assocVis] = useReveal(0.12);
  // Restore alongside the commented-out CTA section below.
  // const [ctaRef, ctaVis] = useReveal(0.25);

  return (
    <>
      <div>
        {/* ══════════ Hero Banner ══════════ */}
        <section className="about-hero" ref={heroRef}>
          <div className="about-hero-grid" />
          {/* Ambient glows */}
          <div className="about-glow" style={{ width: 500, height: 500, background: "rgba(139,92,246,0.08)", top: "20%", left: "10%" }} />
          <div className="about-glow" style={{ width: 400, height: 400, background: "rgba(99,102,241,0.06)", bottom: "10%", right: "15%" }} />

          <div className="about-hero-content" style={{
            opacity: heroVis ? 1 : 0,
            transform: heroVis ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
            transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <div className="about-hero-badge">
              <span className="pulse-dot" />
              About Super AI Polaris
            </div>
            <h1 className="hero-title about-hero-title">
              Building AI that Belongs  <br className="hidden md:block" />
              <span className="hero-title-highlight">
                to the World
              </span>
            </h1>
            <p className="about-hero-subtitle">
              Super AI Polaris (Super AIP) is an Indian sovereign AI SaaS platform built to power the next generation of intelligent enterprise and public sector solutions. Designed and developed in India, Super AIP delivers cutting-edge AI capabilities across Education, Governance, and Enterprise verticals - enabling organizations to adopt AI that is secure, scalable, and contextually aligned with India's needs.
            </p>

          </div>
        </section>

        {/* ══════════ What We Do ══════════ */}
        <section className="about-section about-section-dark" ref={whatRef}>
          <div className="about-glow" style={{ width: 600, height: 600, background: "rgba(6,182,212,0.05)", top: "30%", right: "0" }} />
          <div className="about-section-inner">
            <div className="about-section-header" style={{
              opacity: whatVis ? 1 : 0,
              transform: whatVis ? "translateY(0)" : "translateY(25px)",
              transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
            }}>
              <div className="about-badge about-badge-cyan">
                <span className="badge-dot" style={{ background: "#22d3ee" }} />
                What We Do
              </div>
              <h2 className="section-title">
                A Comprehensive Suite of{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400" style={{
                  background: "linear-gradient(135deg, #22d3ee, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>AI-Powered Products</span>
              </h2>
              <p className="section-subtitle" style={{ marginTop: 16 }}>
                From AI-driven learning platforms and intelligent automation bots to enterprise-grade analytics and physical robotics - we deliver end-to-end AI solutions tailored for real-world impact across industries and public institutions at India's scale.
              </p>
            </div>

            <div className="about-products-grid">
              {products.map((p, i) => (
                <div
                  className="about-product-card"
                  key={i}
                  style={{
                    opacity: whatVis ? 1 : 0,
                    transform: whatVis ? "translateY(0)" : "translateY(20px)",
                    transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${(i + 2) * 100}ms`,
                  }}
                >
                  <div className="card-icon" style={{ background: `${p.color}15`, border: `1px solid ${p.color}25`, color: p.color }}>
                    <span style={{ fontSize: 28 }}>{p.icon} <img src={p.image} alt="" className="w-6 h-6 object-contain" /></span>
                  </div>
                  <h4>{p.name}</h4>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ Vision & Mission ══════════ */}
        <section className="about-section about-section-alt" ref={vmRef}>
          <div className="about-glow" style={{ width: 500, height: 500, background: "rgba(139,92,246,0.06)", top: "20%", left: "5%" }} />
          <div className="about-section-inner">
            <div className="about-section-header" style={{
              opacity: vmVis ? 1 : 0,
              transform: vmVis ? "translateY(0)" : "translateY(25px)",
              transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
            }}>
              <div className="about-badge about-badge-purple">
                <span className="badge-dot" style={{ background: "#a78bfa" }} />
                Our Purpose
              </div>
              <h2 className="section-title">Vision &amp; Mission</h2>
            </div>

            <div className="about-vm-grid" style={{
              opacity: vmVis ? 1 : 0,
              transform: vmVis ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 200ms",
            }}>
              <div className="about-vm-card vision">
                <div className="vm-icon" style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", color: "#a78bfa" }}>
                  {/* <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg> */}
                  <img src={vision1} alt="Vision" className="w-6 h-6 object-contain" />
                </div>
                <h3>Vision</h3>
                <p>
                  To be India's leading sovereign AI platform - enabling every enterprise, institution, and government body to harness the full power of Artificial Intelligence with trust, transparency, and purpose.
                </p>
              </div>
              <div className="about-vm-card mission">
                <div className="vm-icon" style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)", color: "#22d3ee" }}>
                  {/* <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.841m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  </svg> */}
                  <img src={rocket} alt="Mission" className="w-6 h-6 object-contain" />
                </div>
                <h3>Mission</h3>
                <p>
                  To build and deploy sovereign, scalable, and responsible AI solutions that accelerate digital transformation across India's Education, Governance, and Enterprise sectors - making advanced AI accessible, affordable, and impactful for every organization.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ Leadership & Team ══════════ */}
        <section className="about-section about-section-dark" ref={teamRef}>
          <div className="about-glow" style={{ width: 600, height: 600, background: "rgba(139,92,246,0.05)", bottom: "10%", left: "20%" }} />
          <div className="about-glow" style={{ width: 400, height: 400, background: "rgba(236,72,153,0.04)", top: "15%", right: "10%" }} />
          <div className="about-section-inner">
            <div className="about-section-header" style={{
              opacity: teamVis ? 1 : 0,
              transform: teamVis ? "translateY(0)" : "translateY(25px)",
              transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
            }}>
              <div className="about-badge about-badge-emerald">
                <span className="badge-dot" style={{ background: "#34d399" }} />
                Our People
              </div>
              <h2 className="section-title">
                Leadership &amp;{" "}
                <span style={{
                  background: "linear-gradient(135deg, #34d399, #22d3ee)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>Team</span>
              </h2>
              <p className="section-subtitle" style={{ marginTop: 16 }}>
                Technologists, researchers, policy veterans, and enterprise strategists — united by
                a belief in India's AI potential. Hover a name to read their profile.
              </p>
            </div>

            <LeadershipSection visible={teamVis} />

            {/* Route through to the full team page (/Team), which lists the
                advisors and wider team this viewer does not cover. */}
            <div className="about-team-cta">
              <Link to="/Team" className="about-cta-btn">
                Our Team
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════ Employees / Team Members (hidden — now lives on /team) ══════════
        <section className="about-section about-section-alt" ref={empRef}>
          <div className="about-glow" style={{ width: 500, height: 500, background: "rgba(6,182,212,0.05)", top: "20%", left: "8%" }} />
          <div className="about-glow" style={{ width: 420, height: 420, background: "rgba(139,92,246,0.05)", bottom: "12%", right: "8%" }} />
          <div className="about-section-inner">
            <div className="about-section-header" style={{
              opacity: empVis ? 1 : 0,
              transform: empVis ? "translateY(0)" : "translateY(25px)",
              transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
            }}>
              <div className="about-badge about-badge-cyan">
                <span className="badge-dot" style={{ background: "#22d3ee" }} />
                Our Team
              </div>
              <h2 className="section-title">
                Meet the{" "}
                <span style={{
                  background: "linear-gradient(135deg, #22d3ee, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>People</span>
              </h2>
              <p className="section-subtitle" style={{ marginTop: 16 }}>
                The talented people building, deploying, and supporting Super AIP every day.
              </p>
            </div>

            <div className="emp-grid">
              {employees.map((m, i) => (
                <PersonCard
                  key={i}
                  name={m.name}
                  role={m.profile}
                  image={m.image}
                  imgPosition={m.imgPosition}
                  color={m.color}
                  socials={m.socials}
                  style={{
                    opacity: empVis ? 1 : 0,
                    transform: empVis ? "translateY(0)" : "translateY(24px)",
                    transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${(i + 1) * 90}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        </section>
        */}

        {/* ══════════ Associations & Recognitions ══════════ */}
        <section className="about-section about-section-alt" ref={assocRef}>
          <div className="about-glow" style={{ width: 500, height: 500, background: "rgba(99,102,241,0.05)", top: "30%", right: "5%" }} />
          <div className="about-section-inner">
            <div className="about-section-header" style={{
              opacity: assocVis ? 1 : 0,
              transform: assocVis ? "translateY(0)" : "translateY(25px)",
              transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
            }}>
              <div className="about-badge about-badge-amber">
                <span className="badge-dot" style={{ background: "#fbbf24" }} />
                Our Network
              </div>
              <h2 className="section-title">
                Associations &amp;{" "}
                <span style={{
                  background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>Recognitions</span>
              </h2>
            </div>

            <div className="about-assoc-grid">
              {associations.map((a, i) => (
                <div
                  className="about-assoc-card"
                  key={i}
                  style={{
                    opacity: assocVis ? 1 : 0,
                    transform: assocVis ? "translateY(0)" : "translateY(20px)",
                    transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${(i + 1) * 100}ms`,
                  }}
                >
                  <div className="assoc-icon" style={{ background: `${a.color}12`, border: `1px solid ${a.color}22` }}>
                    <span>
                      {a.icon}
                      <img src={a.image} alt="" className="w-6 h-6 object-contain" /></span>
                    {/* <img src={a.image} alt="" className="w-6 h-6 object-contain" /> */}
                  </div>
                  <h4>{a.title}</h4>
                  <p>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ Join the Movement CTA ══════════ */}
        {/* <section className="about-cta" ref={ctaRef}>
        <div className="about-cta-inner" style={{
          opacity: ctaVis ? 1 : 0,
          transform: ctaVis ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
          transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <h2>
            <span className="gradient-text">Join the Movement</span>
          </h2>
          <p>
            Ready to build India's AI future? Whether you're an enterprise, institution, or government body — Super AI Polaris has the platform, people, and purpose to transform your AI journey.
          </p>
          <a href="#contact">
            <button className="about-cta-btn">
              Get in Touch
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </a>
        </div>
      </section> */}

        {/* Partner testimonials — sits after Associations & Recognitions so the
            credibility story runs network → proof → CTA. */}
        <ClientsSection />

        <FinalCTA />
      </div>
    </>
  );
}