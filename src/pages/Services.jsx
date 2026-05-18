// src/pages/Services.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Coffee, 
  Sparkles, 
  Heart, 
  Users, 
  Calendar, 
  Star, 
  ChevronRight, 
  Phone, 
  Award, 
  Gift, 
  Clock,
  MessageCircle,
  Crown,
  CheckCircle,
  ArrowRight
} from "lucide-react";

function Services() {
  const [visibleSections, setVisibleSections] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [selectedService, setSelectedService] = useState("");

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

    const sections = ["hero", "services-grid", "features", "cta"];
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // WhatsApp Inquiry Function
  const handleWhatsAppInquiry = (serviceTitle) => {
    const phoneNumber = "971502625729";
    const message = encodeURIComponent(
      `Hello! I'm interested in your "${serviceTitle}" service.\n\n` +
      `Please provide me with more information about:\n` +
      `- Available packages and pricing\n` +
      `- Customization options\n` +
      `- Availability for my event\n\n` +
      `Thank you!`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    
    // Show toast notification
    setSelectedService(serviceTitle);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  const services = [
    {
      title: "Corporate Catering",
      desc: "Professional catering experiences for meetings, conferences, and business events. Boost productivity with premium coffee and refreshments.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
      icon: <Users size={32} />,
      features: ["Business Meetings", "Conferences", "Office Parties", "Corporate Events"],
      color: "from-blue-600 to-indigo-600",
      bgColor: "from-blue-50 to-indigo-50",
      delay: 0
    },
    {
      title: "Wedding Catering",
      desc: "Luxury wedding setups crafted with elegance, premium presentation, and unforgettable flavors. Make your special day truly magical.",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop",
      icon: <Heart size={32} />,
      features: ["Wedding Receptions", "Engagement Parties", "Bridal Showers", "Sangeet Nights"],
      color: "from-rose-600 to-pink-600",
      bgColor: "from-rose-50 to-pink-50",
      delay: 0.1
    },
    {
      title: "Coffee Catering",
      desc: "Premium coffee stations with stylish setups for exhibitions and VIP gatherings. Barista-style service with specialty blends.",
      image: "https://res.cloudinary.com/dxommxt6d/image/upload/v1779095873/WhatsApp_Image_2026-05-18_at_2.15.07_PM_r4lt2s.jpg",
      icon: <Coffee size={32} />,
      features: ["Coffee Stations", "Barista Service", "Specialty Blends", "Mobile Setup"],
      color: "from-amber-600 to-orange-600",
      bgColor: "from-amber-50 to-orange-50",
      delay: 0.2
    },
    {
      title: "Private Events",
      desc: "Customized catering services for birthdays, family events, and luxury celebrations. Tailored menus for your personal touch.",
      image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1200&auto=format&fit=crop",
      icon: <Calendar size={32} />,
      features: ["Birthday Parties", "Anniversaries", "Family Gatherings", "Private Dinners"],
      color: "from-purple-600 to-fuchsia-600",
      bgColor: "from-purple-50 to-fuchsia-50",
      delay: 0.3
    },
    {
      title: "Exhibition Catering",
      desc: "Professional catering for exhibitions and trade shows. Keep your guests refreshed while you focus on your business.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200&auto=format&fit=crop",
      icon: <Award size={32} />,
      features: ["Trade Shows", "Exhibitions", "Product Launches", "Business Expos"],
      color: "from-emerald-600 to-teal-600",
      bgColor: "from-emerald-50 to-teal-50",
      delay: 0.4
    },
    {
      title: "VIP Celebrations",
      desc: "Exclusive catering for high-end VIP events, galas, and private soirees. Luxury experience with white-glove service.",
      image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1200&auto=format&fit=crop",
      icon: <Crown size={32} />,
      features: ["Gala Dinners", "VIP Parties", "Luxury Events", "Celebrity Gatherings"],
      color: "from-amber-700 to-yellow-700",
      bgColor: "from-amber-50 to-yellow-50",
      delay: 0.5
    }
  ];

  const whyChooseUs = [
    { text: "10+ Years of Excellence", icon: <Star size={20} /> },
    { text: "500+ Happy Events", icon: <CheckCircle size={20} /> },
    { text: "Premium Quality Ingredients", icon: <Sparkles size={20} /> },
    { text: "Professional Staff", icon: <Users size={20} /> },
    { text: "24/7 Customer Support", icon: <Clock size={20} /> },
    { text: "Customized Menus", icon: <Gift size={20} /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-white">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-2xl flex items-center gap-2 text-sm sm:text-base">
            <MessageCircle size={18} className="sm:w-5 sm:h-5" />
            Opening WhatsApp for {selectedService}...
          </div>
        </div>
      )}

      {/* Hero Section */}
     <section id="hero" className="relative bg-gradient-to-r from-amber-900 to-amber-800 text-white py-20 sm:py-28 overflow-hidden">
  <div className="absolute inset-0 bg-black/20"></div>
  <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-600 rounded-full blur-3xl opacity-20"></div>
  <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-600 rounded-full blur-3xl opacity-20"></div>
  
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
    <div className={`inline-flex items-center gap-2 bg-amber-700/50 backdrop-blur px-4 sm:px-6 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 transition-all duration-700 ${visibleSections.pageLoaded ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
      <Sparkles size={16} className="sm:w-5 sm:h-5" />
      <span className="text-xs sm:text-sm tracking-wide">PREMIUM SERVICES</span>
    </div>
    
    <h1 className={`font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 transition-all duration-700 delay-100 ${visibleSections.pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      Luxury Catering
      <span className="block text-amber-300">Services</span>
    </h1>
    
    {/* Welcome Message Box */}
    <div className={`max-w-4xl mx-auto text-left space-y-5 transition-all duration-700 delay-200 ${visibleSections.pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      
      {/* Welcome Greeting */}
      <div className="bg-white/10 backdrop-blur rounded-2xl p-6 sm:p-8">
        <p className="text-amber-100 text-lg sm:text-xl italic mb-4">
          "Dear Ladies and Gentlemen,
        </p>
        <p className="text-white text-base sm:text-lg leading-relaxed">
          It gives me great pleasure to welcome you to <span className="font-bold text-amber-300">Desire's Specialty Catering</span>.
        </p>
      </div>

      {/* Company Introduction */}
      <div className="space-y-4">
        <p className="text-white text-base sm:text-lg leading-relaxed">
          Desire's Specialty Catering, based in <span className="font-semibold text-amber-300">Abu Dhabi</span>, is your perfect professional catering & events partner in the UAE capital.
        </p>
        
        {/* Bullet Points - What we offer */}
        <div className="grid sm:grid-cols-2 gap-3 mt-4">
          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 hover:bg-white/10 transition">
            <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center">
              <span className="text-amber-300 text-sm font-bold">✓</span>
            </div>
            <span className="text-white text-sm sm:text-base">Top Quality ingredients</span>
          </div>
          
          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 hover:bg-white/10 transition">
            <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center">
              <span className="text-amber-300 text-sm font-bold">✓</span>
            </div>
            <span className="text-white text-sm sm:text-base">Craftsmanship in preparation</span>
          </div>
          
          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 hover:bg-white/10 transition">
            <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center">
              <span className="text-amber-300 text-sm font-bold">✓</span>
            </div>
            <span className="text-white text-sm sm:text-base">Personal service</span>
          </div>
          
          <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 hover:bg-white/10 transition">
            <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center">
              <span className="text-amber-300 text-sm font-bold">✓</span>
            </div>
            <span className="text-white text-sm sm:text-base">Perfect organizational processes</span>
          </div>
        </div>
      </div>

      {/* Customer Focus Highlight */}
      <div className="bg-gradient-to-r from-amber-600/30 to-amber-500/20 rounded-2xl p-5 border-l-4 border-amber-400 mt-4">
        <p className="text-white text-base sm:text-lg leading-relaxed">
          <span className="font-bold text-amber-300">Desire's Specialty Catering</span> focuses on 
          <span className="font-bold text-amber-300"> YOU and your wishes!</span>
        </p>
      </div>

      {/* To the Point */}
      <div className="space-y-3">
        <p className="text-amber-300 font-bold text-xl">
          To the Point:
        </p>
        <p className="text-white text-base sm:text-lg leading-relaxed">
          We have the appropriate <span className="font-bold text-amber-300">know-how</span> to realize your ideas perfectly.
        </p>
      </div>

      {/* Closing Statement */}
      <div className="bg-white/5 rounded-2xl p-5 mt-4">
        <p className="text-white text-base sm:text-lg leading-relaxed italic">
          "I hope you enjoy discovering our <span className="font-bold text-amber-300">First-class products</span>, 
          which we prepare for you with love and creativity."
        </p>
      </div>
    </div>

    {/* Buttons */}
    <div className={`mt-10 sm:mt-12 flex flex-wrap justify-center gap-3 sm:gap-4 transition-all duration-700 delay-300 ${visibleSections.pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      <Link to="/contact" className="bg-white text-amber-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2 text-sm sm:text-base">
        Get Quote <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px]" />
      </Link>
      <Link to="/menu" className="border-2 border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-white hover:text-amber-900 transition-all hover:scale-105 text-sm sm:text-base">
        View Menu
      </Link>
      <Link to="/contact" className="border-2 border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-white hover:text-amber-900 transition-all hover:scale-105 flex items-center gap-2 text-sm sm:text-base">
        <MessageCircle size={16} /> WhatsApp Us
      </Link>
    </div>
  </div>

  {/* Scroll Indicator */}
  <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
    <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center">
      <div className="w-1 h-2 sm:w-1.5 sm:h-3 bg-white rounded-full mt-2 animate-ping"></div>
    </div>
  </div>
</section>

      {/* Services Grid Section */}
      <section id="services-grid" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${visibleSections['services-grid'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full mb-4">
              <Coffee size={16} className="sm:w-[18px] sm:h-[18px] text-amber-800" />
              <span className="text-amber-800 font-semibold text-xs sm:text-sm">WHAT WE OFFER</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-amber-900 mb-3 sm:mb-4">Our Premium Services</h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">Tailored catering solutions for every occasion</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                  visibleSections['services-grid'] ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${service.delay}s` }}
              >
                <div className="relative overflow-hidden h-56 sm:h-64">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-amber-800 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                </div>
                
                <div className="p-6 sm:p-8">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-900 mb-3 group-hover:text-amber-700 transition">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                    {service.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <span key={idx} className="text-xs bg-amber-50 text-amber-800 px-2 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <button 
                    onClick={() => handleWhatsAppInquiry(service.title)}
                    className="w-full bg-gradient-to-r from-amber-800 to-amber-700 text-white py-3 rounded-xl font-semibold hover:from-amber-900 hover:to-amber-800 transition-all hover:scale-105 flex items-center justify-center gap-2 group"
                  >
                    <MessageCircle size={18} />
                    Inquiry Now
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="features" className="py-16 sm:py-24 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className={`transition-all duration-700 ${visibleSections.features ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <div className="inline-flex items-center gap-2 bg-amber-200 px-4 py-2 rounded-full mb-6">
                <Crown size={16} className="sm:w-[18px] sm:h-[18px] text-amber-800" />
                <span className="text-amber-800 font-semibold text-xs sm:text-sm">WHY CHOOSE US</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-amber-900 mb-6">The Desire's Difference</h2>
              <p className="text-gray-700 text-base sm:text-lg mb-8 leading-relaxed">
                We deliver exceptional catering experiences with premium quality, elegant presentation, 
                and flawless service. Our commitment to excellence makes us Abu Dhabi's premier catering partner.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {whyChooseUs.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 group cursor-pointer hover:translate-x-2 transition-all">
                    <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center text-amber-800 group-hover:scale-110 transition">
                      {item.icon}
                    </div>
                    <span className="text-gray-700 text-sm sm:text-base group-hover:text-amber-800 transition">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`relative transition-all duration-700 delay-200 ${visibleSections.features ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 to-orange-400 rounded-3xl blur-2xl opacity-30"></div>
              <img
                src="https://res.cloudinary.com/dxommxt6d/image/upload/v1779095737/WhatsApp_Image_2026-05-18_at_2.10.03_PM_qbzheo.jpg"
                alt="Luxury Catering Setup"
                className="relative rounded-2xl sm:rounded-3xl shadow-2xl w-full h-[300px] sm:h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-8 bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl shadow-xl max-w-[220px] sm:max-w-xs">
                <div className="flex items-center gap-2 mb-2">
                  <Star size={16} className="sm:w-5 sm:h-5 fill-yellow-500 text-yellow-500" />
                  <span className="font-bold text-sm sm:text-base">4.7 ★ Rated</span>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm">"Best catering service in Abu Dhabi!"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-16 sm:py-20 bg-gradient-to-r from-amber-900 to-amber-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-white rounded-full blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-56 sm:w-96 h-56 sm:h-96 bg-white rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: "2s" }}></div>
        
        <div className={`relative max-w-4xl mx-auto text-center px-4 sm:px-6 transition-all duration-700 ${visibleSections.cta ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
          <Gift size={36} className="sm:w-12 sm:h-12 text-white mx-auto mb-4 sm:mb-6 hover:scale-110 transition-transform duration-300 animate-bounce" />
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-3 sm:mb-4">Ready for Premium Service?</h2>
          <p className="text-amber-100 text-base sm:text-lg mb-6 sm:mb-8">Let's discuss your event and create a custom catering solution</p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link to="/contact" className="group bg-white text-amber-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2 text-sm sm:text-base">
              Get Free Quote 
              <ChevronRight size={14} className="sm:w-[18px] sm:h-[18px] group-hover:translate-x-1 transition" />
            </Link>
            <button 
              onClick={() => handleWhatsAppInquiry("Catering Services")}
              className="border-2 border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-white hover:text-amber-900 transition-all hover:scale-105 flex items-center gap-2 text-sm sm:text-base"
            >
              <MessageCircle size={14} className="sm:w-[18px] sm:h-[18px]" />
              WhatsApp Us
            </button>
            <Link to="/menu" className="border-2 border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-white hover:text-amber-900 transition-all hover:scale-105 text-sm sm:text-base">
              Explore Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40">
        <button
          onClick={() => {
            const message = encodeURIComponent("Hello! I'm interested in Desire's Catering services. Can you help me?");
            window.open(`https://wa.me/971502625729?text=${message}`, '_blank');
          }}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 sm:p-4 shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-2 group"
        >
          <MessageCircle size={24} className="sm:w-6 sm:h-6" />
          <span className="hidden sm:inline text-sm font-semibold group-hover:inline">Quick Inquiry</span>
        </button>
      </div>
    </div>
  );
}

export default Services;