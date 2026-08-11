import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { XCircle, Printer } from 'lucide-react';
import sapLogo from '../assets/super_aip_logo.png';
import { findCertificate } from '../data/certificates';
import '../styles/certificate.css';

const ORIGIN = 'https://www.superaip.com';

/* The public URL a QR encodes for a given certificate. The number contains
   slashes, so it is URL-encoded into the ?id= param. */
const certificateUrl = (id) => `${ORIGIN}/certificate?id=${encodeURIComponent(id)}`;

function CertificateView({ cert }) {
  return (
    <div className="certificate" role="img" aria-label={`Certificate of completion for ${cert.name}`}>
      <div className="cert-corner tr"><span className="c1" /><span className="c2" /><span className="c3" /></div>
      <div className="cert-corner bl"><span className="c1" /><span className="c2" /><span className="c3" /></div>
      <div className="cert-watermark" aria-hidden="true">❧</div>

      <div className="cert-inner">
        <div className="cert-header">
          <div className="cert-ms">
            <div className="cert-ms-grid" aria-hidden="true">
              <span style={{ background: '#F25022' }} />
              <span style={{ background: '#7FBA00' }} />
              <span style={{ background: '#00A4EF' }} />
              <span style={{ background: '#FFB900' }} />
            </div>
            <span className="cert-ms-word">Microsoft</span>
          </div>
          <img className="cert-sap-logo" src={sapLogo} alt="Super AI Polaris" />
        </div>

        <h1 className="cert-title">CERTIFICATE OF COMPLETION</h1>
        <p className="cert-awarded">This certificate is awarded to</p>
        <p className="cert-name">{cert.name}</p>
        <p className="cert-dept">{cert.department}</p>
        <p className="cert-of">of</p>
        <p className="cert-institute">{cert.institute}</p>
        <p className="cert-for">for successfully completing</p>
        <p className="cert-topic">{cert.program}</p>

        <div className="cert-footer">
          <div className="cert-meta">
            <p className="cert-date">Date: {cert.date}</p>
          </div>

          <div className="cert-qr">
            <QRCodeSVG value={certificateUrl(cert.id)} level="M" />
            <small>Scan to open</small>
          </div>

          <div className="cert-sign">
            <div className="cert-sign-line" />
            <p className="cert-sign-name">{cert.signatory}</p>
            <p className="cert-sign-title">{cert.signatoryTitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

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

  return (
    <div className="cert-page">
      <CertificateView cert={cert} />

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

      <button type="button" className="cert-download" onClick={() => window.print()}>
        <Printer size={16} /> Download / Print
      </button>
    </div>
  );
}
