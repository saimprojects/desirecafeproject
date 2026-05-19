// src/pages/Contact.jsx
import React, { useState, useEffect } from "react";
import { 
  MessageCircle, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  User,
  Calendar,
  Users,
  Sparkles,
  Instagram,
  Mail
} from "lucide-react";
import { FaTiktok } from "react-icons/fa";

function Contact() {
  const [visibleSections, setVisibleSections] = useState({});
  
  const [whatsappForm, setWhatsappForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    eventType: "",
    guestCount: "",
    message: ""
  });

  const [whatsappStatus, setWhatsappStatus] = useState({ 
    sending: false, 
    sent: false 
  });

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

    const sections = ["hero", "contact-form", "info"];
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    setWhatsappStatus({ sending: true, sent: false });

    const message = 
      `🌿 NEW INQUIRY FROM DESIRE'S CAFE 🌿\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `📋 CUSTOMER DETAILS\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 Name: ${whatsappForm.name}\n` +
      `📧 Email: ${whatsappForm.email || "Not provided"}\n` +
      `📱 Phone: ${whatsappForm.phone}\n` +
      `📅 Event Date: ${whatsappForm.eventDate || "Not specified"}\n` +
      `🎉 Event Type: ${whatsappForm.eventType || "Not specified"}\n` +
      `👥 Guest Count: ${whatsappForm.guestCount || "Not specified"}\n` +
      `💬 Message: ${whatsappForm.message || "No message"}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Sent from Desire's Cafe Website Contact Form`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/971502625729?text=${encodedMessage}`, '_blank');
    
    setTimeout(() => {
      setWhatsappStatus({ sending: false, sent: true });
      setWhatsappForm({ 
        name: "", email: "", phone: "", 
        eventDate: "", eventType: "", guestCount: "", message: "" 
      });
      setTimeout(() => setWhatsappStatus({ sending: false, sent: false }), 3000);
    }, 500);
  };

  const eventTypes = [
    "Wedding", "Corporate Event", "Birthday Party", 
    "Exhibition", "Private Gathering", "Other"
  ];

  const contactInfo = {
    email: "Desires.cafe@outlook.com",
    phone: "+971 50 262 5729",
    whatsapp: "971502625729",
    address: "Baniyas East - Abu Dhabi - United Arab Emirates",
    hours: "Mon - Sun : 8:00 AM - 11:00 PM"
  };

  // Action handlers
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello! I'm interested in Desire's Catering services. Can you please provide more information?");
    window.open(`https://wa.me/${contactInfo.whatsapp}?text=${message}`, '_blank');
  };

  const handleCallClick = () => {
    window.location.href = `tel:+971502625729`;
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${contactInfo.email}`;
  };

  const handleMapClick = () => {
    window.open(`https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-white">
      
      {/* Hero Section - Slim */}
      <section id="hero" className="relative bg-gradient-to-r from-amber-900 to-amber-800 text-white py-8 sm:py-10 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className={`inline-flex items-center gap-2 bg-amber-700/50 backdrop-blur px-3 sm:px-4 py-1 rounded-full mb-2 sm:mb-3 transition-all duration-700 ${visibleSections.pageLoaded ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
            <Sparkles size={13} />
            <span className="text-xs tracking-wide">GET IN TOUCH</span>
          </div>
          <h1 className={`font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 transition-all duration-700 delay-100 ${visibleSections.pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Let's Start Your{" "}
            <span className="text-amber-300">Journey With Us</span>
          </h1>
          <p className={`text-amber-100 text-sm sm:text-base max-w-xl mx-auto px-4 transition-all duration-700 delay-200 ${visibleSections.pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Have a question or ready to book? Fill the form and we'll respond on WhatsApp within minutes.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* WhatsApp Form */}
        <div id="contact-form" className={`max-w-3xl mx-auto transition-all duration-700 ${visibleSections['contact-form'] ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 sm:p-8 text-white text-center">
              <MessageCircle size={48} className="mx-auto mb-3 sm:mb-4" />
              <h2 className="font-serif text-2xl sm:text-3xl font-bold">WhatsApp Inquiry</h2>
              <p className="text-green-100 text-sm sm:text-base mt-2">Fill the form & we'll respond on WhatsApp within minutes</p>
            </div>
            
            <form onSubmit={handleWhatsAppSubmit} className="p-6 sm:p-8 space-y-5 sm:space-y-6">
              <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <input
                      type="text"
                      required
                      value={whatsappForm.name}
                      onChange={(e) => setWhatsappForm({ ...whatsappForm, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-sm sm:text-base"
                      placeholder="Your full name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <input
                      type="tel"
                      required
                      value={whatsappForm.phone}
                      onChange={(e) => setWhatsappForm({ ...whatsappForm, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-sm sm:text-base"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="email"
                    value={whatsappForm.email}
                    onChange={(e) => setWhatsappForm({ ...whatsappForm, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-sm sm:text-base"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                    Event Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <input
                      type="date"
                      value={whatsappForm.eventDate}
                      onChange={(e) => setWhatsappForm({ ...whatsappForm, eventDate: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-sm sm:text-base"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                    Guest Count
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <input
                      type="number"
                      value={whatsappForm.guestCount}
                      onChange={(e) => setWhatsappForm({ ...whatsappForm, guestCount: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-sm sm:text-base"
                      placeholder="Number of guests"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                  Event Type
                </label>
                <select
                  value={whatsappForm.eventType}
                  onChange={(e) => setWhatsappForm({ ...whatsappForm, eventType: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-sm sm:text-base bg-white"
                >
                  <option value="">Select event type</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                  Your Message
                </label>
                <textarea
                  rows="4"
                  value={whatsappForm.message}
                  onChange={(e) => setWhatsappForm({ ...whatsappForm, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-sm sm:text-base resize-none"
                  placeholder="Tell us about your event requirements..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={whatsappStatus.sending}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 sm:py-4 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 text-sm sm:text-base"
              >
                {whatsappStatus.sending ? (
                  <>Opening WhatsApp...</>
                ) : (
                  <>
                    <Send size={18} className="sm:w-5 sm:h-5" />
                    Send via WhatsApp
                  </>
                )}
              </button>

              {whatsappStatus.sent && (
                <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-xl">
                  <MessageCircle size={18} />
                  <span className="text-sm">Redirecting to WhatsApp...</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Contact Info Cards - All Clickable & Working */}
        <div id="info" className={`mt-16 sm:mt-20 transition-all duration-700 delay-400 ${visibleSections.info ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            
            {/* WhatsApp Card */}
            <div 
              onClick={handleWhatsAppClick}
              className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 group cursor-pointer"
            >
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500 group-hover:scale-110 transition-all duration-300">
                <MessageCircle size={24} className="text-green-600 group-hover:text-white transition" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">WhatsApp Us</h3>
              <p className="text-gray-600 text-sm">+{contactInfo.whatsapp}</p>
              <p className="text-green-600 text-xs mt-2 font-medium">Tap to Chat →</p>
            </div>

            {/* Call Card */}
            <div 
              onClick={handleCallClick}
              className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 group cursor-pointer"
            >
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500 group-hover:scale-110 transition-all duration-300">
                <Phone size={24} className="text-amber-600 group-hover:text-white transition" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Call Us</h3>
              <p className="text-gray-600 text-sm">{contactInfo.phone}</p>
              <p className="text-amber-600 text-xs mt-2 font-medium">Tap to Call →</p>
            </div>

            {/* Email Card */}
            <div 
              onClick={handleEmailClick}
              className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 group cursor-pointer"
            >
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500 group-hover:scale-110 transition-all duration-300">
                <Mail size={24} className="text-amber-600 group-hover:text-white transition" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm break-all">{contactInfo.email}</p>
              <p className="text-amber-600 text-xs mt-2 font-medium">Tap to Email →</p>
            </div>

            {/* Location Card - Opens Google Maps */}
            <div 
              onClick={handleMapClick}
              className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 group cursor-pointer"
            >
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500 group-hover:scale-110 transition-all duration-300">
                <MapPin size={24} className="text-amber-600 group-hover:text-white transition" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Location</h3>
              <p className="text-gray-600 text-sm">{contactInfo.address}</p>
              <p className="text-amber-600 text-xs mt-2 font-medium">Open in Maps →</p>
            </div>
          </div>
        </div>

        {/* Opening Hours */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-md">
            <Clock size={18} className="text-amber-600" />
            <span className="text-gray-700 text-sm sm:text-base">{contactInfo.hours}</span>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-4 text-sm">Follow us on social media</p>
          <div className="flex justify-center gap-4">
            <a 
              href="https://www.instagram.com/desires.ad/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300"
            >
              <Instagram size={20} className="text-pink-600" />
            </a>
            <a 
              href="https://www.tiktok.com/@desires.cafe" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300"
            >
              <FaTiktok size={18} className="text-black" />
            </a>
            <a 
              href={`https://wa.me/${contactInfo.whatsapp}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300"
            >
              <MessageCircle size={20} className="text-green-600" />
            </a>
          </div>
        </div>

        {/* Note */}
        <div className="mt-10 text-center">
          <p className="text-gray-400 text-xs flex items-center justify-center gap-1">
            <Sparkles size={12} />
            We respond to all WhatsApp inquiries within 30 minutes during business hours
            <Sparkles size={12} />
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;