import { useState } from "react";
import { Linkedin, Github, Globe, Facebook, Instagram } from "lucide-react";
import { getInitials } from "../data/team";
import "../styles/meet-the-brains.css";

/* ─── Social link metadata (icon + display order) ───────────────
   Mirrors the map in PersonCard.jsx so both card styles accept the
   same `socials` shape from data/team.js. `x` is the only addition —
   lucide ships a close-cross X, not the brand mark, so it is drawn
   inline below. */
const XIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={16} height={16} aria-hidden="true" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
);

const SOCIAL_META = {
  x: { Icon: XIcon, label: "X" },
  linkedin: { Icon: Linkedin, label: "LinkedIn" },
  github: { Icon: Github, label: "GitHub" },
  portfolio: { Icon: Globe, label: "Portfolio" },
  facebook: { Icon: Facebook, label: "Facebook" },
  instagram: { Icon: Instagram, label: "Instagram" },
};
const SOCIAL_ORDER = ["x", "instagram", "linkedin", "github", "portfolio", "facebook"];

/* People with no `socials` entry in data/team.js render no icon row —
   placeholder icons would be links that go nowhere when clicked. */

function BrainCard({ member, featured, style }) {
  const { name, profile, role, bio, image, imgPosition, color, socials } = member;
  const [imgOk, setImgOk] = useState(Boolean(image));

  const links = socials || {};
  const shown = SOCIAL_ORDER.filter((k) => links[k]);

  return (
    <article
      className={`mtb-card${featured ? " is-featured" : ""}`}
      style={{ "--accent": color || "#8b5cf6", ...style }}
    >
      {/* Avatar — the ring is always painted but only turns opaque for the
          featured card and on hover, which is what drives the layout's focus. */}
      <div className="mtb-avatar-ring">
        <div className="mtb-avatar">
          {image && imgOk ? (
            <img
              src={image}
              alt={name}
              loading="lazy"
              style={{ objectPosition: imgPosition || "center" }}
              onError={() => setImgOk(false)}
            />
          ) : (
            <span className="mtb-initials">{getInitials(name)}</span>
          )}
        </div>
      </div>

      <div className="mtb-info">
        <h3 className="mtb-name">{name}</h3>
        <p className="mtb-role">{profile || role}</p>

        <span className="mtb-rule" />

        {bio && <p className="mtb-bio">{bio}</p>}

        {shown.length > 0 && (
          <div className="mtb-socials">
            {shown.map((k) => {
              const { Icon, label } = SOCIAL_META[k];
              return (
                <a
                  key={k}
                  href={links[k]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} on ${label}`}
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
}

/* ─── "Meet the brains" section ──────────────────────────────────
   Two-up grid of horizontal person cards (avatar left, details right).
   Pass any list shaped like the entries in data/team.js. `featuredName`
   pins the highlighted ring to one person; it defaults to the first. */
export default function MeetTheBrains({
  members = [],
  title = "Meet the brains",
  subtitle = "These people work on making our product best.",
  featuredName,
}) {
  if (!members.length) return null;

  const featured = featuredName || members[0].name;

  return (
    <section className="mtb-section">
      <div className="mtb-inner">
        <header className="mtb-head">
          <h2 className="mtb-title">{title}</h2>
          {subtitle && <p className="mtb-sub">{subtitle}</p>}
        </header>

        <div className="mtb-grid">
          {members.map((m, i) => (
            <BrainCard
              key={m.name}
              member={m}
              featured={m.name === featured}
              style={{ animationDelay: `${i * 70}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
