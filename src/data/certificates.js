/* ────────────────────────────────────────────────────────────────────────
   CERTIFICATE REGISTRY
   Each entry powers the certificate page at  /certificate?id=<number>
   A QR printed on the physical certificate encodes that URL, so scanning it
   opens the matching record here.

   TO EDIT: keep the certificate number as the key and change the person's
   details. Fields shared by the whole batch live in BATCH below.
   ──────────────────────────────────────────────────────────────────────── */

// Fields shared by this Faculty Development Program batch.
const BATCH = {
  type: 'Certificate of Completion',
  institute: 'Institute of Management Studies, Noida',
  program: 'FDP: AI Innovation and Digital Skills',
  date: '10 August 2026',
  validity: '10 Years',
  signatory: 'Jaydev Rath',
  signatoryTitle: 'CEO, Super AI Polaris',
};

export const CERTIFICATES = {
  'SAP/MSL/IMS/TT1/2026/001': { ...BATCH, name: 'Prof. Dr. Ajay Gupta',   department: 'Head of Department' },
  'SAP/MSL/IMS/TT1/2026/002': { ...BATCH, name: 'Dr. Anita Pati Mishra',  department: 'School of Information Technology (SOIT)' },
  'SAP/MSL/IMS/TT1/2026/003': { ...BATCH, name: 'Shaili Nigam',           department: 'School of Information Technology (SOIT)' },
  'SAP/MSL/IMS/TT1/2026/004': { ...BATCH, name: 'Vyas Kumar Yadav',       department: 'Assistant Professor, Law' },
  'SAP/MSL/IMS/TT1/2026/005': { ...BATCH, name: 'Dr. Rashi Garg',         department: 'School of Management' },
  'SAP/MSL/IMS/TT1/2026/006': { ...BATCH, name: 'Dr. Laveena Pareek',     department: 'Master of Business Administration (MBA)' },
  'SAP/MSL/IMS/TT1/2026/007': { ...BATCH, name: 'Anjali Pandey',          department: 'Information Technology' },
  'SAP/MSL/IMS/TT1/2026/008': { ...BATCH, name: 'Anushrav Mudgal',        department: 'Information Technology' },
  'SAP/MSL/IMS/TT1/2026/009': { ...BATCH, name: 'Dr. Girish Kumar',       department: 'School of Management' },
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
