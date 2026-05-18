// src/components/Footer.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Heart,
  ChevronUp,
  MessageCircle,
  Headphones
} from "lucide-react";
import { FaTiktok } from "react-icons/fa";

function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const services = [
    "Business Catering",
    "Event Catering",
    "Private Parties",
    "Exhibition Catering",
    "Coffee Setup",
  ];

  // Contact Info
  const contactInfo = {
    email: "Desires.cafe@outlook.com",
    phone: "+971 50 262 5729",
    whatsapp: "+971502625729",
    address: "Baniyas East - Abu Dhabi - United Arab Emirates"
  };

  // Logo URL
  const logoUrl = "https://res.cloudinary.com/dxommxt6d/image/upload/v1779088277/Untitled_design_pvenmx.png";

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hello! I'm interested in Desire's Catering services. Can you please provide more information?");
    window.open(`https://wa.me/${contactInfo.whatsapp}?text=${message}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${contactInfo.phone.replace(/\s/g, '')}`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:${contactInfo.email}`;
  };

  return (
    <footer className="relative bg-gradient-to-br from-amber-950 via-amber-900 to-amber-950 text-white pt-12 sm:pt-20 pb-6 sm:pb-8 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-amber-700/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-40 sm:w-80 h-40 sm:h-80 bg-orange-700/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 pb-8 sm:pb-12 border-b border-amber-700/50">
          
          {/* Brand Section - Logo */}
          <div className="group text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start mb-4 sm:mb-6">
              <div className="bg-white rounded-2xl p-3 inline-block group-hover:scale-105 transition-transform duration-500 shadow-lg">
                <img 
                  src={logoUrl} 
                  alt="Desire's Cafe Logo" 
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain"
                />
              </div>
            </div>
            <p className="text-amber-200/70 text-sm sm:text-base leading-relaxed">
              Premium luxury catering experiences crafted for weddings, corporate events, 
              exhibitions, private parties, and elegant celebrations in Abu Dhabi.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="font-serif text-xl sm:text-2xl font-bold mb-4 sm:mb-6 relative inline-block sm:inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-1/2 sm:left-0 transform -translate-x-1/2 sm:translate-x-0 w-12 h-0.5 bg-amber-400 rounded-full"></span>
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.path} 
                    className="text-amber-200/70 hover:text-amber-300 transition-all hover:translate-x-2 inline-flex items-center gap-2 group text-sm sm:text-base"
                  >
                    <span className="w-1 h-1 bg-amber-400 rounded-full group-hover:scale-150 transition"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div className="text-center sm:text-left">
            <h3 className="font-serif text-xl sm:text-2xl font-bold mb-4 sm:mb-6 relative inline-block sm:inline-block">
              Our Services
              <span className="absolute -bottom-2 left-1/2 sm:left-0 transform -translate-x-1/2 sm:translate-x-0 w-12 h-0.5 bg-amber-400 rounded-full"></span>
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {services.map((service, idx) => (
                <li key={idx}>
                  <Link 
                    to="/services" 
                    className="text-amber-200/70 hover:text-amber-300 transition-all hover:translate-x-2 inline-flex items-center gap-2 group text-sm sm:text-base"
                  >
                    <span className="w-1 h-1 bg-amber-400 rounded-full group-hover:scale-150 transition"></span>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <h3 className="font-serif text-xl sm:text-2xl font-bold mb-4 sm:mb-6 relative inline-block sm:inline-block">
              Get in Touch
              <span className="absolute -bottom-2 left-1/2 sm:left-0 transform -translate-x-1/2 sm:translate-x-0 w-12 h-0.5 bg-amber-400 rounded-full"></span>
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-center justify-center sm:justify-start gap-3 group cursor-pointer hover:translate-x-1 transition">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 mt-0.5 group-hover:scale-110 transition" />
                <span className="text-amber-200/70 text-sm sm:text-base break-words max-w-[250px] sm:max-w-none">
                  {contactInfo.address}
                </span>
              </li>
              <li 
                onClick={handleCall}
                className="flex items-center justify-center sm:justify-start gap-3 group cursor-pointer hover:translate-x-1 transition"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:scale-110 transition" />
                <span className="text-amber-200/70 text-sm sm:text-base hover:text-amber-300 transition">
                  {contactInfo.phone}
                </span>
              </li>
              <li 
                onClick={handleEmail}
                className="flex items-center justify-center sm:justify-start gap-3 group cursor-pointer hover:translate-x-1 transition"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:scale-110 transition" />
                <span className="text-amber-200/70 text-sm sm:text-base hover:text-amber-300 transition break-all">
                  {contactInfo.email}
                </span>
              </li>
              <li 
                onClick={handleWhatsApp}
                className="flex items-center justify-center sm:justify-start gap-3 group cursor-pointer hover:translate-x-1 transition"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 group-hover:scale-110 transition" />
                <span className="text-amber-200/70 text-sm sm:text-base hover:text-green-300 transition">
                  WhatsApp Available
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Opening Hours Section - Properly Formatted */}
        <div className="py-6 sm:py-8 border-b border-amber-700/50">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-amber-400" />
              <h3 className="font-serif text-xl font-bold text-amber-300">Opening Hours</h3>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-8 text-center">
              <div className="bg-amber-800/30 rounded-xl p-3">
                <p className="font-semibold text-amber-300">Monday - Thursday</p>
                <p className="text-white text-lg">6:00 AM - 7:00 PM</p>
              </div>
              <div className="bg-amber-800/30 rounded-xl p-3">
                <p className="font-semibold text-amber-300">Friday</p>
                <p className="text-white text-lg">6:00 AM - 12:00 PM</p>
              </div>
              <div className="bg-amber-800/30 rounded-xl p-3">
                <p className="font-semibold text-red-400">Saturday - Sunday</p>
                <p className="text-white text-lg">Closed</p>
              </div>
            </div>
            
            {/* ✅ NEW NOTE ADDED HERE */}
            <div className="mt-6 pt-4 border-t border-amber-700/30">
              <div className="flex items-center justify-center gap-2 text-amber-300/80">
                <Headphones size={16} className="text-amber-400" />
                <p className="text-sm sm:text-base">
                  📞 For inquiries & urgent requests - <span className="font-semibold text-amber-300">24/7 Available</span>
                </p>
              </div>
              <p className="text-amber-300/60 text-xs mt-2">
                WhatsApp, Call, or Email us anytime - We're here to help!
              </p>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="py-6 sm:py-8 border-b border-amber-700/50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            <div className="flex gap-3 sm:gap-4">
              <a 
                href="https://www.instagram.com/desires.ad/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-800/50 rounded-full flex items-center justify-center hover:bg-amber-700 transition-all hover:scale-110 hover:rotate-12 duration-300"
              >
                <Instagram size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a 
                href="https://www.tiktok.com/@desires.cafe" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-800/50 rounded-full flex items-center justify-center hover:bg-amber-700 transition-all hover:scale-110 hover:rotate-12 duration-300"
              >
                <FaTiktok size={18} className="sm:w-5 sm:h-5" />
              </a>
              <a 
                href="https://wa.me/971502625729" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600/50 rounded-full flex items-center justify-center hover:bg-green-600 transition-all hover:scale-110 hover:rotate-12 duration-300"
              >
                <MessageCircle size={18} className="sm:w-5 sm:h-5" />
              </a>
            </div>
            <p className="text-amber-300/60 text-xs sm:text-sm flex items-center gap-1">
              Crafted with <Heart size={12} className="text-red-400 animate-pulse" /> for luxury experiences
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-center">
          <p className="text-amber-300/50 text-xs sm:text-sm">
            © 2025 Desire's Specialty Catering. All Rights Reserved.
          </p>
          <p className="text-amber-300/50 text-xs sm:text-sm flex items-center gap-2">
            <span>Premium Catering Services</span>
            <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
            <span>Abu Dhabi</span>
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 w-10 h-10 sm:w-12 sm:h-12 bg-amber-700 hover:bg-amber-600 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 animate-bounce"
        >
          <ChevronUp size={20} className="sm:w-6 sm:h-6 text-white" />
        </button>
      )}
    </footer>
  );
}

export default Footer;