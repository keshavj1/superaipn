import React from "react";
import { Server, ShieldCheck, Award } from "lucide-react";

/* Figures come verbatim from the NeuraEaglei brief — do not invent beyond
   these. */
const STATS = [
    { value: "50+", label: "Customers" },
    { value: "1600+", label: "Cameras" },
    { value: "20+", label: "AI Use Cases" },
];

const BADGES = [
    { icon: Server, label: "On-Premise Deployment" },
    { icon: ShieldCheck, label: "Enterprise Ready" },
    { icon: Award, label: "Award Winning" },
];

export default function TrustStrip({ revealRef }) {
    return (
        <section className="ne-trust-strip reveal-fade-up" ref={revealRef} aria-label="NeuraEaglei at a glance">
            <div className="ne-container">
                <ul className="ne-strip" style={{ listStyle: "none", margin: 0, padding: 0 }}>
                    {STATS.map((stat) => (
                        <li key={stat.label} className="ne-strip-cell">
                            <span className="ne-strip-value">{stat.value}</span>
                            <span className="ne-strip-label">{stat.label}</span>
                        </li>
                    ))}
                    {BADGES.map((badge) => (
                        <li key={badge.label} className="ne-strip-cell">
                            <badge.icon size={26} aria-hidden="true" />
                            <span className="ne-strip-label">{badge.label}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
