import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { XCircle, Download } from 'lucide-react';
import { findCertificate } from '../data/certificates';
import '../styles/certificate.css';

/* Certificate images are imported (not referenced from /public) so Vite gives
   each one a CONTENT-HASHED filename, e.g. 001-a1b2c3.png. When an image is
   updated, its hash changes, so browsers and the server cache can never serve
   a stale version — the recurring "old image still loads" problem. To replace
   a certificate: drop the new PNG over src/assets/certificates/00X.png and
   rebuild. */
import c001 from '../assets/certificates/001.png';
import c002 from '../assets/certificates/002.png';
import c003 from '../assets/certificates/003.png';
import c004 from '../assets/certificates/004.png';
import c005 from '../assets/certificates/005.png';
import c006 from '../assets/certificates/006.png';
import c007 from '../assets/certificates/007.png';
import c008 from '../assets/certificates/008.png';
import c009 from '../assets/certificates/009.png';

const CERT_IMAGES = {
  '001': c001, '002': c002, '003': c003, '004': c004, '005': c005,
  '006': c006, '007': c007, '008': c008, '009': c009,
};

/* The last three digits of the certificate number pick its hashed image. */
const imageFor = (id) => CERT_IMAGES[id.slice(-3)];

export default function VerifyCertificate() {
  const [params] = useSearchParams();
  const id = params.get('id');
  const cert = findCertificate(id);

  if (!cert) {
    return (
      <div className="cert-page">
        <div className="cert-missing">
          <XCircle size={44} />
          <h1>Certificate not found</h1>
          <p>
            {id ? <>No certificate matches <strong>{id}</strong>.</> : 'No certificate number was provided.'}{' '}
            Please scan the QR code again, or check the number printed on the document.
          </p>
        </div>
      </div>
    );
  }

  const img = imageFor(cert.id);

  return (
    <div className="cert-page">
      <div className="cert-image-wrap">
        <img className="cert-image" src={img} alt={`Certificate of completion for ${cert.name}`} />
      </div>

      <div className="cert-details">
        <div className="cert-detail-row"><span className="k">Certificate No.</span><span className="v">{cert.id}</span></div>
        <div className="cert-detail-row"><span className="k">Status</span><span className="v" style={{ color: '#6ee7b7' }}>Valid &amp; Verified</span></div>
        <div className="cert-detail-row"><span className="k">Recipient</span><span className="v">{cert.name}</span></div>
        <div className="cert-detail-row"><span className="k">Designation</span><span className="v">{cert.department}</span></div>
        <div className="cert-detail-row"><span className="k">Institution</span><span className="v">{cert.institute}</span></div>
        <div className="cert-detail-row"><span className="k">Program</span><span className="v">{cert.program}</span></div>
        <div className="cert-detail-row"><span className="k">Issue Date</span><span className="v">{cert.date}</span></div>
        <div className="cert-detail-row"><span className="k">Validity</span><span className="v">{cert.validity}</span></div>
      </div>

      <a className="cert-download" href={img} download={`Certificate-${cert.name.replace(/\s+/g, '_')}.png`}>
        <Download size={16} /> Download Certificate
      </a>
    </div>
  );
}
