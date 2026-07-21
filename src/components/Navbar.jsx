import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import logo from "../assets/super_aip_logo.png";

/* Animated dark/light theme switch */
function ThemeToggle({ theme, onToggle }) {
    const isLight = theme === "light";
    return (
        <button
            onClick={onToggle}
            role="switch"
            aria-checked={isLight}
            aria-label="Toggle dark / light theme"
            title={isLight ? "Switch to dark mode" : "Switch to light mode"}
            className="relative flex h-8 w-[58px] shrink-0 items-center rounded-full p-1 transition-colors duration-300"
            style={{
                background: isLight ? "#dbe2f0" : "rgba(255,255,255,0.08)",
                border: `1px solid ${isLight ? "rgba(15,23,42,0.12)" : "rgba(255,255,255,0.12)"}`,
            }}
        >
            <span
                className="flex h-6 w-6 items-center justify-center rounded-full shadow-md transition-transform duration-300"
                style={{
                    transform: isLight ? "translateX(26px)" : "translateX(0)",
                    background: isLight
                        ? "linear-gradient(135deg,#fbbf24,#f59e0b)"
                        : "linear-gradient(135deg,#6366f1,#8b5cf6)",
                }}
            >
                {isLight ? <Sun size={14} className="text-white" /> : <Moon size={14} className="text-white" />}
            </span>
        </button>
    );
}

const navItems = [
    { title: "About", href: "/About" },
    /* "Team" is intentionally not in the navbar. The page still lives at
       /Team and is reached from the "Our Team" button on the About page,
       so it stays crawlable and linked — just not in the top-level nav. */
    {
        title: "Solutions",
        children: [
            { title: "Enterprise AI Solutions", href: "/Enterprise" },
            { title: "Education AI Solutions", href: "/Education" },
        ],
    },
    { title: "Products", href: "/Products" },
    { title: "Research", href: "/Research" },
    { title: "Partners", href: "/Partners" },
    { title: "Contact", href: "/Contact" },
    { title: "Careers", href: "/Careers" },
];

