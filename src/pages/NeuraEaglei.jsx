import React from "react";
import "../styles/neuraeaglei.css";
import useReveal from "../hooks/useReveal";
import EagleHero from "../components/neuraeaglei/EagleHero";
import TrustStrip from "../components/neuraeaglei/TrustStrip";
import ChallengesSolution from "../components/neuraeaglei/ChallengesSolution";
import Capabilities from "../components/neuraeaglei/Capabilities";
import Industries from "../components/neuraeaglei/Industries";
import WhyNeuraEaglei from "../components/neuraeaglei/WhyNeuraEaglei";
import DemoCTA from "../components/neuraeaglei/DemoCTA";

/* ─── NeuraEaglei landing page (Persuade) ─────────────────────────
   THESIS: the product caught doing its job — the first viewport shows the
   demo reel inside the product's own monitoring console, not a claim about
   one. Refuses the screenshot-hero + uniform-card-wall scaffold.
   OWN-WORLD: the Super AIP dark system (surface/border/text tokens, Inter)
   with NeuraEaglei's incumbent emerald (#10b981) carrying detection states;
   red appears only inside the "Current Challenges" panel.
   STORY: an ops/security leader recognises their cameras (no new hardware),
   their pain (missed incidents, manual monitoring), the exact detections
   they need, their industry — then books a live demo.
   FIRST VIEWPORT: left — badge, headline with emerald highlight, subhead,
   Book Live Demo (primary) + Watch 2-Min Demo, four trust chips; right —
   the live console. Primary action scrolls to #book-demo.
   FORM: extension inside the established site world; brief pinned every
   section, so no concept roll. */

export default function NeuraEaglei() {
    const addToRefs = useReveal();

    return (
        <div className="neuraeaglei-page">
            <EagleHero />
            <TrustStrip revealRef={addToRefs} />
            <ChallengesSolution revealRef={addToRefs} />
            <Capabilities revealRef={addToRefs} />
            <Industries revealRef={addToRefs} />
            <WhyNeuraEaglei revealRef={addToRefs} />
            <DemoCTA revealRef={addToRefs} />
        </div>
    );
}
