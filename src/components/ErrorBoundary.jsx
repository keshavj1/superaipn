import React from "react";

/* React unmounts the entire tree when a render or effect throws and nothing
   catches it. There was no boundary anywhere in this app, so any single failure
   produced a completely blank page — verified with the three.js galaxy: when
   the browser refused a WebGL context, the whole homepage went white.

   Two uses:
     - `silent`: decorative subtrees (the galaxy). Render nothing and let the
       rest of the page carry on — the user should never learn it existed.
     - default: route content. Show a recovery message rather than a blank page.

   Class component because there is still no hook equivalent of
   componentDidCatch. */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    // Dev-only: production builds should not log to the end user's console.
    if (import.meta.env.DEV) {
      console.error("Caught by ErrorBoundary:", error, info?.componentStack);
    }
  }

  render() {
    if (!this.state.failed) return this.props.children;
    if (this.props.silent) return this.props.fallback ?? null;

    return (
      <div
        role="alert"
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          padding: "var(--gutter)",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "clamp(24px, 5vw, 36px)", fontWeight: 700 }}>
          Something went wrong
        </h1>
        <p style={{ color: "var(--color-text-secondary)", maxWidth: 480 }}>
          This page failed to load. Reloading usually fixes it — if it keeps
          happening, please get in touch.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <button
            type="button"
            className="btn-primary"
            onClick={() => window.location.reload()}
          >
            Reload the page
          </button>
          {/* A full document navigation on purpose: the router itself may be
              the thing that failed, so a <Link> is not safe to rely on here. */}
          <a className="btn-outline" href="/">
            Go to homepage
          </a>
        </div>
      </div>
    );
  }
}
