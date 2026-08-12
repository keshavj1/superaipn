import React from "react";
import { Webhook, Database, LibraryBig, Users, Building2 } from "lucide-react";

const SYSTEMS = [
    { icon: Webhook, name: "APIs" },
    { icon: Database, name: "Databases" },
    { icon: LibraryBig, name: "Knowledge Base" },
    { icon: Users, name: "CRM" },
    { icon: Building2, name: "Enterprise Systems" },
];

export default function Integrations({ revealRef }) {
    return (
        <section className="reveal-fade-up" ref={revealRef} aria-labelledby="nb-int-title">
            <div className="nb-container">
                <div className="section_sects" style={{ textAlign: "center" }}>
                    <h2 id="nb-int-title" className="section-title">
                        Connect AI With Your Business Systems
                    </h2>
                    <p className="section-subtitle">
                        Integrate AI chatbots into existing business applications to enable
                        smarter, more personalized conversations.
                    </p>
                </div>

                <ul className="nb-int-row" aria-label="Integration-ready systems">
                    {SYSTEMS.map((system) => (
                        <li key={system.name} className="nb-int-chip">
                            <system.icon size={18} aria-hidden="true" />
                            {system.name}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
