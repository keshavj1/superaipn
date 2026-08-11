/* ────────────────────────────────────────────────────────────────────────
   CERTIFICATE REGISTRY
   Each entry powers the public verification page at  /verify?id=<number>
   A QR printed on the physical certificate encodes that URL, so scanning it
   opens the matching record here.

   TO ADD / EDIT A CERTIFICATE: copy a block below, keep the certificate number
   as the key, and fill in the recipient's real details. Records /002–/009 use
   placeholder names ("Faculty Name 0X") — REPLACE them with the real names.
   ──────────────────────────────────────────────────────────────────────── */

// Fields shared by this Teacher-Training batch (edit once if the batch changes).
const BATCH = {
  type: 'Certificate of Completion',
  department: 'School of Management',
  institute: 'Institute of Management Studies, Noida',
  program: 'Microsoft AI Teacher Training Program',
  date: '03 July 2026',
  signatory: 'Jaydev Rath',
  signatoryTitle: 'CEO, Super AI Polaris',
};

export const CERTIFICATES = {
  'SAP/MSL/IMS/TT1/2026/001': { ...BATCH, name: 'Dr. Girish Kumar' },
  'SAP/MSL/IMS/TT1/2026/002': { ...BATCH, name: 'Faculty Name 02' },
  'SAP/MSL/IMS/TT1/2026/003': { ...BATCH, name: 'Faculty Name 03' },
  'SAP/MSL/IMS/TT1/2026/004': { ...BATCH, name: 'Faculty Name 04' },
  'SAP/MSL/IMS/TT1/2026/005': { ...BATCH, name: 'Faculty Name 05' },
  'SAP/MSL/IMS/TT1/2026/006': { ...BATCH, name: 'Faculty Name 06' },
  'SAP/MSL/IMS/TT1/2026/007': { ...BATCH, name: 'Faculty Name 07' },
  'SAP/MSL/IMS/TT1/2026/008': { ...BATCH, name: 'Faculty Name 08' },
  'SAP/MSL/IMS/TT1/2026/009': { ...BATCH, name: 'Faculty Name 09' },
};

/* Look a certificate up tolerantly: trims whitespace, ignores case, and accepts
   either slashes or dashes between segments (some QR scanners mangle slashes). */
export function findCertificate(rawId) {
  if (!rawId) return null;
  const norm = (s) => s.trim().toUpperCase().replace(/-/g, '/').replace(/\s+/g, '');
  const target = norm(rawId);
  const hit = Object.keys(CERTIFICATES).find((k) => norm(k) === target);
  return hit ? { id: hit, ...CERTIFICATES[hit] } : null;
}
