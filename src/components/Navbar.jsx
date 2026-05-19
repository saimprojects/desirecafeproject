// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Services", path: "/services" },
    { name: "Packages", path: "/packages" },
    { name: "Contact", path: "/contact" },
  ];

  // Logo URL
  const logoUrl = "https://res.cloudinary.com/dxommxt6d/image/upload/v1779088277/Untitled_design_pvenmx.png";

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-white/95 backdrop-blur-md shadow-xl py-2" 
            : "bg-gradient-to-r from-amber-50/95 via-orange-50/95 to-amber-50/95 backdrop-blur-sm py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo - Bigger Size */}
            <Link to="/" className="group flex-shrink-0">
              <img 
                src={logoUrl} 
                alt="Desire's Cafe Logo" 
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                    location.pathname === link.path
                      ? "text-amber-800"
                      : "text-gray-700 hover:text-amber-800"
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-800 rounded-full"></span>
                  )}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-800 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/contact"
                className="group relative overflow-hidden bg-gradient-to-r from-amber-800 to-amber-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="relative z-10">Get Quote</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-900 to-amber-800 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-amber-800 hover:text-amber-900 transition-colors z-50"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed top-[88px] left-0 right-0 bg-white/95 backdrop-blur-xl shadow-2xl transition-all duration-500 ease-in-out z-40 ${
            menuOpen 
              ? "opacity-100 translate-y-0 visible" 
              : "opacity-0 -translate-y-full invisible"
          }`}
        >
          <div className="flex flex-col p-6 gap-4 max-h-[80vh] overflow-y-auto">
            {navLinks.map((link, idx) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`relative py-3 text-center text-lg font-semibold transition-all duration-300 transform hover:translate-x-2 ${
                  location.pathname === link.path
                    ? "text-amber-800 bg-amber-50 rounded-xl"
                    : "text-gray-700 hover:text-amber-800"
                }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="bg-gradient-to-r from-amber-800 to-amber-700 text-white text-center py-3 rounded-full font-semibold tracking-wide hover:shadow-lg transition-all transform hover:scale-105 mt-4"
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </header>

      {/* Spacer for fixed navbar */}
      <div className="h-24 sm:h-28"></div>
    </>
  );
}

export default Navbar;