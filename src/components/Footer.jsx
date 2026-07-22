import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/super_aip_logo.png";
import { SOCIAL_URLS } from "../data/social";
/* The floating <Chatbot /> is mounted once in App.jsx so it overlays every
   route — rendering it here too produced two stacked widgets. */

/* Entries with `to` render as router <Link>s; `href` is reserved for
   external URLs. The four Resources entries below have no page or URL
   yet — give them a `to`/`href` once that content exists. */
const footerLinks = [
    {
        title: "Solutions",
        links: [
            { name: "Enterprise AI", to: "/Enterprise#neuraedge" },
            { name: "NeuraEaglei", to: "/Enterprise#neuraeaglei" },
            { name: "Education AI", to: "/Education" },
            { name: "Robotics", to: "/Products#robotics" },
            { name: "Physical AI", to: "/Enterprise#physical-ai" },
            { name: "Agentic AI", to: "/Enterprise#agentic-ai" },
        ],
    },
    {
        title: "Company",
        links: [
            { name: "About Us", to: "/About" },
            { name: "Research", to: "/Research" },
            /* Team is not in the navbar, so the footer carries the site-wide
               link that keeps it discoverable and crawlable. */
            { name: "Our Team", to: "/Team" },
            { name: "Careers", to: "/Careers" },
            { name: "Contact", to: "/Contact#contact-us" },
            { name: "Partners", to: "/Partners" },
        ],
    },
    {
        title: "Resources",
        links: [
            { name: "Blog", pending: true },
            { name: "Case Studies", pending: true },
            { name: "Documentation", pending: true },
            { name: "Help Center", to: "/Contact#contact-us" },
            { name: "API Reference", pending: true },
        ],
    },
];

/* Renders nothing until the matching URL is filled in in data/social.js,
   so an unconfigured profile is omitted rather than linking nowhere. */
const SocialIcon = ({ d, href, label }) => {
    if (!href) return null;
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-11 h-11 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-500/15 hover:border-purple-500/30 active:scale-95 transition-all duration-300 group"
        >
            <svg
                className="w-4 h-4 group-hover:scale-110 transition-transform duration-300"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path d={d} />
            </svg>
        </a>
    );
};

export default function Footer() {
    // Restore alongside the commented-out CTA section below
    // (also re-add `useEffect, useRef, useState` to the react import).
    // const ctaRef = useRef(null);
    // const [ctaVisible, setCtaVisible] = useState(false);

    // useEffect(() => {
    //     const observer = new IntersectionObserver(
    //         ([entry]) => {
    //             if (entry.isIntersecting) setCtaVisible(true);
    //         },
    //         { threshold: 0.3 }
    //     );
    //     if (ctaRef.current) observer.observe(ctaRef.current);
    //     return () => observer.disconnect();
    // }, []);

    return (
        <footer className="footerclass relative pr-1 pl-1 bg-[var(--surface-footer)] text-heading pt-14 pb-8 overflow-hidden border-t border-white/5">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

                {/* CTA Section */}
                {/* <div
                    ref={ctaRef}
                    className={`footer_topsect group/cta relative flex flex-col md:flex-row items-center justify-between rounded-3xl p-8 md:p-12 mb-20 transition-all duration-700 overflow-hidden hover:shadow-[0_20px_50px_-20px_rgba(139,92,246,0.5)] hover:border-purple-500/30 ${ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`} >
                </div> */}
                <br />
                <br />
                <br />

                {/* Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 footergridsec">

                    {/* Brand */}
                    <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-12">
                        <Link to="/" className="flex items-center gap-3 mb-6">
                            <img src={logo} alt="Super AIP Logo" className="h-[90px] w-auto py-2.5" />
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8">
                            Superizing artificial intelligence for enterprise operations,
                            educational platforms, and robotic automation systems. We turn
                            pure data into pure power.
                        </p>

                        {/* Social */}
                        <div className="flex items-center gap-3">
                            <SocialIcon label="X" href={SOCIAL_URLS.x} d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            <SocialIcon label="GitHub" href={SOCIAL_URLS.github} d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            <SocialIcon label="Instagram" href={SOCIAL_URLS.instagram} d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                            <SocialIcon label="YouTube" href={SOCIAL_URLS.youtube} d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            <SocialIcon label="LinkedIn" href={SOCIAL_URLS.linkedin} d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </div>
                    </div>

                    {/* Links */}
                    <div className="lg:col-span-8 flex flex-wrap lg:flex-nowrap justify-between gap-10">
                        {footerLinks.map((section) => (
                            <div key={section.title} className="basis-[calc(50%-20px)] lg:basis-auto lg:w-auto">
                                <h2 className="text-heading font-bold tracking-wider uppercase text-xs mb-4 relative">
                                    {section.title}
                                    <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-transparent" />
                                </h2>
                                <ul className="space-y-1">
                                    {section.links.map((link) => (
                                        <li key={link.name}>
                                            {link.to ? (
                                                <Link
                                                    to={link.to}
                                                    className="footer-link text-gray-400 text-sm hover:text-purple-300 transition-colors duration-200"
                                                >
                                                    {link.name}
                                                </Link>
                                            ) : link.href ? (
                                                <a
                                                    href={link.href}
                                                    className="footer-link text-gray-400 text-sm hover:text-purple-300 transition-colors duration-200"
                                                >
                                                    {link.name}
                                                </a>
                                            ) : (
                                                /* No destination yet — render as plain text rather than a
                                                   link that goes nowhere when clicked. */
                                                <span className="footer-link text-gray-500 text-sm cursor-default">
                                                    {link.name}
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col md:flex-row items-center justify-between border-t border-white/5 text-gray-600 text-sm gap-4 footersec_boots">
                    <p>© {new Date().getFullYear()} Super AIP Inc. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link to="/privacy" className="footer-link hover:text-gray-300 transition-colors duration-200">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="footer-link hover:text-gray-300 transition-colors duration-200">
                            Terms of Service
                        </Link>
                        <Link to="/cookies" className="footer-link hover:text-gray-300 transition-colors duration-200">
                            Cookies
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
