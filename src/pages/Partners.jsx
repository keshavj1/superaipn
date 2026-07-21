import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/partners.css";
import {
    Handshake, Cpu, Package, GraduationCap, Building2, Zap,
    Globe2, HeartPulse, ShieldCheck, BookOpen, Landmark, Factory,
    Lightbulb, Check, ArrowRight, Award, Users, PlayCircle,
    BookOpenCheck, FileText, Rocket, Gift, Eye, Megaphone, UserPlus, ClipboardCheck, Settings,
} from "lucide-react";

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
const partnerTracks = [
    {
        icon: <Handshake size={26} />, title: "Solution Providers",
        desc: "Build, deploy, and manage Super AI-powered products for clients across enterprise, government, and education verticals. Turn our AI platforms into your competitive advantage.",
        color: "#8b5cf6",
    },
    {
        icon: <Cpu size={26} />, title: "Technology Partners",
        desc: "Integrate your tools and platforms with NeuraEdge, NeuraDesk, and AI Lab — creating deeper, smarter solutions through interoperability and co-innovation.",
        color: "#06b6d4",
    },
    {
        icon: <Package size={26} />, title: "ISVs & OEMs",
        desc: "Customize and embed Super AI technologies directly into your existing product offerings — accelerating your AI capabilities without building from scratch.",
        color: "#ec4899",
    },
    {
        icon: <GraduationCap size={26} />, title: "Training Partners",
        desc: "Help upskill the next generation of AI-ready professionals through AI School programs, teacher training alliances, and certified learning pathways.",
        color: "#10b981",
    },
];

const academicIdealFor = [
    "Universities", "Engineering Colleges", "Research Institutions", "IITs", "NITs", "AICTE-affiliated Bodies",
];

const academicForInstitutions = [
    "Co-developed AI curriculum aligned with NEP 2020, AICTE, and industry needs",
    "Access to Super AIP's live deployment data and research infrastructure",
    "Joint publication opportunities on real-world AI research",
    "Student internship, placement, and AI lab setup support",
    "Faculty development and AI teacher training programs",
];

const academicForSuperAIP = [
    "Academic rigor and peer-review validation for research outputs",
    "Access to talent pipelines and emerging AI research",
    "Co-authorship on publications and whitepapers",
    "Domain expertise from specialized faculties",
];

const industryCategories = [
    {
        icon: <Landmark size={22} />, title: "Government & Public Sector Partners",
        desc: "Organizations specializing in government IT, e-governance, and public sector digital transformation — co-deploying NeuraEdge and NeuraBOT for citizen services, governance intelligence, and departmental automation.",
        color: "#8b5cf6",
    },
    {
        icon: <Building2 size={22} />, title: "Enterprise Technology Partners",
        desc: "ERP, CRM, and enterprise platform vendors integrating Super AIP's AI capabilities — NLP, vision, and conversational AI — into existing enterprise stacks for enhanced intelligent operations.",
        color: "#6366f1",
    },
    {
        icon: <Zap size={22} />, title: "Energy & Utilities Partners",
        desc: "Specialized partners in the energy sector deploying NeuraBOT and automation systems for customer care, billing intelligence, and operational efficiency.",
        color: "#f59e0b", live: "BSES Customer Care Bot",
    },
    {
        icon: <BookOpen size={22} />, title: "Education Technology Partners",
        desc: "EdTech platforms, school management systems, and digital learning providers integrating NeuraEduBOT and AI Lab solutions for personalized learning at scale.",
        color: "#10b981", live: "Oman · Bahrain · UAE deployments",
    },
    {
        icon: <Globe2 size={22} />, title: "Smart City & Infrastructure Partners",
        desc: "System integrators and urban technology vendors deploying NeuraEaglei for smart surveillance, traffic intelligence, and public safety infrastructure.",
        color: "#06b6d4",
    },
    {
        icon: <HeartPulse size={22} />, title: "Healthcare & Life Sciences Partners",
        desc: "Healthcare IT providers co-deploying conversational AI, document intelligence, and automation solutions for patient engagement, compliance, and operational workflows.",
        color: "#ec4899",
    },
];

