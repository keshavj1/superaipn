import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/* ─── Per-route document metadata ─────────────────────────────────
   This is a client-rendered SPA, so every route previously shared the
   single <title> and <meta description> in index.html. Search results and
   browser tabs were identical for all 13 pages, and shared links had no
   distinct preview.

   Deliberately dependency-free (no react-helmet) — the whole job is three
   DOM writes per navigation. Note this still runs client-side: crawlers
   that do not execute JS see index.html's defaults. Prerendering or SSR is
   the real fix for search visibility; this closes the gap for everything
   else and for JS-capable crawlers. */

const SITE = "Super AI Polaris";
const ORIGIN = "https://superaip.com";

/* Keys are lowercase paths. Titles stay under ~60 characters and
   descriptions under ~155 so neither is truncated in search results. */
const META = {
  "/": {
    title: `${SITE} — Sovereign AI Platform`,
    description:
      "Sovereign AI platforms for education, enterprises, and governments. Built in India, deployable on-premise or air-gapped.",
  },
  "/about": {
    title: `About — ${SITE}`,
    description:
      "Who we are: technologists, researchers, and policy veterans building India's sovereign AI platform for education, governance, and enterprise.",
  },
  "/products": {
    title: `AI Products & Platforms — ${SITE}`,
    description:
      "NeuraEdge, NeuraEaglei, NeuraBOT and NeuraEduBOT — AI platforms, automation systems, robotics, and developer tooling.",
  },
  "/enterprise": {
    title: `Enterprise AI Solutions — ${SITE}`,
    description:
      "Sovereign LLM deployment, vision analytics, conversational AI, and physical AI for enterprise and government operations.",
  },
  "/education": {
    title: `Education AI Solutions — ${SITE}`,
    description:
      "K-12 AI learning, higher education programmes, teacher training, and end-to-end AI labs aligned to NEP 2020.",
  },
  "/research": {
    title: `AI Research & Innovation Labs — ${SITE}`,
    description:
      "Applied AI research, publications, and innovation labs advancing sovereign artificial intelligence for India.",
  },
  "/partners": {
    title: `Partner Programme — ${SITE}`,
    description:
      "Join as a solution provider, technology partner, ISV, OEM, or training partner across enterprise, government, and education.",
  },
  "/team": {
    title: `Our Team — ${SITE}`,
    description:
      "The founders, advisors, and engineers building Super AI Polaris across enterprise AI, education, robotics, and physical AI.",
  },
  "/careers": {
    title: `Careers — ${SITE}`,
    description:
      "Open roles in engineering, research, and operations. We hire for ownership and curiosity.",
  },
  "/contact": {
    title: `Contact & Request a Demo — ${SITE}`,
    description:
      "Talk to our team, request a product demo, or start a partnership conversation with Super AI Polaris.",
  },
  "/privacy": { title: `Privacy Policy — ${SITE}`, description: "How Super AI Polaris collects, uses, and protects your information." },
  "/terms": { title: `Terms of Service — ${SITE}`, description: "The terms governing use of Super AI Polaris platforms and services." },
  "/cookies": { title: `Cookie Policy — ${SITE}`, description: "How Super AI Polaris uses cookies and how to manage your preferences." },
};

const FALLBACK = META["/"];

/* Set an attribute on an existing tag, creating the tag if absent. */
function upsertMeta(selector, attr, value, createAttrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    Object.entries(createAttrs).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

export default function PageMeta() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Routes are registered in mixed case (/About and /about both resolve).
    const key = pathname.toLowerCase().replace(/\/+$/, "") || "/";
    const meta = META[key] || FALLBACK;
    const url = `${ORIGIN}${key === "/" ? "/" : key}`;

    document.title = meta.title;
    upsertMeta('meta[name="description"]', "content", meta.description, { name: "description" });
    upsertMeta('meta[property="og:title"]', "content", meta.title, { property: "og:title" });
    upsertMeta('meta[property="og:description"]', "content", meta.description, { property: "og:description" });
    upsertMeta('meta[property="og:url"]', "content", url, { property: "og:url" });
    upsertMeta('meta[name="twitter:title"]', "content", meta.title, { name: "twitter:title" });
    upsertMeta('meta[name="twitter:description"]', "content", meta.description, { name: "twitter:description" });

    /* Canonical always points at the lowercase form, so /Team and /team are
       not indexed as two pages with identical content. */
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
  }, [pathname]);

  return null;
}
