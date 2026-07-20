import { useState } from "react";
import { Linkedin, Github, Globe, Facebook, Instagram } from "lucide-react";
import { getInitials } from "../data/team";

/* ─── Social link metadata (icon + display order) ─── */
const SOCIAL_META = {
  linkedin: { Icon: Linkedin, label: "LinkedIn" },
  github: { Icon: Github, label: "GitHub" },
  portfolio: { Icon: Globe, label: "Portfolio" },
  facebook: { Icon: Facebook, label: "Facebook" },
  instagram: { Icon: Instagram, label: "Instagram" },
};
const SOCIAL_ORDER = ["linkedin", "github", "portfolio", "facebook", "instagram"];

/* ─── Reusable premium person card ───────────────────────────────
   Shared by the About page (Leadership + Employees) and the Team
   page, so both stay visually identical. Styling lives in about.css
   under the .emp-* classes. */
export default function PersonCard({ name, role, image, imgPosition, color, socials, bio, style }) {
  const links = socials || {};
  const shown = SOCIAL_ORDER.filter((k) => links[k]);
  const [imgOk, setImgOk] = useState(Boolean(image));

  return (
    <article className="emp-card" style={style}>
      {/* Hover glow + top accent line */}
      <span className="emp-glow" style={{ background: `radial-gradient(140px 140px at 50% 0%, ${color}40, transparent 70%)` }} />
      <span className="emp-accent" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

      {/* Avatar with rotating gradient ring */}
      <div className="emp-avatar-wrap" style={{ "--ring-color": color }}>
        <div
          className="emp-avatar"
          style={{ background: `linear-gradient(${color}26, ${color}10), #0b0c16`, color }}
        >
          {image && imgOk ? (
            <img src={image} alt={name} style={{ objectPosition: imgPosition || "center" }} onError={() => setImgOk(false)} />
          ) : (
            getInitials(name)
          )}
        </div>
      </div>

      <h4 className="emp-name">{name}</h4>
      <p className="emp-role" style={{ color }}>{role}</p>

      {/* Bio is optional — the About grid omits it, the Team page shows it */}
      {bio && <p className="emp-bio">{bio}</p>}

      {/* Social links (reveal on hover). People with no `socials` entry in
          data/team.js render no row at all — the previous placeholder icons
          were href="#" links that went nowhere when clicked. */}
      {shown.length > 0 && (
        <div className="emp-socials">
          {shown.map((k) => {
            const { Icon, label } = SOCIAL_META[k];
            return (
              <a
                key={k}
                href={links[k]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} on ${label}`}
                style={{ "--sc": color }}
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>
      )}
    </article>
  );
}
