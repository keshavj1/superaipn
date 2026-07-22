import React, { useEffect, useRef, useState } from "react";
import NeuraEdge1 from "../assets/NeuraEdge.png";
const products = [
    {
        name: "NeuraEdge",
        description: "Enterprise AI infrastructure platform designed to deploy secure, scalable AI systems across organizations.",
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" />
            </svg>
        ),
        Image: NeuraEdge1,

        color: "#8b5cf6",
    },
    {
        name: "NeuraEaglei",
        description: "Advanced analytics and intelligence platform for decision-making and operational insights.",
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
        ),
        color: "#06b6d4",
    },
    {
        name: "NeuraEduBOT",
        description: "AI-powered education assistant designed to enhance digital learning environments and support educators.",
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>
        ),
        color: "#ec4899",
    },
    {
        name: "NeuraBOT",
        description: "Conversational AI system enabling intelligent automation, communication, and task execution.",
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
            </svg>
        ),
        color: "#f59e0b",
    },
    {
        name: "Physical AI",
        description: "Next-generation robotics and AI systems connecting software intelligence with real-world environments.",
        icon: (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
        ),
        color: "#10b981",
    },
];

function ProductCard({ product, index, visible }) {
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
            /* w-full so the card fills the grid cell it is wrapped in, rather
               than shrink-wrapping and leaving cards in a row unequal. */
            className="divcardsec group relative w-full rounded-2xl p-6 transition-all duration-700 hover:border-white/[0.12] overflow-hidden"
            style={{
                background: "rgba(255,255,255,0.02)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transitionDelay: `${index * 120}ms`,
            }}
        >
            {/* Interactive Spotlight Hover glow */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${product.color}25, transparent 40%)`,
                }}
            />

            <div className="relative z-10">
                {/* Icon */}
                <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110"
                    style={{
                        background: `${product.color}12`,
                        border: `1px solid ${product.color}25`,
                        color: product.color,
                        boxShadow: `0 0 20px ${product.color}00`,
                    }}
                >

                    {/* <img src={product.Image} alt={product.name} className="w-7 h-7 object-contain" /> */}
                    {product.icon}
                </div>

                <h3 className="text-xl font-bold mb-3 text-heading group-hover:text-heading transition-colors">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {product.description}
                </p>
            </div>

            {/* Subtle bottom border glow on hover */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `linear-gradient(90deg, transparent, ${product.color}, transparent)`
                }}
            />
        </div>
    );
}

export default function AIEcosystem() {
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
        <section ref={sectionRef} className="relative py-16 overflow-hidden topaiechosystem" style={{ background: "var(--surface-section)" }}>
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-purple-900/[0.06] blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div
                    className="text-center mb-10 max-w-3xl mx-auto"
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(20px)",
                        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                >
                    <div className="btnsectss inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/[0.06] text-purple-300 text-xs font-semibold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                        Product Suite
                    </div>
                    <h2 className="section-title mb-5">Our AI Ecosystem</h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Super AI Polaris offers an integrated suite of intelligent AI platforms designed
                        to power education systems, enterprise operations, and digital governance.
                    </p>
                </div>

                {/* Products grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 productgrid">
                    {products.map((p, i) => (
                        <div
                            key={p.name}
                            /* 5 products in a 6-column track: the first three take two
                               columns each, the last two take three each, so both rows
                               span the same total width and their card edges line up.
                               Emitting exactly one col-span class — two conflicting ones
                               would resolve by stylesheet order, not by string order. */
                            className={`flex ${i < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}
                        >
                            <ProductCard product={p} index={i} visible={visible} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
