import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Upload } from "lucide-react";
import "../styles/careers-page.css";

/* Same entrance treatment as the other pages: each section fades + slides +
   scales in as it enters the viewport (the hero fires immediately on load). */
function useReveal(threshold = 0.12) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, visible];
}

const revealStyle = (visible) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
    transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
});

// Data for the hidden Stats section — restore alongside it.
// const stats = [
//     { value: "40+", label: "Team Members" },
//     { value: "5", label: "AI Product Lines" },
//     { value: "12", label: "Countries" },
//     { value: "100%", label: "Remote Friendly" },
// ];

// Data for the hidden "Why build here" section — restore alongside it.
// const benefits = [
//     { accent: "#ec4899", title: "Ownership from day one", desc: "You ship, you own it. No layers between your work and the product our customers use." },
//     { accent: "#8b5cf6", title: "Frontier problems", desc: "From robotic automation to enterprise inference at scale — the hard stuff is the day job." },
//     { accent: "#3b82f6", title: "AI for all", desc: "We build for classrooms and factory floors alike. Impact that reaches beyond the demo." },
//     { accent: "#f59e0b", title: "Remote-first", desc: "Work where you think best. We fly the whole team together twice a year." },
//     { accent: "#ec4899", title: "Learning budget", desc: "Annual budget for courses, conferences, and compute for your side experiments." },
//     { accent: "#8b5cf6", title: "Real equity", desc: "Meaningful ownership in the company you are helping build. Everyone is an owner." },
// ];

const positions = [
    { title: "Senior ML Engineer — NeuraEdge", team: "Engineering", location: "Remote / San Francisco", type: "Full-time" },
    { title: "Robotics Perception Engineer", team: "Engineering", location: "San Francisco, CA", type: "Full-time" },
    { title: "Research Scientist — Physical AI", team: "Research", location: "Remote", type: "Full-time" },
    { title: "Applied Researcher — Education AI", team: "Research", location: "Remote / New York", type: "Full-time" },
    { title: "Enterprise Solutions Architect", team: "Operations", location: "New York, NY", type: "Full-time" },
    { title: "Product Designer — AI Platforms", team: "Operations", location: "Remote", type: "Contract" },
];

const filters = ["All", "Engineering", "Research", "Operations"];

const ACCEPTED = [".pdf", ".doc", ".docx"];
const MAX_BYTES = 10 * 1024 * 1024;
const CAREERS_EMAIL = "careers@superaip.com";

