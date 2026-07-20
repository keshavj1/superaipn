import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Layers, Cpu, BookOpen, MessageSquare, Eye, Bot,
    Workflow, CheckCircle2, Zap, BrainCircuit, Activity,
    Plane, UserCheck, GraduationCap, ShieldCheck,
    Terminal, Code, Database, Globe, PlayCircle, ArrowRight
} from 'lucide-react';
import '../styles/products.css';

// Reusable hook for scroll reveal animations
const useReveal = () => {
    const revealRefs = useRef([]);

    const addToRefs = (el) => {
        if (el && !revealRefs.current.includes(el)) {
            revealRefs.current.push(el);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        revealRefs.current.forEach(ref => observer.observe(ref));
        return () => observer.disconnect();
    }, []);

    return addToRefs;
};

// --- DATA ---
const categories = [
    { id: 'platforms', title: 'AI Platforms', desc: 'Cognitive core & LLMs', icon: Layers },
    { id: 'automation', title: 'Automation Systems', desc: 'Agentic workflows', icon: Workflow },
    { id: 'robotics', title: 'Robotics Solutions', desc: 'Physical intelligence', icon: Bot },
    { id: 'devtools', title: 'AI Development Tools', desc: 'Builder ecosystem', icon: Terminal }
];

const platformsData = {
    neuraedge: {
        title: 'NeuraEdge',
        subtitle: 'Sovereign LLM Platform',
        desc: 'The enterprise-grade LLM layer that runs entirely within client infrastructure. Powers document intelligence, multilingual NLP, cabinet brief generation, and policy summarization — with zero cloud dependency.',
        tags: ['On-Premise', 'Multilingual', 'Air-Gap Ready', 'Governance-Grade'],
        bestFor: 'Government · Regulated Enterprises · Public Sector',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80', // placeholder server rack
        highlights: [
            { icon: ShieldCheck, title: 'Zero Cloud Dependency', desc: 'Runs fully offline' },
            { icon: Globe, title: '22+ Indian Languages', desc: 'Native NLP models' }
        ]
    },
    neuraeaglei: {
        title: 'NeuraEaglei',
        subtitle: 'Vision & Cognitive Analytics',
        desc: 'Transforms passive camera networks into intelligent command centers — delivering real-time surveillance analytics, face recognition, PPE detection, crowd monitoring, and ANPR at scale.',
        tags: ['Edge AI', 'Real-Time', 'Multi-Camera', 'Smart City Ready'],
        bestFor: 'Smart Cities · Industrial Safety · Retail · Security Operations',
        image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&q=80', // placeholder vision AI
        highlights: [
            { icon: Eye, title: 'Real-Time Analytics', desc: 'Sub-second latency' },
            { icon: Activity, title: 'Crowd Monitoring', desc: 'Density & flow mapping' }
        ]
    },
    neuraedubot: {
        title: 'NeuraEduBOT',
        subtitle: 'Cognitive Education AI Platform',
        desc: 'An AI-powered education platform natively embedded in Microsoft 365 — delivering adaptive learning, teacher empowerment tools, and curriculum-aligned content for K-12 through higher education.',
        tags: ['M365 Native', 'AICTE Partner', 'CBSE Aligned', 'Adaptive Learning'],
        bestFor: 'Schools · Universities · EdTech Platforms · Teacher Training',
        image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80', // placeholder education
        highlights: [
            { icon: BookOpen, title: 'Curriculum Aligned', desc: 'Maps to NEP 2020' },
            { icon: GraduationCap, title: 'Adaptive Paths', desc: 'Personalized learning' }
        ]
    },
    neurabot: {
        title: 'NeuraBOT',
        subtitle: 'Conversational AI Platform',
        desc: 'A full-spectrum conversational AI platform spanning FAQ bots to fully LLM-powered agents — built for citizen services, customer support, HR operations, and enterprise workflows.',
        tags: ['WhatsApp-First', 'LLM-Backed', 'Multilingual', 'Omnichannel'],
        bestFor: 'Citizen Services · Customer Support · Banking · Healthcare · HR',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80', // placeholder bots
        highlights: [
            { icon: MessageSquare, title: 'Omnichannel Routing', desc: 'WhatsApp, Web, Voice' },
            { icon: Zap, title: 'Agentic Escalation', desc: 'Smart human-handoff' }
        ]
    }
};

const automationUseCases = [
    {
        sector: 'Government & Public Sector',
        items: ['Automated file summarization and priority tagging for CM offices', 'RTI and grievance trend analysis', 'Cabinet brief auto-generation']
    },
    {
        sector: 'Enterprise & Corporate',
        items: ['Invoice and bill reconciliation automation', 'Contract and legal document processing', 'HR onboarding and helpdesk automation']
    },
    {
        sector: 'Banking & Finance',
        items: ['Regulatory compliance monitoring', 'Loan document processing and risk flagging', 'Automated customer communication workflows']
    },
    {
        sector: 'Healthcare',
        items: ['Patient record summarization', 'Appointment and IVR automation', 'Insurance claim processing support']
    }
];

