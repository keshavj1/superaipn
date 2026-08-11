import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { CheckCircle2, XCircle, Printer, Search } from 'lucide-react';
import sapLogo from '../assets/super_aip_logo.png';
import { findCertificate } from '../data/certificates';
import '../styles/certificate.css';

const ORIGIN = 'https://www.superaip.com';

/* Public URL a QR encodes / that this page lives at for a given certificate.
   The number contains slashes, so it is URL-encoded into the ?id= param. */
const verifyUrl = (id) => `${ORIGIN}/verify?id=${encodeURIComponent(id)}`;

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

        <div className="cert-footer">
          <div>
            <p className="cert-date">Date: {cert.date}</p>
            <p className="cert-no">{cert.id}</p>
          </div>

          <div className="cert-qr">
            <QRCodeSVG value={verifyUrl(cert.id)} level="M" />
            <small>Scan to verify</small>
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

function LookupForm({ initial = '' }) {
  const [value, setValue] = useState(initial);
  const [, setParams] = useSearchParams();
  const submit = (e) => {
    e.preventDefault();
    if (value.trim()) setParams({ id: value.trim() });
  };
  return (
    <form className="verify-lookup" onSubmit={submit}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter certificate number, e.g. SAP/MSL/IMS/TT1/2026/001"
        aria-label="Certificate number"
      />
      <button type="submit" className="btn-primary" style={{ background: '#00A4EF', color: '#fff' }}>
        <Search size={16} /> Verify
      </button>
    </form>
  );
}

export default function VerifyCertificate() {
  const [params] = useSearchParams();
  const id = params.get('id');
  const cert = findCertificate(id);

  return (
    <div className="verify-page">
      {cert ? (
        <>
          <div className="verify-status ok">
            <CheckCircle2 size={20} /> Verified — genuine Super AI Polaris certificate
          </div>

          <CertificateView cert={cert} />

          <div className="cert-details">
            <div className="cert-detail-row"><span className="k">Certificate No.</span><span className="v">{cert.id}</span></div>
            <div className="cert-detail-row"><span className="k">Status</span><span className="v" style={{ color: '#6ee7b7' }}>Valid &amp; Verified</span></div>
            <div className="cert-detail-row"><span className="k">Recipient</span><span className="v">{cert.name}</span></div>
            <div className="cert-detail-row"><span className="k">Institution</span><span className="v">{cert.institute}</span></div>
            <div className="cert-detail-row"><span className="k">Program</span><span className="v">{cert.program}</span></div>
            <div className="cert-detail-row"><span className="k">Issue Date</span><span className="v">{cert.date}</span></div>
          </div>

          <div className="verify-actions">
            <button type="button" className="btn-primary" style={{ background: '#00A4EF', color: '#fff' }} onClick={() => window.print()}>
              <Printer size={16} /> Print / Save PDF
            </button>
            <Link to="/verify" className="btn-outline">Verify another</Link>
          </div>
        </>
      ) : (
        <>
          <div className={`verify-status ${id ? 'bad' : 'ok'}`}>
            {id ? <><XCircle size={20} /> Certificate not found</> : <><CheckCircle2 size={20} /> Certificate Verification</>}
          </div>
          <p className="verify-sub">
            {id
              ? <>No certificate matches <strong>{id}</strong>. Please re-check the number exactly as printed, or scan the QR code again.</>
              : 'Enter the certificate number printed on your document (or scan its QR code) to confirm it was issued by Super AI Polaris.'}
          </p>
          <LookupForm initial={id || ''} />
        </>
      )}
    </div>
  );
}
