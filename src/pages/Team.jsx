import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import PersonCard from "../components/PersonCard";
import MeetTheBrains from "../components/MeetTheBrains";
import TeamHero from "../components/TeamHero";
import { teamGroups, founders, educationAdvisors, employees } from "../data/team";
import "../styles/about.css";
import "../styles/team-page.css";

/* Reveal-on-scroll: returns a ref to attach and a visibility flag. */
const useReveal = (threshold = 0.12) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
};

const revealStyle = (visible) => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(28px)",
  transition: "opacity .7s ease, transform .7s ease",
});

/* Headline counts derive from the data so they can't drift out of date. */
const teamStats = [
  { value: founders.length, label: "Leadership & Founders" },
  { value: educationAdvisors.length, label: "Education Advisors" },
  { value: employees.length, label: "Team Members" },
];

function TeamGroup({ group, index }) {
  const [ref, visible] = useReveal(0.06);

  if (!group.members.length) return null;

  return (
    <section
      className="tp-group"
      id={group.id}
      ref={ref}
      style={revealStyle(visible)}
    >
      <div className="tp-group-head">
        <span className="tp-group-index">{String(index + 1).padStart(2, "0")}</span>
        <div>
          <h2 className="tp-group-title">{group.label}</h2>
          <p className="tp-group-blurb">{group.blurb}</p>
        </div>
        <span className="tp-group-count">{group.members.length}</span>
      </div>

      <div className="emp-grid">
        {group.members.map((m, i) => (
          <PersonCard
            key={m.name}
            name={m.name}
            role={m.profile}
            bio={m.bio}
            image={m.image}
            imgPosition={m.imgPosition}
            color={m.color}
            socials={m.socials}
            style={{ animationDelay: `${i * 60}ms` }}
          />
        ))}
      </div>
    </section>
  );
}

export default function Team() {
  /* The hero no longer scroll-reveals — it is above the fold, so fading it
     in delayed the largest text on the page for no benefit. */
  return (
    <div className="tp-page">
      {/* ─── Hero ─── */}
      <TeamHero stats={teamStats} />

      {/* ─── Meet the brains: leadership, shown as horizontal cards ─── */}
      <MeetTheBrains
        members={founders}
        title="Meet the brains"
        subtitle="These people work on making our product best."
      />

      {/* ─── Groups: advisors, team ───
          "leadership" is skipped here because the founders are already
          presented above by MeetTheBrains — drop the filter to bring the
          original vertical-card grid back. */}
      <div className="tp-container">
        {teamGroups
          .filter((group) => group.id !== "leadership")
          .map((group, i) => (
            <TeamGroup key={group.id} group={group} index={i} />
          ))}
      </div>

      {/* ─── Join us ─── */}
      <section className="tp-cta">
        <div className="tp-cta-card">
          <Sparkles size={20} className="tp-cta-icon" />
          <h3 className="tp-cta-title">Want to build here?</h3>
          <p className="tp-cta-text">
            We hire for ownership and curiosity across engineering, research, and operations.
          </p>
          <Link to="/Careers" className="tp-cta-btn">View open roles</Link>
        </div>
      </section>
    </div>
  );
}
