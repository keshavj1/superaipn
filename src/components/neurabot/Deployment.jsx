import React from "react";
import { Cloud, CloudCog, Server } from "lucide-react";

const OPTIONS = [
    { icon: Cloud, title: "Cloud AI", desc: "Fast deployment with advanced Large Language Models." },
    { icon: CloudCog, title: "Private Cloud", desc: "Dedicated AI infrastructure with enhanced control." },
    { icon: Server, title: "Secure On-Premise AI", desc: "Complete ownership of business data and conversations." },
];

export default function Deployment({ revealRef }) {
    return (
        <section className="nb-deploy reveal-fade-up" ref={revealRef} aria-labelledby="nb-deploy-title">
            <div className="nb-container">
                <div className="section_sects" style={{ textAlign: "center" }}>
                    <h2 id="nb-deploy-title" className="section-title">
                        Flexible AI Deployment Options
                    </h2>
                    <p className="section-subtitle">
                        NeuraBot offers multiple deployment models, helping businesses
                        choose the right balance between flexibility, control, and
                        compliance.
                    </p>
                </div>

                <div className="nb-deploy-grid">
                    {OPTIONS.map((option) => (
                        <div key={option.title} className="nb-deploy-card">
                            <span className="nb-deploy-icon">
                                <option.icon size={22} aria-hidden="true" />
                            </span>
                            <h3>{option.title}</h3>
                            <p>{option.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
