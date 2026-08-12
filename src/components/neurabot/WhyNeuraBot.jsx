import React from "react";
import {
    Clock,
    TrendingDown,
    CheckCheck,
    Smile,
    Languages,
    Lock,
    BrainCircuit,
    Zap,
} from "lucide-react";

const BENEFITS = [
    { icon: Clock, title: "24×7 Automated Responses", desc: "Answer customers, employees, and citizens instantly — any time of day." },
    { icon: TrendingDown, title: "Reduced Support Workload", desc: "Automate routine queries so teams focus on complex issues." },
    { icon: CheckCheck, title: "Consistent Information Delivery", desc: "Every conversation draws on the same approved knowledge." },
    { icon: Smile, title: "Improved Customer Satisfaction", desc: "Faster, more personalized assistance across every interaction." },
    { icon: Languages, title: "Multi-language Support", desc: "Converse with users in the languages they prefer." },
    { icon: Lock, title: "Enterprise Security", desc: "Keep business data secure across every deployment model." },
    { icon: BrainCircuit, title: "Intelligent AI Conversations", desc: "Context-aware dialogue, not scripted decision trees." },
    { icon: Zap, title: "Faster Issue Resolution", desc: "Resolve queries in moments instead of queues." },
];

export default function WhyNeuraBot({ revealRef }) {
    return (
        <section className="reveal-fade-up" ref={revealRef} aria-labelledby="nb-why-title">
            <div className="nb-container">
                <div className="section_sects" style={{ textAlign: "center" }}>
                    <h2 id="nb-why-title" className="section-title">
                        Why Organizations Choose NeuraBot
                    </h2>
                    <p className="section-subtitle">
                        NeuraBot Enterprise Chatbot Platform gives organizations the
                        flexibility to deploy secure AI that aligns with their operational,
                        technical, and compliance requirements.
                    </p>
                </div>

                <div className="nb-why-grid">
                    {BENEFITS.map((benefit) => (
                        <div key={benefit.title} className="nb-why-cell">
                            <benefit.icon size={24} aria-hidden="true" />
                            <h3>{benefit.title}</h3>
                            <p>{benefit.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
