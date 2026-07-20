import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      "1 AI model deployment",
      "NeuraEduBOT access",
      "Basic analytics dashboard",
      "Community support",
    ],
    featured: false,
  },
  {
    name: "Pro",
    monthlyPrice: 79,
    yearlyPrice: 790,
    features: [
      "5 AI model deployments",
      "NeuraEdge + NeuraEaglei",
      "Advanced analytics & insights",
      "Multilingual support (22+ langs)",
      "Priority support",
      "Offline deployment mode",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: 149,
    yearlyPrice: 1490,
    features: [
      "Unlimited AI deployments",
      "Full product suite access",
      "On-premise sovereign setup",
      "Custom model training",
      "Dedicated account manager",
      "Physical AI & Robotics access",
      "SLA & compliance support",
      "API & SDK integration",
    ],
    featured: false,
  },
];

function PricingCard({ plan, isAnnual, index }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const price = isAnnual ? plan.yearlyPrice : plan.monthlyPrice;
  const period = isAnnual ? "yr" : "mo";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group flex flex-col rounded-2xl p-8 relative z-10 transition-all duration-700 overflow-hidden ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        } ${plan.featured
          ? "border border-purple-500/30 shadow-[0_0_40px_-10px_rgba(139,92,246,0.25)] hover:shadow-[0_0_60px_-10px_rgba(139,92,246,0.5)]"
          : "border border-white/8 hover:border-white/15"
        }`}
      style={{
        background: plan.featured
          ? "linear-gradient(180deg, #0d0320 0%, #05060a 100%)"
          : "#0a0b10",
        transitionDelay: `${index * 150}ms`,
      }}
    >
      {/* Spotlight Hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${plan.featured ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.05)'}, transparent 40%)`,
        }}
      />

      {/* Background grid for featured */}
      {plan.featured && (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] rounded-2xl pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-40 bg-purple-500/8 blur-[50px] rounded-full pointer-events-none" />
        </>
      )}

      <div className="relative z-10 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-xl font-bold">{plan.name}</h3>
          {plan.featured && (
            <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/20 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
              Popular
            </span>
          )}
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black">${price}</span>
          <span className="text-gray-500 text-sm font-medium">/{period}</span>
        </div>
      </div>

      <div className="flex-grow relative z-10">
        <ul className="space-y-3.5 mb-8">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-center text-gray-400 text-sm">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${plan.featured ? "bg-purple-500/15" : "bg-white/5"
                }`}>
                <Check className="w-3 h-3 text-purple-400" />
              </div>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <Link
        to="/Contact#contact-us"
        className={`relative z-10 block w-full py-3.5 px-4 rounded-xl font-semibold text-sm text-center transition-all duration-300 hover:-translate-y-0.5 overflow-hidden group/btn ${plan.featured
          ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.25)]"
          : "border border-white/10 bg-white/3 hover:bg-white/8 text-white"
          }`}
      >
        <span className="relative z-10">Join waitlist</span>
        {plan.featured && (
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" style={{ backgroundSize: "200% auto", animation: "shimmer 2s linear infinite" }} />
        )}
      </Link>
    </div>
  );
}

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeaderVisible(true);
      },
      { threshold: 0.3 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#05060a] text-white py-24 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-900/8 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <h2 className="section-title mb-4">Pricing</h2>
          <p className="section-subtitle mb-10">
            Choose the right plan to power your AI transformation.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium transition-colors duration-300 ${!isAnnual ? "text-white" : "text-gray-500"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none ${isAnnual ? "bg-purple-600" : "bg-white/15"
                }`}
              aria-label="Toggle annual pricing"
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 shadow-sm ${isAnnual ? "translate-x-6" : "translate-x-1"
                  }`}
              />
            </button>
            <span className={`text-sm font-medium transition-colors duration-300 ${isAnnual ? "text-white" : "text-gray-500"}`}>
              Annual
              <span className="ml-2 text-[11px] text-purple-400 font-bold">SAVE 20%</span>
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} isAnnual={isAnnual} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
