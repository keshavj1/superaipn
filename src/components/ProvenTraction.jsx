import React, { useEffect, useRef, useState } from "react";

const stats = [
    {
        value: "30L+",
        label: "Students Trained",
        sublabel: "Across AI and emerging technology programs",
    },
    {
        value: "15+",
        label: "Countries | 4 Continents",
        sublabel: "Global footprint through institutional partnerships",
    },
    {
        value: "8,350+",
        label: "Successful Placements",
        sublabel: "Across public and private sector organizations",
    },
    {
        value: "95%+",
        label: "Satisfaction Rate",
        sublabel: "From students, educators, and institutional partners",
    },
    {
        value: "3,000+",
        label: "Teachers Certified",
        sublabel: "Through AICTE-empanelled teacher training programs",
    },
];

function StatCard({ stat, index, visible }) {
    return (
        <div
            className="cartssect1se text-center p-6 rounded-2xl hover:border-cyan-500/30 transition-all duration-500 group relative overflow-hidden cursor-default hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(6,182,212,0.3)] bg-white/[0.015]"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                transitionDelay: `${index * 100}ms`,
            }}
        >
            {/* Hover aura */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/0 via-cyan-500/0 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div
                className="text-4xl md:text-5xl font-black mb-2 tracking-tight transition-transform duration-500 group-hover:scale-110 origin-bottom"
                style={{
                    background: "linear-gradient(135deg, #ffffff 0%, #c4b5fd 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                {stat.value}
            </div>
            <div className="text-heading font-semibold text-sm mb-1 transition-colors duration-300 group-hover:text-cyan-300">{stat.label}</div>
            <div className="text-gray-500 text-xs leading-relaxed transition-colors duration-300 group-hover:text-gray-400">{stat.sublabel}</div>
        </div>
    );
}

export default function ProvenTraction() {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
            },
            { threshold: 0.15 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative py-16 overflow-hidden section_sectss"
            style={{ background: "var(--surface-band-cool)" }}
        >
            {/* Ambient glows */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-purple-900/[0.08] blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-900/[0.06] blur-[100px] rounded-full pointer-events-none" />

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
                    <div className="section_sectsshed inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/[0.06] text-cyan-300 text-xs font-semibold tracking-widest uppercase mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        Proven Traction
                    </div>
                    <h2 className="section-title mb-5">
                        Trusted Across Institutions, Enterprises, and Governments
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Super AI Polaris has built a strong foundation across education, enterprise, and
                        government ecosystems, delivering measurable impact at scale.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 cardssectionb">
                    {stats.map((stat, i) => (
                        <StatCard key={i} stat={stat} index={i} visible={visible} />
                    ))}
                </div>
            </div>
        </section>
    );
}
