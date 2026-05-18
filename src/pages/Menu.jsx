// src/pages/Menu.jsx
import React, { useState, useEffect } from "react";
import {
  Coffee,
  CupSoda,
  GlassWater,
  IceCream,
  Milk,
  Sparkles,
  Star,
  TrendingUp,
  Clock,
  Search,
  Droplets,
} from "lucide-react";

function Menu() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleItems, setVisibleItems] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, triggerOnce: true }
    );

    document.querySelectorAll(".menu-item").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const menuData = {
    coffee: {
      icon: <Coffee size={20} className="sm:w-6 sm:h-6" />,
      color: "from-amber-900 to-stone-800",
      bgColor: "from-amber-50 to-orange-50",
      label: "Coffee",
      items: [
        { name: "Espresso",               price: "14.75", popular: true,  description: "Strong & bold shot of pure coffee" },
        { name: "Salted Caramel Latte",   price: "26.25", popular: true,  description: "Smooth latte with salted caramel" },
        { name: "Latte",                  price: "20.00", popular: false, description: "Creamy steamed milk with espresso" },
        { name: "Americano / Long Black", price: "15.75", popular: false, description: "Espresso with hot water" },
        { name: "Piccolo",                price: "17.85", popular: false, description: "Small but mighty milk coffee" },
        { name: "Cortado",                price: "17.85", popular: false, description: "Equal parts espresso & steamed milk" },
        { name: "Flat White",             price: "20.00", popular: false, description: "Smooth micro-foam coffee" },
        { name: "Cappuccino",             price: "20.00", popular: false, description: "Perfect balance of coffee & foam" },
        { name: "Spanish Cortado",        price: "23.10", popular: false, description: "Sweetened condensed milk cortado" },
        { name: "Spanish Latte",          price: "25.20", popular: false, description: "Sweet & creamy Spanish style" },
        { name: "Matcha Latte",           price: "26.26", popular: true,  description: "Premium Japanese matcha" },
        { name: "Cloud Matcha latte",     price: "28.35", popular: false, description: "Fluffy matcha with cloud foam" },
        { name: "Coffee of the Day",      price: "14.75", popular: false, description: "Freshly brewed daily selection" },
        { name: "Desires Signature",      price: "23.10", popular: true,  description: "Our secret house special blend" },
      ],
    },

    nonCoffee: {
      icon: <CupSoda size={20} className="sm:w-6 sm:h-6" />,
      color: "from-amber-900 to-stone-800",
      bgColor: "from-emerald-50 to-teal-50",
      label: "Non-Coffee",
      items: [
        { name: "Desires Hisbiscus",    price: "18.90", popular: true,  description: "Refreshing hibiscus flower drink" },
        { name: "Strawberry Kiwi",      price: "23.10", popular: false, description: "Sweet & tangy fruit fusion" },
        { name: "Passion Fruit Mojito", price: "29.40", popular: true,  description: "Tropical passion fruit delight" },
        { name: "Blue Lagon Mojito",    price: "29.40", popular: false, description: "Citrusy blue refreshment" },
        { name: "Strawberry Mojito",    price: "29.40", popular: false, description: "Classic strawberry mojito" },
      ],
    },

    smoothies: {
      icon: <GlassWater size={20} className="sm:w-6 sm:h-6" />,
      color: "from-amber-900 to-stone-800",
      bgColor: "from-rose-50 to-pink-50",
      label: "Smoothies",
      items: [
        { name: "Blissfully Blue",  price: "25.20", popular: false, description: "Refreshing blue blend smoothie" },
        { name: "Pink Dragon",      price: "25.20", popular: true,  description: "Dragon fruit pink smoothie" },
        { name: "Energy Booster",   price: "25.20", popular: false, description: "Energizing power smoothie" },
        { name: "Rasberry Love",    price: "25.20", popular: false, description: "Raspberry flavoured smoothie" },
        { name: "Beat The Heat",    price: "25.20", popular: false, description: "Cool & refreshing summer blend" },
        { name: "Acai Smoothie",    price: "27.50", popular: true,  description: "Antioxidant rich acai blend" },
      ],
    },

    frappe: {
      icon: <IceCream size={20} className="sm:w-6 sm:h-6" />,
      color: "from-amber-900 to-stone-800",
      bgColor: "from-purple-50 to-indigo-50",
      label: "Frappe",
      items: [
        { name: "Cookies & Cream", price: "23.10", popular: false, description: "Oreo cookie frozen frappe" },
        { name: "Mango Frappe",    price: "23.10", popular: false, description: "Tropical mango frozen blend" },
        { name: "Desires Frappe",  price: "25.20", popular: true,  description: "Signature house frappe" },
        { name: "Protein Shake",   price: "29.40", popular: false, description: "Post-workout protein boost" },
      ],
    },

    iceCream: {
      icon: <IceCream size={20} className="sm:w-6 sm:h-6" />,
      color: "from-amber-900 to-stone-800",
      bgColor: "from-sky-50 to-blue-50",
      label: "Ice Cream",
      items: [
        { name: "Halwa Omania",     price: "17.85", popular: true,  description: "Traditional Omani halwa flavour" },
        { name: "Vanila",           price: "15.75", popular: false, description: "Classic vanilla bean" },
        { name: "Salted Caramel",   price: "15.75", popular: true,  description: "Sweet & salty caramel" },
        { name: "Roasted Pistacio", price: "17.85", popular: false, description: "Toasted pistachio flavor" },
        { name: "Watermelon Sorbet",price: "15.75", popular: false, description: "Refreshing dairy-free sorbet" },
        { name: "Tripple Choclate", price: "15.75", popular: false, description: "Chocolate lovers dream" },
        { name: "Strawbery Sorbet", price: "15.75", popular: false, description: "Fresh strawberry sorbet" },
        { name: "Arabic Coffee",    price: "15.75", popular: false, description: "Traditional Arabic coffee flavor" },
      ],
    },

    specialtyTea: {
      icon: <CupSoda size={20} className="sm:w-6 sm:h-6" />,
      color: "from-amber-900 to-stone-800",
      bgColor: "from-amber-50 to-yellow-50",
      label: "Specialty Tea",
      items: [
        { name: "Arabian Night",        price: "18.90", popular: true,  description: "Exotic Arabian blend" },
        { name: "English Breakfast Tea",price: "18.90", popular: false, description: "Classic morning tea" },
        { name: "Rooi Boster",          price: "18.90", popular: false, description: "Energizing herbal blend" },
        { name: "Jasmine",              price: "18.90", popular: false, description: "Fragrant jasmine green tea" },
        { name: "Chamamile",            price: "18.90", popular: false, description: "Calming bedtime tea" },
      ],
    },

    filterCoffee: {
      icon: <Droplets size={20} className="sm:w-6 sm:h-6" />,
      color: "from-amber-900 to-stone-800",
      bgColor: "from-stone-50 to-zinc-50",
      label: "Filter Coffee",
      items: [
        { name: "V60",       price: "25.20", popular: true,  description: "Pour-over V60 brewed coffee" },
        { name: "Cold Brew", price: "26.20", popular: true,  description: "Slow-steeped cold brew coffee" },
        { name: "Chemix",    price: "25.20", popular: false, description: "Chemex brewed filter coffee" },
      ],
    },

    milkAlt: {
      icon: <Milk size={20} className="sm:w-6 sm:h-6" />,
      color: "from-amber-900 to-stone-800",
      bgColor: "from-neutral-50 to-stone-50",
      label: "Milk Alternative",
      items: [
        { name: "Almond Milk",  price: "4.00", popular: true,  description: "Nutty dairy alternative (Add to any drink)" },
        { name: "Oat Milk",     price: "4.00", popular: true,  description: "Creamy oat alternative (Add to any drink)" },
        { name: "Coconut Milk", price: "4.00", popular: false, description: "Tropical coconut alternative (Add to any drink)" },
      ],
    },
  };

  const categories = [
    { id: "all",          name: "All",              icon: <Sparkles  size={18} className="sm:w-5 sm:h-5" /> },
    { id: "coffee",       name: "Coffee",           icon: <Coffee    size={18} className="sm:w-5 sm:h-5" /> },
    { id: "nonCoffee",    name: "Non-Coffee",       icon: <CupSoda   size={18} className="sm:w-5 sm:h-5" /> },
    { id: "smoothies",    name: "Smoothies",        icon: <GlassWater size={18} className="sm:w-5 sm:h-5" /> },
    { id: "frappe",       name: "Frappe",           icon: <IceCream  size={18} className="sm:w-5 sm:h-5" /> },
    { id: "iceCream",     name: "Ice Cream",        icon: <IceCream  size={18} className="sm:w-5 sm:h-5" /> },
    { id: "specialtyTea", name: "Specialty Tea",    icon: <CupSoda   size={18} className="sm:w-5 sm:h-5" /> },
    { id: "filterCoffee", name: "Filter Coffee",    icon: <Droplets  size={18} className="sm:w-5 sm:h-5" /> },
    { id: "milkAlt",      name: "Milk Alternative", icon: <Milk      size={18} className="sm:w-5 sm:h-5" /> },
  ];

  const getAllItems = () => {
    let allItems = [];
    Object.keys(menuData).forEach((category) => {
      menuData[category].items.forEach((item) => {
        allItems.push({ ...item, category });
      });
    });
    return allItems;
  };

  const getFilteredItems = () => {
    if (activeCategory === "all") return getAllItems();
    return menuData[activeCategory]?.items || [];
  };

  const filteredItems = getFilteredItems().filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-white py-8 sm:py-12">

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-900 to-amber-800 text-white py-8 sm:py-10 mb-12 sm:mb-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-700/50 backdrop-blur px-3 sm:px-4 py-1 rounded-full mb-2 sm:mb-3">
            <Coffee className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs tracking-wide">SINCE 2010</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
            Desires Café Menu
          </h1>
          <p className="text-amber-100 text-sm sm:text-base max-w-xl mx-auto px-4">
            Crafted with passion, served with love. Discover our signature beverages
            made from the finest ingredients.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-white/10 backdrop-blur px-3 sm:px-4 py-1 sm:py-1.5 rounded-full">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm">All Prices Inclusive VAT</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Search Bar */}
        <div className="mb-8 sm:mb-10">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search your favorite drink..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 rounded-full bg-white shadow-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-gray-700 placeholder-gray-400 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="overflow-x-auto pb-4 mb-8 sm:mb-12 -mx-4 px-4">
          <div className="flex gap-2 sm:gap-3 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${
                  activeCategory === cat.id
                    ? "bg-amber-800 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-amber-100 hover:scale-105"
                }`}
              >
                {cat.icon}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        {!searchTerm && activeCategory === "all" ? (
          Object.keys(menuData).map((category) => (
            <div key={category} className="mb-12 sm:mb-16">
              <div
                className={`bg-gradient-to-r ${menuData[category].color} text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-xl`}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                    {menuData[category].icon}
                  </div>
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold">
                      {menuData[category].label}
                    </h2>
                    <p className="text-amber-100 text-xs sm:text-sm mt-0.5 sm:mt-1">
                      {menuData[category].items.length} delicious items
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {menuData[category].items.map((item, idx) => (
                  <div
                    key={idx}
                    id={`menu-item-${category}-${idx}`}
                    className={`menu-item bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 group ${
                      visibleItems[`menu-item-${category}-${idx}`]
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${idx * 0.05}s` }}
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-amber-800 transition">
                            {item.name}
                          </h3>
                          {item.popular && (
                            <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full">
                              <Star size={10} className="fill-amber-500" />
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-xs sm:text-sm">{item.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-lg sm:text-xl font-bold text-amber-800">
                          AED {item.price}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-amber-800 transition">
                        {item.name}
                      </h3>
                      {item.popular && (
                        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full">
                          <Star size={10} className="fill-amber-500" />
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm">{item.description}</p>
                    <p className="text-[10px] sm:text-xs text-gray-300 mt-1">
                      {menuData[item.category]?.label || item.category}
                    </p>
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-amber-800 shrink-0">
                    AED {item.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="text-center py-12 sm:py-20">
            <Coffee size={48} className="sm:w-16 sm:h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-base sm:text-lg">
              No items found. Try searching something else!
            </p>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-12 sm:mt-16 text-center py-6 sm:py-8 border-t border-amber-200">
          <p className="text-gray-400 text-xs sm:text-sm flex items-center justify-center gap-2">
            <TrendingUp size={14} className="sm:w-4 sm:h-4" />
            All Prices Inclusive VAT | Free WiFi Available
          </p>
        </div>
      </div>
    </div>
  );
}

export default Menu;