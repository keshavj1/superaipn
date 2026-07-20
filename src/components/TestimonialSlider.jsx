import React from "react";

export default function TestimonialSlider() {
  return (
    <section className="testimonial-section py-5">

      <div className="container">

        <div className="text-center mb-5">
          <h2 className="section-title">Client Testimonials</h2>
          <p className="section-subtitle">
            Hear what our clients say about our platform.
          </p>
        </div>

        <div
          id="testimonialCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >

          <div className="carousel-inner">

            {/* Slide 1 */}
            <div className="carousel-item active">

              <div className="testimonial-card text-center">

                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  className="client-img"
                  alt=""
                />

                <p className="testimonial-text">
                  "This product has completely transformed how I manage my
                  projects and deadlines."
                </p>

                <h6>Talia Taylor</h6>
                <span>Digital Marketing Director @ Quantum</span>

              </div>

            </div>

            {/* Slide 2 */}
            <div className="carousel-item">

              <div className="testimonial-card text-center">

                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  className="client-img"
                  alt=""
                />

                <p className="testimonial-text">
                  "Our team productivity increased dramatically after using
                  this platform."
                </p>

                <h6>Michael Chen</h6>
                <span>Product Manager @ NovaTech</span>

              </div>

            </div>

            {/* Slide 3 */}
            <div className="carousel-item">

              <div className="testimonial-card text-center">

                <img
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  className="client-img"
                  alt=""
                />

                <p className="testimonial-text">
                  "An incredible solution that simplified our workflows and
                  improved efficiency."
                </p>

                <h6>Sophia Williams</h6>
                <span>Founder @ BrightLabs</span>

              </div>

            </div>

          </div>

          {/* Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#testimonialCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#testimonialCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>

        </div>

      </div>

    </section>
  );
}