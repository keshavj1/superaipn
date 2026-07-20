/* ─── Team data — single source of truth ───────────────────────
   Consumed by both the About page (leadership viewer + employee
   grid) and the dedicated Team page (/team). Edit people here and
   both pages update together.

   To add a photo: drop the file in public/ and set `image` to its
   path (e.g. "/jane_doe.jpg"), or import from src/assets/ and pass
   the imported value. Leave `image: null` to render initials.
   Optional `imgPosition` tunes the crop (CSS object-position).
   Optional `socials` accepts: linkedin, github, portfolio,
   facebook, instagram. */

/* `bio` is deliberately kept to one short sentence (~12-18 words). It is
   rendered with a typewriter effect in the Leadership viewer, so long
   copy is slow to read and pushes the card taller. Put the punchy line
   in `tagline` and the concrete credential in `bio`. */
export const founders = [
  { name: "Jaydev Rath", role: "Founder & Director", tagline: "Turning two decades of cloud & AI into India's sovereign future.", bio: "20+ years in cloud, AI, and public sector transformation. Ex-Microsoft. Leads product and partnerships.", color: "#8b5cf6", tags: ["Founder", "Ex-Microsoft", "AI Strategy"] },
  { name: "Sahil Agarwal", role: "Director", tagline: "Bringing AI labs to every classroom and campus.", bio: "Ex-Oracle. Leads national rollout of AI labs and training with education and skill departments.", color: "#6366f1", tags: ["Director", "Ex-Oracle", "AI Labs"] },
  { name: "Rajat Sahai", role: "Entrepreneur & Business Leader", tagline: "Scaling bold ideas into market-ready impact.", bio: "Entrepreneur driving business strategy and market expansion across enterprise and public sector.", color: "#ec4899", tags: ["Entrepreneur", "Growth", "GTM"] },
  { name: "Ashok Pamadi", role: "Former CEO, NASSCOM Foundation", tagline: "Three decades of tech, driven by purpose and inclusion.", bio: "30+ years in IT, inclusion, and social development. Advises HerKey and other impact organizations.", color: "#06b6d4", tags: ["Ex-NASSCOM", "Social Impact", "Advisor"] },
  { name: "Dhirendra Khadelwal", role: "Digital Transformation Expert", tagline: "Engineering digital transformation, system by system.", bio: "NIT Rourkela alumnus. Founder and MD of E Square System & Technologies.", color: "#10b981", tags: ["Digital Transformation", "NIT Alumnus", "Consulting"] },
  { name: "Vinod Dubey", role: "CTO", tagline: "Architecting LLM & Edge AI that actually ships.", bio: "18+ years in IT leadership, ex-Amperage (US). Drives NeuraEdge and NeuraDesk.", color: "#f59e0b", tags: ["CTO", "LLM / Edge AI", "Engineering"] },
  { name: "Swapnashree Rath", role: "Director & Individual Promoter", tagline: "Aligning AI innovation with sharp business strategy.", bio: "Director and promoter, shaping AI-driven solutions and business strategy.", color: "#a78bfa", tags: ["Director", "Promoter", "Strategy"] },
  { name: "Sanjay Mishra", role: "Chartered Accountant", tagline: "Financial discipline that powers sustainable growth.", bio: "Chartered Accountant leading finance and compliance across sectors.", color: "#818cf8", tags: ["Finance", "Compliance", "CA"] },
  { name: "Anu Joseph", role: "Master Trainer & Content Lead", tagline: "Designing learning experiences that truly stick.", bio: "10+ years in instructional design, content creation, and capacity building.", color: "#f472b6", tags: ["Training", "Content", "EdTech"] },
  { name: "T. S. Sridhar", role: "Business Development Partner", tagline: "Forging partnerships that open new markets.", bio: "Strategic insight from Microsoft, Nokia, and Gillette. Scales partnerships and market access.", color: "#34d399", tags: ["Biz Dev", "Partnerships", "GTM"] },
];

