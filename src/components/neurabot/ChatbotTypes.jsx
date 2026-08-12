import React, { useEffect, useRef, useState } from "react";
import {
    BookOpenText,
    ShieldCheck,
    Blocks,
    Cloud,
    MessageCircle,
    Network,
    AudioLines,
    CheckCircle2,
} from "lucide-react";

/* Seven types break every clean grid (4+3 or 3+3+1 both strand orphans),
   and each type carries a description plus a Best-For list — seven cards of
   that density read as a wall. A tab rail shows one type at full depth,
   the same interaction the /Enterprise NeuraBOT section already uses.
   Entries without a `detail` render as plain labels. */
const TYPES = [
    {
        icon: BookOpenText,
        name: "FAQ & Knowledge Base Chatbots",
        desc: "Answer customer and employee queries instantly using knowledge bases, APIs, and enterprise databases.",
        best: [
            { label: "Customer Support" },
            { label: "Employee Helpdesk" },
            { label: "E-commerce" },
            { label: "Government Information" },
        ],
    },
    {
        icon: ShieldCheck,
        name: "Secure On-Premise SLM Chatbots",
        desc: "Deploy AI within your private infrastructure for maximum security, compliance, and complete data sovereignty.",
        best: [
            { label: "Government", detail: "Automate citizen services, answer policy queries, and provide secure public information through intelligent AI chatbot assistance." },
            { label: "Healthcare", detail: "Support appointment scheduling, patient inquiries, and internal clinical assistance with secure, AI-powered conversational support." },
            { label: "Banking", detail: "Deliver secure account assistance, answer customer queries, and automate financial support while maintaining regulatory compliance." },
            { label: "Regulated Industries", detail: "Deploy secure on-premise AI chatbots that protect sensitive data while ensuring compliance and operational efficiency." },
        ],
    },
    {
        icon: Blocks,
        name: "Open-Source SLM Chatbots",
        desc: "Build flexible AI chatbot solutions with open-source language models and enterprise integrations.",
        best: [
            { label: "Technology", detail: "Automate product support, resolve technical queries, and improve customer experiences with intelligent AI chatbot assistance." },
            { label: "Education", detail: "Help students access learning resources, answer admissions queries, and streamline educational support through conversational AI." },
            { label: "Retail", detail: "Assist shoppers with product recommendations, order tracking, and customer support for faster purchasing experiences." },
        ],
    },
    {
        icon: Cloud,
        name: "Cloud AI LLM Chatbots",
        desc: "Use advanced language models for customer support, research, document analysis, and content assistance.",
        best: [
            { label: "Customer Service", detail: "Resolve customer queries instantly, reduce support workload, and deliver personalized assistance through intelligent AI conversations." },
            { label: "Research", detail: "Analyze internal documents, answer knowledge queries, and provide contextual insights using advanced AI language models." },
            { label: "Marketing", detail: "Generate marketing content, support campaign planning, and engage customers with intelligent AI-powered conversational assistance." },
        ],
    },
    {
        icon: MessageCircle,
        name: "Messaging & Social Media Chatbots",
        desc: "Engage customers through WhatsApp, Facebook Messenger, Telegram, and other messaging platforms.",
        best: [
            { label: "Customer Support", detail: "Resolve customer queries instantly, provide real-time updates, and improve satisfaction across messaging and digital channels." },
            { label: "Citizen Services", detail: "Enable citizens to access public services, information, and support through intelligent conversational AI assistants." },
            { label: "Marketing Campaigns", detail: "Engage customers, share promotional updates, and drive campaign interactions through AI-powered messaging conversations." },
        ],
    },
    {
        icon: Network,
        name: "Omnichannel Chatbot Solutions",
        desc: "Deliver one continuous conversation across websites, mobile apps, email, SMS, messaging, and voice.",
        best: [
            { label: "Banking", detail: "Deliver seamless customer engagement across digital channels with secure, personalized AI-powered banking assistance." },
            { label: "Retail", detail: "Connect online and in-store customer interactions through intelligent AI conversations for consistent shopping experiences." },
            { label: "Hospitality", detail: "Provide instant travel assistance, booking support, and personalized guest services with AI-powered concierge solutions." },
        ],
    },
    {
        icon: AudioLines,
        name: "Voice & IVR Chatbots",
        desc: "Replace traditional IVR systems with intelligent voice conversations that improve customer support.",
        best: [
            { label: "Call Centers", detail: "Automate inbound customer calls, answer common queries, and reduce agent workload using intelligent Voice AI." },
            { label: "Healthcare", detail: "Schedule appointments, send patient reminders, and provide voice-enabled healthcare support through AI-powered conversations." },
            { label: "Automotive", detail: "Deliver hands-free voice assistance, answer driver queries, and enhance in-vehicle customer experiences with conversational AI." },
        ],
    },
];

