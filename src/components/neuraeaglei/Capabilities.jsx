import React from "react";
import { Link } from "react-router-dom";
import {
    Flame, HardHat, ShieldAlert, PersonStanding,
    ScanFace, Users, Car, CloudFog, ArrowRight,
} from "lucide-react";

const CAPABILITIES = [
    { icon: Flame, title: "Fire Detection", desc: "Detect smoke and fire in real time" },
    { icon: HardHat, title: "Helmet Detection", desc: "Ensure workforce safety on site" },
    { icon: ShieldAlert, title: "Intrusion Detection", desc: "Identify unauthorized access instantly" },
    { icon: PersonStanding, title: "Fall Detection", desc: "Detect falls and request immediate help" },
    { icon: ScanFace, title: "Face Recognition", desc: "Identify known and unknown individuals" },
    { icon: Users, title: "Crowd Monitoring", desc: "Detect crowd build-up and unusual activity" },
    { icon: Car, title: "License Plate Recognition", desc: "Track vehicles and manage parking" },
    { icon: CloudFog, title: "Smoke Detection", desc: "Early detection of smoke and haze" },
];

export default function Capabilities({ revealRef }) {
    return (
        <section className="reveal-fade-up" ref={revealRef} aria-labelledby="ne-caps-title">
            <div className="ne-container">
                <div className="section_sects" style={{ textAlign: "center" }}>
                    <h2 id="ne-caps-title" className="section-title">
                        AI Capabilities That Drive Real Impact
                    </h2>
                    <p className="section-subtitle" style={{ marginTop: 16 }}>
                        Every detection runs on the cameras you already own — on-premise,
                        in real time.
                    </p>
                </div>

                <div className="ne-caps-grid">
                    {CAPABILITIES.map((cap) => (
                        <div key={cap.title} className="ne-cap-card">
                            <span className="ne-cap-icon">
                                <cap.icon size={22} aria-hidden="true" />
                            </span>
                            <h3>{cap.title}</h3>
                            <p>{cap.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="section-cta">
                    <Link to="/Products" className="ne-btn-secondary">
                        View All Capabilities <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
