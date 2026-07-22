import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function FinalCTA() {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
            },
            { threshold: 0.3 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative py-20 overflow-hidden"
            style={{ background: "var(--surface-section)" }}
        >
            {/* Background effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-900/[0.1] blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-900/[0.08] blur-[80px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center topfootersection">
                <div
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
                        transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                >
                    <h2
                        className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight"
                        style={{
                            /* Start stop is tokenised — a literal #ffffff here made
                               the site's closing headline half-invisible in light mode. */
                            background: "linear-gradient(135deg, var(--gradient-text-start) 0%, #c4b5fd 50%, #8b5cf6 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Ready to Build the Future with AI?
                    </h2>

                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
                        Join institutions, enterprises, and governments already transforming
                        their operations with Super AI Polaris.
                    </p>

                    <div className="flex items-center justify-center gap-4 flex-wrap mt-8">
                        <Link to="/Contact#request-demo">
                            <button className="relative overflow-hidden group/btn px-10 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-base shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_50px_rgba(139,92,246,0.6)] hover:-translate-y-1.5 hover:scale-105 transition-all duration-300 border-0 cursor-pointer">
                                <span className="relative z-10 flex items-center gap-2">
                                    Start for Free
                                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" style={{ backgroundSize: "200% auto", animation: "shimmer 2s linear infinite" }} />
                            </button>
                        </Link>
                        <Link to="/Contact#request-demo">
                            <button className="relative overflow-hidden group/btn2 px-10 py-2 rounded-xl border border-[var(--btn-secondary-border)] bg-[var(--btn-secondary-bg)] hover:border-[var(--btn-secondary-border-hover)] text-[var(--btn-secondary-text)] font-bold text-base hover:-translate-y-1.5 hover:scale-105 hover:shadow-[0_10px_30px_rgba(255,255,255,0.05)] transition-all duration-300 cursor-pointer backdrop-blur-sm">
                                <span className="relative z-10">Request a Demo</span>
                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/btn2:opacity-100 transition-opacity duration-300 transform scale-x-0 group-hover/btn2:scale-x-100 origin-left" />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
