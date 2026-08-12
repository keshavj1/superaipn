import React from "react";
import {
    Landmark,
    HeartPulse,
    Banknote,
    GraduationCap,
    ShoppingBag,
    Truck,
    Cpu,
    Hotel,
} from "lucide-react";

const INDUSTRIES = [
    { icon: Landmark, name: "Government" },
    { icon: HeartPulse, name: "Healthcare" },
    { icon: Banknote, name: "Banking & Financial Services" },
    { icon: GraduationCap, name: "Education" },
    { icon: ShoppingBag, name: "Retail" },
    { icon: Truck, name: "Logistics" },
    { icon: Cpu, name: "Technology" },
    { icon: Hotel, name: "Hospitality" },
];

export default function BotIndustries({ revealRef }) {
    return (
        <section className="reveal-fade-up" ref={revealRef} aria-labelledby="nb-ind-title">
            <div className="nb-container">
                <div className="section_sects" style={{ textAlign: "center" }}>
                    <h2 id="nb-ind-title" className="section-title">
                        Industry-Specific AI Chatbot Solutions
                    </h2>
                    <p className="section-subtitle">
                        NeuraBot AI Chatbot Solutions help organizations automate
                        conversations, improve response times, and simplify service
                        delivery across industries.
                    </p>
                </div>

                <div className="nb-ind-grid">
                    {INDUSTRIES.map((industry) => (
                        <div key={industry.name} className="nb-ind-tile">
                            <industry.icon size={26} aria-hidden="true" />
                            <h3>{industry.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