export default function Careers() {
    const [filter, setFilter] = useState("All");

    /* Every role card linked to the same bare "/Careers#apply", so clicking
       "Robotics Perception Engineer" scrolled to a form that had no idea which
       job you had picked — all six cards behaved identically. The cards now
       pass the role in router state, which seeds the select below.
       Lazy initial state covers arriving from another page; the effect below
       covers clicking a role card while ALREADY on /Careers (no remount, so
       initial state never re-runs — that gap was the bug the tests caught). */
    const { state: navState } = useLocation();
    const [form, setForm] = useState(() => ({
        name: "",
        email: "",
        role: navState?.role || "",
    }));

    useEffect(() => {
        if (!navState?.role) return;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setForm((f) => (f.role === navState.role ? f : { ...f, role: navState.role }));
    }, [navState?.role]);
    const [file, setFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const inputRef = useRef(null);

    const [heroRef, heroVis] = useReveal(0.15);
    // const [statsRef, statsVis] = useReveal(0.2); // hidden Stats section
    // const [whyRef, whyVis] = useReveal(0.08); // hidden "Why build here" section
    const [rolesRef, rolesVis] = useReveal(0.06);
    const [applyRef, applyVis] = useReveal(0.08);

    const shown = useMemo(
        () => (filter === "All" ? positions : positions.filter((p) => p.team === filter)),
        [filter]
    );

    const validateFile = (f) => {
        if (!f) return "";
        const ok = ACCEPTED.some((ext) => f.name.toLowerCase().endsWith(ext));
        if (!ok) return "Please upload a PDF, DOC, or DOCX file.";
        if (f.size > MAX_BYTES) return "File is larger than 10 MB.";
        return "";
    };

    const takeFile = (f) => {
        const err = validateFile(f);
        if (err) { setError(err); setFile(null); return; }
        setError("");
        setFile(f);
    };

    const onDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        takeFile(e.dataTransfer.files?.[0]);
    };

    /* There is no application backend. This previously called setSubmitted(true)
       and showed "Application sent" while silently discarding the resume — every
       applicant believed they had applied and nobody received anything.

       Until a backend exists, the form hands off to the applicant's mail client
       with their details pre-filled. A browser cannot attach a file to a mailto:
       link, so the chosen resume is named in the body and the applicant is told
       to attach it. The confirmation copy now describes what actually happened. */
    const onSubmit = (e) => {
        e.preventDefault();
        const name = form.name.trim();
        const email = form.email.trim();
        if (!name || !email) {
            setError("Name and email are required.");
            return;
        }
        setError("");

        const subject = `Application${form.role ? ` — ${form.role}` : ""}: ${name}`;
        const body = [
            `Name: ${name}`,
            `Email: ${email}`,
            `Role of interest: ${form.role || "Not specified"}`,
            "",
            file
                ? `Resume: ${file.name} — PLEASE ATTACH THIS FILE BEFORE SENDING.`
                : "Resume: please attach your CV before sending.",
            "",
            "Message:",
            "",
        ].join("\n");

        window.location.href =
            `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setSubmitted(true);
    };

    return (
        <div className="careers-page">
            {/* ─── Hero ─── */}
            <section className="cp-hero">
                <div className="cp-hero-glow" aria-hidden="true" />
                <div className="cp-container cp-hero-inner" ref={heroRef} style={revealStyle(heroVis)}>
                    <span className="cp-eyebrow">Careers at Super AIP</span>
                    <h1 className="cp-hero-title">
                        Turn pure data into<br />pure power. With us.
                    </h1>
                    <p className="cp-hero-sub">
                        We're superizing artificial intelligence for enterprise operations, educational
                        platforms, and robotic automation. Join the team building AI for all.
                    </p>
                    <div className="cp-hero-actions">
                        <Link to="/Careers#open-roles" className="cp-btn cp-btn-primary">View open roles</Link>
                        {/* Targets the hidden "Why build here" section — restore alongside it.
                        <a href="#why" className="cp-btn cp-btn-ghost">Life at Super AIP</a> */}
                    </div>
                </div>
            </section>

            {/* ─── Stats (hidden) ───
            <section className="cp-container">
                <div className="cp-stats" ref={statsRef} style={revealStyle(statsVis)}>
                    {stats.map((s) => (
                        <div className="cp-stat" key={s.label}>
                            <div className="cp-stat-value">{s.value}</div>
                            <div className="cp-stat-label">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>
            */}

            {/* ─── Why build here (hidden) ───
            <section className="cp-container cp-section" id="why" ref={whyRef} style={revealStyle(whyVis)}>
                <h2 className="cp-h2">Why build here</h2>
                <p className="cp-lead">
                    Small teams, hard problems, real ownership — across Enterprise AI, NeuraEdge,
                    Education AI, Robotics, and Physical AI.
                </p>
                <div className="cp-benefits">
                    {benefits.map((b) => (
                        <div className="cp-benefit" key={b.title}>
                            <span className="cp-benefit-bar" style={{ background: b.accent }} />
                            <h3 className="cp-benefit-title">{b.title}</h3>
                            <p className="cp-benefit-desc">{b.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
            */}

            {/* ─── Open positions ─── */}
            <section className="cp-container cp-section" id="open-roles" ref={rolesRef} style={revealStyle(rolesVis)}>
                <div className="cp-roles-head">
                    <div>
                        <h2 className="cp-h2">Open positions</h2>
                        <p className="cp-lead cp-lead-tight">
                            {positions.length} roles across engineering, research, and operations.
                        </p>
                    </div>
                    <div className="cp-filters">
                        {filters.map((f) => (
                            <button
                                key={f}
                                type="button"
                                aria-pressed={filter === f}
                                className={`cp-filter ${filter === f ? "is-active" : ""}`}
                                onClick={() => setFilter(f)}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="cp-roles">
                    {shown.map((p) => (
                        <Link to="/Careers#apply" state={{ role: p.title }} className="cp-role" key={p.title}>
                            <div className="cp-role-main">
                                <h3 className="cp-role-title">{p.title}</h3>
                                <span className="cp-role-team">{p.team}</span>
                            </div>
                            <span className="cp-role-loc">{p.location}</span>
                            <span className="cp-role-type">{p.type}</span>
                            <ArrowRight className="cp-role-arrow" size={20} />
                        </Link>
                    ))}
                </div>
            </section>

            {/* ─── Apply ─── */}
            <section className="cp-container cp-section" id="apply" ref={applyRef} style={revealStyle(applyVis)}>
                <div className="cp-apply">
                    <div className="cp-apply-copy">
                        <span className="cp-eyebrow">Apply now</span>
                        <h2 className="cp-apply-title">Don't see your role?<br />Send us your resume.</h2>
                        <p className="cp-apply-text">
                            We're always looking for exceptional people. Tell us what you'd build and
                            attach your resume — we read every application.
                        </p>
                        <a href="mailto:careers@superaip.com" className="cp-apply-mail">careers@superaip.com</a>
                    </div>

                    {/* Truthful confirmation: the mail client has been opened; the
                        application is not sent until the applicant sends it. */}
                    {submitted ? (
                        <div className="cp-sent" role="status" aria-live="polite">
                            <div className="cp-sent-check">✓</div>
                            <h3>Almost there — finish in your email app</h3>
                            <p>
                                Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""}. We've opened a
                                pre-filled email to <strong>{CAREERS_EMAIL}</strong>.{" "}
                                <strong>Attach your resume{file ? ` (${file.name})` : ""} and hit send</strong> —
                                your application isn't with us until you do.
                            </p>
                            <p>
                                Nothing opened? Email us directly at{" "}
                                <a href={`mailto:${CAREERS_EMAIL}`} className="cp-apply-mail">{CAREERS_EMAIL}</a>.
                            </p>
                        </div>
                    ) : (
                        <form className="cp-form" onSubmit={onSubmit} noValidate={false}>
                            {/* Labels are visually hidden (.cp-sr-only) to keep the original
                                placeholder-style design, but a placeholder is not an
                                accessible name — these controls previously had none. */}
                            <div className="cp-form-row">
                                <div className="cp-field">
                                    <label htmlFor="cp-name" className="cp-sr-only">
                                        Full name (required)
                                    </label>
                                    <input
                                        id="cp-name"
                                        name="name"
                                        className="cp-input"
                                        type="text"
                                        placeholder="Full name *"
                                        required
                                        autoComplete="name"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    />
                                </div>
                                <div className="cp-field">
                                    <label htmlFor="cp-email" className="cp-sr-only">
                                        Email address (required)
                                    </label>
                                    <input
                                        id="cp-email"
                                        name="email"
                                        className="cp-input"
                                        type="email"
                                        placeholder="Email address *"
                                        required
                                        autoComplete="email"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <label htmlFor="cp-role" className="cp-sr-only">Role of interest</label>
                            <select
                                id="cp-role"
                                name="role"
                                className="cp-input cp-select"
                                value={form.role}
                                onChange={(e) => setForm({ ...form, role: e.target.value })}
                            >
                                <option value="">Role of interest (optional)</option>
                                {positions.map((p) => (
                                    <option key={p.title} value={p.title}>{p.title}</option>
                                ))}
                            </select>

                            <div
                                className={`cp-drop ${dragActive ? "is-drag" : ""} ${file ? "has-file" : ""}`}
                                onClick={() => inputRef.current?.click()}
                                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                                onDragLeave={() => setDragActive(false)}
                                onDrop={onDrop}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click(); }}
                            >
                                <Upload className="cp-drop-icon" size={26} />
                                <div className="cp-drop-title">
                                    {file ? file.name : "Drop your resume here"}
                                </div>
                                <div className="cp-drop-sub">
                                    {file ? "Click to replace" : "or click to browse · PDF, DOC, DOCX · 10 MB max"}
                                </div>
                                <input
                                    ref={inputRef}
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    hidden
                                    aria-label="Upload your resume (PDF, DOC or DOCX, 10 MB maximum)"
                                    onChange={(e) => takeFile(e.target.files?.[0])}
                                />
                            </div>

                            {/* role="alert" so validation failures are announced. */}
                            {error && <p className="cp-error" role="alert">{error}</p>}

                            <button type="submit" className="cp-btn cp-btn-primary cp-submit">
                                Submit application
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </div>
    );
}