const countries = [
    "India", "Mexico", "USA", "Canada", "Italy", "Ghana", "Oman",
    "Bahrain", "Sri Lanka", "Malaysia", "UK", "Caribbean Islands", "South Africa", "UAE",
];

const onboardingSteps = [
    {
        num: 1, title: "Create Your Partner Profile", color: "#06b6d4",
        desc: "Submit basic company details and share your business focus and goals. Takes less than 10 minutes to complete.",
    },
    {
        num: 2, title: "Validate Company Information", color: "#8b5cf6",
        desc: "Confirm your organization's legal name, address, and registration details as per country compliance requirements.",
    },
    {
        num: 3, title: "Begin Enablement", color: "#ec4899",
        desc: "Get immediate access to training materials, certifications, and partner resources — and begin your Super AI journey from day one.",
    },
];

const trainingFeatures = [
    {
        icon: <Award size={22} />, title: "AI & Product Certifications",
        desc: "Validate your team's expertise across NeuraEdge, NeuraDesk, AI Lab, AI School Programs, and more. Earn credentials that signal capability to enterprise and government clients.",
        color: "#8b5cf6",
    },
    {
        icon: <PlayCircle size={22} />, title: "On-Demand Learning",
        desc: "Product walkthroughs, integration tutorials, and sales readiness videos — available anytime, anywhere. Build knowledge at your own pace without scheduling constraints.",
        color: "#06b6d4",
    },
    {
        icon: <Users size={22} />, title: "Live Bootcamps",
        desc: "Deep-dive sessions with Super AIP experts covering product architecture, GTM strategies, and troubleshooting labs. Join cohort-based or on-demand live learning tracks.",
        color: "#ec4899",
    },
    {
        icon: <FileText size={22} />, title: "Use Case Library",
        desc: "Learn from real-world deployments across government, education, energy, and manufacturing. Apply proven patterns to your own client engagements from day one.",
        color: "#10b981",
    },
];

const activateBenefits = [
    "Access lead registration tools and deal tracking",
    "Unlock partner-only incentives and performance rewards",
    "Receive deal support from sales engineers and pre-sales architects",
    "Get invites to partner-exclusive product launches and beta releases",
    "Stay ahead with roadmap updates and innovation showcases",
    "Co-market with Super AIP through joint campaigns and co-branded content",
];

