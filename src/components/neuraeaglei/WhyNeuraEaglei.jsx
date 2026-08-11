import React from "react";
import { Camera, BrainCircuit, Server, Puzzle, BellRing, Plug } from "lucide-react";

const REASONS = [
    { icon: Camera, title: "Existing Camera Compatible", desc: "Works with 99% of existing IP cameras" },
    { icon: BrainCircuit, title: "Enterprise AI Technology", desc: "Advanced AI models for high accuracy" },
    { icon: Server, title: "On-Premise Deployment", desc: "Full data control within your network" },
    { icon: Puzzle, title: "Custom AI Models", desc: "Tailored to your use cases" },
    { icon: BellRing, title: "Instant Alerts", desc: "Real-time alerts via multiple channels" },
    { icon: Plug, title: "Easy Integration", desc: "Seamless integration with existing systems" },
];

export default function WhyNeuraEaglei({ revealRef }) {
    return (
        <section className="reveal-fade-up" ref={revealRef} aria-labelledby="ne-why-title">
            <div className="ne-container">
                <div className="section_sects" style={{ textAlign: "center" }}>
                    <h2 id="ne-why-title" className="section-title">
                        Why Choose NeuraEaglei?
                    </h2>
                </div>

                <div className="ne-why-grid">
                    {REASONS.map((reason) => (
                        <div key={reason.title} className="ne-why-cell">
                            <reason.icon size={24} aria-hidden="true" />
                            <h3>{reason.title}</h3>
                            <p>{reason.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
