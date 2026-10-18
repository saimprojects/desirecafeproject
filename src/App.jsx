// src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Packages from "./pages/Packages";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Receipt from "./pages/Receipt";
import Admin from "./pages/Admin";
import { ShopProvider } from "./components/ShopContext";
import "./commerce.css";

// Scroll to Top Hook
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Storefront() {
  return (
    <ShopProvider>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-white">
        <Navbar />
        <ScrollToTop />
        <main className="pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order/:token" element={<Receipt />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ShopProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<Admin />} />
        <Route path="*" element={<Storefront />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
