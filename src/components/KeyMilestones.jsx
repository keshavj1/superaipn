import React, { useEffect, useRef, useState } from "react";
import governmentEnterpriseReady2 from "../assets/AICTE.png";
import governmentEnterpriseReady1 from "../assets/Artificial_Intelligence.png";
import governmentEnterpriseReady3 from "../assets/Educationfile.png";
import governmentEnterpriseReady4 from "../assets/Joint_Marketing.png";
import partnerships5 from "../assets/partnerships.png";
import shield from "../assets/shield.png";
const milestones = [
    {
        // icon: "🏛️",
        text: "Only AI startup invited to the Prime Minister's Closed Conference on Artificial Intelligence",
        image: governmentEnterpriseReady1,
    },
    {
        // icon: "🎓",
        text: "AICTE (Government of India) Empanelled for AI teacher training programs",
        image: governmentEnterpriseReady2,
    },
    {
        // icon: "📜",
        text: "Active government contracts with Bihar Government, BSES, CMO Office, and Directorate of Education NCT Delhi",
        image: governmentEnterpriseReady3,
    },
    {
        // icon: "🤝",
        text: "Joint Marketing Agreement with Microsoft",
        image: governmentEnterpriseReady4,
    },
    {
        // icon: "🌍",
        text: "International partnerships across Italy, UAE, Oman, and Bahrain",
        image: partnerships5,
    },
    {
        // icon: "🛡️",
        text: "5 ISO Certifications, including ISO 27001:2022 and ISO 9001:2015",
        image: shield,
    },
];

export default function KeyMilestones() {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-16 overflow-hidden" style={{ background: "var(--surface-section)" }}>
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/[0.06] blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div
                    className="text-center mb-10 max-w-3xl mx-auto  section_sects"
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(20px)",
                        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                >
                    <div className="section_sectsbtns inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/[0.06] text-amber-300 text-xs font-semibold tracking-widest uppercase mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        Key Milestones
                    </div>
                    <h2 className="section-title mb-5">Building the Future of Sovereign AI</h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Our journey is defined by innovation, recognition, and trusted collaborations.
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical center line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/20 to-transparent" />

                    <div className="space-y-6">
                        {milestones.map((m, i) => {
                            const isLeft = i % 2 === 0;
                            return (
                                <div
                                    key={i}
                                    className={`firstsec relative flex items-center ${isLeft ? "md:flex-row" : "md:flex-row-reverse"
                                        } gap-6 group`}
                                    style={{
                                        opacity: visible ? 1 : 0,
                                        transform: visible
                                            ? "translateX(0)"
                                            : isLeft
                                                ? "translateX(-30px)"
                                                : "translateX(30px)",
                                        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 120}ms`,
                                    }}
                                >
                                    {/* Content */}
                                    <div className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"} pl-14 md:pl-0`}>
                                        <div
                                            className="card1sect2 block w-full rounded-xl p-6 hover:border-amber-500/40 transition-all duration-500 group-hover:-translate-y-1.5 group-hover:scale-[1.02] group-hover:shadow-[0_10px_30px_-10px_rgba(245,158,11,0.2)] bg-white/[0.02]"
                                        >
                                            <p className="text-gray-300 text-sm leading-relaxed transition-colors duration-300 group-hover:text-heading">{m.text}</p>
                                        </div>
                                    </div>

                                    {/* Center dot */}
                                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0a0b10] border-2 border-purple-500/30 group-hover:border-amber-500/80 flex items-center justify-center text-xl z-10 flex-shrink-0 transition-colors duration-500 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                                        <span className="relative z-10 transition-transform duration-500 group-hover:scale-125">
                                            <img
                                                src={m.image}
                                                alt=""
                                                width={24}
                                                height={24}
                                                loading="lazy"
                                                className="w-6 h-6 object-contain"
                                            />
                                        </span>
                                        <div className="absolute inset-0 rounded-full animate-ping bg-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ animationDuration: '3s' }} />
                                    </div>

                                    {/* Spacer */}
                                    <div className="hidden md:block flex-1" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
