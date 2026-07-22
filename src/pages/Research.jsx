import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/research.css";
import {
    Brain, Cpu, GitBranch, Database, Layers, BarChart3, FlaskConical,
    GraduationCap, FileText, Lightbulb, ArrowRight, Check, Shield,
    Cloud, Server, Smartphone, BookOpen, Building, Landmark, Scale,
    Leaf, Stethoscope, Zap, Settings, RefreshCw, Search, Target,
    ChevronRight, ShieldCheck, CircleDot, Award, Beaker,
} from "lucide-react";

/* ─── Scroll reveal ─── */
function useReveal(threshold = 0.12) {
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
/* Router links, not bare fragment anchors: a native "#id" anchor fires
   hashchange rather than popstate, so useLocation() never updates, ScrollToTop's
   navbar-offset compensation never runs, and Lenis overrides the browser's own
   jump on the next frame. */
const navPills = [
    { label: "AI Research", to: "/Research#ai-research" },
    { label: "Publications", to: "/Research#publications" },
    { label: "Innovation Labs — IP", to: "/Research#innovation-labs" },
];

const pipelineNodes = [
    { label: "Input Data", color: "#8b5cf6" },
    { label: "Task Decomposer", color: "#6366f1" },
    { label: "Centralized Router", color: "#06b6d4" },
    { label: "Labeling Sources", color: "#10b981" },
    { label: "Combiner", color: "#f59e0b" },
    { label: "Unified Output", color: "#ec4899" },
    { label: "Training Loop", color: "#8b5cf6" },
];

const hiwSteps = [
    { title: "Break Input into Smaller Tasks", desc: "Raw data is deconstructed into smaller, manageable tasks. Each data point often requires distinct handling — particularly for inputs like images, which differ significantly in quality and noise levels.", color: "#8b5cf6" },
    { title: "Route Tasks to Optimal Sources", desc: "Tasks are forwarded to a centralized routing system over a dynamic database of labeling sources. Each source is evaluated across quality, cost, and speed — selecting the most suitable labeling source for each task.", color: "#06b6d4" },
];

const inputDataTypes = [
    { icon: "💰", label: "Socio-economic: income, parental education" },
    { icon: "📊", label: "Academic: grades, attendance" },
    { icon: "🎯", label: "Behavioral: participation, discipline records" },
    { icon: "🏛️", label: "Institutional: funding, curriculum structure" },
];

const archModules = [
    { title: "Factor Analysis Module", desc: "PCA and EFA implementation for latent factor discovery", color: "#8b5cf6", icon: <BarChart3 size={16} /> },
    { title: "Hypothesis Testing Module", desc: "t-test, ANOVA, and statistical significance testing", color: "#06b6d4", icon: <FlaskConical size={16} /> },
    { title: "Predictive Analytics", desc: "Random forest, neural networks for outcome prediction", color: "#10b981", icon: <Brain size={16} /> },
    { title: "Data Handling (ETL)", desc: "Pipeline and preprocessing for heterogeneous educational data", color: "#f59e0b", icon: <Database size={16} /> },
    { title: "Meta-Model Trainer", desc: "Reinforcement learning for intelligent task routing", color: "#ec4899", icon: <RefreshCw size={16} /> },
    { title: "User Interface / API", desc: "Dashboard, alerts, and institutional reporting", color: "#6366f1", icon: <Layers size={16} /> },
];

const educationPipelineNodes = [
    { label: "Input Ingestion", color: "#8b5cf6" },
    { label: "Task Decomposer", color: "#6366f1" },
    { label: "Router", color: "#06b6d4" },
    { label: "Analytical Engines", color: "#10b981" },
    { label: "Combiner", color: "#f59e0b" },
    { label: "Report Output", color: "#ec4899" },
    { label: "Meta-Model Trainer ↻", color: "#8b5cf6" },
];

const capabilities = [
    { icon: <Search size={20} />, title: "Work With Less Data", desc: "Zero-shot and few-shot learning dramatically reduce dependency on massive labeled datasets — especially valuable in public sector and SME deployments.", color: "#8b5cf6" },
    { icon: <Target size={20} />, title: "Custom AI Built Around You", desc: "Bespoke AI models using your own datasets, policies, and domain-specific documents. NeuraEdge and NeuraDesk learn from your content and adapt continuously.", color: "#06b6d4" },
    { icon: <Zap size={20} />, title: "Smarter Data Extraction", desc: "Deep OCR integration and LLM reasoning enable accurate extraction from handwritten forms, government orders, circulars, and scanned contracts.", color: "#10b981" },
    { icon: <BarChart3 size={20} />, title: "Boosted Automation", desc: "Accuracy levels outperforming traditional OCR-document intelligence pipelines — significantly reducing manual verification and enabling higher-value activities.", color: "#f59e0b" },
];

const sectors = [
    { icon: <GraduationCap size={16} />, label: "Education Boards", desc: "Result forms, grievances, dropout risk" },
    { icon: <Building size={16} />, label: "Finance Departments", desc: "Invoice processing, document verification" },
    { icon: <Leaf size={16} />, label: "Agriculture & Revenue", desc: "Handwritten records, land documents" },
    { icon: <Scale size={16} />, label: "Legal & Compliance", desc: "Court filings, contracts, case histories" },
];

const ipClaims = [
    "Automated system for educational factor analysis",
    "Latent factor modeling from heterogeneous data inputs",
    "Statistical hypothesis testing module (t-test, ANOVA)",
    "Use of socio-economic and academic data in unified analysis",
    "Self-learning meta-model for routing optimization",
    "ML-based predictive modules for outcome forecasting",
    "Task routing based on individual data characteristics",
    "Quality assurance monitoring across analytical outputs",
    "Execution via distributed computing devices",
    "End-to-end automated analysis method as a complete system",
];

/* ═══════════════ RESEARCH PAGE ═══════════════ */
export default function Research() {
    const [heroRef, heroVis] = useReveal(0.15);
    const [aiRef, aiVis] = useReveal(0.06);
    const [eduRef, eduVis] = useReveal(0.06);
    const [pubRef, pubVis] = useReveal(0.06);
    const [capRef, capVis] = useReveal(0.06);
    const [ipRef, ipVis] = useReveal(0.06);

    return (
        <div>
            {/* ══════════ HERO ══════════ */}
            <section className="research-hero" ref={heroRef}>
                <div className="research-hero-grid" />
                <div className="research-glow" style={{ width: 500, height: 500, background: "rgba(139,92,246,0.08)", top: "15%", left: "10%" }} />
                <div className="research-glow" style={{ width: 400, height: 400, background: "rgba(6,182,212,0.06)", bottom: "10%", right: "15%" }} />

                <div className="research-hero-content" style={{
                    opacity: heroVis ? 1 : 0,
                    transform: heroVis ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
                    transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
                }}>
                    <div className="research-badge" style={{ borderColor: "rgba(139,92,246,0.25)", background: "rgba(139,92,246,0.06)", color: "#c4b5fd" }}>
                        <span className="pulse-dot" style={{ background: "#a78bfa" }} />
                        Research & Innovation
                    </div>
                    <h1 className="hero-title about-hero-title">
                        Advancing the Frontier of  <br className="hidden md:block" />
                        <span className="hero-title-highlight">
                            Applied AI Research
                        </span>
                    </h1>
                    <p className="research-hero-subtitle">
                        Super AI Polaris is advancing the frontier of applied AI research — translating rigorous inquiry into sovereign, enterprise-ready intelligence systems built for governance, education, and document intelligence at scale.
                    </p>

                    <div className="research-nav-pills">
                        {navPills.map((p, i) => (
                            <Link key={p.label} to={p.to} className="research-nav-pill" style={{
                                opacity: heroVis ? 1 : 0,
                                transform: heroVis ? "translateY(0)" : "translateY(10px)",
                                transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${(i + 2) * 100}ms`,
                            }}>
                                {p.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ AI RESEARCH ══════════ */}
            <section className="research-section research-section-dark" ref={aiRef} id="ai-research">
                <div className="research-glow" style={{ width: 600, height: 600, background: "rgba(139,92,246,0.04)", top: "10%", right: "0" }} />
                <div className="research-section-inner">
                    <div className="research-section-header" style={{
                        opacity: aiVis ? 1 : 0,
                        transform: aiVis ? "translateY(0)" : "translateY(25px)",
                        transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
                    }}>
                        <div className="research-badge" style={{ borderColor: "rgba(139,92,246,0.25)", background: "rgba(139,92,246,0.06)", color: "#c4b5fd" }}>
                            <span className="pulse-dot" style={{ background: "#a78bfa" }} />
                            AI Research
                        </div>
                        <h2 className="section-title">
                            From Raw Data to{" "}
                            <span style={{ background: "linear-gradient(135deg,#a78bfa,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                Real Intelligence
                            </span>
                        </h2>
                        <p className="section-subtitle" style={{ marginTop: 16 }}>
                            Super AIP's AI research focuses on building intelligent systems that process, route, analyze, and continuously learn from complex data — with a core emphasis on education, governance, and enterprise document intelligence.
                        </p>
                    </div>

                    {/* Research Focus 1 */}
                    <div className="research-focus-card" style={{
                        opacity: aiVis ? 1 : 0,
                        transform: aiVis ? "translateY(0)" : "translateY(20px)",
                        transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 200ms",
                    }}>
                        <div className="focus-number" style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", color: "#c4b5fd" }}>
                            Research Focus 1
                        </div>
                        <h3>AI Engine Architecture for Intelligent Data Processing</h3>
                        <p>
                            Super AIP's AI engine serves as the core execution system of an intelligent assembly line. It orchestrates the breakdown of incoming data into manageable subtasks, ensures each is accurately labeled, and seamlessly recombines outputs into unified, meaningful results. The engine also leverages processed outputs as training data — continuously improving its machine learning models through an evolving, self-refining labeling mechanism.
                        </p>

                        <h4 className="sub-section-title">
                            <span className="title-dot" style={{ background: "#8b5cf6" }} />
                            How It Works
                        </h4>
                        <div className="how-it-works-grid">
                            {hiwSteps.map((s, i) => (
                                <div className="hiw-step" key={i}>
                                    <div className="hiw-step-header">
                                        <div className="hiw-step-num" style={{ background: `${s.color}15`, border: `1px solid ${s.color}30`, color: s.color }}>
                                            {i + 1}
                                        </div>
                                        <h5>{s.title}</h5>
                                    </div>
                                    <p>{s.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="pipeline-diagram">
                            {pipelineNodes.map((n, i) => (
                                <React.Fragment key={i}>
                                    <div className="pipeline-node" style={{ background: `${n.color}15`, border: `1px solid ${n.color}25`, color: n.color }}>
                                        {n.label}
                                    </div>
                                    {i < pipelineNodes.length - 1 && <span className="pipeline-arrow">→</span>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Research Focus 2 */}
                    <div className="research-focus-card" ref={eduRef} style={{
                        opacity: eduVis ? 1 : 0,
                        transform: eduVis ? "translateY(0)" : "translateY(20px)",
                        transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
                    }}>
                        <div className="focus-number" style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)", color: "#67e8f9" }}>
                            Research Focus 2
                        </div>
                        <h3>Automated Multi-Dimensional Factor Analysis System for Education</h3>
                        <p>
                            This research introduces a system and method for automating the analysis of educational outcomes by identifying and testing latent factors in both student and institutional data. The system applies factor analysis — a statistical method to uncover hidden variables — enabling data-driven understanding of what truly drives learning outcomes.
                        </p>

                        {/* Formula */}
                        <div className="formula-block">
                            <div className="formula">Xj = λj1·F1 + λj2·F2 + ... + λjm·Fm + εj</div>
                            <div className="formula-desc">
                                Each observed variable (Xj) is expressed as a weighted combination of latent factors (F1...Fm) plus an error term — enabling the system to surface hidden drivers behind academic performance.
                            </div>
                        </div>

                        {/* Input Data Types */}
                        <h4 className="sub-section-title">
                            <span className="title-dot" style={{ background: "#06b6d4" }} />
                            Input Data Types
                        </h4>
                        <div className="data-tags">
                            {inputDataTypes.map((d, i) => (
                                <div className="data-tag" key={i}>
                                    <span className="tag-icon">{d.icon}</span>
                                    {d.label}
                                </div>
                            ))}
                        </div>

                        {/* Architecture Pipeline */}
                        <h4 className="sub-section-title">
                            <span className="title-dot" style={{ background: "#10b981" }} />
                            System Architecture
                        </h4>
                        <div className="pipeline-diagram">
                            {educationPipelineNodes.map((n, i) => (
                                <React.Fragment key={i}>
                                    <div className="pipeline-node" style={{ background: `${n.color}15`, border: `1px solid ${n.color}25`, color: n.color }}>
                                        {n.label}
                                    </div>
                                    {i < educationPipelineNodes.length - 1 && <span className="pipeline-arrow">→</span>}
                                </React.Fragment>
                            ))}
                        </div>

                        {/* AI & ML Modules */}
                        <h4 className="sub-section-title">
                            <span className="title-dot" style={{ background: "#8b5cf6" }} />
                            AI & ML Modules
                        </h4>
                        <div className="module-grid">
                            {archModules.map((m, i) => (
                                <div className="module-card" key={i}>
                                    <h5>
                                        <span style={{ color: m.color }}>{m.icon}</span>
                                        {m.title}
                                    </h5>
                                    <p>{m.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Outcome */}
                        <div style={{
                            padding: "24px 28px", borderRadius: 18, marginTop: 24,
                            border: "1px solid rgba(16,185,129,0.12)", background: "rgba(16,185,129,0.04)",
                        }}>
                            <h5 style={{ fontSize: 15, fontWeight: 700, color: "#6ee7b7", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                                <Lightbulb size={18} /> Outcome
                            </h5>
                            <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.8, margin: 0 }}>
                                A novel, automated, and scalable solution for educational data analysis — integrating AI, statistical techniques, and adaptive learning into a single architecture that uncovers what drives student and institutional outcomes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════ PUBLICATIONS ══════════ */}
            <section className="research-section research-section-alt" ref={pubRef} id="publications">
                <div className="research-glow" style={{ width: 500, height: 500, background: "rgba(6,182,212,0.04)", top: "20%", left: "5%" }} />
                <div className="research-section-inner">
                    <div className="research-section-header" style={{
                        opacity: pubVis ? 1 : 0,
                        transform: pubVis ? "translateY(0)" : "translateY(25px)",
                        transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
                    }}>
                        <div className="research-badge" style={{ borderColor: "rgba(6,182,212,0.25)", background: "rgba(6,182,212,0.06)", color: "#67e8f9" }}>
                            <span className="pulse-dot" style={{ background: "#22d3ee" }} />
                            Publications
                        </div>
                        <h2 className="section-title">
                            Enterprise-Ready AI.{" "}
                            <span style={{ background: "linear-gradient(135deg,#22d3ee,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                Documented & Verified
                            </span>
                        </h2>
                        <p className="section-subtitle" style={{ marginTop: 16 }}>
                            Super AIP publishes whitepapers and technical documentation that translate research findings into actionable frameworks for enterprise and government deployment — making the case for sovereign, responsible, and scalable AI.
                        </p>
                    </div>

                    <div className="whitepaper-card" style={{
                        opacity: pubVis ? 1 : 0,
                        transform: pubVis ? "translateY(0)" : "translateY(20px)",
                        transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 200ms",
                    }}>
                        <div className="focus-number" style={{ color: "#fff" }}>
                            <FileText size={12} /> Whitepaper
                        </div>
                        <h3>Reimagining Intelligent Document Processing with Enterprise-Ready Language Models</h3>
                        <p>
                            Over the past year, AI has undergone transformative change — driven by the evolution of Large Language Models. These advances are unlocking new capabilities at the intersection of LLMs and AI-powered document intelligence. Super AIP is charting a purpose-built course through this landscape with NeuraDesk and NeuraEdge — tailored to the specific demands of enterprise and government ecosystems.
                        </p>

                        {/* LLM Advantage */}
                        <h4 className="sub-section-title">
                            <span className="title-dot" style={{ background: "#06b6d4" }} />
                            From Plain Language to Powerful AI
                        </h4>
                        <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.8, marginBottom: 24 }}>
                            LLMs are revolutionizing how users interact with AI — enabling organizations to train and guide systems using natural language, without deep technical expertise. NeuraDesk (an offline, OCR-enabled LLM platform) and NeuraEdge (a cloud-powered, mobile-accessible small language model platform) empower enterprises and government departments to harness LLMs for secure, scalable, and context-aware document processing.
                        </p>

                        {/* Comparison */}
                        <h4 className="sub-section-title">
                            <span className="title-dot" style={{ background: "#ec4899" }} />
                            Bridging the Enterprise Gap
                        </h4>
                        <div className="comparison-grid">
                            <div className="comparison-card" style={{ background: "rgba(239,68,68,0.03)", borderColor: "rgba(239,68,68,0.12)" }}>
                                <h4 style={{ color: "#f87171" }}>
                                    <Cloud size={18} /> General-Purpose LLM
                                </h4>
                                <ul>
                                    {["Probabilistic outputs", "Uncontrolled generation", "Cloud-only deployment", "No auditability", "Generic training data"].map((item, i) => (
                                        <li key={i} style={{ color: "#94a3b8" }}>
                                            <span style={{ color: "#f87171", marginTop: 2 }}>✗</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="comparison-card" style={{ background: "rgba(16,185,129,0.03)", borderColor: "rgba(16,185,129,0.12)" }}>
                                <h4 style={{ color: "#6ee7b7" }}>
                                    <ShieldCheck size={18} /> Super AIP Enterprise LLM
                                </h4>
                                <ul>
                                    {["Deterministic governance controls", "On-premise via NeuraDesk", "Cloud + mobile via NeuraEdge", "Full audit trail", "Task-specific fine-tuning"].map((item, i) => (
                                        <li key={i} style={{ color: "#94a3b8" }}>
                                            <span style={{ color: "#6ee7b7", marginTop: 2 }}>✓</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Key Capabilities */}
                    <div ref={capRef}>
                        <h4 className="sub-section-title" style={{ justifyContent: "center", fontSize: 20 }}>
                            <span className="title-dot" style={{ background: "#06b6d4" }} />
                            Transforming Document Intelligence
                        </h4>
                        <div className="capability-grid" style={{
                            opacity: capVis ? 1 : 0,
                            transform: capVis ? "translateY(0)" : "translateY(15px)",
                            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
                        }}>
                            {capabilities.map((c, i) => (
                                <div className="capability-card" key={i} style={{
                                    opacity: capVis ? 1 : 0,
                                    transform: capVis ? "translateY(0)" : "translateY(10px)",
                                    transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 100}ms`,
                                }}>
                                    <div className="cap-icon" style={{ background: `${c.color}15`, border: `1px solid ${c.color}25`, color: c.color }}>
                                        {c.icon}
                                    </div>
                                    <h5>{c.title}</h5>
                                    <p>{c.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Trusted Sectors */}
                        <h4 className="sub-section-title" style={{ justifyContent: "center", fontSize: 20, marginTop: 40 }}>
                            <span className="title-dot" style={{ background: "#8b5cf6" }} />
                            Trusted Across Critical Sectors
                        </h4>
                        <div className="sector-grid" style={{ justifyContent: "center" }}>
                            {sectors.map((s, i) => (
                                <div className="sector-tag" key={i}>
                                    <span style={{ color: "#a78bfa" }}>{s.icon}</span>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: 13, color: "#e2e8f0" }}>{s.label}</div>
                                        <div style={{ fontSize: 11, color: "#64748b" }}>{s.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Why Super AIP */}
                        <div style={{
                            padding: "28px 32px", borderRadius: 20, marginTop: 36,
                            border: "1px solid rgba(139,92,246,0.12)", background: "rgba(139,92,246,0.03)",
                        }}>
                            <h5 style={{ fontSize: 17, fontWeight: 700, color: "#c4b5fd", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                                <Award size={18} /> Why Super AI Polaris
                            </h5>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                                {[
                                    "Design tailored AI workflows aligned with Indian government standards",
                                    "Embed compliance, transparency, and language diversity — Hindi, English, and regional languages — into the core",
                                    "Deliver training and support through AICTE-approved instructors and AI Labs",
                                ].map((item, i) => (
                                    <li key={i} style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7, display: "flex", alignItems: "flex-start", gap: 10 }}>
                                        <Check size={16} style={{ color: "#a78bfa", flexShrink: 0, marginTop: 3 }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════ INNOVATION LABS — IP ══════════ */}
            <section className="research-section research-section-dark" ref={ipRef} id="innovation-labs">
                <div className="research-glow" style={{ width: 500, height: 500, background: "rgba(139,92,246,0.04)", top: "15%", right: "5%" }} />
                <div className="research-section-inner">
                    <div className="research-section-header" style={{
                        opacity: ipVis ? 1 : 0,
                        transform: ipVis ? "translateY(0)" : "translateY(25px)",
                        transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
                    }}>
                        <div className="research-badge" style={{ borderColor: "rgba(236,72,153,0.25)", background: "rgba(236,72,153,0.06)", color: "#f9a8d4" }}>
                            <span className="pulse-dot" style={{ background: "#ec4899" }} />
                            Innovation Labs — IP
                        </div>
                        <h2 className="section-title">
                            Proprietary Research.{" "}
                            <span style={{ background: "linear-gradient(135deg,#ec4899,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                Patentable Intelligence
                            </span>
                        </h2>
                        <p className="section-subtitle" style={{ marginTop: 16 }}>
                            Super AIP's innovation pipeline includes active intellectual property development — with patentable systems in automated educational analytics, intelligent task routing, and multi-dimensional factor analysis.
                        </p>
                    </div>

                    <div className="research-focus-card" style={{
                        opacity: ipVis ? 1 : 0,
                        transform: ipVis ? "translateY(0)" : "translateY(20px)",
                        transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 200ms",
                    }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
                            <span className="focus-number" style={{ background: "rgba(236,72,153,0.1)", border: "1px solid rgba(236,72,153,0.2)", color: "#f9a8d4", margin: 0 }}>
                                <Shield size={12} /> Patent Application
                            </span>
                            <span className="focus-number" style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", color: "#c4b5fd", margin: 0 }}>
                                AI in Education
                            </span>
                            <span className="focus-number" style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)", color: "#67e8f9", margin: 0 }}>
                                Statistical Learning
                            </span>
                        </div>

                        <h3>Automated Multi-Dimensional Factor Analysis System for Education</h3>
                        <p>
                            A system and method for automating the analysis of educational outcomes by identifying and testing latent factors in both student and institutional data. The system uses factor analysis to uncover hidden variables driving academic performance — integrating AI, statistical techniques, and adaptive learning into a single scalable architecture.
                        </p>

                        <h4 className="sub-section-title">
                            <span className="title-dot" style={{ background: "#ec4899" }} />
                            Claims Summary
                        </h4>
                        <div className="claims-list">
                            {ipClaims.map((claim, i) => (
                                <div className="claim-item" key={i} style={{
                                    opacity: ipVis ? 1 : 0,
                                    transform: ipVis ? "translateX(0)" : "translateX(-10px)",
                                    transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${(i + 3) * 60}ms`,
                                }}>
                                    <div className="claim-num" style={{
                                        background: i < 3 ? "rgba(139,92,246,0.12)" : i < 6 ? "rgba(6,182,212,0.12)" : i < 8 ? "rgba(16,185,129,0.12)" : "rgba(236,72,153,0.12)",
                                        color: i < 3 ? "#c4b5fd" : i < 6 ? "#67e8f9" : i < 8 ? "#6ee7b7" : "#f9a8d4",
                                    }}>
                                        {i + 1}
                                    </div>
                                    <span>{claim}</span>
                                </div>
                            ))}
                        </div>

                        {/* Architecture Pipeline (same as Focus 2 but with claim annotations) */}
                        <h4 className="sub-section-title" style={{ marginTop: 28 }}>
                            <span className="title-dot" style={{ background: "#8b5cf6" }} />
                            IP System Architecture
                        </h4>
                        <div className="pipeline-diagram">
                            {educationPipelineNodes.map((n, i) => (
                                <React.Fragment key={i}>
                                    <div className="pipeline-node" style={{ background: `${n.color}15`, border: `1px solid ${n.color}25`, color: n.color, position: "relative" }}>
                                        {n.label}
                                        <sup style={{ fontSize: 9, marginLeft: 3, opacity: 0.7 }}>C{i + 1}</sup>
                                    </div>
                                    {i < educationPipelineNodes.length - 1 && <span className="pipeline-arrow">→</span>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <div className="research-cta-block">
                        <h3>Explore Our Research & Partnership Opportunities</h3>
                        <div className="research-cta-buttons">
                            <Link to="/Contact#contact-us" className="rcta-btn-pri">
                                Collaborate With Us <ArrowRight size={16} />
                            </Link>
                            <Link to="/Partners" className="rcta-btn-sec">
                                Partner Programs <ChevronRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
