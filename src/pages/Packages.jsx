// src/pages/Packages.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Coffee, 
  Sparkles, 
  Crown, 
  Star, 
  ChevronRight, 
  Phone, 
  Gift, 
  Clock,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  Users,
  Calendar,
  Trophy,
  Diamond,
  Heart,
  Award
} from "lucide-react";

function Packages() {
  const [visibleSections, setVisibleSections] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);

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

    const sections = ["hero", "packages-grid", "comparison", "cta"];
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // WhatsApp Booking Function
  const handleWhatsAppBooking = (packageTitle, packagePrice) => {
    const phoneNumber = "971502625729";
    const message = encodeURIComponent(
      `Hello! I'm interested in booking the "${packageTitle}" for my event.\n\n` +
      `Package Details:\n` +
      `📦 Package: ${packageTitle}\n` +
      `💰 Price: ${packagePrice}\n\n` +
      `Please let me know about:\n` +
      `- Availability for my event date\n` +
      `- Customization options\n` +
      `- Deposit requirements\n` +
      `- Setup and service details\n\n` +
      `Thank you!`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    
    setSelectedPackage(packageTitle);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  const cateringPackages = [
    {
      id: 1,
      name: "Silver Package",
      price: "2,000",
      priceFull: "AED 2,000 + Transport",
      originalPrice: "3,000",
      description: "Perfect for small corporate meetings and intimate gatherings",
      features: [
        "100 Cups of Hot/Cold Coffee",
        "Filter Coffee Service",
        "Basic Paper Cups & Napkins",
        "Professional Staff (2 hours)",
        "Standard Setup & Presentation",
        "Basic Dessert Selection"
      ],
      popular: false,
      icon: <Coffee size={32} />,
      color: "from-gray-600 to-gray-700",
      bgColor: "from-gray-50 to-gray-100",
      delay: 0,
      transport: "AED 1,000"
    },
    {
      id: 2,
      name: "Gold Package",
      price: "3,500",
      priceFull: "AED 3,500 + Transport",
      originalPrice: "5,500",
      description: "Ideal for weddings, exhibitions, and medium-sized events",
      features: [
        "100 Cups with 3 Cold Beverage Options",
        "Premium Coffee Blends",
        "Elegant Glassware & Setup",
        "Professional Staff (4 hours)",
        "Luxury Dessert Table",
        "Event Coordination Support",
        "Custom Branding Available"
      ],
      popular: true,
      icon: <Star size={32} />,
      color: "from-amber-600 to-orange-600",
      bgColor: "from-amber-50 to-orange-50",
      delay: 0.1,
      transport: "AED 1,000"
    },
    {
      id: 3,
      name: "Platinum Package",
      price: "5,000",
      priceFull: "AED 5,000 + Transport",
      originalPrice: "7,500",
      description: "Comprehensive catering for large corporate events",
      features: [
        "200 Cups of Hot/Cold Coffee",
        "Premium Filter Coffee",
        "Glassware & Premium Setup",
        "Professional Staff (6 hours)",
        "Gourmet Dessert Selection",
        "Custom Menu Options",
        "VIP Service Area"
      ],
      popular: false,
      icon: <Trophy size={32} />,
      color: "from-blue-600 to-indigo-600",
      bgColor: "from-blue-50 to-indigo-50",
      delay: 0.2,
      transport: "AED 1,000"
    },
    {
      id: 4,
      name: "Diamond Package",
      price: "6,000",
      priceFull: "AED 6,000 + Transport",
      originalPrice: "9,000",
      description: "Premium experience for weddings and VIP events",
      features: [
        "200 Cups with 3 Cold Beverage Options",
        "Signature Coffee Blends",
        "Luxury Glassware & Decor",
        "Professional Staff (8 hours)",
        "Premium Dessert Buffet",
        "Full Event Coordination",
        "Custom Branding & Setup",
        "Photography Setup"
      ],
      popular: true,
      icon: <Diamond size={32} />,
      color: "from-purple-600 to-fuchsia-600",
      bgColor: "from-purple-50 to-fuchsia-50",
      delay: 0.3,
      transport: "AED 1,000"
    },
    {
      id: 5,
      name: "Royal Package",
      price: "7,000",
      priceFull: "AED 7,000 + Transport",
      originalPrice: "10,500",
      description: "Luxury catering for royal and high-profile events",
      features: [
        "300 Cups of Hot/Cold Coffee",
        "Premium Filter Coffee",
        "Royal Glassware & Setup",
        "VIP Professional Staff (10 hours)",
        "Exquisite Dessert Experience",
        "Full Event Management",
        "Custom Theming Available",
        "Live Barista Station"
      ],
      popular: false,
      icon: <Crown size={32} />,
      color: "from-amber-700 to-yellow-700",
      bgColor: "from-amber-50 to-yellow-50",
      delay: 0.4,
      transport: "AED 1,000"
    },
    {
      id: 6,
      name: "Imperial Package",
      price: "8,500",
      priceFull: "AED 8,500 + Transport",
      originalPrice: "12,000",
      description: "Ultimate luxury experience for grand celebrations",
      features: [
        "300 Cups with 3 Cold Beverage Options",
        "World-Class Coffee Selection",
        "Imperial Glassware & Decor",
        "Elite Staff Service (12 hours)",
        "Gourmet Dessert Extravaganza",
        "Complete Event Production",
        "Celebrity Chef Option",
        "VIP Lounge Setup",
        "Social Media Coverage"
      ],
      popular: false,
      icon: <Award size={32} />,
      color: "from-rose-600 to-pink-600",
      bgColor: "from-rose-50 to-pink-50",
      delay: 0.5,
      transport: "AED 1,000"
    }
  ];

  const comparisonFeatures = [
    "Coffee Service",
    "Cold Beverages",
    "Staff Hours",
    "Glassware",
    "Dessert Selection",
    "Event Coordination"
  ];

  const getPackageFeature = (packageId, feature) => {
    const pkg = cateringPackages.find(p => p.id === packageId);
    switch(feature) {
      case "Coffee Service": return pkg.id <= 2 ? "Standard" : "Premium";
      case "Cold Beverages": return pkg.id % 2 === 0 ? "3 Options" : "None";
      case "Staff Hours": 
        return pkg.id === 1 ? "2 hrs" : pkg.id === 2 ? "4 hrs" : pkg.id === 3 ? "6 hrs" : pkg.id === 4 ? "8 hrs" : pkg.id === 5 ? "10 hrs" : "12 hrs";
      case "Glassware": return pkg.id <= 2 ? "Paper Cups" : "Premium Glassware";
      case "Dessert Selection": 
        return pkg.id === 1 ? "Basic" : pkg.id === 2 ? "Luxury" : pkg.id === 3 ? "Gourmet" : "Premium Buffet";
      case "Event Coordination": return pkg.id >= 4 ? "Included" : "Optional";
      default: return "✓";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-white">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-2xl flex items-center gap-2 text-sm sm:text-base">
            <MessageCircle size={18} className="sm:w-5 sm:h-5" />
            Opening WhatsApp for {selectedPackage}...
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
            <Crown size={16} className="sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm tracking-wide">EXCLUSIVE PACKAGES</span>
          </div>
          <h1 className={`font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 transition-all duration-700 delay-100 ${visibleSections.pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Premium Event
            <span className="block text-amber-300">Packages</span>
          </h1>
          <p className={`text-amber-100 text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4 transition-all duration-700 delay-200 ${visibleSections.pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Choose from our luxury catering packages designed for elegant
            celebrations and unforgettable experiences.
          </p>
          <div className={`mt-8 sm:mt-10 flex flex-wrap justify-center gap-3 sm:gap-4 transition-all duration-700 delay-300 ${visibleSections.pageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Link to="/contact" className="bg-white text-amber-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2 text-sm sm:text-base">
              Custom Quote <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px]" />
            </Link>
            <Link to="/menu" className="border-2 border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-white hover:text-amber-900 transition-all hover:scale-105 text-sm sm:text-base">
              View Menu
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

      {/* Price Guide Note */}
      <div className="bg-amber-100 py-3 px-4 text-center">
        <p className="text-amber-800 text-sm sm:text-base flex items-center justify-center gap-2 flex-wrap">
          <Clock size={16} />
          All packages include professional setup, service staff, and premium quality ingredients
          <span className="font-semibold"> | Transport: AED 1,000 additional</span>
        </p>
      </div>

      {/* Packages Grid Section */}
      <section id="packages-grid" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${visibleSections['packages-grid'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full mb-4">
              <Gift size={16} className="sm:w-[18px] sm:h-[18px] text-amber-800" />
              <span className="text-amber-800 font-semibold text-xs sm:text-sm">CHOOSE YOUR PERFECT PLAN</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-amber-900 mb-3 sm:mb-4">Catering Packages</h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">Select the package that best suits your event needs</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {cateringPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`group relative bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 ${
                  visibleSections['packages-grid'] ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-100'
                }`}
                style={{ transitionDelay: `${pkg.delay}s` }}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-bl-2xl sm:rounded-bl-3xl text-[10px] sm:text-xs font-bold z-10 animate-pulse flex items-center gap-1">
                    <Star size={12} className="fill-white" />
                    MOST POPULAR
                  </div>
                )}
                
                <div className={`p-6 sm:p-8 ${pkg.bgColor}`}>
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-amber-800 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md">
                    {pkg.icon}
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-900 mb-2">{pkg.name}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm mb-4">{pkg.description}</p>
                  <div className="mb-4">
                    <span className="text-3xl sm:text-4xl font-bold text-amber-800">{pkg.price}</span>
                    <span className="text-gray-500 text-sm"> AED + Transport</span>
                  </div>
                  <div className="text-sm text-gray-400 line-through">Original: {pkg.originalPrice} AED</div>
                </div>
                
                <div className="p-6 sm:p-8">
                  <div className="space-y-3 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm sm:text-base">
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mb-6 p-3 bg-amber-50 rounded-xl">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Transport & Installation:</span>
                      <span className="font-bold text-amber-800">{pkg.transport}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleWhatsAppBooking(pkg.name, `${pkg.price} AED + Transport`)}
                    className="w-full bg-gradient-to-r from-amber-800 to-amber-700 text-white py-3 rounded-xl font-semibold hover:from-amber-900 hover:to-amber-800 transition-all hover:scale-105 flex items-center justify-center gap-2 group"
                  >
                    <MessageCircle size={18} />
                    Book This Package
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={`text-center mt-8 sm:mt-12 text-gray-500 text-xs sm:text-sm transition-all duration-700 delay-500 ${visibleSections['packages-grid'] ? 'opacity-100' : 'opacity-0'}`}>
            <p>✨ All prices are in AED and inclusive of VAT</p>
            <p>🍰 Custom packages available for 300+ cups - Contact us for special pricing</p>
            <p>🎂 Croissants & Desserts priced separately based on quantity</p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section id="comparison" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${visibleSections.comparison ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-amber-900 mb-4">Package Comparison</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Compare features across our premium packages</p>
          </div>

          <div className={`overflow-x-auto transition-all duration-700 delay-200 ${visibleSections.comparison ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-amber-800 to-amber-700 text-white">
                  <th className="p-3 sm:p-4 text-left rounded-tl-2xl">Features</th>
                  {cateringPackages.map(pkg => (
                    <th key={pkg.id} className="p-3 sm:p-4 text-center">
                      {pkg.name}
                      {pkg.popular && <span className="block text-xs text-amber-200">⭐ Popular</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, idx) => (
                  <tr key={idx} className="border-b border-gray-200 hover:bg-amber-50 transition">
                    <td className="p-3 sm:p-4 font-semibold text-gray-800">{feature}</td>
                    {cateringPackages.map(pkg => (
                      <td key={pkg.id} className="p-3 sm:p-4 text-center text-gray-600">
                        {getPackageFeature(pkg.id, feature)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Custom Package CTA */}
      <section id="cta" className="py-16 sm:py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <div className={`transition-all duration-700 ${visibleSections.cta ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
            <Diamond size={48} className="text-amber-800 mx-auto mb-6 animate-bounce" />
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-amber-900 mb-4">Need a Custom Package?</h2>
            <p className="text-gray-700 text-base sm:text-lg mb-8">
              Don't see what you're looking for? Contact us for a personalized package tailored to your specific requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="bg-amber-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-900 transition-all hover:scale-105 flex items-center gap-2">
                Request Custom Quote <ChevronRight size={18} />
              </Link>
              <button 
                onClick={() => handleWhatsAppBooking("Custom Package", "Custom Pricing")}
                className="border-2 border-amber-800 text-amber-800 px-8 py-3 rounded-full font-semibold hover:bg-amber-800 hover:text-white transition-all hover:scale-105 flex items-center gap-2"
              >
                <MessageCircle size={18} />
                WhatsApp Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40">
        <button
          onClick={() => {
            const message = encodeURIComponent("Hello! I'm interested in Desire's Catering packages. Can you help me choose one?");
            window.open(`https://wa.me/971502625729?text=${message}`, '_blank');
          }}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 sm:p-4 shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-2 group"
        >
          <MessageCircle size={24} className="sm:w-6 sm:h-6" />
          <span className="hidden sm:inline text-sm font-semibold group-hover:inline">Book via WhatsApp</span>
        </button>
      </div>
    </div>
  );
}

export default Packages;