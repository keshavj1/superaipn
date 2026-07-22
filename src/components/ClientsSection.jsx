import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

/* \u2500\u2500\u2500 Partner testimonials \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
   Real, attributable quotes. These replaced three invented ones
   ("Talia Taylor @ Quantum" etc.) that all shared a single stock photo.

   `logo` is a path under public/assets/logos/. Drop the partner logo
   files in that folder and fill the field in; entries without a logo
   render a lettermark tile instead of a broken image, so the section
   works today and improves as artwork arrives. */
const testimonials = [
  {
    text: "The AI teacher training initiative in partnership Super AI Polaris approved by AICTE, has significantly empowered our educators across Delhi Government Schools. Over 1650 teachers have now been trained to integrate artificial intelligence into their teaching methods, thanks to the program's hands-on approach and alignment with NEP 2020. The training not only demystified AI but also equipped our teachers with practical skills to mentor the next generation of innovators. This initiative marks a major milestone in our digital transformation journey.",
    name: "Director of Education",
    role: "Government of NCT of Delhi",
    logo: null, // e.g. "/assets/logos/delhi-gov.png"
    short: "Delhi",
  },
  {
    text: "Our network of schools has leveraged Super AI's AI-integrated ERP and training solutions to upskill teachers, monitor student performance, and streamline admin tasks. Their AI Lab setup and teacher training aligned perfectly with NEP 2020 objectives. We feel future-ready.",
    name: "Founder, EduFuture Schools",
    role: "EduFuture Schools \u2014 Large Private School Chain",
    logo: null,
    short: "EF",
  },
  {
    text: "In our evaluation of Super AI Polaris' AI-integrated Mobile Device Management solution, developed in collaboration with 42 Gears, we were impressed by its intelligent automation capabilities. The AI layer showcased the ability to predict compliance issues, proactively assist with device troubleshooting, and simulate dynamic security enforcement across varied environments. It's a forward-thinking approach to mobile fleet management.",
    name: "Sameer",
    role: "Airtel \u2014 AI-Integrated Mobile Device Management",
    logo: null,
    short: "Airtel",
  },
  {
    text: "We engaged Super AI Polaris for a document intelligence and anomaly detection solution. What impressed us was not just the accuracy, but how intuitive and customizable their AI layer is. The result? 80% reduction in invoice processing time and early fraud alerts.",
    name: "Head of Finance, Multimodal Logistics Inc India",
    role: "Multimodal Logistics Inc India \u2014 Manufacturing & Logistics Firm",
    logo: null,
    short: "MML",
  },
  {
    text: "Partnering with Super AI Polaris enabled us to localize and scale AI solutions rapidly across education and municipal clients in Oman and Bahrain. Their agile development, secure deployment, and multilingual chatbot frameworks helped us deliver exceptional value to our stakeholders.",
    name: "Riaz",
    role: "International Partner (Middle East)",
    logo: null,
    short: "ME",
  },
  {
    text: "With Super AI's NeuraEdge, we've been able to deploy an on-premise AI assistant that handles policy queries, compliance checks, and document processing at lightning speed. The platform's ability to integrate seamlessly with our internal tools while meeting our security and uptime requirements is unmatched.",
    name: "Rajasthan Government",
    role: "State Government Deployment",
    logo: null,
    short: "RJ",
  },
];

export default function ClientsSection() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    // Auto-advancing content is motion the CSS guard cannot reach.
    autoplay: !prefersReducedMotion,
    autoplaySpeed: 4000,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "cubic-bezier(0.16, 1, 0.3, 1)",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  /* Slick renders its shell — dots, arrows, track — even with no slides, so an
     empty data set produced a visibly broken band rather than nothing. */
  if (testimonials.length === 0) return null;

  return (
    <section ref={sectionRef} className="clients-section">
      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <h2 className="section-title mb-3">Testimonials</h2>
          <p className="section-subtitle">What Our Partners Say</p>
        </div>

        {/* Slider */}
        <div
          className={`max-w-4xl mx-auto transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
        >
          <Slider {...settings}>
            {testimonials.map((t) => (
              <div key={t.name || t.company}>
                <div className="testimonial-card testimonial_card11 group relative overflow-hidden bg-[#0A0B10]  hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_40px_-15px_rgba(139,92,246,0.3)] cursor-default">
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">

                    <div className="flex-shrink-0 relative">
                      <div className="absolute -inset-1 bg-gradient-to-tr from-purple-500 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-50 transition duration-500" />
                      {t.logo ? (
                        <img
                          src={t.logo}
                          className="client-img relative transition-transform duration-500 group-hover:scale-105"
                          /* Decorative: the organisation is named in the citation
                             below, so repeating it here is noise for screen readers. */
                          alt=""
                        />
                      ) : (
                        <div className="client-img client-lettermark relative transition-transform duration-500 group-hover:scale-105" aria-hidden="true">
                          {t.short}
                        </div>
                      )}
                    </div>

                    {/* <blockquote>/<cite> so the quote and its attribution are
                        semantically linked. The heading was an <h6> under an
                        <h2>, skipping four levels. */}
                    <div className="text-center md:text-left">
                      <blockquote className="testimonial-text mb-4 transition-colors duration-300 group-hover:text-gray-300">
                        &ldquo;{t.text}&rdquo;
                      </blockquote>
                      <cite className="client-name not-italic block transition-colors duration-300 group-hover:text-heading">
                        {t.name}
                      </cite>
                      <p className="client-role transition-colors duration-300 group-hover:text-purple-400">{t.role}</p>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

      </div>
    </section>
  );
}