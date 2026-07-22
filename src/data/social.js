/* ─── Official Super AIP social profiles ──────────────────────────
   Single source of truth, shared by the footer and the Contact page so
   the two can't drift apart.

   Set a real URL to make that icon appear. Entries left as `null` are
   skipped at render time rather than rendered as links that go nowhere
   — so filling one value in here is all it takes to switch a profile on.

   e.g. linkedin: "https://www.linkedin.com/company/superaip", */
export const SOCIAL_URLS = {
  linkedin: "https://www.linkedin.com/company/super-ai/",
  x: null,
  youtube: null,
  instagram: "https://www.instagram.com/super.aip/",
  github: null,
};

/* True when at least one profile is configured — lets a section hide its
   whole "follow us" block instead of rendering an empty row. */
export const hasAnySocial = () =>
  Object.values(SOCIAL_URLS).some(Boolean);