/* ═══════════════ PARTNERS PAGE ═══════════════ */
export default function Partners() {
    const [heroRef, heroVis] = useReveal(0.2);
    const [tracksRef, tracksVis] = useReveal(0.1);
    const [acadRef, acadVis] = useReveal(0.1);
    const [industryRef, industryVis] = useReveal(0.1);
    const [collabRef, collabVis] = useReveal(0.08);
    const [trainRef, trainVis] = useReveal(0.1);
    const [activateRef, activateVis] = useReveal(0.1);

    return (
        <div>
            {/* ══════════ HERO ══════════ */}
            <section className="partners-hero" ref={heroRef} id="partners-hero">
                <div className="partners-hero-grid" />
                <div className="partners-glow" style={{ width: 500, height: 500, background: "rgba(6,182,212,0.08)", top: "20%", left: "10%" }} />
                <div className="partners-glow" style={{ width: 400, height: 400, background: "rgba(139,92,246,0.06)", bottom: "10%", right: "15%" }} />

                <div className="partners-hero-content" style={{
                    opacity: heroVis ? 1 : 0,
                    transform: heroVis ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
                    transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
                }}>
                    <div className="partners-hero-badge">
                        <span className="pulse-dot" />
                        Super AIP Partner Ecosystem
                    </div>
                    <h1 className="hero-title about-hero-title">
                        Partner with Super AI  to Shape<br className="hidden md:block" />
                        <span className="hero-title-highlight">
                            the Future of Intelligence
                        </span>
                    </h1>
                    <p className="partners-hero-subtitle">
                        Build. Integrate. Embed. Upskill. However you want to grow — Super AIP has a partnership track designed for you.
                    </p>

                    <div className="partners-pills">
                        {["Solution Providers", "Technology Partners", "ISVs & OEMs", "Training Partners"].map((pill, i) => (
                            <a key={i} href={`#partner-tracks`} className="partners-pill">{pill}</a>
                        ))}
                    </div>

                    <Link to="/Partners#partner-tracks" className="partners-hero-cta" id="partners-get-started">
                        Get Started Now
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

            {/* ══════════ PARTNER TRACKS ══════════ */}
            <section className="partners-section partners-section-dark" ref={tracksRef} id="partner-tracks">
                <div className="partners-glow" style={{ width: 600, height: 600, background: "rgba(139,92,246,0.06)", top: "30%", right: "0" }} />
                <div className="partners-section-inner">
                    <div className="partners-section-header" style={{
                        opacity: tracksVis ? 1 : 0,
                        transform: tracksVis ? "translateY(0)" : "translateY(25px)",
                        transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
                    }}>
                        <div className="partners-hero-badge" style={{ marginBottom: 20 }}>
                            <span className="pulse-dot" />
                            Partner Tracks
                        </div>
                        <h2 className="section-title">
                            Choose Your{" "}
                            <span style={{
                                background: "linear-gradient(135deg, #22d3ee, #a78bfa)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}>Growth Path</span>
                        </h2>
                        <p className="section-subtitle" style={{ marginTop: 16 }}>
                            The future of AI is built together. Super AI Polaris brings together academic institutions, industry leaders, technology innovators, and training organizations.
                        </p>
                    </div>

                    <div className="partners-tracks-grid">
                        {partnerTracks.map((t, i) => (
                            <div
                                className="partners-track-card"
                                key={i}
                                style={{
                                    opacity: tracksVis ? 1 : 0,
                                    transform: tracksVis ? "translateY(0)" : "translateY(20px)",
                                    transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${(i + 1) * 120}ms`,
                                    "--track-color": t.color,
                                }}
                            >
                                <div style={{
                                    position: "absolute", top: 0, left: 0, right: 0, height: 3,
                                    background: `linear-gradient(90deg, ${t.color}, ${t.color}44)`,
                                    borderRadius: "22px 22px 0 0", opacity: 0.7,
                                }} />
                                <div className="track-card-icon" style={{ background: `${t.color}15`, border: `1px solid ${t.color}25`, color: t.color }}>
                                    {t.icon}
                                </div>
                                <h4>{t.title}</h4>
                                <p>{t.desc}</p>
                                {/* Was a <span> with cursor:pointer — it looked like a
                                    CTA and did nothing when clicked. */}
                                <Link
                                    to="/Contact#contact-us"
                                    className="track-explore-link"
                                    aria-label={`Explore the ${t.title} partner track`}
                                >
                                    Explore Track <ArrowRight size={14} aria-hidden="true" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ ACADEMIC PARTNERS ══════════ */}
            <section className="partners-section partners-section-alt" ref={acadRef} id="academic-partners">
                <div className="partners-glow" style={{ width: 500, height: 500, background: "rgba(6,182,212,0.05)", top: "20%", left: "5%" }} />
                <div className="partners-section-inner">
                    <div className="partners-section-header" style={{
                        opacity: acadVis ? 1 : 0,
                        transform: acadVis ? "translateY(0)" : "translateY(25px)",
                        transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
                    }}>
                        <div className="partners-hero-badge" style={{ marginBottom: 20, borderColor: "rgba(16,185,129,0.25)", background: "rgba(16,185,129,0.06)", color: "#6ee7b7" }}>
                            <span className="pulse-dot" style={{ background: "#34d399" }} />
                            Academic Partners
                        </div>
                        <h2 className="section-title">
                            <span style={{
                                background: "linear-gradient(135deg, #34d399, #22d3ee)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}>Research that Deploys.</span>{" "}Knowledge that Scales.
                        </h2>
                        <p className="section-subtitle" style={{ marginTop: 16 }}>
                            Super AIP collaborates with universities, research institutions, and academic bodies to co-develop AI curricula, conduct joint research, and create pathways from academic inquiry to real-world AI deployment.
                        </p>
                    </div>

                    <div style={{
                        opacity: acadVis ? 1 : 0,
                        transform: acadVis ? "translateY(0)" : "translateY(20px)",
                        transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 200ms",
                    }}>
                        {/* Ideal For tags */}
                        <div style={{ textAlign: "center", marginBottom: 42 }}>
                            <span style={{ fontSize: 12, fontWeight: 600, color: "#64748b", letterSpacing: "0.12em", textTransform: "uppercase", marginRight: 12 }}>Ideal for:</span>
                            <div className="academic-ideal" style={{ justifyContent: "center", marginTop: 10 }}>
                                {academicIdealFor.map((tag, i) => (
                                    <span key={i} className="academic-ideal-tag">{tag}</span>
                                ))}
                            </div>
                        </div>

                        {/* Two-column benefits */}
                        <div className="academic-layout">
                            <div className="academic-benefits-card">
                                <h5><GraduationCap size={18} style={{ color: "#22d3ee" }} /> For Institutions</h5>
                                <ul>
                                    {academicForInstitutions.map((b, i) => <li key={i}>{b}</li>)}
                                </ul>
                            </div>
                            <div className="academic-benefits-card">
                                <h5><Lightbulb size={18} style={{ color: "#a78bfa" }} /> For Super AIP</h5>
                                <ul>
                                    {academicForSuperAIP.map((b, i) => <li key={i}>{b}</li>)}
                                </ul>
                            </div>
                        </div>

                        {/* Current Associations */}
                        <div className="academic-associations" style={{ marginTop: 28 }}>
                            <h5>Current Academic Associations</h5>
                            <p>✦ University of Delhi · NIT Rourkela · AICTE Empanelled Institutions · KVS Ecosystem · NCERT · Chandigarh University</p>
                        </div>

                        {/* CTA */}
                        <div className="partners-cta-block">
                            <h3>Become an Academic Partner</h3>
                            <div className="cta-buttons">
                                <Link to="/Contact#contact-us" className="cta-btn-primary" id="submit-academic-proposal">Submit a Partnership Proposal <ArrowRight size={16} /></Link>
                                <Link to="/Contact#contact-us" className="cta-btn-secondary" id="talk-academic-team">Talk to Our Academic Alliances Team</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════ INDUSTRY PARTNERS ══════════ */}
            <section className="partners-section partners-section-dark" ref={industryRef} id="industry-partners">
                <div className="partners-glow" style={{ width: 600, height: 600, background: "rgba(139,92,246,0.05)", bottom: "10%", left: "20%" }} />
                <div className="partners-glow" style={{ width: 400, height: 400, background: "rgba(236,72,153,0.04)", top: "15%", right: "10%" }} />
                <div className="partners-section-inner">
                    <div className="partners-section-header" style={{
                        opacity: industryVis ? 1 : 0,
                        transform: industryVis ? "translateY(0)" : "translateY(25px)",
                        transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
                    }}>
                        <div className="partners-hero-badge" style={{ marginBottom: 20, borderColor: "rgba(236,72,153,0.25)", background: "rgba(236,72,153,0.06)", color: "#f9a8d4" }}>
                            <span className="pulse-dot" style={{ background: "#ec4899" }} />
                            Industry Partners
                        </div>
                        <h2 className="section-title">
                            <span style={{
                                background: "linear-gradient(135deg, #f9a8d4, #c084fc)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}>Stronger Together.</span>{" "}Faster to Market.
                        </h2>
                        <p className="section-subtitle" style={{ marginTop: 16 }}>
                            Super AIP's industry partner network spans technology companies, system integrators, enterprise solution providers, and sector specialists — united by a shared commitment to deploying sovereign, impactful AI at scale.
                        </p>
                    </div>

                    {/* Ideal For */}
                    <div style={{
                        textAlign: "center", marginBottom: 42,
                        opacity: industryVis ? 1 : 0,
                        transform: industryVis ? "translateY(0)" : "translateY(15px)",
                        transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 100ms",
                    }}>
                        <div className="academic-ideal" style={{ justifyContent: "center" }}>
                            {["Technology Companies", "System Integrators", "Enterprise Solution Providers", "Sector Specialists", "Government Technology Vendors"].map((tag, i) => (
                                <span key={i} className="academic-ideal-tag" style={{ background: "rgba(139,92,246,0.08)", borderColor: "rgba(139,92,246,0.15)", color: "#c4b5fd" }}>{tag}</span>
                            ))}
                        </div>
                    </div>

                    {/* Industry Cards */}
                    <div className="industry-grid">
                        {industryCategories.map((cat, i) => (
                            <div
                                className="industry-card"
                                key={i}
                                style={{
                                    opacity: industryVis ? 1 : 0,
                                    transform: industryVis ? "translateY(0)" : "translateY(20px)",
                                    transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${(i + 1) * 100}ms`,
                                }}
                            >
                                <div style={{
                                    position: "absolute", top: 0, left: 0, width: 3, height: "100%",
                                    background: `linear-gradient(180deg, ${cat.color}, transparent)`,
                                    borderRadius: "20px 0 0 20px", opacity: 0.7,
                                }} />
                                <div className="industry-card-icon" style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}25`, color: cat.color }}>
                                    {cat.icon}
                                </div>
                                <h4>{cat.title}</h4>
                                <p>{cat.desc}</p>
                                {cat.live && (
                                    <div className="live-badge">
                                        <span className="live-pulse" />
                                        Live: {cat.live}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* World Map */}
                    <div className="world-map-container" style={{
                        opacity: industryVis ? 1 : 0,
                        transform: industryVis ? "translateY(0)" : "translateY(15px)",
                        transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 600ms",
                    }}>
                        <div className="world-map-title">
                            <h4>Global Partner Presence</h4>
                            <p>Super AIP's industry partner network spans 14+ countries across Asia, the Middle East, Africa, Europe, and the Americas.</p>
                        </div>
                        <div className="world-map-dots">
                            {countries.map((c, i) => (
                                <div key={i} className="map-country-dot">
                                    <span className="dot" />
                                    {c}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="partners-cta-block">
                        <h3>Become an Industry Partner</h3>
                        <div className="cta-buttons">
                            <Link to="/Contact#contact-us" className="cta-btn-primary" id="register-industry-partner">Register as a Partner <ArrowRight size={16} /></Link>
                            <Link to="/Contact#contact-us" className="cta-btn-secondary" id="explore-gtm">Explore Co-Go-To-Market Opportunities</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════ COLLABORATION PROGRAMS ══════════ */}
            <section className="partners-section partners-section-alt" ref={collabRef} id="collaboration-programs">
                <div className="partners-glow" style={{ width: 500, height: 500, background: "rgba(6,182,212,0.05)", top: "10%", right: "5%" }} />
                <div className="partners-section-inner">
                    <div className="partners-section-header" style={{
                        opacity: collabVis ? 1 : 0,
                        transform: collabVis ? "translateY(0)" : "translateY(25px)",
                        transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
                    }}>
                        <div className="partners-hero-badge" style={{ marginBottom: 20, borderColor: "rgba(245,158,11,0.25)", background: "rgba(245,158,11,0.06)", color: "#fcd34d" }}>
                            <span className="pulse-dot" style={{ background: "#f59e0b" }} />
                            Collaboration Programs
                        </div>
                        <h2 className="section-title">
                            Three Steps to Your{" "}
                            <span style={{
                                background: "linear-gradient(135deg, #fcd34d, #f59e0b)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}>Super AIP Partnership</span>
                        </h2>
                        <p className="section-subtitle" style={{ marginTop: 16 }}>
                            Super AIP's collaboration programs are designed to onboard, enable, and accelerate partners at every stage — from first registration to full joint go‑to‑market execution.
                        </p>
                    </div>

                    {/* 3-Step Stepper */}
                    <div className="stepper-section" style={{
                        opacity: collabVis ? 1 : 0,
                        transform: collabVis ? "translateY(0)" : "translateY(20px)",
                        transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 200ms",
                    }}>
                        {/* `is-drawn` starts the connector animation once the section
                            scrolls into view: the line draws 1 → 2 → 3 and each circle
                            activates as the line reaches it. */}
                        <div className={`stepper-row${collabVis ? " is-drawn" : ""}`}>
                            {onboardingSteps.map((step, i) => (
                                <div className="stepper-step" key={i}>
                                    <div className="stepper-number" style={{
                                        background: `${step.color}12`,
                                        borderColor: `${step.color}40`,
                                        color: step.color,
                                        // Circle i lights up as the drawing line arrives.
                                        "--step-delay": `${i * 620}ms`,
                                        "--step-color": step.color,
                                    }}>
                                        {step.num}
                                    </div>
                                    <h4>{step.title}</h4>
                                    <p>{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Training & Enablement */}
                    <div ref={trainRef} style={{
                        opacity: trainVis ? 1 : 0,
                        transform: trainVis ? "translateY(0)" : "translateY(20px)",
                        transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
                    }}>
                        <div style={{ textAlign: "center", marginBottom: 40 }}>
                            <h3 style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
                                Training & Enablement
                            </h3>
                            <p style={{ fontSize: 15, color: "#94a3b8" }}>Accelerate with joint growth strategies.</p>
                        </div>

                        <div className="training-grid">
                            {trainingFeatures.map((feat, i) => (
                                <div
                                    className="training-card"
                                    key={i}
                                    style={{
                                        opacity: trainVis ? 1 : 0,
                                        transform: trainVis ? "translateY(0)" : "translateY(15px)",
                                        transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${(i + 1) * 100}ms`,
                                    }}
                                >
                                    <div className="training-card-icon" style={{ background: `${feat.color}15`, border: `1px solid ${feat.color}25`, color: feat.color }}>
                                        {feat.icon}
                                    </div>
                                    <h4>{feat.title}</h4>
                                    <p>{feat.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Activate & Grow */}
                    <div className="activate-section" ref={activateRef} style={{
                        opacity: activateVis ? 1 : 0,
                        transform: activateVis ? "translateY(0)" : "translateY(20px)",
                        transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
                    }}>
                        <div className="activate-header">
                            <h3>Activate & Grow</h3>
                            <p>Unlock full partner benefits once onboarded.</p>
                        </div>
                        <div className="activate-checklist">
                            {activateBenefits.map((benefit, i) => (
                                <div className="activate-item" key={i} style={{
                                    opacity: activateVis ? 1 : 0,
                                    transform: activateVis ? "translateX(0)" : "translateX(-15px)",
                                    transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${(i + 1) * 80}ms`,
                                }}>
                                    <div className="activate-check">
                                        <Check size={13} />
                                    </div>
                                    <span>{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Final CTA */}
                    <div className="partners-cta-block">
                        <h3>Partner Benefits That Scale With You</h3>
                        <div className="cta-buttons">
                            <Link to="/Contact#contact-us" className="cta-btn-primary" id="browse-certifications">Browse All Certifications <ArrowRight size={16} /></Link>
                            <Link to="/Contact#contact-us" className="cta-btn-secondary" id="enroll-team">Enroll Your Team</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