export const educationAdvisors = [
  { name: "U. N. Khaware", role: "Former Addl. Commissioner (Academics), KVS", tagline: "Shaping AI education for India's schools.", bio: "Veteran K-12 curriculum and assessment leader. Guides our school-level AI strategy.", color: "#8b5cf6", tags: ["K-12", "Curriculum", "KVS"] },
  { name: "Dr. Manpreet Manna", role: "Former Director, AICTE (SWAYAM/NEAT)", tagline: "Scaling digital learning across higher education.", bio: "Former VC at Chandigarh University. Advises on national-scale digital learning.", color: "#6366f1", tags: ["AICTE", "Higher Ed", "Policy"] },
  { name: "Dr. Amarendra Behera", role: "Joint Director, NCERT", tagline: "Architecting national-scale digital learning.", bio: "Architect of DIKSHA and national digital learning programs.", color: "#06b6d4", tags: ["NCERT", "DIKSHA", "Policy"] },
];

export const techAdvisors = [
];

export const employees = [
  {
    name: "Md Aman",
    profile: "Technical & Operations Consultant",
    image: "https://www.mdaman.tech/assets/images/logo/logos-circle.png",
    color: "#8b5cf6",
    bio: "Drives technical execution and operational excellence across the platform.",
    socials: {
      portfolio: "https://www.mdaman.tech",
      linkedin: "https://www.linkedin.com/in/mdaman9939/",
      github: "https://github.com/mdaman9939",
      facebook: "https://www.facebook.com/people/Md-Aman/100028050339677/",
      instagram: "https://www.instagram.com/mdaman9939/",
    },
  },
  {
    name: "Sandeep Kumar",
    profile: "Technical & Operations Consultant",
    image: "/sandeep_kumar.jpg",
    imgPosition: "center 18%",
    color: "#6366f1",
    bio: "AI engineering background spanning LLMs, Vision AI, and chatbot development.",
  },
  {
    name: "Keshav Jha",
    profile: "Technical & Operations Consultant",
    image: null,
    color: "#06b6d4",
    bio: "Supports technical delivery and day-to-day platform operations.",
  },
  {
    name: "Chanda Kumari",
    profile: "Android Developer",
    image: null,
    color: "#10b981",
    bio: "Builds and maintains the platform's mobile experiences.",
  },
  {
    name: "Divyansh Maewal",
    profile: "Lead AI Deployment Engineer",
    image: null,
    color: "#ec4899",
    bio: "Leads the rollout and scaling of AI systems into production.",
  },
  {
    name: "Ashweriya Anand",
    profile: "Human Resources Coordinator",
    image: null,
    color: "#f59e0b",
    bio: "Supports talent, people operations, and team well-being.",
  },
];

/* Build initials when no photo is supplied */
export const getInitials = (name) =>
  name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

/* Display cap for taglines in the profile card. Every tagline is currently
   authored well under this (41-64 chars), so nothing is truncated today —
   this exists so a longer one added later can't break the card layout. */
export const TAGLINE_MAX = 160;

/* Truncate on a word boundary and append an ellipsis. Trailing punctuation
   left dangling by the cut is stripped so we don't render "word, …". */
export const truncate = (text, max = TAGLINE_MAX) => {
  if (!text || text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.\-–—]+$/, "") + "…";
};

/* Grouped view used by the Team page. Each group renders as its own
   titled block; empty groups are skipped at render time. */
export const teamGroups = [
  {
    id: "leadership",
    label: "Founders & Core Leadership",
    blurb: "The people setting direction, strategy, and technical vision for Super AI Polaris.",
    members: founders.map((m) => ({ ...m, profile: m.role })),
  },
  {
    id: "advisors",
    label: "Education & Policy Advisors",
    blurb: "National-level education and policy leaders guiding our work across schools and higher education.",
    members: educationAdvisors.map((m) => ({ ...m, profile: m.role })),
  },
  {
    id: "team",
    label: "Team Members",
    blurb: "The talented people building, deploying, and supporting Super AIP every day.",
    members: employees,
  },
];
