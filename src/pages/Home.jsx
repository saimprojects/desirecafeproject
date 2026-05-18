// src/pages/Home.jsx
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Coffee, Sparkles, Trophy, Users, Calendar, Star, ChevronRight, Phone, Award, Heart, Gift, Zap, Crown, Check, UtensilsCrossed, Leaf, IceCream, Truck, Briefcase } from "lucide-react";

function Home() {
  const [visibleSections, setVisibleSections] = useState({});

  useEffect(() => {
    setVisibleSections(prev => ({ ...prev, pageLoaded: true }));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.2, triggerOnce: true }
    );

    const sections = ["hero", "introduction", "services", "pricing", "packages", "whyus", "cta"];
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      title: "Specialty Coffee",
      desc: "Hot and cold beverages crafted from premium beans sourced from diverse origins, ensuring a unique experience in every cup.",
      icon: <Coffee size={28} />,
      delay: 0
    },
    {
      title: "Premium Matcha & Teas",
      desc: "A curated selection of premium-grade matcha and teas in various delightful flavors for the discerning palate.",
      icon: <Leaf size={28} />,
      delay: 0.1
    },
    {
      title: "Pastries & Desserts",
      desc: "Indulge in our freshly made pastries and decadent desserts, all prepared with the finest ingredients.",
      icon: <UtensilsCrossed size={28} />,
      delay: 0.2
    },
    {
      title: "Natural Ice Creams",
      desc: "Over 10 flavors of creamy, natural ice creams — including unique options like matcha and Arabic coffee ice cream.",
      icon: <IceCream size={28} />,
      delay: 0.3
    },
    {
      title: "Delivery Services",
      desc: "Enjoy your favorite Desires products wherever you are — home, office, or any location — through top delivery apps.",
      icon: <Truck size={28} />,
      delay: 0.4
    },
    {
      title: "Catering Services",
      desc: "Elevate your events with premium catering solutions. Corporate meetings, weddings, or private gatherings — we make every occasion unforgettable.",
      icon: <Briefcase size={28} />,
      delay: 0.5
    },
  ];

  return (
    <div className={`transition-all duration-1000 ${visibleSections.pageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      


      {/* ── INTRODUCTION SECTION ── */}
      <section id="introduction" className="py-20 sm:py-28 bg-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-50 rounded-full blur-3xl opacity-60 translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left — image collage */}
            <div className={`relative transition-all duration-700 ${visibleSections.introduction ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <div className="absolute -inset-4 bg-gradient-to-br from-amber-200 to-orange-200 rounded-[40px] blur-2xl opacity-30"></div>
              <img
                src="https://res.cloudinary.com/dxommxt6d/image/upload/v1779095742/WhatsApp_Image_2026-05-18_at_2.10.04_PM_1_w2aqt1.jpg"
                alt="Desires Cafe Story"
                className="relative rounded-[30px] sm:rounded-[40px] shadow-2xl w-full h-[300px] sm:h-[420px] object-cover"
              />
              {/* Small floating quote card */}
              <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-amber-800 text-white p-4 sm:p-5 rounded-2xl shadow-2xl max-w-[200px] sm:max-w-xs hover:scale-105 transition-transform duration-300">
                {/* <Coffee size={20} className="mb-2 text-amber-200" /> */}
                <p className="text-xs sm:text-sm font-medium leading-relaxed text-amber-100 italic">
                  "Where Desires Are Brewed."
                </p>
              </div>
            </div>

            {/* Right — story text */}
            <div className={`space-y-6 transition-all duration-700 delay-200 ${visibleSections.introduction ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              <div className="inline-flex items-center gap-2 bg-amber-100 px-4 sm:px-5 py-2 rounded-full hover:scale-105 transition">
                <Sparkles size={16} className="text-amber-700" />
                <span className="text-amber-800 font-semibold text-xs sm:text-sm tracking-wide">OUR STORY</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-amber-900 leading-tight">
                Introduction
              </h2>

              {/* Decorative divider */}
              {/* <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-amber-300 to-transparent"></div>
                <Coffee size={18} className="text-amber-500" />
                <div className="h-px flex-1 bg-gradient-to-l from-amber-300 to-transparent"></div>
              </div> */}

              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                A journey of fulfillment in a world of unfulfilled coffee cravings — that is when Desire's journey began. 
                Home brewing brought true contentment, igniting a flame within.
              </p>

              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                <span className="font-semibold text-amber-800">Desires Specialty Café</span> emerged as a sanctuary 
                where desires find fulfillment. Meticulously crafted sips carry the essence of deep satisfaction. 
              </p>

              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Step into our romantic haven. <span className="font-semibold text-amber-800 italic">Welcome to Desire's Café.</span>
              </p>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 bg-amber-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-amber-900 transition-all hover:shadow-xl hover:scale-105 text-sm sm:text-base"
                >
                  Discover More
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Hero Section */}
      <section id="hero" className="min-h-screen bg-gradient-to-br from-[#fef8f0] via-[#fff5e6] to-[#fff0e0] relative overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
            
            {/* Left Side */}
            <div className={`space-y-6 sm:space-y-8 transition-all duration-700 delay-100 ${visibleSections.hero ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <div className="inline-flex items-center gap-3 bg-amber-100 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full hover:scale-105 transition-transform">
                <Sparkles size={16} className="sm:w-[18px] sm:h-[18px] text-amber-700 animate-pulse" />
                <span className="text-amber-800 font-semibold text-xs sm:text-sm tracking-wide">PREMIUM CATERING SINCE 2021</span>
              </div>
              
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-amber-900 leading-[1.1]">
                Desires Catering
                <span className="block text-amber-600 mt-2 relative inline-block">
                  Services
                  <svg className="absolute -bottom-2 left-0 w-full h-2 sm:h-3 text-amber-300" viewBox="0 0 200 10">
                    <path d="M0 5 Q 50 10, 100 5 T 200 5" stroke="currentColor" fill="none" strokeWidth="3"/>
                  </svg>
                </span>
              </h1>
              
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-xl">
                Experience luxury catering in Abu Dhabi. From intimate gatherings to grand celebrations, 
                we craft unforgettable experiences with exquisite flavors.
              </p>
              
              <div className="flex flex-wrap gap-3 sm:gap-4 pt-4">
                <Link to="/contact" className="group bg-amber-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-amber-900 transition-all hover:shadow-xl hover:scale-105 flex items-center gap-2 text-sm sm:text-base">
                  Make Inquiry 
                  <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px] group-hover:translate-x-1 transition" />
                </Link>
                <Link to="/menu" className="group border-2 border-amber-800 text-amber-800 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-amber-800 hover:text-white transition-all hover:scale-105 flex items-center gap-2 text-sm sm:text-base">
                  <UtensilsCrossed size={16} className="sm:w-[18px] sm:h-[18px]" />
                  View Menu
                </Link>
                <Link to="/services" className="border-2 border-amber-800 text-amber-800 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-amber-800 hover:text-white transition-all hover:scale-105 text-sm sm:text-base">
                  Explore Services
                </Link>
              </div>
              
              <div className="flex gap-8 sm:gap-12 pt-6 sm:pt-8 border-t border-amber-200">
                <div className="group cursor-pointer">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-800 group-hover:scale-110 transition-transform">500+</div>
                  <div className="text-gray-600 text-xs sm:text-sm">Events</div>
                </div>
                <div className="group cursor-pointer">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-800 group-hover:scale-110 transition-transform">50+</div>
                  <div className="text-gray-600 text-xs sm:text-sm">Clients</div>
                </div>
                <div className="group cursor-pointer">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-800 group-hover:scale-110 transition-transform">100%</div>
                  <div className="text-gray-600 text-xs sm:text-sm">Satisfaction</div>
                </div>
              </div>
            </div>
            
            {/* Right Side */}
            <div className={`relative transition-all duration-700 delay-300 ${visibleSections.hero ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 to-orange-400 rounded-[40px] sm:rounded-[50px] blur-2xl opacity-40 animate-pulse"></div>
              <div className="relative group">
                <img 
                  src="https://res.cloudinary.com/dxommxt6d/image/upload/v1779095731/WhatsApp_Image_2026-05-18_at_2.10.03_PM_1_jz2uo8.jpg" 
                  alt="Luxury Coffee"
                  className="relative rounded-[40px] sm:rounded-[50px] shadow-2xl w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-8 bg-white/95 backdrop-blur p-3 sm:p-5 rounded-xl sm:rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 max-w-[200px] sm:max-w-none">
                <div className="flex items-center gap-2 mb-1">
                  <Star size={14} className="sm:w-5 sm:h-5 fill-yellow-500 text-yellow-500 animate-pulse" />
                  <span className="font-bold text-sm sm:text-base">5.0 ★ (150+ reviews)</span>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm">"Best catering in Abu Dhabi!"</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-amber-800 rounded-full flex justify-center">
            <div className="w-1 h-2 sm:w-1.5 sm:h-3 bg-amber-800 rounded-full mt-2 animate-ping"></div>
          </div>
        </div>
      </section>
      {/* ── SERVICES SECTION ── */}
      <section id="services" className="py-16 sm:py-24 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${visibleSections.services ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full mb-4 hover:scale-105 transition">
              <Coffee size={16} className="sm:w-[18px] sm:h-[18px] text-amber-800" />
              <span className="text-amber-800 font-semibold text-xs sm:text-sm">WHAT WE OFFER</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-amber-900 mb-3 sm:mb-4">Our Products & Services</h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
              High-quality offerings designed to satisfy every craving and elevate every occasion
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((s, i) => (
              <div 
                key={i} 
                className={`group bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-500 cursor-pointer hover:shadow-2xl hover:-translate-y-2 ${
                  visibleSections.services ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${s.delay}s` }}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-800 mb-4 sm:mb-6 group-hover:scale-110 group-hover:bg-amber-800 group-hover:text-white transition-all duration-300 group-hover:rotate-6">
                  {s.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-amber-900 mb-2 sm:mb-3 group-hover:text-amber-700 transition">{s.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Extra note */}
          <div className={`mt-10 sm:mt-14 text-center transition-all duration-700 delay-500 ${visibleSections.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <p className="text-gray-500 text-sm sm:text-base italic">
              ✨ We are proud to have served both large and small companies, delivering excellence every step of the way.
            </p>
            <div className="mt-6">
              <Link to="/services" className="group inline-flex items-center gap-2 border-2 border-amber-800 text-amber-800 px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-amber-800 hover:text-white transition-all hover:scale-105 text-sm sm:text-base">
                View All Services
                <ChevronRight size={16} className="group-hover:translate-x-1 transition" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Price Guide */}
      <section id="pricing" className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-10 sm:mb-12 transition-all duration-700 ${visibleSections.pricing ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="font-serif text-3xl sm:text-4xl text-amber-900 mb-2 sm:mb-3">Price Guide</h2>
            <p className="text-gray-600 text-sm sm:text-base">Per cup pricing for reference</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            <div className={`bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 sm:p-8 text-center shadow-xl w-64 sm:w-72 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
              visibleSections.pricing ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
            }`} style={{ transitionDelay: "0.2s" }}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee size={28} className="sm:w-8 sm:h-8 text-amber-800" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-amber-800 animate-pulse">20 AED</div>
              <div className="text-gray-700 mt-2 text-sm sm:text-base">Hot/Cold Coffee</div>
              <div className="text-gray-500 text-xs sm:text-sm">+ Filter Coffee</div>
            </div>
            <div className={`bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 sm:p-8 text-center shadow-xl w-64 sm:w-72 relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
              visibleSections.pricing ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
            }`} style={{ transitionDelay: "0.4s" }}>
              <div className="absolute top-0 right-0 bg-amber-800 text-white px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-sm rounded-bl-2xl animate-pulse">POPULAR</div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap size={28} className="sm:w-8 sm:h-8 text-amber-800" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-amber-800">25 AED</div>
              <div className="text-gray-700 mt-2 text-sm sm:text-base">+ 3 Cold Beverages</div>
              <div className="text-gray-500 text-xs sm:text-sm">Multiple choices</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="whyus" className="py-16 sm:py-24 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className={`transition-all duration-700 ${visibleSections.whyus ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <div className="relative group">
                <img 
                  src="https://res.cloudinary.com/dxommxt6d/image/upload/v1779095744/WhatsApp_Image_2026-05-18_at_2.10.04_PM_a6k2a0.jpg" 
                  alt="Premium Setup"
                  className="rounded-2xl sm:rounded-3xl shadow-2xl w-full h-[280px] sm:h-[350px] lg:h-[450px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
            <div className={`transition-all duration-700 delay-200 ${visibleSections.whyus ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              <div className="inline-flex items-center gap-2 bg-amber-200 px-4 py-2 rounded-full mb-4 sm:mb-6 hover:scale-105 transition">
                <Crown size={16} className="sm:w-[18px] sm:h-[18px] text-amber-800" />
                <span className="text-amber-800 font-semibold text-xs sm:text-sm">WHY CHOOSE US</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-amber-900 mb-4 sm:mb-6">Desire's Specialty Catering</h2>
              <p className="text-gray-700 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                We deliver exceptional catering experiences with premium quality, elegant presentation, and flawless service.
              </p>
              <div className="space-y-3">
                {["Premium quality ingredients", "Professional elegant setup", "Experienced team", "Customized menus", "24/7 support"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group cursor-pointer hover:translate-x-2 transition-all">
                    <Check size={16} className="sm:w-5 sm:h-5 text-amber-800 group-hover:scale-125 transition" />
                    <span className="text-gray-700 text-sm sm:text-base group-hover:text-amber-800 transition">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-16 sm:py-20 bg-gradient-to-r from-amber-900 to-amber-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-white rounded-full blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-56 sm:w-96 h-56 sm:h-96 bg-white rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: "2s" }}></div>
        
        <div className={`relative max-w-4xl mx-auto text-center px-4 sm:px-6 transition-all duration-700 ${visibleSections.cta ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
          <Gift size={36} className="sm:w-12 sm:h-12 text-white mx-auto mb-4 sm:mb-6 hover:scale-110 transition-transform duration-300 animate-bounce" />
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-3 sm:mb-4">Ready for Something Special?</h2>
          <p className="text-amber-100 text-base sm:text-lg mb-6 sm:mb-8">Let's discuss your event and create a custom solution</p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link to="/contact" className="group bg-white text-amber-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2 text-sm sm:text-base">
              Get Free Quote 
              <ChevronRight size={14} className="sm:w-[18px] sm:h-[18px] group-hover:translate-x-1 transition" />
            </Link>
            <Link to="/menu" className="border-2 border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-white hover:text-amber-900 transition-all hover:scale-105 flex items-center gap-2 text-sm sm:text-base">
              <UtensilsCrossed size={14} className="sm:w-[18px] sm:h-[18px]" />
              Explore Menu
            </Link>
            <Link to="/contact" className="border-2 border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-white hover:text-amber-900 transition-all hover:scale-105 flex items-center gap-2 text-sm sm:text-base">
              <Phone size={14} className="sm:w-[18px] sm:h-[18px]" /> Call Us
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Home;