const roboticsPanels = [
    {
        title: 'Drone Intelligence',
        icon: Plane,
        desc: 'AI-powered drones capable of suspicious behavior detection, hazardous activity recognition, safety violation monitoring, and real-time alert generation with autonomous navigation and remote command center integration.'
    },
    {
        title: 'Humanoids & Quadrupeds',
        icon: UserCheck,
        desc: 'Autonomous physical agents equipped with AI-based perception, obstacle navigation, and environment interaction deployable in industrial, educational, and public safety contexts.'
    },
    {
        title: 'Education Robotics Kits',
        icon: GraduationCap,
        desc: 'Purpose-built robotics hardware for schools and colleges: AI Dog Robots, Self-Driving Car Kits, Modular Robot Kits, and Generative AI Stations with plug-and-play setup and curriculum-ready content.'
    }
];

const devTools = [
    { title: 'LLM Fine-Tuning', desc: 'Tools to fine-tune foundation models on domain-specific data — governance documents, legal texts, medical records, or enterprise knowledge bases.' },
    { title: 'API & Integration API', desc: 'A unified API layer for connecting Super AIP\'s AI capabilities — NLP, vision, conversational, and analytics — with existing enterprise stacks.' },
    { title: 'Edge AI Toolkit', desc: 'Tools and SDKs for building and deploying AI models on edge devices optimized for low-bandwidth, offline-capable environments.' },
    { title: 'Data Annotation', desc: 'Built-in tools for video data extraction, labeling, and training pipeline management accelerating model development.' },
    { title: 'Model Monitoring', desc: 'Post-deployment monitoring dashboards tracking model performance, drift, accuracy, and compliance.' },
    { title: 'Workflow Builder', desc: 'No-code and low-code tools for building prompt chains, agentic workflows, and LLM-powered automation.' }
];

const integrationLogos = ['Azure', 'AWS', 'Microsoft 365', 'Oracle', 'SAP', 'LangChain', 'HuggingFace', 'Docker', 'Kubernetes', 'FastAPI', 'PostgreSQL', 'MongoDB'];

