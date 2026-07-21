import { Users, Sparkles } from "lucide-react";
import "../styles/team-hero.css";

/* ─── Team page hero ──────────────────────────────────────────────
   AI-themed banner built from CSS and one inline SVG — no WebGL and no
   image payload, so it costs nothing on a page that is otherwise light.
   Every layer is decorative and aria-hidden; the heading and stats are
   the only content exposed to assistive tech.

   Motion is CSS-only, so the global prefers-reduced-motion rule in
   index.css already neutralises it. */

/* Neural-network node positions, as percentages of the SVG viewBox.
   Fixed rather than random so the layout is stable across renders. */
const NODES = [
  { x: 12, y: 32 }, { x: 26, y: 64 }, { x: 38, y: 22 },
  { x: 52, y: 50 }, { x: 66, y: 26 }, { x: 74, y: 68 },
  { x: 88, y: 40 }, { x: 46, y: 80 },
];

/* Index pairs into NODES. Kept sparse so the mesh reads as a network
   rather than a solid web. */
const EDGES = [
  [0, 1], [0, 2], [1, 3], [2, 3], [3, 4],
  [4, 6], [3, 5], [5, 6], [1, 7], [7, 5],
];

export default function TeamHero({ stats = [] }) {
  return (
    <section className="th-hero">
      {/* ── Decorative layers ── */}
      <div className="th-grid" aria-hidden="true" />
      <div className="th-glow th-glow--violet" aria-hidden="true" />
      <div className="th-glow th-glow--cyan" aria-hidden="true" />

      <svg
        className="th-mesh"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        {EDGES.map(([a, b], i) => (
          <line
            key={`e${i}`}
            x1={NODES[a].x} y1={NODES[a].y}
            x2={NODES[b].x} y2={NODES[b].y}
            className="th-edge"
            style={{ animationDelay: `${i * 260}ms` }}
          />
        ))}
        {NODES.map((n, i) => (
          <circle
            key={`n${i}`}
            cx={n.x} cy={n.y} r="0.7"
            className="th-node"
            style={{ animationDelay: `${i * 320}ms` }}
          />
        ))}
      </svg>

      {/* ── Content ── */}
      <div className="th-inner">
        <span className="th-badge">
          <Users size={14} aria-hidden="true" />
          Our Team
        </span>

        <h1 className="th-title">
          The people behind
          <span className="th-title-accent">
            Super AI Polaris
            <Sparkles className="th-title-spark" size={28} aria-hidden="true" />
          </span>
        </h1>

        <p className="th-sub">
          Founders, advisors, and engineers building sovereign AI for education,
          enterprise, and government — across Enterprise AI, NeuraEdge, Education AI,
          Robotics, and Physical AI.
        </p>

        {stats.length > 0 && (
          <dl className="th-stats">
            {stats.map((s) => (
              <div className="th-stat" key={s.label}>
                <dt className="th-stat-label">{s.label}</dt>
                <dd className="th-stat-value">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      {/* Fades the banner into the page below instead of ending on a hard edge. */}
      <div className="th-fade" aria-hidden="true" />
    </section>
  );
}
