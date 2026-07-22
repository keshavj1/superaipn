import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/hero.css";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";
// Served from public/videos — not bundled, so large media never enters the build.
// Restore alongside the commented-out <video> element below.
// const heroVideo = "/videos/superaipvideo.mp4";

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    // Parallax is decorative; skip it entirely when motion is reduced.
    if (reduceMotion) return;

    /* setState fired on every raw mousemove re-rendered the whole hero subtree
       at pointer-event rate. Coalescing into one rAF caps it at one render per
       frame, which is all the transform can paint anyway. */
    let frame = null;
    let latest = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      latest = {
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      };
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        setMousePos(latest);
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  return (
    <section className="hero" id="hero">
      {/* Parallax ambient backgrounds */}
      <div
        className="hero-glow-1"
        style={{ transform: `translate(calc(-50% + ${mousePos.x * 2}px), ${mousePos.y * 2}px)` }}
      />
      <div
        className="hero-glow-2"
        style={{ transform: `translate(${mousePos.x * -3}px, ${mousePos.y * -3}px)` }}
      />

      {/* Floating geometric elements for depth */}
      <div className="absolute top-[20%] left-[15%] w-24 h-24 rounded-full border border-purple-500/20 bg-gradient-to-tr from-purple-500/10 to-transparent blur-[2px] animate-float-slow -z-10"
        style={{ transform: `translate(${mousePos.x * -1.5}px, ${mousePos.y * -1.5}px)` }} />

      <div className="absolute bottom-[20%] right-[10%] w-32 h-32 rounded-full border border-cyan-500/20 bg-gradient-to-bl from-cyan-500/10 to-transparent blur-[3px] animate-float-slower -z-10"
        style={{ transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)` }} />

      <div className="absolute top-[30%] right-[25%] w-8 h-8 rotate-45 border border-pink-500/30 bg-pink-500/5 blur-[1px] animate-pulse-glow -z-10"
        style={{ transform: `translate(${mousePos.x * 3}px, ${mousePos.y * 3}px)` }} />


      <div className="hero-content">
        <div className="hero-badge group">
          <span className="relative flex h-2 w-2 mr-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          Powering the Future with Artificial Intelligence
          <div className="absolute inset-0 rounded-full border border-purple-500/0 group-hover:border-purple-500/50 transition-colors duration-500" />
        </div>

        <h1 className="hero-title">
          Where Cutting-Edge AI  <br className="hidden md:block" />
          <span className="hero-title-highlight">
            Meets Real-World Impact
          </span>
        </h1>

        <p className="hero-subtitle">
          Super AI Polaris builds sovereign AI platforms designed for education systems, enterprises, and governments. Our solutions combine advanced artificial intelligence with practical deployment models to solve real-world challenges at scale.
        </p>

        <div className="bth_section">
          <Link to="/Contact#request-demo">
            <button className="hero-btn primary-btn group">
              <span className="relative z-10 flex items-center gap-2">
                Start for Free
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundSize: "200% auto", animation: "shimmer 2s linear infinite" }} />
            </button>
          </Link>
          <Link to="/Contact#request-demo">
            <button className="hero-btn secondary-btn relative overflow-hidden group">
              <span className="relative z-10">Request a Demo</span>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left" />
            </button>
          </Link>
        </div>

        {/* ─── Video Showcase ─── */}
        <div className="hero-video-wrapper">
          <div className="hero-video-container group">
            {/* Animated gradient border */}
            <div className="hero-video-border" />

            {/* Video */}
            <div className="hero-video-inner">
              {/* <video
                autoPlay
                loop
                muted
                playsInline
                className="hero-video"
              >
                <source src={heroVideo} type="video/mp4" />
              </video> */}

              {/* Gradient overlays for blending */}
              <div className="hero-video-overlay-top" />
              <div className="hero-video-overlay-bottom" />
            </div>
          </div>

          {/* Ambient glow behind video */}
          <div className="hero-video-glow" />
        </div>
      </div>
    </section>
  );
}
