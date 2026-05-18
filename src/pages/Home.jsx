// src/pages/Home.jsx
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Coffee, Sparkles, Trophy, Users, Calendar, Star, ChevronRight, Phone, Award, Heart, Gift, Zap, Crown, Check, UtensilsCrossed } from "lucide-react";

function Home() {
  const [visibleSections, setVisibleSections] = useState({});

  useEffect(() => {
    // Page load animation
    setVisibleSections(prev => ({ ...prev, pageLoaded: true }));

    // Intersection Observer for scroll animations
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

    // Observe all sections
    const sections = ["hero", "services", "pricing", "packages", "whyus", "cta"];
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const packages = [
    { id: 1, name: "Silver", cups: 100, type: "Hot/Cold Coffee + Filter Coffee", price: 2000, transport: 1000, total: 3000, popular: false },
    { id: 2, name: "Gold", cups: 100, type: "Hot/Cold Coffee + Filter Coffee + 3 Cold Beverages", price: 2500, transport: 1000, total: 3500, popular: false },
    { id: 3, name: "Platinum", cups: 200, type: "Hot/Cold Coffee + Filter Coffee", price: 4000, transport: 1000, total: 5000, popular: false },
    { id: 4, name: "Diamond", cups: 200, type: "Hot/Cold Coffee + Filter Coffee + 3 Cold Beverages", price: 5000, transport: 1000, total: 6000, popular: true },
    { id: 5, name: "Royal", cups: 300, type: "Hot/Cold Coffee + Filter Coffee", price: 6000, transport: 1000, total: 7000, popular: false },
    { id: 6, name: "Imperial", cups: 300, type: "Hot/Cold Coffee + Filter Coffee + 3 Cold Beverages", price: 7500, transport: 1000, total: 8500, popular: false },
  ];

  const services = [
    { title: "Business & Office Catering", desc: "Meeting customer appointments? We've got your back! Healthy beverages for productive breaks.", icon: <Users size={28} />, delay: 0 },
    { title: "Event Catering", desc: "From coffee to homemade cakes and pastries - the ultimate taste for your guests.", icon: <Calendar size={28} />, delay: 0.1 },
    { title: "Private Customer Catering", desc: "Weddings, birthdays - we turn your ideas into perfection with personalized celebrations.", icon: <Heart size={28} />, delay: 0.2 },
    { title: "Exhibition Catering", desc: "Behind-the-scenes excellence while you focus on your customers and visitors.", icon: <Award size={28} />, delay: 0.3 }
  ];

  return (
    <div className={`transition-all duration-1000 ${visibleSections.pageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Hero Section */}
      <section id="hero" className="min-h-screen bg-gradient-to-br from-[#fef8f0] via-[#fff5e6] to-[#fff0e0] relative overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
            
            {/* Left Side - Animated */}
            <div className={`space-y-6 sm:space-y-8 transition-all duration-700 delay-100 ${visibleSections.hero ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <div className="inline-flex items-center gap-3 bg-amber-100 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full hover:scale-105 transition-transform">
                <Sparkles size={16} className="sm:w-[18px] sm:h-[18px] text-amber-700 animate-pulse" />
                <span className="text-amber-800 font-semibold text-xs sm:text-sm tracking-wide">PREMIUM CATERING SINCE 2010</span>
              </div>
              
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-amber-900 leading-[1.1]">
                Creating Special
                <span className="block text-amber-600 mt-2 relative inline-block">
                  Moments
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
            
            {/* Right Side - Animated */}
            <div className={`relative transition-all duration-700 delay-300 ${visibleSections.hero ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 to-orange-400 rounded-[40px] sm:rounded-[50px] blur-2xl opacity-40 animate-pulse"></div>
              <div className="relative group">
                <img 
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop" 
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

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${visibleSections.services ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full mb-4 hover:scale-105 transition">
              <Coffee size={16} className="sm:w-[18px] sm:h-[18px] text-amber-800" />
              <span className="text-amber-800 font-semibold text-xs sm:text-sm">WE OFFER YOU</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-amber-900 mb-3 sm:mb-4">Premium Services</h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">Tailored solutions for every occasion</p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {services.map((s, i) => (
              <div 
                key={i} 
                className={`group bg-gradient-to-br from-amber-50 to-orange-50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-500 cursor-pointer hover:shadow-2xl hover:-translate-y-2 ${
                  visibleSections.services ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${s.delay}s` }}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-2xl flex items-center justify-center text-amber-800 mb-4 sm:mb-6 group-hover:scale-110 transition-all duration-300 group-hover:rotate-6">
                  {s.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-amber-900 mb-2 sm:mb-3 group-hover:text-amber-700 transition">{s.title}</h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price Guide */}
      <section id="pricing" className="py-12 sm:py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-10 sm:mb-12 transition-all duration-700 ${visibleSections.pricing ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="font-serif text-3xl sm:text-4xl text-amber-900 mb-2 sm:mb-3">Price Guide</h2>
            <p className="text-gray-600 text-sm sm:text-base">Per cup pricing for reference</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            <div className={`bg-white rounded-2xl p-6 sm:p-8 text-center shadow-xl w-64 sm:w-72 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
              visibleSections.pricing ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
            }`} style={{ transitionDelay: "0.2s" }}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee size={28} className="sm:w-8 sm:h-8 text-amber-800" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-amber-800 animate-pulse">20 AED</div>
              <div className="text-gray-700 mt-2 text-sm sm:text-base">Hot/Cold Coffee</div>
              <div className="text-gray-500 text-xs sm:text-sm">+ Filter Coffee</div>
            </div>
            <div className={`bg-white rounded-2xl p-6 sm:p-8 text-center shadow-xl w-64 sm:w-72 relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
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

      {/* Packages Section
      <section id="packages" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${visibleSections.packages ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full mb-4">
              <Trophy size={16} className="sm:w-[18px] sm:h-[18px] text-amber-800" />
              <span className="text-amber-800 font-semibold text-xs sm:text-sm">CATERING PACKAGES</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-amber-900 mb-3 sm:mb-4">Choose Your Package</h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">Complete setup with professional service</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {packages.map((pkg, idx) => (
              <div 
                key={pkg.id}
                className={`relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 ${
                  visibleSections.packages ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 0.1}s` }}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-3 sm:px-5 py-1 sm:py-2 rounded-bl-2xl sm:rounded-bl-3xl text-[10px] sm:text-sm font-bold z-10 animate-pulse">
                    ⭐ MOST POPULAR
                  </div>
                )}
                <div className="p-6 sm:p-8">
                  <div className="text-3xl sm:text-5xl mb-3 sm:mb-4 animate-bounce" style={{ animationDuration: "2s" }}>
                    {pkg.id <= 2 ? "☕" : pkg.id <= 4 ? "💎" : "👑"}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-amber-900 mb-1">{pkg.name}</h3>
                  <div className="text-2xl sm:text-3xl font-bold text-amber-800 mb-3 sm:mb-4">{pkg.cups} Cups</div>
                  <p className="text-gray-600 text-xs sm:text-sm mb-5 sm:mb-6 pb-4 border-b border-gray-200">{pkg.type}</p>
                  
                  <div className="space-y-2 mb-5 sm:mb-6">
                    <div className="flex justify-between text-sm sm:text-base hover:pl-2 transition-all"><span className="text-gray-600">Package:</span><span className="font-bold">{pkg.price} AED</span></div>
                    <div className="flex justify-between text-sm sm:text-base hover:pl-2 transition-all"><span className="text-gray-600">Transport:</span><span className="font-bold">{pkg.transport} AED</span></div>
                    <div className="flex justify-between pt-2 border-t border-gray-200"><span className="font-semibold text-sm sm:text-base">Total:</span><span className="text-xl sm:text-2xl font-bold text-amber-800">{pkg.total} AED</span></div>
                  </div>
                  
                  <Link to="/contact" className="block w-full text-center bg-amber-800 text-white py-2.5 sm:py-3 rounded-xl font-semibold hover:bg-amber-900 transition-all hover:scale-105 text-sm sm:text-base">
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className={`text-center mt-8 sm:mt-12 text-gray-500 text-xs sm:text-sm space-y-1 transition-all duration-700 delay-500 ${visibleSections.packages ? 'opacity-100' : 'opacity-0'}`}>
            <p>✨ For 300+ cups, contact us for special pricing</p>
            <p>🍰 Croissants & Desserts - priced by quantity</p>
          </div>
        </div>
      </section> */}

      {/* Why Choose Us */}
      <section id="whyus" className="py-16 sm:py-24 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className={`transition-all duration-700 ${visibleSections.whyus ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <div className="relative group">
                <img 
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=500&fit=crop" 
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
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Home;