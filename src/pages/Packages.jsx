// src/pages/Packages.jsx
import React, { useEffect, useState } from "react";
import {
  Coffee,
  Crown,
  Star,
  Gift,
  Clock,
  CheckCircle,
  XCircle,
  Trophy,
  Diamond,
  Award,
  Truck,
  Users,
} from "lucide-react";

const cateringPackages = [
  {
    id: 1,
    name: "Package 1",
    cups: "100 Cups",
    price: "2,000",
    perCup: "AED 20/cup",
    coldBeverages: false,
    icon: Coffee,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-800",
    popular: false,
    features: [
      "Hot/Cold Coffee",
      "Filter Coffee Service",
      "Professional Staff & Setup",
    ],
  },
  {
    id: 2,
    name: "Package 2",
    cups: "100 Cups",
    price: "2,500",
    perCup: "AED 25/cup",
    coldBeverages: true,
    icon: Star,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-800",
    popular: true,
    features: [
      "Hot/Cold Coffee",
      "Filter Coffee Service",
      "3 Choices of Cold Beverages",
      "Professional Staff & Setup",
    ],
  },
  {
    id: 3,
    name: "Package 3",
    cups: "200 Cups",
    price: "4,000",
    perCup: "AED 20/cup",
    coldBeverages: false,
    icon: Trophy,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-800",
    popular: false,
    features: [
      "Hot/Cold Coffee",
      "Filter Coffee Service",
      "Professional Staff & Setup",
    ],
  },
  {
    id: 4,
    name: "Package 4",
    cups: "200 Cups",
    price: "5,000",
    perCup: "AED 25/cup",
    coldBeverages: true,
    icon: Diamond,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-800",
    popular: true,
    features: [
      "Hot/Cold Coffee",
      "Filter Coffee Service",
      "3 Choices of Cold Beverages",
      "Professional Staff & Setup",
    ],
  },
  {
    id: 5,
    name: "Package 5",
    cups: "300 Cups",
    price: "6,000",
    perCup: "AED 20/cup",
    coldBeverages: false,
    icon: Crown,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-800",
    popular: false,
    features: [
      "Hot/Cold Coffee",
      "Filter Coffee Service",
      "Professional Staff & Setup",
    ],
  },
  {
    id: 6,
    name: "Package 6",
    cups: "300 Cups",
    price: "7,500",
    perCup: "AED 25/cup",
    coldBeverages: true,
    icon: Award,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-800",
    popular: false,
    features: [
      "Hot/Cold Coffee",
      "Filter Coffee Service",
      "3 Choices of Cold Beverages",
      "Professional Staff & Setup",
    ],
  },
];

const comparisonRows = [
  { label: "Cups",             values: ["100", "100", "200", "200", "300", "300"] },
  { label: "Hot/Cold Coffee",  values: [true, true, true, true, true, true] },
  { label: "Filter Coffee",    values: [true, true, true, true, true, true] },
  { label: "3 Cold Beverages", values: [false, true, false, true, false, true] },
  { label: "Price (AED)",      values: ["2,000", "2,500", "4,000", "5,000", "6,000", "7,500"] },
  { label: "Per Cup Rate",     values: ["AED 20", "AED 25", "AED 20", "AED 25", "AED 20", "AED 25"] },
];

