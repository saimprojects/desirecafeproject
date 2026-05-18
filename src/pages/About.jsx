import React from "react";

function About() {
  return (
    <div className="bg-cream min-h-screen">
      
      {/* Hero Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <p className="uppercase tracking-[0.5em] text-primary text-sm mb-6">
            About Us
          </p>

          <h1 className="font-luxury text-6xl md:text-8xl text-primary leading-tight mb-8">
            Crafted With <br /> Luxury & Elegance
          </h1>

          <p className="text-lg md:text-xl text-darkBrown/70 leading-relaxed max-w-3xl mx-auto">
            Desires Specialty Catering delivers unforgettable luxury catering
            experiences for weddings, corporate events, exhibitions, private
            parties, and premium celebrations across Abu Dhabi.
          </p>
        </div>
      </section>

      {/* Main About Section */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Image */}
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-primary rounded-[40px]"></div>

            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop"
              alt="About Catering"
              className="relative rounded-[40px] shadow-2xl w-full h-[700px] object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <p className="uppercase tracking-[0.4em] text-primary text-sm mb-4">
              Who We Are
            </p>

            <h2 className="font-luxury text-5xl md:text-6xl text-primary leading-tight mb-8">
              Premium Catering For Every Special Occasion
            </h2>

            <p className="text-darkBrown/70 text-lg leading-relaxed mb-6">
              At Desires Specialty Catering, we believe every event deserves
              elegance, perfection, and unforgettable presentation.
            </p>

            <p className="text-darkBrown/70 text-lg leading-relaxed mb-10">
              Our team specializes in luxury catering setups, handcrafted
              desserts, premium coffee stations, and customized event catering
              experiences tailored to every client’s vision.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white p-7 rounded-[30px] shadow-lg">
                <h3 className="font-heading text-2xl text-primary mb-3">
                  Elegant Setup
                </h3>

                <p className="text-darkBrown/70 leading-relaxed">
                  Sophisticated presentation styles for luxury occasions and
                  premium events.
                </p>
              </div>

              <div className="bg-white p-7 rounded-[30px] shadow-lg">
                <h3 className="font-heading text-2xl text-primary mb-3">
                  VIP Service
                </h3>

                <p className="text-darkBrown/70 leading-relaxed">
                  Professional hospitality team delivering exceptional guest
                  experiences.
                </p>
              </div>

              <div className="bg-white p-7 rounded-[30px] shadow-lg">
                <h3 className="font-heading text-2xl text-primary mb-3">
                  Premium Taste
                </h3>

                <p className="text-darkBrown/70 leading-relaxed">
                  Carefully crafted menu selections using high-quality
                  ingredients.
                </p>
              </div>

              <div className="bg-white p-7 rounded-[30px] shadow-lg">
                <h3 className="font-heading text-2xl text-primary mb-3">
                  Custom Events
                </h3>

                <p className="text-darkBrown/70 leading-relaxed">
                  Tailored catering solutions designed for every unique
                  celebration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto bg-darkBrown rounded-[50px] p-12 md:p-20 text-white">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            
            <div>
              <h2 className="font-luxury text-6xl mb-4 text-cream">
                500+
              </h2>

              <p className="uppercase tracking-[0.2em] text-white/70">
                Events Served
              </p>
            </div>

            <div>
              <h2 className="font-luxury text-6xl mb-4 text-cream">
                VIP
              </h2>

              <p className="uppercase tracking-[0.2em] text-white/70">
                Luxury Experience
              </p>
            </div>

            <div>
              <h2 className="font-luxury text-6xl mb-4 text-cream">
                100%
              </h2>

              <p className="uppercase tracking-[0.2em] text-white/70">
                Client Satisfaction
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default About;