const Products = () => {
    const addToRefs = useReveal();
    const [activePlatform, setActivePlatform] = useState('neuraedge');

    /* Lenis (main.jsx) owns the scroll position — a bare window.scrollTo is
       overridden on its next frame, so drive it through Lenis when present. */
    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - 90;
        if (window.__lenis) window.__lenis.scrollTo(top, { force: true });
        else window.scrollTo({ top, behavior: 'smooth' });
    };

    return (
        <div className="products-page">

            {/* 1. HERO SECTION */}
            <section className="products-hero reveal-fade-up" ref={addToRefs}>
                <div className="hero-content">
                    <div className="research-badge" style={{ borderColor: "rgba(139,92,246,0.25)", background: "rgba(139,92,246,0.06)", color: "#c4b5fd" }}>
                        <span className="pulse-dot" style={{ background: "#a78bfa" }} />
                        Product Ecosystem
                    </div>
                    {/* <p className="section-tagline gradient-text">Product Ecosystem</p> */}
                    {/* <h1>Sovereign. Scalable. <br /><span className="gradient-text">Built for the Enterprise.</span></h1> */}
                    <h1 className="hero-title about-hero-title">
                        Sovereign. Scalable. <br className="hidden md:block" />
                        <span className="hero-title-highlight">
                            Built for the Enterprise.
                        </span>
                    </h1>
                    <p>
                        Super AI Polaris delivers a unified product ecosystem spanning intelligent platforms,
                        autonomous systems, physical robotics, and developer-grade AI tools. Every product is sovereign,
                        scalable, and built for India's enterprise, governance, and education realities.
                    </p>

                    <div className="product-categories">
                        {categories.map((cat, idx) => (
                            /* Was a <div onClick>: keyboard users could not reach
                               these in-page jumps at all. */
                            <button
                                key={idx}
                                type="button"
                                className="category-card glass-card"
                                onClick={() => scrollToSection(cat.id)}
                            >
                                <div className="category-icon">
                                    <cat.icon size={32} />
                                </div>
                                <h3>{cat.title}</h3>
                                <p>{cat.desc}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* 2. AI PLATFORMS */}
            <section id="platforms" className="ai-platforms-section reveal-fade-up" ref={addToRefs}>
                <div className="platforms-header">
                    <p className="section-tagline">One ecosystem. Every intelligence layer.</p>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>AI Platforms</h2>
                    <p className="section-intro" style={{ margin: '0 auto' }}>
                        Super AIP's AI Platforms form the cognitive core of the product suite — delivering sovereign LLM capabilities,
                        vision intelligence, education AI, and conversational automation across enterprise, governance, and education verticals.
                    </p>
                </div>

                <div className="tabs-container">
                    <div className="platform-tabs">
                        {Object.keys(platformsData).map((key) => (
                            <button
                                key={key}
                                className={`tab-btn ${activePlatform === key ? 'active' : ''}`}
                                onClick={() => setActivePlatform(key)}
                            >
                                {platformsData[key].title}
                            </button>
                        ))}
                    </div>

                    <div className="tab-content active glass-card">
                        <div className="platform-details">
                            <div>
                                <h3>{platformsData[activePlatform].title}</h3>
                                <p style={{ color: '#4facfe', fontSize: '1.2rem', marginBottom: '1rem' }}>{platformsData[activePlatform].subtitle}</p>
                                <div className="platform-meta">
                                    {platformsData[activePlatform].tags.map((tag, i) => (
                                        <span key={i} className="meta-tag">{tag}</span>
                                    ))}
                                </div>
                                <p className="platform-desc">{platformsData[activePlatform].desc}</p>
                                <div className="best-for">
                                    <span>Best For:</span> {platformsData[activePlatform].bestFor}
                                </div>

                                <div style={{ display: 'flex', gap: '2rem' }}>
                                    {platformsData[activePlatform].highlights.map((h, i) => (
                                        <div key={i} className="highlight-item">
                                            <div className="highlight-icon"><h.icon size={24} /></div>
                                            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>{h.title}</h4>
                                            <p style={{ fontSize: '0.9rem', color: '#8899ac' }}>{h.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="platform-visual">
                                <img src={platformsData[activePlatform].image} alt={platformsData[activePlatform].title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
                            </div>
                        </div>
                    </div>

                    <div className="section-cta">
                        <Link to="/Enterprise#neuraedge" className="btn-primary">Explore AI Platforms <ArrowRight size={18} /></Link>
                        <Link to="/Enterprise#neuraedge" className="btn-outline"><PlayCircle size={18} /> Watch Platform Overview</Link>
                    </div>
                </div>
            </section>

            {/* 3. AUTOMATION SYSTEMS */}
            <section id="automation" className="automation-section reveal-fade-up" ref={addToRefs}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <p className="section-tagline gradient-text-purple">Automate the complex. Accelerate the critical.</p>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Automation Systems</h2>
                    <p className="section-intro" style={{ margin: '0 auto' }}>
                        Super AIP's Automation Systems move organizations beyond basic RPA — delivering intelligent,
                        LLM-powered workflow automation that reasons, integrates, and executes multi-step processes autonomously, 24/7.
                    </p>
                </div>

                {/* Generated Image placeholder */}
                <img
                    src="/assets/images/automation_workflow.png"
                    alt="Workflow Automation"
                    className="workflow-image"
                />

                <div className="capabilities-grid">
                    <div className="capability-card glass-card">
                        <Cpu size={40} color="#a18cd1" />
                        <h4>Intelligent Process Automation</h4>
                        <p>AI-driven automation of repetitive, rule-based workflows — document routing, data extraction, form processing, and approval pipelines — with human-in-the-loop escalation where needed.</p>
                    </div>
                    <div className="capability-card glass-card">
                        <BrainCircuit size={40} color="#4facfe" />
                        <h4>Agentic AI Workflows</h4>
                        <p>Multi-step reasoning agents that handle complex, conditional tasks end-to-end — RFP analysis, bill reconciliation, tender evaluation, and report generation — without manual intervention.</p>
                    </div>
                    <div className="capability-card glass-card">
                        <Activity size={40} color="#fbc2eb" />
                        <h4>Sentiment & Analytics</h4>
                        <p>Automated sentiment monitoring across citizen submissions, customer feedback, and grievance portals — delivering real-time dashboards and actionable intelligence to leadership.</p>
                    </div>
                </div>

                <div className="use-cases-block">
                    <h3 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '1rem' }}>Automation Use Cases</h3>
                    <div className="use-cases-grid">
                        {automationUseCases.map((uc, i) => (
                            <div key={i} className="use-case-col">
                                <h5>{uc.sector}</h5>
                                <ul>
                                    {uc.items.map((item, j) => <li key={j}>{item}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="section-cta">
                    <Link to="/Enterprise#neurabot" className="btn-primary">See Automation in Action <ArrowRight size={18} /></Link>
                    <Link to="/Contact#contact-us" className="btn-outline">Map Your Automation Use Case</Link>
                </div>
            </section>

            {/* 4. ROBOTICS SOLUTIONS */}
            <section id="robotics" className="robotics-section reveal-fade-up" ref={addToRefs}>
                <img
                    src="/assets/images/robotics_hero.png"
                    alt=""
                    className="robotics-bg-image"
                />
                <div className="robotics-content">
                    <div style={{ textAlign: 'center' }}>
                        <p className="section-tagline" style={{ color: '#fbc2eb' }}>Intelligence that moves. Systems that act.</p>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Robotics Solutions</h2>
                        <p className="section-intro" style={{ margin: '0 auto', color: '#fff' }}>
                            Super AIP's Robotics Solutions extend AI from software to the physical world — integrating vision intelligence,
                            autonomous navigation, and real-time decision-making into drones, humanoids, quadrupeds, and educational robotics platforms.
                        </p>
                    </div>

                    <div className="panels-grid">
                        {roboticsPanels.map((panel, idx) => (
                            <div key={idx} className="robotics-panel">
                                <div className="panel-visual">
                                    <panel.icon className="panel-icon-large" />
                                </div>
                                <div className="panel-body">
                                    <h4>{panel.title}</h4>
                                    <p>{panel.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="section-cta">
                        <Link to="/Enterprise#physical-ai" className="btn-primary" style={{ background: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' }}>
                            Explore Robotics Solutions <ArrowRight size={18} />
                        </Link>
                        <Link to="/Contact#contact-us" className="btn-outline">Discuss a Deployment</Link>
                    </div>
                </div>
            </section>

            {/* 5. AI DEVELOPMENT TOOLS */}
            <section id="devtools" className="dev-tools-section reveal-fade-up" ref={addToRefs}>
                <div style={{ textAlign: 'center' }}>
                    <p className="section-tagline gradient-text">Built for builders. Engineered for scale.</p>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>AI Development Tools</h2>
                    <p className="section-intro" style={{ margin: '0 auto' }}>
                        Super AIP's AI Development Tools give enterprise teams, system integrators, and government technology units
                        the building blocks to develop, fine-tune, deploy, and monitor sovereign AI solutions — without starting from scratch.
                    </p>
                </div>

                <div className="dev-terminal">
                    <div className="terminal-header">
                        <div className="term-dot"></div>
                        <div className="term-dot"></div>
                        <div className="term-dot"></div>
                        <span style={{ marginLeft: '1rem', color: '#6b7280', fontSize: '0.85rem' }}>~/super-aip/devtools</span>
                    </div>
                    <div className="terminal-body">
                        <span className="term-line"><span className="term-comment"># Initialize Super AIP Sovereign LLM Pipeline</span></span>
                        <span className="term-line"><span className="term-keyword">import</span> <span className="term-string">superaip.models</span> <span className="term-keyword">as</span> sa</span>
                        <span className="term-line">&nbsp;</span>
                        <span className="term-line"><span className="term-comment"># Load domain-specific enterprise data</span></span>
                        <span className="term-line">dataset = sa.<span className="term-function">load_dataset</span>(<span className="term-string">"gov_policies_2026"</span>)</span>
                        <span className="term-line">&nbsp;</span>
                        <span className="term-line"><span className="term-comment"># Configure NeuraEdge fine-tuning</span></span>
                        <span className="term-line">model = sa.NeuraEdge(deployment=<span className="term-string">"on-premise"</span>, language=<span className="term-string">"hi-IN"</span>)</span>
                        <span className="term-line">tuned_model = model.<span className="term-function">finetune</span>(data=dataset, epochs=10)</span>
                        <span className="term-line">&nbsp;</span>
                        <span className="term-line"><span className="term-comment"># Deploy as a unified API Endpoint</span></span>
                        <span className="term-line">sa.<span className="term-function">deploy</span>(tuned_model, endpoint=<span className="term-string">"/api/v1/policy-bot"</span>, security=<span className="term-string">"zero-trust"</span>)</span>
                        <span className="term-line">&nbsp;</span>
                        <span className="term-line" style={{ color: '#10b981' }}>&gt; Deployment successful. Metrics dashboard active at :8080/monitoring</span>
                    </div>
                </div>

                <div className="tools-grid">
                    {devTools.map((tool, idx) => (
                        <div key={idx} className="tool-card reveal-fade-up" ref={addToRefs}>
                            <Code size={24} color="#60a5fa" style={{ marginBottom: '1rem' }} />
                            <h4>{tool.title}</h4>
                            <p>{tool.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="integrations-box reveal-fade-up" ref={addToRefs}>
                    <h5>Integration Compatibility</h5>
                    <div className="logo-wrapper">
                        {integrationLogos.map((logo, i) => (
                            <div key={i} className="integration-logo">{logo}</div>
                        ))}
                    </div>
                </div>

                <div className="section-cta" style={{ marginBottom: '4rem' }}>
                    <Link to="/Contact#request-demo" className="btn-primary">Start Building with Super AIP</Link>
                    <Link to="/Contact#contact-us" className="btn-outline"><Database size={18} /> Access API Docs</Link>
                </div>
            </section>

        </div>
    );
};

export default Products;