export default function ChatbotTypes({ revealRef }) {
    const [active, setActive] = useState(0);
    /* The rail is vertical on desktop but flips to a horizontal pill row
       below 1024px (neurabot.css), so aria-orientation must track it. */
    const [vertical, setVertical] = useState(true);
    const tabRefs = useRef([]);
    const current = TYPES[active];

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 1023px)");
        const update = () => setVertical(!mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    const selectTab = (i) => {
        setActive(i);
        tabRefs.current[i]?.focus();
    };

    /* APG tabs pattern: roving tabindex + arrow-key activation. Both axes
       are handled because the rail's orientation is viewport-dependent. */
    const handleKeyDown = (e) => {
        const delta = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        let next;
        if (delta !== undefined) next = (active + delta + TYPES.length) % TYPES.length;
        else if (e.key === "Home") next = 0;
        else if (e.key === "End") next = TYPES.length - 1;
        else return;
        e.preventDefault();
        selectTab(next);
    };

    return (
        <section className="reveal-fade-up" ref={revealRef} aria-labelledby="nb-types-title">
            <div className="nb-container">
                <div className="section_sects" style={{ textAlign: "center" }}>
                    <h2 id="nb-types-title" className="section-title">
                        Choose the Right Enterprise AI Chatbot
                    </h2>
                    <p className="section-subtitle">
                        Every chatbot serves a different purpose. Choose the solution that
                        best fits your business goals.
                    </p>
                </div>

                <div className="nb-types-layout">
                    <div
                        className="nb-type-rail"
                        role="tablist"
                        aria-label="NeuraBOT chatbot types"
                        aria-orientation={vertical ? "vertical" : "horizontal"}
                        onKeyDown={handleKeyDown}
                    >
                        {TYPES.map((type, i) => (
                            <button
                                key={type.name}
                                ref={(el) => { tabRefs.current[i] = el; }}
                                id={`nb-type-tab-${i}`}
                                role="tab"
                                type="button"
                                tabIndex={active === i ? 0 : -1}
                                aria-selected={active === i}
                                aria-controls={`nb-type-panel-${i}`}
                                className={`nb-type-tab${active === i ? " is-active" : ""}`}
                                onClick={() => setActive(i)}
                            >
                                <type.icon size={18} aria-hidden="true" />
                                {type.name}
                            </button>
                        ))}
                    </div>

                    <div
                        id={`nb-type-panel-${active}`}
                        role="tabpanel"
                        aria-labelledby={`nb-type-tab-${active}`}
                        className="nb-type-panel"
                    >
                        <div className="nb-type-panel-head">
                            <span className="nb-type-icon">
                                <current.icon size={22} aria-hidden="true" />
                            </span>
                            <h3>{current.name}</h3>
                        </div>
                        <p className="nb-type-desc">{current.desc}</p>
                        <h4>Best For</h4>
                        <ul className="nb-type-best">
                            {current.best.map((item) => (
                                <li key={item.label}>
                                    <CheckCircle2 size={17} aria-hidden="true" />
                                    <div>
                                        <strong>{item.label}</strong>
                                        {item.detail && <p>{item.detail}</p>}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