function NavbarItem({ item, pathname }) {
    // Check if this item or any of its children match the current route
    const isActive = item.href
        ? pathname.toLowerCase() === item.href.toLowerCase()
        : item.children?.some(child => pathname.toLowerCase() === child.href.toLowerCase());

    /* The dropdown was shown purely by Tailwind's `group-hover:block`, so
       focusing the trigger did nothing and its two links sat inside a
       display:none container — removed from the tab order entirely. Two
       navigation destinations were unreachable by keyboard on desktop.

       State drives visibility now; hover still opens it via mouse handlers
       on the wrapper, so the pointer experience is unchanged. */
    const [open, setOpen] = useState(false);
    const wrapRef = useRef(null);

    // Close when focus leaves the whole item (Tab out of the last link).
    const handleBlur = (e) => {
        if (!wrapRef.current?.contains(e.relatedTarget)) setOpen(false);
    };

    /* No effect needed to close on navigation — the child links close it in
       their own onClick, and pointer-leave/blur/Escape cover the rest. */

    return (
        <div
            ref={wrapRef}
            className="relative group px-1"
            onMouseEnter={() => item.children && setOpen(true)}
            onMouseLeave={() => item.children && setOpen(false)}
            onBlur={handleBlur}
            onKeyDown={(e) => { if (e.key === "Escape") setOpen(false); }}
        >
            {item.href ? (
                <Link
                    to={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center gap-1 py-2 px-3 text-sm font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    {item.title}
                </Link>
            ) : (
                <button
                    type="button"
                    aria-expanded={open}
                    aria-haspopup="true"
                    onClick={() => setOpen((v) => !v)}
                    onFocus={() => setOpen(true)}
                    className={`flex items-center gap-1 py-2 px-3 text-sm font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    {item.title}
                    {item.children && (
                        <svg
                            className={`w-3 h-3 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            aria-hidden="true"
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    )}
                </button>
            )}

            {/* Active bottom line indicator */}
            <div
                aria-hidden="true"
                className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                style={{ background: 'linear-gradient(90deg, #8b5cf6, #6366f1)' }}
            />

            {item.children && (
                <div className={`absolute w-56 pt-3 left-0 z-50 ${open ? 'block' : 'hidden'}`}>
                    <div
                        className="border border-white/10 rounded-2xl shadow-2xl shadow-black/50"
                        style={{
                            background: "var(--nav-dropdown-bg, rgba(10, 11, 16, 0.95))",
                            backdropFilter: "blur(24px)",
                            WebkitBackdropFilter: "blur(24px)",
                            padding: '10px',
                        }}
                    >
                        {item.children.map((child, i) => {
                            const isChildActive = pathname.toLowerCase() === child.href.toLowerCase();
                            return (
                                <Link
                                    key={i}
                                    to={child.href}
                                    aria-current={isChildActive ? "page" : undefined}
                                    onClick={() => setOpen(false)}
                                    className="nav-drop-link"
                                    style={{
                                        background: isChildActive ? "var(--nav-dropdown-active)" : "transparent",
                                        color: "var(--nav-dropdown-text)",
                                    }}>
                                    {child.title}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [theme, setTheme] = useState(
        () => (typeof document !== "undefined" && document.documentElement.getAttribute("data-theme")) || "dark"
    );
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Apply + persist the theme whenever it changes
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        document.documentElement.style.backgroundColor = theme === "light" ? "#f4f5fa" : "#05060a";
        try {
            localStorage.setItem("theme", theme);
        } catch { /* ignore */ }
    }, [theme]);

    const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
                ? "bg-[#05060a]/60 backdrop-blur-2xl border-b shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]"
                : "bg-transparent border-b border-transparent"
                }`}
            style={{
                borderColor: scrolled ? "rgba(255,255,255,0.08)" : "transparent",
            }}
        >
            {/* Scrolled bottom glow */}
            <div
                className={`absolute bottom-0 left-0 w-full h-[1px] transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`}
                style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.3), transparent)" }}
            />

            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <img
                            src={logo}
                            alt="Super AIP Logo"
                            className="h-8 w-auto logonav transition-transform duration-300 group-hover:scale-105"
                            style={{ filter: "drop-shadow(0 0 10px rgba(139,92,246,0.3))" }}
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center centerhead_sec shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                        {navItems.map((item, i) => (
                            <NavbarItem key={i} item={item} pathname={location.pathname} />
                        ))}
                    </div>

                    {/* Theme toggle + CTA (desktop) */}
                    <div className="hidden lg:flex items-center gap-4">
                        <ThemeToggle theme={theme} onToggle={toggleTheme} />
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
                            <Link to="/Contact#contact-us" className="btnshead relative inline-flex px-6 py-2.5 text-sm font-semibold text-white rounded-full bg-black/50 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden group-hover:bg-[#05060a]/80">
                                <span className="relative z-10 flex items-center gap-2">
                                    Join waitlist
                                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Link>
                        </div>
                    </div>

                    {/* Theme toggle + hamburger (mobile) */}
                    <div className="flex items-center gap-3 lg:hidden">
                        <ThemeToggle theme={theme} onToggle={toggleTheme} />
                        <button
                            className="navbar-burger text-white w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 hover:bg-white/5 transition-colors"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                        <div className="relative w-5 h-4">
                            <span
                                className={`absolute left-0 w-full h-0.5 bg-white rounded transition-all duration-300 ${mobileMenuOpen ? "top-1.5 rotate-45" : "top-0"
                                    }`}
                            />
                            <span
                                className={`absolute left-0 top-1.5 w-full h-0.5 bg-white rounded transition-all duration-300 ${mobileMenuOpen ? "opacity-0 scale-x-0" : "opacity-100"
                                    }`}
                            />
                            <span
                                className={`absolute left-0 w-full h-0.5 bg-white rounded transition-all duration-300 ${mobileMenuOpen ? "top-1.5 -rotate-45" : "top-3"
                                    }`}
                            />
                        </div>
                    </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                /* The panel's content is ~590px tall. With a permanent
                   overflow-hidden and max-h-[80vh], the last items ("Careers"
                   and the CTA) were clipped and unreachable on a 320x568 or
                   375x667 screen. Scrolling is enabled while open; the closed
                   state keeps overflow-hidden so the collapse still animates.
                   inert/aria-hidden also removes the links from the tab order
                   and the accessibility tree when the menu is shut. */
                inert={!mobileMenuOpen}
                aria-hidden={!mobileMenuOpen}
                className={`lg:hidden transition-all duration-500 ease-in-out ${mobileMenuOpen
                    ? "max-h-[80vh] opacity-100 overflow-y-auto overscroll-contain"
                    : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                style={{
                    background: "rgba(5, 6, 10, 0.97)",
                    backdropFilter: "blur(24px)",
                }}
            >
                <div className="px-6 py-6 space-y-1 border-t border-white/5">
                    {navItems.map((item, i) => (
                        <div key={i}>
                            {item.href ? (
                                <Link
                                    to={item.href}
                                    className="block py-3 text-white font-medium hover:text-purple-400 transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.title}
                                </Link>
                            ) : (
                                <p className="py-3 text-white font-medium">{item.title}</p>
                            )}
                            {item.children &&
                                item.children.map((child, j) => (
                                    <Link
                                        key={j}
                                        to={child.href}
                                        className="block pl-4 py-2 text-gray-500 text-sm hover:text-white transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {child.title}
                                    </Link>
                                ))}
                        </div>
                    ))}

                    <div className="pt-4">
                        <Link
                            to="/Contact#contact-us"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block w-full px-6 py-3 text-sm font-semibold text-center text-white rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600"
                        >
                            Join waitlist
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}