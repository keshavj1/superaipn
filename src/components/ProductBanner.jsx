import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ─────────────── Product Cards Data ─────────────── */
const products = [
    {
        name: "NeuraEdge",
        to: "/Enterprise#neuraedge",
        tagline: "Enterprise AI Infrastructure",
        description:
            "Deploy secure, scalable AI systems across your organization — on-premise or hybrid cloud.",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" />
            </svg>
        ),
        color: "#8b5cf6",
    },
    {
        name: "NeuraEaglei",
        to: "/Enterprise#neuraeaglei",
        tagline: "Intelligence & Analytics",
        description:
            "Advanced analytics platform for decision-making, operational insights, and predictive intelligence.",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
        ),
        color: "#06b6d4",
    },
    {
        name: "NeuraEduBOT",
        to: "/Enterprise#neuraedubot",
        tagline: "AI Education Assistant",
        description:
            "Transform digital classrooms with personalized tutoring, automated grading, and multilingual support.",
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>
        ),
        color: "#ec4899",
    },
];

/* ─────────────── Floating Tags for Orbit ─────────────── */
const orbitTags = [
    { label: "Sovereign AI", angle: 0 },
    { label: "Offline-Ready", angle: 60 },
    { label: "Multilingual", angle: 120 },
    { label: "On-Premise", angle: 180 },
    { label: "Scalable", angle: 240 },
    { label: "Secure", angle: 300 },
];

/* Decorative orbit dots — positions are randomised once at module load so they
   stay stable across re-renders instead of jumping on every render. */
const floatingDots = [...Array(8)].map((_, i) => {
    const angle = (i * 45) * Math.PI / 180;
    const r = 20 + Math.random() * 25;
    return {
        left: `${50 + r * Math.cos(angle)}%`,
        top: `${50 + r * Math.sin(angle)}%`,
    };
});

/* ─────────────── Mini Product Card ─────────────── */
function MiniProductCard({ product, index, visible }) {
    const cardRef = useRef(null);
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <Link
            to={product.to}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className="group relative block rounded-2xl p-6 border border-white/[0.08] hover:border-white/[0.18] transition-all duration-500 overflow-hidden cursor-pointer no-underline hover:-translate-y-2 hover:shadow-[0_15px_40px_-10px_rgba(139,92,246,0.25)]"
            style={{
                background: "rgba(255,255,255,0.025)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transitionDelay: `${index * 150}ms`,
            }}
        >
            {/* Spotlight */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(350px circle at ${mouse.x}px ${mouse.y}px, ${product.color}20, transparent 45%)`,
                }}
            />

            <div className="relative z-10">
                {/* Icon */}
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg"
                    style={{
                        background: `${product.color}15`,
                        border: `1px solid ${product.color}30`,
                        color: product.color,
                    }}
                >
                    {product.icon}
                </div>

                <div className="text-xs font-semibold tracking-wider uppercase mb-1.5" style={{ color: product.color }}>
                    {product.tagline}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 transition-colors group-hover:text-white">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
                    {product.description}
                </p>

                {/* Learn more link */}
                <div className="mt-4 flex items-center gap-1.5 text-sm font-medium transition-all duration-300 group-hover:gap-3" style={{ color: product.color }}>
                    Learn more
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </div>
            </div>

            {/* Bottom glow line */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${product.color}, transparent)` }}
            />
        </Link>
    );
}

