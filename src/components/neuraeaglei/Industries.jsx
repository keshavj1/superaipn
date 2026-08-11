import React from "react";
import { Factory, HardHat, Building2, GraduationCap } from "lucide-react";

const INDUSTRIES = [
    { icon: Factory, name: "Manufacturing", tags: ["Safety Compliance", "Unauthorized Access", "PPE Detection"] },
    { icon: HardHat, name: "Construction", tags: ["Helmet Detection", "Fall Detection", "Equipment Monitoring"] },
    { icon: Building2, name: "Corporate", tags: ["Visitor Management", "Intrusion Detection", "Crowd Monitoring"] },
    { icon: GraduationCap, name: "Education", tags: ["Campus Security", "Perimeter Monitoring", "Safe Environment"] },
];

export default function Industries({ revealRef }) {
    return (
        <section className="ne-industries reveal-fade-up" ref={revealRef} aria-labelledby="ne-ind-title">
            <div className="ne-container">
                <div className="section_sects" style={{ textAlign: "center" }}>
                    <h2 id="ne-ind-title" className="section-title">
                        Built for Every Industry
                    </h2>
                </div>

                <div className="ne-ind-grid">
                    {INDUSTRIES.map((industry) => (
                        <div key={industry.name} className="ne-ind-card">
                            <div className="ne-ind-head">
                                <industry.icon size={24} aria-hidden="true" />
                                <h3>{industry.name}</h3>
                            </div>
                            <ul className="ne-ind-tags">
                                {industry.tags.map((tag) => (
                                    <li key={tag}>{tag}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