function Packages() {
  const [visible, setVisible] = useState({});

  useEffect(() => {
    setVisible((v) => ({ ...v, hero: true }));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            setVisible((v) => ({ ...v, [e.target.id]: true }));
        });
      },
      { threshold: 0.15 }
    );
    ["packages-grid", "comparison", "notes"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-white">

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-amber-950 via-amber-900 to-amber-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-600 rounded-full blur-3xl opacity-10" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-500 rounded-full blur-3xl opacity-10" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 text-center">
          <div
            className={`inline-flex items-center gap-2 bg-white/10 border border-white/20 px-5 py-1.5 rounded-full mb-5 text-amber-300 text-xs tracking-widest transition-all duration-700 ${
              visible.hero ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <Crown size={14} />
            EXCLUSIVE PACKAGES
          </div>

          <h1
            className={`font-serif text-5xl sm:text-6xl md:text-7xl font-bold mb-5 leading-tight transition-all duration-700 delay-100 ${
              visible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Premium Event
            <span className="block text-amber-300">Catering Packages</span>
          </h1>

          <p
            className={`text-amber-100/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${
              visible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Hot/Cold coffee &amp; filter coffee starting at{" "}
            <span className="text-amber-300 font-semibold">AED 20/cup</span> — six
            packages designed for every event size.
          </p>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-5 h-9 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white rounded-full animate-ping" />
          </div>
        </div>
      </section>

      {/* ── Pricing Note ── */}
      <div className="bg-amber-100 border-b border-amber-200 py-3 px-4 text-center">
        <p className="text-amber-800 text-xs sm:text-sm flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span className="flex items-center gap-1">
            <Clock size={13} />
            <strong>Hot/Cold + Filter Coffee</strong> = AED 20/cup
          </span>
          <span className="hidden sm:inline text-amber-400">|</span>
          <span><strong>+ 3 Cold Beverages</strong> = AED 25/cup</span>
          <span className="hidden sm:inline text-amber-400">|</span>
          <span className="flex items-center gap-1">
            <Truck size={13} />
            Transport &amp; Installation: <strong>AED 1,000 extra</strong>
          </span>
        </p>
      </div>

      {/* ── Packages Grid ── */}
      <section id="packages-grid" className="py-20 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">

          <div
            className={`text-center mb-14 transition-all duration-700 ${
              visible["packages-grid"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full mb-4">
              <Gift size={15} className="text-amber-800" />
              <span className="text-amber-800 font-semibold text-xs tracking-wide">
                CHOOSE YOUR PERFECT PLAN
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-amber-900 mb-3">
              Catering Packages
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              All packages include professional setup, service staff, and premium quality ingredients.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {cateringPackages.map((pkg, i) => {
              const Icon = pkg.icon;
              return (
                <div
                  key={pkg.id}
                  className={`relative bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                    pkg.popular ? "ring-2 ring-amber-600" : ""
                  } ${
                    visible["packages-grid"]
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-600 to-orange-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-2xl flex items-center gap-1 z-10">
                      <Star size={11} className="fill-white" />
                      POPULAR
                    </div>
                  )}

                  {/* Card top */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-7 pb-5">
                    <div className={`w-14 h-14 ${pkg.iconBg} rounded-2xl flex items-center justify-center mb-4 shadow-sm`}>
                      <Icon size={26} className={pkg.iconColor} />
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-amber-900 mb-1">
                      {pkg.name}
                    </h3>

                    <div className="inline-flex items-center gap-1.5 bg-white/70 border border-amber-200 px-3 py-1 rounded-full text-xs text-amber-800 font-medium mb-4">
                      <Users size={11} />
                      {pkg.cups}
                    </div>

                    <div className="flex items-baseline gap-1.5 mb-1">
                      <span className="text-xs text-gray-400 font-medium">AED</span>
                      <span className="text-4xl font-bold text-amber-800 font-serif">
                        {pkg.price}
                      </span>
                      <span className="text-xs text-gray-400">+ transport</span>
                    </div>

                    <p className="text-xs text-gray-400">{pkg.perCup}</p>

                    {pkg.coldBeverages && (
                      <div className="mt-3 inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
                        ✦ Includes 3 Cold Beverage Options
                      </div>
                    )}
                  </div>

                  <div className="h-px bg-gray-100" />

                  {/* Card body */}
                  <div className="p-7">
                    <ul className="space-y-2.5 mb-5">
                      {pkg.features.map((f, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle size={15} className="text-green-500 mt-0.5 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                      {!pkg.coldBeverages && (
                        <li className="flex items-start gap-2 text-sm text-gray-300">
                          <XCircle size={15} className="mt-0.5 flex-shrink-0" />
                          Cold Beverages — not included
                        </li>
                      )}
                    </ul>

                    <div className="flex items-center justify-between bg-amber-50 rounded-xl px-4 py-2.5">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Truck size={13} className="text-amber-700" />
                        Transport &amp; Installation
                      </div>
                      <span className="text-sm font-bold text-amber-800">AED 1,000</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section id="comparison" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              visible.comparison ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="font-serif text-4xl sm:text-5xl text-amber-900 mb-3">
              Package Comparison
            </h2>
            <p className="text-gray-500 text-sm">Compare all six packages at a glance</p>
          </div>

          <div
            className={`overflow-x-auto rounded-2xl shadow-sm border border-gray-100 transition-all duration-700 delay-200 ${
              visible.comparison ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <table className="w-full border-collapse text-sm min-w-[640px]">
              <thead>
                <tr className="bg-gradient-to-r from-amber-900 to-amber-800 text-white">
                  <th className="p-4 text-left font-semibold">Feature</th>
                  {cateringPackages.map((pkg) => (
                    <th key={pkg.id} className="p-4 text-center font-semibold">
                      {pkg.name}
                      {pkg.popular && (
                        <span className="block text-[10px] text-amber-300 font-normal mt-0.5">
                          ⭐ Popular
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, ri) => (
                  <tr key={ri} className="border-b border-gray-100 hover:bg-amber-50 transition-colors">
                    <td className="p-4 font-semibold text-gray-700">{row.label}</td>
                    {row.values.map((val, ci) =>
                      typeof val === "boolean" ? (
                        <td key={ci} className="p-4 text-center">
                          {val
                            ? <CheckCircle size={17} className="text-green-500 mx-auto" />
                            : <XCircle size={17} className="text-gray-200 mx-auto" />
                          }
                        </td>
                      ) : (
                        <td key={ci} className="p-4 text-center text-gray-600 font-medium">
                          {val}
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Footer Notes ── */}
      <section id="notes" className="py-12 bg-amber-50 border-t border-amber-100">
        <div
          className={`max-w-2xl mx-auto px-4 text-center space-y-2 transition-all duration-700 ${
            visible.notes ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-gray-500 text-xs">✨ All prices are in AED and inclusive of VAT</p>
          <p className="text-gray-500 text-xs">🍵 Custom packages available for 300+ cups — contact us for special pricing</p>
          <p className="text-gray-500 text-xs">🥐 Croissants &amp; Desserts priced separately based on quantity (no minimum)</p>
        </div>
      </section>

    </div>
  );
}

export default Packages;