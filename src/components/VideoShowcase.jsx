import React, { useEffect, useRef, useState } from "react";
import ai_robot from "../assets/ai_robot.png";
import cap_education from "../assets/cap_education.png";
import lock from "../assets/lock.png";
import electricspark from "../assets/electricspark.png";
import Multilingual_1 from "../assets/Multilingual_1.png";
import shield from "../assets/shield.png";
/* ─── Capabilities Data ─── */
const capabilities = [
    {
        title: "Sovereign Deployment",
        desc: "Deploy AI on your own servers. Full data control, zero cloud dependency.",
        // icon: "🛡️",
        image: shield,
        gradient: "from-purple-500 to-indigo-600",
        glowColor: "rgba(139,92,246,0.4)",
    },
    {
        title: "22+ Indian Languages",
        desc: "Multilingual AI that speaks the local language - Hindi, Tamil, Bengali, and more.",
        // icon: "🌐",
        image: Multilingual_1,
        gradient: "from-cyan-500 to-blue-600",
        glowColor: "rgba(6,182,212,0.4)",
    },
    {
        title: "Offline-First Architecture",
        desc: "Works without internet. Perfect for rural schools, remote offices, and field operations.",
        // icon: "⚡",
        image: electricspark,
        gradient: "from-amber-500 to-orange-600",
        glowColor: "rgba(245,158,11,0.4)",
    },
    {
        title: "Enterprise-Grade Security",
        desc: "5 ISO certifications including ISO 27001:2022. Built for government and defense sectors.",
        // icon: "🔒",
        image: lock,
        gradient: "from-emerald-500 to-green-600",
        glowColor: "rgba(16,185,129,0.4)",
    },
    {
        title: "AI Education Suite",
        desc: "Personalized tutoring, automated grading, and smart content delivery for millions of students.",
        // icon: "🎓",
        image: cap_education,
        gradient: "from-pink-500 to-rose-600",
        glowColor: "rgba(236,72,153,0.4)",
    },
    {
        title: "Physical AI & Robotics",
        desc: "Next-gen robotic intelligence connecting software AI with real-world mechanical systems.",
        // icon: "🤖",
        image: ai_robot,
        gradient: "from-violet-500 to-purple-600",
        glowColor: "rgba(139,92,246,0.4)",
    },
];

/* ─── Animated Number Counter ─── */
// function AnimatedNumber({ target, suffix = "", visible }) {
//     const [count, setCount] = useState(0);
//     const numericTarget = parseInt(target.replace(/[^0-9]/g, "")) || 0;

//     useEffect(() => {
//         if (!visible) return;
//         let start = 0;
//         const duration = 2000;
//         const step = Math.max(1, Math.floor(numericTarget / 60));
//         const interval = setInterval(() => {
//             start += step;
//             if (start >= numericTarget) {
//                 setCount(numericTarget);
//                 clearInterval(interval);
//             } else {
//                 setCount(start);
//             }
//         }, duration / 60);
//         return () => clearInterval(interval);
//     }, [visible, numericTarget]);

//     const prefix = target.match(/^[^0-9]*/)?.[0] || "";
//     return <>{prefix}{count.toLocaleString()}{suffix}</>;
// }

