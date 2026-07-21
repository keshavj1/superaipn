import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Server, Globe2, ShieldCheck, Database, Camera, Users, Video, Activity, Zap,
    BookOpen, Briefcase, Drone, Box
} from 'lucide-react';
import '../styles/enterprise.css';
/* Bundled import — there is no logo under public/, so the previous
   "/assets/super_aip_logo.png" src 404'd and rendered as a broken image. */
import logo from '../assets/super_aip_logo.png';
// Served from public/videos — not bundled, so large media never enters the build.
const neuraEdgeVideo = '/videos/SuperAINeuraEdge_PP.mp4';
const PhysicalAIVideo = '/videos/Physical_AI_PP.mp4';
const NeuraEdubotVideo = '/videos/NeuraEdubot_PP.mp4';
const NeuraEagleiVideo = '/videos/NeuraEaglei_PP.mp4';
const NeuraBotVideo = "/videos/NeuraBot_PP.mp4";
const AgenticAIVideo = "/videos/Agentic_AI_PP.mp4";


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

// --- DATA SETS ---
const neuraEdgeCaps = [
    { icon: Server, title: "Sovereign AI Deployment", desc: "Run LLMs entirely within client infrastructure - no cloud dependency, no data egress risk." },
    { icon: Globe2, title: "Multilingual NLP", desc: "22+ Indian languages supported. Auto-generate cabinet notes and citizen documents." },
    { icon: Database, title: "Domain Fine-Tuning", desc: "Pre-built modules for governance workflows, legal document processing, and bureaucracy." },
    { icon: ShieldCheck, title: "Cloud Agnostic Architecture", desc: "Compatible with Azure, AWS, on-premise servers, or fully air-gapped environments." }
];

const neuraEagleiCaps = [
    { icon: Video, title: "Intelligent Surveillance", desc: "Real-time anomaly detection, crowd analysis, and incident alerts." },
    { icon: Users, title: "Face & Object Recognition", desc: "AI-powered identification and tracking with privacy controls." },
    { icon: Activity, title: "Video Analytics Dashboard", desc: "Heatmaps, dwell time, behavioral analytics, and logs." },
    { icon: Zap, title: "Edge AI Processing", desc: "On-device inference reduces latency in remote environments." }
];

const eduBotCaps = [
    { title: "Microsoft 365 Native Integration", desc: "Embedded directly into Teams, Outlook, and SharePoint." },
    { title: "Adaptive Learning Engine", desc: "AI-driven personalization adjusts content difficulty and pacing." },
    { title: "Teacher-First Design", desc: "Auto-generates lesson plans, assessments, and vernacular content." },
    { title: "Curriculum Alignment", desc: "CBSE, ICSE, State Board, and International curricula supported." }
];

const physicalAICaps = [
    {
        title: "Drone Intelligence",
        points: ["Suspicious behavior detection", "Hazardous activity recognition", "Automated action triggers", "Autonomous navigation"]
    },
    {
        title: "Humanoids & Quadrupeds",
        points: ["Autonomous movement in complex spaces", "AI-powered perception", "Command system integration"]
    },
    {
        title: "Business Value",
        points: ["Reduce human risk", "Enhance site safety", "Smart surveillance", "Accelerate emergency response"]
    }
];

// const botTabs = [
//     {

//         name: "FAQ & Knowledge Base Bots",
//         video: NeuraBotVideo,
//         uses: ["E-commerce Customer Assistant", "Employee Helpdesk Bot", "Government Info Chatbot", "Banking Support Bot", "Education Platform Tutor"]
//     },
//     {
//         name: "Secure On-Premise SLM Bots",
//         uses: ["Regulatory Compliance Assistant", "Healthcare Internal Chatbot", "Internal Research Assistant", "Retail FAQs"]
//     },
//     {
//         name: "LLM-Powered Cloud AI Bots",
//         uses: ["Global Customer Service AI", "Customized Customer Support Bot", "Creative Marketing Ideation", "Investment Research Assistant"]
//     },
//     {
//         name: "Messaging & Social Media Bots",
//         uses: ["WhatsApp Customer Support", "Citizen Service Bot on Messenger", "Marketing & Engagement via Chat", "Travel Service Concierge"]
//     }
// ];
/* `video` is the same NeuraBot_PP.mp4 clip for every tab today — that is
   why switching tabs looked like nothing happened. `label`, `desc`, and
   `deployment` give each tab visibly distinct content. Drop per-bot-type
   clips into public/videos and point `video` at them when they exist. */
