import React from "react";
import "../styles/neurabot.css";
import useReveal from "../hooks/useReveal";
import BotHero from "../components/neurabot/BotHero";
import ChatbotTypes from "../components/neurabot/ChatbotTypes";
import WhyNeuraBot from "../components/neurabot/WhyNeuraBot";
import Deployment from "../components/neurabot/Deployment";
import BotIndustries from "../components/neurabot/BotIndustries";
import Integrations from "../components/neurabot/Integrations";
import BotDemoCTA from "../components/neurabot/BotDemoCTA";

/* ─── NeuraBOT landing page (Persuade) ────────────────────────────
   THESIS: one platform, seven shapes — the page's centrepiece is choosing
   the right chatbot, not admiring one. Refuses the seven-card wall: the
   type explorer shows one solution at full depth at a time.
   OWN-WORLD: the Super AIP dark system (surface/border/text tokens, Inter)
   with the site violet (#8b5cf6) carrying the page identity, as it already
   does for NeuraBOT on /Enterprise.
   STORY: a CX / IT / digital-government leader recognises their need
   (support, sovereignty, channels), finds the type built for it, sees the
   deployment model their compliance team will accept — then books a demo.
   FIRST VIEWPORT: left — badge, headline with violet highlight, subhead,
   Book a Personalized Demo (primary) + Talk to an AI Expert; right — the
   product demo framed in the NeuraBOT console. Primary action scrolls to
   #book-demo.
   COPY: the supplied marketing brief verbatim — no invented stats. */

export default function Neurabot() {
    const addToRefs = useReveal();

    return (
        <div className="neurabot-page">
            <BotHero />
            <ChatbotTypes revealRef={addToRefs} />
            <WhyNeuraBot revealRef={addToRefs} />
            <Deployment revealRef={addToRefs} />
            <BotIndustries revealRef={addToRefs} />
            <Integrations revealRef={addToRefs} />
            <BotDemoCTA revealRef={addToRefs} />
        </div>
    );
}
