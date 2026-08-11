import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { XCircle, Download } from 'lucide-react';
import { findCertificate } from '../data/certificates';
import '../styles/certificate.css';

/* The last three digits of the certificate number map to its image file,
   e.g. SAP/MSL/IMS/TT1/2026/001 -> /certificates/001.png */
const imageFor = (id) => `/certificates/${id.slice(-3)}.png`;

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