const botTabs = [
    {
        name: "FAQ & Knowledge Base Bots",
        label: "Entry tier",
        desc: "Rule-and-retrieval bots answering from a curated knowledge base. Fastest to deploy, fully predictable answers, no model hosting required.",
        deployment: "Cloud or on-premise · Deploys in days",
        video: NeuraBotVideo,
        uses: [
            "E-commerce Customer Assistant",
            "Employee Helpdesk Bot",
            "Government Info Chatbot",
            "Banking Support Bot",
            "Education Platform Tutor"
        ]
    },
    {
        name: "Secure On-Premise SLM Bots",
        label: "Sovereign tier",
        desc: "Small language models running entirely inside your infrastructure. No data leaves the network — built for regulated and air-gapped environments.",
        deployment: "On-premise / air-gapped · Zero data egress",
        video: NeuraBotVideo,
        uses: [
            "Regulatory Compliance Assistant",
            "Healthcare Internal Chatbot",
            "Internal Research Assistant",
            "Retail FAQs"
        ]
    },
    {
        name: "LLM-Powered Cloud AI Bots",
        label: "Full intelligence tier",
        desc: "Full large-language-model agents with reasoning, generation, and tool use. The most capable tier, for open-ended conversation at scale.",
        deployment: "Cloud or hybrid · Scales elastically",
        video: NeuraBotVideo,
        uses: [
            "Global Customer Service AI",
            "Customized Customer Support Bot",
            "Creative Marketing Ideation",
            "Investment Research Assistant"
        ]
    },
    {
        name: "Messaging & Social Media Bots",
        label: "Channel tier",
        desc: "The same bot intelligence delivered where users already are — WhatsApp, Messenger, and social channels, with omnichannel routing and handoff.",
        deployment: "WhatsApp · Messenger · Web · Voice",
        video: NeuraBotVideo,
        uses: [
            "WhatsApp Customer Support",
            "Citizen Service Bot on Messenger",
            "Marketing & Engagement via Chat",
            "Travel Service Concierge"
        ]
    }
];

