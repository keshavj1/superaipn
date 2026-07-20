import { Link } from "react-router-dom";
import "../styles/legal.css";

/* ─── 404 ─────────────────────────────────────────────────────────
   App.jsx had no catch-all route, so an unknown URL rendered the navbar
   and footer around an empty <main> — a blank page that still returned
   HTTP 200, which search engines happily indexed.

   Note: vercel.json rewrites every path to index.html, so the HTTP status
   here is still 200 ("soft 404"). Serving a real 404 status needs a host
   rule; the noindex tag below stops these being indexed in the meantime. */
export default function NotFound() {
  return (
    <div className="legal-page">
      <div className="legal-inner">
        <p className="legal-back" style={{ marginBottom: 12 }}>Error 404</p>
        <h1 className="legal-title">This page doesn&rsquo;t exist</h1>
        <p className="legal-intro">
          The link may be out of date, or the address may have been mistyped.
        </p>

        <nav aria-label="Suggested pages">
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", lineHeight: 2 }}>
            <li><Link to="/" className="legal-link">Home</Link></li>
            <li><Link to="/Products" className="legal-link">Products &amp; platforms</Link></li>
            <li><Link to="/Enterprise" className="legal-link">Enterprise solutions</Link></li>
            <li><Link to="/Education" className="legal-link">Education solutions</Link></li>
            <li><Link to="/Contact" className="legal-link">Contact us</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
