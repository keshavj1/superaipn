import React, { useEffect, useRef, useState } from "react";
import governmentEnterpriseReady from "../assets/Government_Enterprise_Ready.png";
import governmentEnterpriseReady2 from "../assets/On_Premise_Deployment.png";
import governmentEnterpriseReady3 from "../assets/Multilingual_Intelligence.png";
import governmentEnterpriseReady4 from "../assets/Offline_Ready.png";
const features = [
    {
        title: "Offline-Ready AI Infrastructure",
        description: "Deploy AI solutions even in low-connectivity environments.",
        // icon: (
        //     <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        //         <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        //     </svg>
        // ),
        image: governmentEnterpriseReady4,
        color: "#8b5cf6",
    },
    {
        title: "Multilingual Intelligence",
        description: "Supports 22+ Indian languages, enabling inclusive and localized AI adoption.",
        // icon: (
        //     <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        //         <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
        //     </svg>
        // ),
        image: governmentEnterpriseReady3,
        color: "#06b6d4",
    },
    {
        title: "On-Premise Deployment",
        description: "Your data remains within your infrastructure with zero external data exposure.",
        // icon: (
        //     <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        //         <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        //     </svg>
        // ),
        image: governmentEnterpriseReady2,
        color: "#10b981",
    },
    {
        title: "Government & Enterprise Ready",
        description: "Designed for highly regulated environments where security and compliance are critical.",
        // icon: (
        //     <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        //         <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
        //     </svg>
        // ),
        image: governmentEnterpriseReady,
        color: "#f59e0b",
    },
];

function FeatureCard({ feature, index, visible }) {
    const cardRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className="group relative rounded-2xl p-6  hover:border-white/[0.15] transition-all duration-500 hover:-translate-y-1.5 overflow-hidden card2"
            style={{
                background: "rgba(255,255,255,0.02)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${(index + 2) * 120}ms`,
                boxShadow: "0 10px 40px -10px rgba(0,0,0,0.3)"
            }}
        >
            {/* Spotlight Hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 "
                style={{
                    background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, ${feature.color}15, transparent 50%)`,
                }}
            />

            <div className="relative z-10">
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{
                        background: `${feature.color}12`,
                        border: `1px solid ${feature.color}25`,
                        color: feature.color,
                        boxShadow: `0 0 15px ${feature.color}10`,
                    }}
                >

                    <img src={feature.image} alt={feature.title} />
                    {feature.icon}
                </div>
                <h3 className="text-heading font-bold text-base mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
        </div>
    );
}

export default function WhySuperAIP() {
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
        <section
            ref={sectionRef}
            className="relative py-28 overflow-hidden"
            style={{ background: "var(--surface-band-violet)" }}
        >
            {/* Ambient */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-900/[0.05] blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-purple-900/[0.04] blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10 aiSovereign">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left - Text */}
                    <div
                        style={{
                            opacity: visible ? 1 : 0,
                            transform: visible ? "translateX(0)" : "translateX(-30px)",
                            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-300 text-xs font-semibold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(16,185,129,0.15)] titlesection">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Why Super AI Polaris
                        </div>
                        <h2 className="section-title mb-6">
                            Sovereign AI Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Real-World Deployment</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Unlike many AI platforms that rely heavily on cloud infrastructure,
                            Super AI Polaris is designed to operate securely within your own systems,
                            ensuring maximum privacy and control over your intelligent assets.
                        </p>
                    </div>

                    {/* Right - Feature Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {features.map((f, i) => (
                            <FeatureCard key={i} feature={f} index={i} visible={visible} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