const Enterprise = () => {
    const addToRefs = useReveal();
    const [activeBotTab, setActiveBotTab] = useState(0);

    /* Only one video plays at a time. Listening on the document in the
       CAPTURE phase (rather than binding each <video> on mount) is what
       makes this survive re-renders: the bot preview remounts whenever the
       tab changes, and a per-element listener bound at mount would not be
       attached to the replacement. `play` does not bubble, so capture is
       required — a normal document listener would never fire. */
    useEffect(() => {
        const handlePlay = (e) => {
            document.querySelectorAll('video').forEach(video => {
                if (video !== e.target) video.pause();
            });
        };
        document.addEventListener('play', handlePlay, true);
        return () => document.removeEventListener('play', handlePlay, true);
    }, []);

    return (
        <div className="enterprise-page">

            {/* INTRO */}
            <section className="ent-intro reveal-fade-up" ref={addToRefs}>
                <div className="about-hero-badge"><span className="pulse-dot"></span>Enterprise Super AI Polaris</div>
                <h1 className="hero-title about-hero-title">
                    Enterprise <br className="hidden md:block" />
                    <span className="hero-title-highlight">
                        AI Solutions
                    </span>
                </h1>
                <p className="subtitle">
                    India's most comprehensive sovereign AI product suite - built for governance, enterprise, education, and physical intelligence.
                    Every solution is deployable on-premise, cloud-agnostic, and designed for India's scale.
                </p>
            </section>

            {/* 1. NeuraEdge */}
            <section id="neuraedge" className="neuraedge-section reveal-fade-up" ref={addToRefs}>
                <div className="hero-banner-edge">
                    <div className="edge-content">
                        <p className="tagline">Govern smarter. Decide faster. Stay sovereign.</p>
                        <h2>SuperAINeuraEdge <span className="highlight">- Sovereign LLM Layer</span></h2>
                        <p className="desc text-gray-300 max-w-2xl mt-4 mb-8">
                            A sovereign Large Language Model platform that runs entirely within your infrastructure delivering AI-powered governance intelligence with zero cloud dependency and full data control.
                        </p>
                        <div className="tag-pills flex gap-3 flex-wrap">
                            <span className="edge-pill">Sovereign</span>
                            <span className="edge-pill">Offline</span>
                            <span className="edge-pill">Multilingual</span>
                            <span className="edge-pill">On-Premise</span>
                        </div>
                    </div>



                    <div className="edge-media">
                        <div className="video-wrapper">
                            <video
                                src={neuraEdgeVideo}
                                controls
                                muted
                                className="media-content"
                            />
                        </div>
                    </div>
                </div>

                <div className="caps-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 px-6" style={{ width: '100%', maxWidth: '900px', margin: 'clamp(36px, 7vw, 70px) auto' }}>
                    {neuraEdgeCaps.map((cap, i) => (
                        <div key={i} className="cap-card glass-card p-6" style={{ padding: '18px' }}>
                            <cap.icon size={32} className="icon-cyan mb-4 text-[#00d2ff]" />
                            <h4 className="text-xl font-bold mb-2 text-white">{cap.title}</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">{cap.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="phases-container text-center mt-20 px-6">
                    <h3 className="text-3xl font-bold mb-10 text-white" style={{ padding: '30px' }}>Three-Phase Implementation</h3>
                    <div className="phases-flex grid grid-cols-1 md:grid-cols-3 gap-8" style={{ width: '100%', maxWidth: '900px', margin: '0 auto' }}>
                        <div className="phase-card bg-[#121826] border border-white/5 rounded-2xl p-8 relative overflow-hidden group hover:border-[#00d2ff]/30 transition-all" style={{ padding: '20px' }}>
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                            <div className="step text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4">Phase 1</div>
                            <h4 className="text-xl font-bold text-white mb-2">File Intelligence & Prioritization</h4>
                            <p className="text-gray-400">Summarization & Priority Tagging</p>
                        </div>
                        <div className="phase-card bg-[#121826] border border-white/5 rounded-2xl p-8 relative overflow-hidden group hover:border-[#00d2ff]/30 transition-all" style={{ padding: '20px' }}>
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                            <div className="step text-blue-400 font-mono text-sm tracking-widest uppercase mb-4">Phase 2</div>
                            <h4 className="text-xl font-bold text-white mb-2">Communication & Doc Intelligence</h4>
                            <p className="text-gray-400">Cabinet Meeting Brief Preparation</p>
                        </div>
                        <div className="phase-card bg-[#121826] border border-white/5 rounded-2xl p-8 relative overflow-hidden group hover:border-[#00d2ff]/30 transition-all" style={{ padding: '20px' }}>
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                            <div className="step text-purple-400 font-mono text-sm tracking-widest uppercase mb-4">Phase 3</div>
                            <h4 className="text-xl font-bold text-white mb-2">Citizen Intelligence & Transparency</h4>
                            <p className="text-gray-400">RTI & Grievance Management Insights</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. NeuraEaglei */}
            <section id="neuraeaglei" className="eaglei-section reveal-fade-up bg-[#090e17] py-24 relative overflow-hidden" ref={addToRefs}>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTU5IDB2NjBoLTZWMHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48cGF0aCBkPSJNMCA1OWg2MHYtNkgwcyIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvc3ZnPg==')] opacity-20"></div>

                <div className="max-w-7xl mx-auto px-6 py-5 relative z-10">
                    <div className="eagle-header text-center mb-16">
                        <p className="tagline t-green text-[#10b981] font-semibold tracking-wider text-sm uppercase mb-3">Every camera. Total intelligence.</p>
                        <h2 className="text-4xl font-extrabold text-white mb-6">NeuraEaglei <span className="text-gray-500 font-normal">- Vision Analytics</span></h2>
                        <p className="desc text-gray-400 max-w-3xl mx-auto text-lg">Transforms passive camera networks into AI-powered command centers delivering real-time vision intelligence for security, safety, and operational analytics at scale.</p>
                    </div>

                    <div className="eagle-layout grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" style={{ paddingTop: '70px' }}>
                        <div className="eagle-cards grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {neuraEagleiCaps.map((cap, i) => (
                                <div key={i} className="eagle-card bg-black/40 border border-[#10b981]/10 rounded-xl p-6 hover:border-[#10b981]/40 transition-colors group" style={{ padding: '20px' }}>
                                    <cap.icon size={28} className="text-[#10b981] mb-4 group-hover:scale-110 transition-transform" />
                                    <h5 className="text-lg font-bold text-white mb-2">{cap.title}</h5>
                                    <p className="text-gray-400 text-sm">{cap.desc}</p>
                                </div>
                            ))}
                        </div>
                        {/* <div className="eagle-media relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#10b981] to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <img src="/assets/images/neuraeagle_dashboard.png" alt="NeuraEaglei Dashboard" className="relative rounded-2xl border border-white/10" />
                        </div> */}
                        <div className="edge-media">
                            <div className="video-wrapper">
                                <video
                                    src={NeuraEagleiVideo}
                                    controls
                                    muted
                                    className="media-content"
                                    style={{ border: '1px solid #ffffff63 !important', borderRadius: '11px !important' }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="live-cases flex flex-wrap justify-center gap-4 mt-16" style={{ padding: '60px 0px' }}>
                        <span className="eagle-glow-pill">✦ Smart City Surveillance</span>
                        <span className="eagle-glow-pill">✦ Retail Footfall Analytics</span>
                        <span className="eagle-glow-pill">✦ Industrial Safety Monitoring</span>
                        <span className="eagle-glow-pill">✦ ANPR at Entry Points</span>
                    </div>
                </div>
            </section>

            {/* 3. NeuraEduBOT */}
            <section id="neuraedubot" className="edubot-section reveal-fade-up bg-[#090e17] py-24 relative overflow-hidden" style={{ padding: '60px 0px' }} ref={addToRefs}>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-6 py-5 relative z-10">
                    <div className="edu-badges flex gap-4 mb-8">
                        <span className="badge bg-white/10 border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md">Microsoft 365 Native</span>
                        <span className="badge bg-white/10 border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md">AICTE Partnered</span>
                        <span className="badge bg-white/10 border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md">CBSE Aligned</span>
                    </div>

                    <div className="edu-split grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="edu-text" style={{ margin: '30px auto' }}>
                            <p className="tagline text-orange-400 font-bold tracking-widest text-xs uppercase mb-4">Personalized learning. Empowered teachers.</p>
                            <h2 className="text-5xl font-extrabold text-white mb-6">NeuraEduBOT</h2>
                            <p className="desc text-indigo-100 text-lg leading-relaxed mb-8">An AI-powered education platform natively integrated with Microsoft 365 delivering adaptive learning, teacher empowerment, and curriculum-aligned content.</p>

                            <div className="edu-stats flex gap-8 mb-10">
                                <div>
                                    <h3 className="text-4xl font-bold text-orange-400">30L+</h3>
                                    <p className="text-indigo-200 text-sm mt-1 uppercase tracking-wide">Students Trained</p>
                                </div>
                                <div className="w-px bg-white/20"></div>
                                <div>
                                    <h3 className="text-4xl font-bold text-orange-400">3000+</h3>
                                    <p className="text-indigo-200 text-sm mt-1 uppercase tracking-wide">Teachers Certified</p>
                                </div>
                            </div>

                            <ul className="edu-caps space-y-4">
                                {eduBotCaps.map((cap, i) => (
                                    <li key={i} className="flex gap-3 text-indigo-100">
                                        <ShieldCheck className="text-orange-400 shrink-0 mt-1" size={20} />
                                        <div>
                                            <strong className="text-white drop-shadow-md">{cap.title}:</strong> {cap.desc}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="edge-media">
                            <div className="video-wrapper">
                                <video
                                    src={NeuraEdubotVideo}
                                    controls
                                    muted
                                    className="media-content"
                                    style={{ border: '1px solid #ffffff63', borderRadius: '11px' }}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 4. NeuraBOT */}
            <section id="neurabot" className="neurabot-section reveal-fade-up py-24 bg-[#05060a]" style={{ margin: 'clamp(48px, 9vw, 90px) 0' }} ref={addToRefs}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="bot-header text-center mb-16">
                        <p className="tagline text-purple-400 font-bold uppercase tracking-widest text-xs mb-4">From FAQ to full intelligence. One platform.</p>
                        <h2 className="text-4xl font-extrabold text-white mb-6">NeuraBOT <span className="text-gray-500 font-normal"> Conversational AI</span></h2>
                        <p className="desc text-gray-400 max-w-3xl mx-auto text-lg">A full-spectrum conversational AI platform spanning simple FAQ bots to fully LLM-powered agents built for citizen services, customer support, and HR operations.</p>
                    </div>

                    <div className="bot-split grid grid-cols-1 lg:grid-cols-5 gap-12 bg-[#0b0f19] rounded-3xl p-8 shadow-2xl" style={{ padding: '30px 30px' }}>
                        <div className="bot-spectrum lg:col-span-3 flex flex-col md:flex-row gap-8">
                            <div className="tabs flex flex-col w-full md:w-1/2 gap-2" role="tablist" aria-label="NeuraBOT bot types">
                                {botTabs.map((tab, i) => (
                                    <button
                                        key={i}
                                        id={`bot-tab-${i}`}
                                        role="tab"
                                        type="button"
                                        aria-selected={activeBotTab === i}
                                        aria-controls={`bot-panel-${i}`}
                                        className={`text-left px-5 py-4 rounded-xl font-medium transition-all ${activeBotTab === i ? 'bg-purple-600/20 text-purple-400 shadow-[inset_4px_0_0_#9333ea]' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-[#ffffff33]'}`}
                                        style={{ borderRadius: '19px' }}
                                        onClick={() => setActiveBotTab(i)}
                                    >
                                        {tab.name}
                                    </button>
                                ))}
                            </div>

                            {/* Panel for the selected tab: use cases, then one preview
                                video. The video is keyed on the tab index so switching
                                tabs remounts it — changing a <video> src alone does not
                                make the browser load the new file. */}
                            <div
                                id={`bot-panel-${activeBotTab}`}
                                role="tabpanel"
                                aria-labelledby={`bot-tab-${activeBotTab}`}
                                className="tab-content w-full md:w-1/2 p-6 bg-black/30 rounded-2xl border border-white/5 flex flex-col"
                            >
                                {/* Header changes with the tab, so the click has an
                                    obvious effect even though every tier currently
                                    shares the same preview clip. */}
                                <span className="text-purple-400 text-[11px] font-bold uppercase tracking-widest">
                                    {botTabs[activeBotTab].label}
                                </span>
                                <h4 className="text-white font-bold text-lg mt-1 mb-2">
                                    {botTabs[activeBotTab].name}
                                </h4>
                                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                    {botTabs[activeBotTab].desc}
                                </p>
                                <div className="text-[11px] text-gray-500 border border-white/10 rounded-lg px-3 py-2 mb-5">
                                    {botTabs[activeBotTab].deployment}
                                </div>

                                <h5 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                                    <Briefcase size={16} className="text-purple-400" /> Use Cases
                                </h5>

                                <ul className="space-y-3">
                                    {botTabs[activeBotTab].uses.map((use) => (
                                        <li key={use} className="text-gray-300 text-sm flex items-start gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                                            <span>{use}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="bot-video mt-6">
                                    <video
                                        key={activeBotTab}
                                        src={botTabs[activeBotTab].video}
                                        controls
                                        muted
                                        playsInline
                                        preload="metadata"
                                        className="rounded-xl shadow-xl w-full"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bot-phone-mockup lg:col-span-2 flex justify-center items-center">
                            <div className="phone w-[min(280px,100%)] aspect-[280/550] bg-[#1a1f2e] rounded-[40px] border-[8px] border-black shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col" style={{ padding: '39px 0px' }}>
                                <div className="notch absolute top-0 inset-x-0 mx-auto w-32 h-6 bg-black rounded-b-3xl z-20"></div>
                                <div className="screen-header bg-[#252b3d] pt-10 pb-4 px-6 shadow-md z-10 flex items-center gap-3" style={{ padding: '12px' }}>
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 p-1">
                                        <img src={logo} className="w-full h-full object-contain" alt="" />
                                    </div>
                                    <div>
                                        <div className="text-white text-sm font-bold">NeuraBOT</div>
                                        <div className="text-green-400 text-[10px] flex items-center gap-1"><div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div> Online</div>
                                    </div>
                                </div>
                                <div className="screen-body flex-1 bg-[#0f141e] p-4 flex flex-col gap-4 overflow-y-auto">
                                    <div className="msg-bubble self-start bg-[#252b3d] text-white text-sm p-3 rounded-2xl rounded-tl-none w-[85%] shadow-sm">
                                        Hello! How can I assist you with your governance needs today?
                                    </div>
                                    <div className="msg-bubble self-end bg-purple-600 text-white text-sm p-3 rounded-2xl rounded-tr-none w-[80%] shadow-sm">
                                        I need to file an RTI.
                                    </div>
                                    <div className="msg-bubble self-start bg-[#252b3d] text-white text-sm p-3 rounded-2xl rounded-tl-none w-[85%] shadow-sm">
                                        Sure, let me guide you through the RTI process. Please upload the required documents.
                                    </div>
                                </div>
                                <div className="screen-input bg-[#252b3d] p-4 pb-6 flex gap-2">
                                    <div className="flex-1 bg-[#0f141e] rounded-full px-4 py-2 text-xs text-gray-500 border border-white/5">Type a message...</div>
                                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                                        <div className="w-0 h-0 border-t-[5px] border-l-[8px] border-b-[5px] border-t-transparent border-l-white border-b-transparent ml-0.5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Physical AI */}
            <section id="physical-ai" className="physical-ai-section reveal-fade-up relative py-32 bg-[#05080f] overflow-hidden" ref={addToRefs} style={{ marginTop: 'clamp(48px, 9vw, 90px)', marginBottom: 'clamp(48px, 9vw, 90px)' }}>
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-900/10 rounded-full blur-[100px] pointer-events-none"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-5 relative z-10 w-full">
                    {/* Modern Banner/Header Split */}
                    <div className="flex flex-col lg:flex-row gap-12 items-center mb-20 bg-gradient-to-br from-[#0c1220] to-[#070b14] rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden group" style={{ border: '1px solid #e8dada24 !important', padding: '25px' }}>
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQwIDB2NDBoLTRWMHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMikiLz48cGF0aCBkPSJNMCA0MGg0MHYtNEgwaHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMikiLz48L3N2Zz4=')] opacity-30 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none"></div>
                        <div className="absolute -right-64 -top-64 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[80px] group-hover:bg-cyan-500/20 transition-colors duration-700 pointer-events-none"></div>

                        <div className="flex-1 relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-6" style={{ padding: '10px', color: '#fff' }}>
                                <Activity size={14} className="animate-pulse" /> Intelligence in Motion
                            </div>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight" style={{ paddingTop: '30px' }}>
                                Physical AI <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-normal border-b-2 border-dashed border-cyan-500/30 pb-1">Autonomous</span> Execution
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                                Super AIP's Physical AI brings computer vision and intelligent autonomy to drones, humanoids, and quadrupeds - extending AI from screens to the physical world for industrial safety, surveillance, and emergency response.
                            </p>
                        </div>

                        <div className="w-full lg:w-5/12 relative z-10">
                            <div className="relative rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,210,255,0.15)] border border-white/10 group-hover:border-cyan-500/30 transition-colors duration-500">
                                {/* <img src="/assets/images/physical_ai_drone.png" alt="Autonomous Drone Concept" className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" /> */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#05080f] via-transparent to-transparent opacity-80"></div>
                                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                    <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs text-white flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div> Tracking Active
                                    </div>
                                    <Drone size={28} className="text-cyan-400/80" />
                                </div>
                                <div className="edge-media">
                                    <div className="video-wrapper">
                                        <video
                                            src={PhysicalAIVideo}
                                            controls
                                            muted
                                            className="media-content rounded-xl shadow-2xl"
                                            style={{ border: '1px solid #ffffff63', borderRadius: '11px' }}
                                        />


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Capability Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ marginTop: '40px' }}>
                        {physicalAICaps.map((col, i) => (
                            <div key={i} className="bg-[#0c1220] rounded-2xl p-8 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 shadow-xl hover:shadow-[0_20px_40px_rgba(0,210,255,0.1)]" style={{ padding: '20px', border: '1px solid rgb(255 255 255 / 28%) !important' }}>
                                <div className={`absolute top-0 right-0 w-32 h-32 blur-[50px] rounded-full pointer-events-none transition-opacity duration-500 opacity-20 group-hover:opacity-50 ${i === 0 ? 'bg-cyan-500' : i === 1 ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>

                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 border border-white/10 backdrop-blur-md shadow-inner relative z-10 ${i === 0 ? 'bg-cyan-500/10 text-cyan-400' : i === 1 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'}`}>
                                    {i === 0 ? <Drone size={28} /> : i === 1 ? <Box size={28} /> : <Activity size={28} />}
                                </div>

                                <h4 className="text-xl font-bold text-white mb-6 relative z-10 transition-colors" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                                    {col.title}
                                </h4>

                                <ul className="space-y-4 relative z-10">
                                    {col.points.map((pt, idx) => (
                                        <li key={idx} className="flex items-start gap-3 group/item">
                                            <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:border-cyan-500/50 transition-colors">
                                                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full group-hover/item:bg-cyan-400 transition-colors"></div>
                                            </div>
                                            <span className="text-gray-400 text-sm leading-relaxed group-hover/item:text-gray-200 transition-colors">{pt}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Agentic AI */}
            <section id="agentic-ai" className="agentic-section reveal-fade-up py-32 bg-[#020408] relative overflow-hidden" style={{ margin: 'clamp(48px, 9vw, 90px) auto' }} ref={addToRefs}>
                <div className="absolute top-0 right-[20%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-[10%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 py-5 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="agentic-text">
                            <p className="tagline text-pink-400 font-bold uppercase tracking-widest text-xs mb-4">Beyond chat. Beyond analytics. AI that executes.</p>
                            <h2 className="text-5xl font-extrabold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">Agentic AI</h2>
                            <p className="desc text-gray-400 text-lg mb-10 leading-relaxed">Agentic AI systems go beyond conversation and dashboards - they reason across multiple steps, integrate with enterprise systems, and autonomously execute complex workflows end-to-end.</p>

                            <div className="space-y-6">
                                <div className="flex gap-4 p-4 rounded-xl bg-white/5  hover:bg-white/10 transition-colors" style={{ margin: '20px auto', border: '1px solid rgba(255, 255, 255, 0.06) !important' }}>
                                    <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center shrink-0"><Server size={24} className="text-pink-400" /></div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1">Multi-Step Reasoning</h4>
                                        <p className="text-sm text-gray-400">Agentic AI breaks down complex tasks into sequential reasoning steps.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-4 rounded-xl bg-white/5  hover:bg-white/10 transition-colors" style={{ margin: '20px auto', border: '1px solid rgba(255, 255, 255, 0.06) !important' }}>
                                    <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0"><Database size={24} className="text-indigo-400" /></div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1">System Integrations</h4>
                                        <p className="text-sm text-gray-400">Connects with ERPs, CRMs, government portals, and data warehouses.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 p-4 rounded-xl bg-white/5   hover:bg-white/10 transition-colors" style={{ margin: '20px auto', border: '1px solid rgba(255, 255, 255, 0.06) !important' }}>
                                    <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0"><Zap size={24} className="text-purple-400" /></div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1">Workflow Orchestration</h4>
                                        <p className="text-sm text-gray-400">From RFP analysis to bill reconciliation without human intervention.</p>
                                    </div>
                                </div>
                            </div>

                            <Link to="/Contact#contact-us" className="inline-block mt-10 px-8 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded-full font-bold shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all hover:scale-105" style={{ padding: '20px', borderRadius: '20px' }}>
                                Explore Agentic AI
                            </Link>
                        </div>

                        {/* <div className="agentic-media relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020408] to-transparent z-10 h-32 bottom-0 top-auto"></div>
                            <img src="/assets/images/agentic_workflow.png" alt="Agentic Workflow Diagram" className="rounded-2xl shadow-2xl relative z-0 border border-white/10 w-full" style={{ filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.2))', border: '1px solid #5e6062a8 !important' }} />
                        </div> */}
                        <div className="edge-media">
                            <div className="video-wrapper">
                                <video
                                    src={AgenticAIVideo}
                                    controls
                                    muted
                                    className="media-content rounded-xl shadow-2xl"
                                    style={{ border: '1px solid #ffffff63 !important', borderRadius: '11px !important' }}
                                />


                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style>{`
            .video-wrapper{
                position:relative;
                width:100%;
                aspect-ratio:16/9;
                overflow:hidden;
                border-radius:16px;
                border: 1px solid;
                }

                .media-content{
                position:absolute;
                top:0;
                left:0;
                width:100%;
                height:100%;
                object-fit:cover;
                }

                .play-btn{
                position:absolute;
                top:50%;
                left:50%;
                transform:translate(-50%,-50%);
                width:70px;
                height:70px;
                border-radius:50%;
                background:rgba(0,210,255,0.15);
                border:2px solid rgba(0,210,255,0.4);
                color:#00d2ff;
                font-size:24px;
                cursor:pointer;
                }

                .close-btn{
                position:absolute;
                top:10px;
                right:10px;
                width:36px;
                height:36px;
                border-radius:50%;
                background:rgba(0,0,0,0.7);
                color:#fff;
                cursor:pointer;
                }
                .video-wrapper{
                position:relative;
                width:100%;
                aspect-ratio:16/9;
                overflow:hidden;
                border-radius:16px;
                }

                .media-content{
                position:absolute;
                width:100%;
                height:100%;
                top:0;
                left:0;
                object-fit:cover;
                }

                .play-btn{
                position:absolute;
                top:50%;
                left:50%;
                transform:translate(-50%,-50%);
                width:70px;
                height:70px;
                border-radius:50%;
                background:rgba(0,210,255,0.2);
                border:2px solid rgba(0,210,255,0.4);
                color:#00d2ff;
                font-size:26px;
                cursor:pointer;
                }

                .close-btn{
                position:absolute;
                top:10px;
                right:10px;
                width:36px;
                height:36px;
                border-radius:50%;
                background:rgba(0,0,0,0.7);
                color:#fff;
                cursor:pointer;
                }
                `}</style>
        </div>
    );
};

export default Enterprise;