/* ─────────────── Main Component ─────────────── */
export default function ProductBanner() {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.08 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden"
            style={{ background: "linear-gradient(180deg, #05060a 0%, #0c0e1a 50%, #05060a 100%)" }}
        >
            {/* ─── Top: Banner Showcase Area ─── */}
            <div className="relative pt-24 pb-16">
                {/* Ambient background glows */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-900/[0.08] blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-900/[0.06] blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    {/* Badge */}
                    <div
                        className="text-center mb-10"
                        style={{
                            opacity: visible ? 1 : 0,
                            transform: visible ? "translateY(0)" : "translateY(20px)",
                            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                    >
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-purple-500/25 bg-purple-500/[0.08] text-purple-300 text-xs font-semibold tracking-widest uppercase shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                            Our Products
                        </div>
                    </div>

                    {/* Headline */}
                    <div
                        className="text-center max-w-4xl mx-auto mb-14"
                        style={{
                            opacity: visible ? 1 : 0,
                            transform: visible ? "translateY(0)" : "translateY(25px)",
                            transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
                        }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6">
                            <span className="text-white">Build Intelligent Systems </span>
                            <span
                                style={{
                                    background: "linear-gradient(135deg, #8b5cf6, #06b6d4, #ec4899)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundSize: "200% auto",
                                    animation: "shimmer 4s linear infinite",
                                }}
                            >
                                That Scale
                            </span>
                        </h2>
                        <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                            From sovereign AI infrastructure to intelligent education bots — our products
                            power the next generation of AI-driven organizations.
                        </p>
                    </div>

                    {/* ─── Circular Orbit Showcase ─── */}
                    <div
                        className="relative mx-auto w-full max-w-[600px] aspect-square mb-10"
                        style={{
                            opacity: visible ? 1 : 0,
                            transform: visible ? "scale(1)" : "scale(0.9)",
                            transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
                        }}
                    >
                        {/* Orbit Rings */}
                        <div className="absolute inset-[10%] rounded-full border border-purple-500/10" />
                        <div className="absolute inset-[25%] rounded-full border border-purple-500/15" />
                        <div className="absolute inset-[40%] rounded-full border border-purple-500/20" />

                        {/* Center Core */}
                        <div className="absolute inset-[38%] rounded-full flex items-center justify-center"
                            style={{
                                background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0.05) 50%, transparent 70%)",
                            }}
                        >
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-purple-600/30 to-indigo-600/30 border border-purple-500/30 flex items-center justify-center shadow-[0_0_60px_rgba(139,92,246,0.3)]">
                                <svg className="w-10 h-10 md:w-12 md:h-12 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                                </svg>
                            </div>
                        </div>

                        {/* Floating Orbit Tags */}
                        {orbitTags.map((tag, i) => {
                            const radius = 42; // % from center
                            const angleRad = (tag.angle * Math.PI) / 180;
                            const x = 50 + radius * Math.cos(angleRad);
                            const y = 50 + radius * Math.sin(angleRad);
                            return (
                                <div
                                    key={tag.label}
                                    className="absolute z-20"
                                    style={{
                                        left: `${x}%`,
                                        top: `${y}%`,
                                        transform: "translate(-50%, -50%)",
                                        opacity: visible ? 1 : 0,
                                        transition: `opacity 0.6s ease ${0.5 + i * 0.12}s`,
                                        animation: visible ? `float-slow ${6 + i * 0.5}s ease-in-out infinite` : "none",
                                    }}
                                >
                                    <div className="px-4 py-2 rounded-xl bg-purple-500/15 border border-purple-500/25 text-purple-300 text-xs font-semibold tracking-wide shadow-[0_0_15px_rgba(139,92,246,0.2)] backdrop-blur-sm whitespace-nowrap hover:bg-purple-500/25 hover:scale-110 hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] transition-all duration-300 cursor-default">
                                        {tag.label}
                                    </div>
                                </div>
                            );
                        })}

                        {/* Floating dots */}
                        {floatingDots.map((dot, i) => (
                            <div
                                key={i}
                                className="absolute w-1.5 h-1.5 rounded-full bg-purple-500/30"
                                style={{
                                    left: dot.left,
                                    top: dot.top,
                                    animation: `float-slower ${5 + i * 0.7}s ease-in-out infinite`,
                                    animationDelay: `${i * 0.3}s`,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* ─── Transition gradient strip (dark to slightly lighter) ─── */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

            {/* ─── Bottom: Product Cards Grid ─── */}
            <div className="relative py-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    {/* Sub-heading */}
                    <div
                        className="text-center mb-14"
                        style={{
                            opacity: visible ? 1 : 0,
                            transform: visible ? "translateY(0)" : "translateY(15px)",
                            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
                        }}
                    >
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                            Core Products
                        </h3>
                        <p className="text-gray-500 text-base max-w-xl mx-auto">
                            Each platform is designed to run independently or as part of our integrated AI ecosystem.
                        </p>
                    </div>

                    {/* Product Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {products.map((p, i) => (
                            <MiniProductCard key={p.name} product={p} index={i} visible={visible} />
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div
                        className="text-center mt-14"
                        style={{
                            opacity: visible ? 1 : 0,
                            transform: visible ? "translateY(0)" : "translateY(15px)",
                            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.6s",
                        }}
                    >
                        <Link to="/Products" className="group/explore inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] hover:border-purple-500/30 text-white font-semibold text-sm hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(139,92,246,0.3)] transition-all duration-300 backdrop-blur-sm">
                            Explore All Products
                            <svg className="w-4 h-4 group-hover/explore:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