export default function VideoShowcase() {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.05 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative py-24 md:py-32 overflow-hidden sectionsthtree"
            /* Shorthand (not background-color) on purpose: it also clears the
               dotted_bg.png that .sectionsthtree sets, matching the shipped design. */
            style={{ background: "var(--surface-section)" }}
        >
            {/* ─── Background ─── */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-900/[0.06] blur-[180px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-cyan-900/[0.04] blur-[120px] rounded-full" />
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-pink-900/[0.03] blur-[120px] rounded-full" />
            </div>

            {/* ─── Decorative Shape Images ─── */}
            {/* <img src="/shape1.png" alt="" className="absolute bottom-0 left-0 pointer-events-none opacity-30" style={{ animation: "float 8s ease-in-out infinite" }} />
            <img src="/shape2.png" alt="" className="absolute top-0 right-0 pointer-events-none opacity-30" style={{ animation: "float 10s ease-in-out infinite 1s" }} />
            <img src="/shape3.png" alt="" className="absolute top-[15%] left-[8%] w-10 h-10 pointer-events-none opacity-40" style={{ animation: "float 6s ease-in-out infinite 0.5s" }} />
            <img src="/shape4.png" alt="" className="absolute top-[25%] right-[10%] w-4 h-4 pointer-events-none opacity-50" style={{ animation: "float 5s ease-in-out infinite 2s" }} />
            <img src="/shape5.png" alt="" className="absolute bottom-[20%] right-[15%] w-8 h-8 pointer-events-none opacity-40" style={{ animation: "float 7s ease-in-out infinite 1.5s" }} />
            <img src="/shape6.png" alt="" className="absolute bottom-[30%] left-[12%] w-6 h-6 pointer-events-none opacity-40" style={{ animation: "float 9s ease-in-out infinite 0.8s" }} /> */}

            <div className="max-w-7xl mx-auto px-6 py-5 relative z-10">

                {/* ─── Header ─── */}
                <div
                    className="text-center mb-20 max-w-3xl mx-auto"
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(30px)",
                        transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-purple-500/20 bg-purple-500/[0.06] text-purple-300 text-xs font-semibold tracking-[0.2em] uppercase mb-6 shadow-[0_0_25px_rgba(139,92,246,0.12)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                        What We Deliver
                    </div>
                    <h2 className="testst">
                        {/* The phrase was rendered twice — a bare text node followed
                            by a span repeating it, so users saw it duplicated. */}
                        <span className="text-heading">Built for Real-World Impact</span>
                        <span className="relative inline-block">
                            <span
                                style={{
                                    background: "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 50%, #ec4899 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundSize: "200% auto",
                                    animation: "shimmer 4s linear infinite",
                                }}
                            >

                            </span>
                            <div className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0" />
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
                        From sovereign infrastructure to education AI - every capability is designed
                        to work offline, at scale, and in your own language.
                    </p>
                </div>

                {/* ─── Capability Cards: Bento Grid ─── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {capabilities.map((cap, i) => (
                        <div
                            key={i}
                            className="secondsect_one group relative rounded-2xl p-7 transition-all duration-500 overflow-hidden cursor-default hover:-translate-y-1.5 hover:shadow-xl"
                            style={{
                                background: "rgba(255,255,255,0.02)",
                                opacity: visible ? 1 : 0,
                                transform: visible ? "translateY(0)" : "translateY(25px)",
                                transitionDelay: `${i * 100}ms`,
                            }}
                        >
                            {/* Hover glow */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                style={{
                                    background: `radial-gradient(circle at 50% 50%, ${cap.glowColor.replace('0.4', '0.08')}, transparent 70%)`,
                                }}
                            />

                            {/* Top gradient accent */}
                            <div
                                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500"
                                style={{
                                    background: `linear-gradient(90deg, transparent, ${cap.glowColor}, transparent)`,
                                }}
                            />

                            <div className="relative z-10">
                                <div className="text-4xl mb-5 ">
                                    {cap.icon}
                                    <img src={cap.image} alt="" />
                                </div>

                                <h3 className="text-xl font-bold text-heading mb-2.5 transition-colors group-hover:text-purple-300">
                                    {cap.title}
                                </h3>
                                <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                                    {cap.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ─── Impact Numbers ─── */}
                <div
                    className="mt-20 relative"
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(25px)",
                        transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
                    }}
                >
                    {/* Divider */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-16" />

                    {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                        {[
                            { value: "30", suffix: "L+", label: "Students Powered", color: "#8b5cf6" },
                            { value: "15", suffix: "+", label: "Countries Active", color: "#06b6d4" },
                            { value: "8350", suffix: "+", label: "Careers Launched", color: "#ec4899" },
                            { value: "95", suffix: "%", label: "Client Satisfaction", color: "#10b981" },
                        ].map((stat, i) => (
                            <div key={i} className="group text-center cursor-default">
                                <div
                                    className="text-4xl md:text-5xl font-black mb-2 tracking-tight transition-transform duration-500 group-hover:scale-110"
                                    style={{
                                        // Tokenised start stop: a literal white washed
                                        // these stat numbers out on a light background.
                                        background: `linear-gradient(135deg, var(--gradient-text-start) 30%, ${stat.color} 100%)`,
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    <AnimatedNumber target={stat.value} suffix={stat.suffix} visible={visible} />
                                </div>
                                <div className="text-gray-600 text-xs font-medium tracking-[0.15em] uppercase transition-colors duration-300 group-hover:text-gray-400">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div> */}
                </div>
            </div>
        </section>
    );
}
