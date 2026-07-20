import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function PricingSection() {

    const [yearly, setYearly] = useState(false);

    const pricing = {
        starter: yearly ? 290 : 29,
        pro: yearly ? 790 : 79,
        business: yearly ? 1490 : 149
    };

    return (
        <>
            {/* CSS */}
            <style>
                {`
        .pricing-section{
          background:#050505;
          color:white;
        }

        .toggle-wrapper{
          display:flex;
          align-items:center;
          justify-content:center;
          color:#bbb;
          font-weight:500;
        }

        .toggle-wrapper .active{
          color:white;
        }

        .switch{
          position:relative;
          display:inline-block;
          width:50px;
          height:24px;
        }

        .switch input{
          opacity:0;
          width:0;
          height:0;
        }

        .slider{
          position:absolute;
          cursor:pointer;
          top:0;
          left:0;
          right:0;
          bottom:0;
          background:#444;
          border-radius:30px;
          transition:0.4s;
        }

        .slider:before{
          position:absolute;
          content:"";
          height:18px;
          width:18px;
          left:3px;
          bottom:3px;
          background:white;
          border-radius:50%;
          transition:0.4s;
        }

        input:checked + .slider{
          background:#7c3aed;
        }

        input:checked + .slider:before{
          transform:translateX(26px);
        }

        .pricing-card{
          background:#0b0b0b;
          border:1px solid rgba(255,255,255,0.1);
          border-radius:15px;
          padding:30px;
          transition:0.3s;
        }

        .pricing-card:hover{
          border-color:#7c3aed;
          transform:translateY(-5px);
        }

        .featured{
          border-color:#7c3aed;
          background:linear-gradient(180deg,#1a0933,#000);
        }

        .pricing-btn{
          width:100%;
          background:linear-gradient(90deg,#6d28d9,#9333ea);
          border:none;
          border-radius:8px;
          color:white;
          padding:10px;
        }
           .clients-title{
                            font-size: 48px;
                            font-weight: 700;
                            color: #fff;
                    }
                    .testimonial-text{
                        font-size: 1.3rem;
                        color: #fff;
                    }
                    .client-name{
                            font-size: 1.3rem;
                            color: #fff;
                    }
                    .client-role{
                    font-size: 1.3rem;
                    color: #fff;
                    }
        `}
            </style>

            <section className="pricing-section py-5 text-center">
   <div className="text-center mb-5">
          <h2 className="section-title">Client Testimonials</h2>
          <p className="section-subtitle">
            Hear what our clients say about our platform.
          </p>
        </div>
                <h1 className="mb-3">Pricing</h1>
                <p className="text-secondary">
                    Choose the right plan to meet your needs.
                </p>
                <div className="text-center mb-5">
                    <h1 className="clients-title section-title">Pricing</h1>
                    <p className="clients-subtitle section-subtitle">
                        Choose the right plan to meet your needs.
                    </p>
                    </div>

                {/* Toggle */}
                <div className="toggle-wrapper my-4">

                    <span className={!yearly ? "active" : ""}>Monthly</span>

                    <label className="switch mx-3">
                        <input
                            type="checkbox"
                            checked={yearly}
                            onChange={() => setYearly(!yearly)}
                        />
                        <span className="slider"></span>
                    </label>

                    <span className={yearly ? "active" : ""}>Yearly</span>

                </div>

                {/* Cards */}
                <div className="container">
                    <div className="row g-4">

                        <div className="col-lg-4">
                            <div className="pricing-card">
                                <h3>Starter</h3>
                                <h4>${pricing.starter}/{yearly ? "yr" : "mo"}</h4>
                                <Link to="/Contact#contact-us" className="btn pricing-btn mt-3">
                                    Join waitlist
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="pricing-card featured">
                                <h3>Pro</h3>
                                <h4>${pricing.pro}/{yearly ? "yr" : "mo"}</h4>
                                <Link to="/Contact#contact-us" className="btn pricing-btn mt-3">
                                    Join waitlist
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="pricing-card">
                                <h3>Business</h3>
                                <h4>${pricing.business}/{yearly ? "yr" : "mo"}</h4>
                                <Link to="/Contact#contact-us" className="btn pricing-btn mt-3">
                                    Join waitlist
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>

            </section>
        </>
    );
}