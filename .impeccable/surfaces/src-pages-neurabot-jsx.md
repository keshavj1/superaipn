---
version: 1
slug: "src-pages-neurabot-jsx"
primary_target: "src/pages/Neurabot.jsx"
related_targets: []
---

## Scope & mode
Route /Neurabot (src/pages/Neurabot.jsx + src/components/neurabot/*, src/styles/neurabot.css). Mode: Persuade.

## Audience / job / action
CX, IT, and digital-government leaders across Government, Healthcare, Banking, Education, Retail, Logistics, Technology, Hospitality. Job: pick the right chatbot type and a deployment model their compliance team will accept. Primary action: Book a Personalized Demo (#book-demo form → FormSubmit relay, mailto fallback). Secondary: Talk to an AI Expert (/Contact#contact-us).

## Proof (verbatim from brief — do not invent beyond)
Seven chatbot types with per-type Best-For lists; 8 benefits (24×7, reduced workload, consistency, satisfaction, multi-language, security, intelligent conversations, faster resolution); three deployment models (Cloud AI, Private Cloud, Secure On-Premise); integration-ready with APIs, Databases, Knowledge Base, CRM, Enterprise Systems. No customer counts or stats were supplied — none may appear.

## Direction & memorable moment
Site's dark token system with the site violet (#8b5cf6) as page identity, as NeuraBOT already carries on /Enterprise. Memorable moment: the type explorer — a 7-tab rail showing one chatbot type at full depth instead of a seven-card wall; hero demo reel framed as the NeuraBOT console with channel-state chips.

## Constraints
Inherit index.css tokens/utilities (.section-title, .section-subtitle, .reveal-fade-up, badges); nb- prefixed page CSS; no new dependencies; sections reveal via shared useReveal hook; Lenis owns programmatic scrolls (window.__lenis); copy verbatim from the supplied marketing brief.

## Unresolved
Form relay address shared with Contact page; hero video reuses /videos/NeuraBot_PP.mp4 (18 MB, public/ — never bundled).
