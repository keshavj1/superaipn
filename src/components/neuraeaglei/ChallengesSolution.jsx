import React from "react";
import {
    EyeOff, AlertTriangle, FileWarning, Clock,
    ScanEye, BellRing, Workflow, LayoutDashboard,
    ArrowRight, Eye,
} from "lucide-react";

const CHALLENGES = [
    { icon: EyeOff, title: "Manual monitoring", desc: "Requires high manpower and constant attention" },
    { icon: AlertTriangle, title: "Missed incidents", desc: "Critical events go unnoticed" },
    { icon: FileWarning, title: "Compliance gaps", desc: "Hard to track and prove compliance" },
    { icon: Clock, title: "Delayed response", desc: "Slow action leads to bigger losses" },
];

const OUTCOMES = [
    { icon: ScanEye, title: "AI detection", desc: "Real-time detection of safety, security & operational events" },
    { icon: BellRing, title: "Instant alerts", desc: "Immediate notifications to the right people" },
    { icon: Workflow, title: "Automated workflows", desc: "Trigger actions and reduce manual effort" },
    { icon: LayoutDashboard, title: "Central dashboard", desc: "Unified view, analytics & reports in one place" },
];

function VersusList({ items }) {
    return (
        <ul className="ne-versus-list">
            {items.map((item) => (
                <li key={item.title}>
                    <span className="ne-versus-icon">
                        <item.icon size={19} aria-hidden="true" />
                    </span>
                    <div>
                        <strong>{item.title}</strong>
                        <p>{item.desc}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default function ChallengesSolution({ revealRef }) {
    return (
        <section className="reveal-fade-up" ref={revealRef} aria-labelledby="ne-versus-title">
            <div className="ne-container">
                <div className="section_sects" style={{ textAlign: "center" }}>
                    <h2 id="ne-versus-title" className="section-title">
                        From Challenges to Intelligent Outcomes
                    </h2>
                </div>

                <div className="ne-versus">
                    <div className="ne-versus-panel is-problem">
                        <h3><EyeOff size={18} aria-hidden="true" /> Current Challenges</h3>
                        <VersusList items={CHALLENGES} />
                    </div>

                    <div className="ne-versus-arrow" aria-hidden="true">
                        <span className="ne-versus-arrow-badge">
                            <ArrowRight size={22} />
                        </span>
                    </div>

                    <div className="ne-versus-panel is-solution">
                        <h3><Eye size={18} aria-hidden="true" /> With NeuraEaglei</h3>
                        <VersusList items={OUTCOMES} />
                    </div>
                </div>
            </div>
        </section>
    );
}
