import { CategoryIcon } from "../components/CategoryIcon";
// src/pages/Menu.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useShop } from "../components/ShopContext";
import "../floating-cart.css";
import {
  Coffee,
  Sparkles,
  Star,
  TrendingUp,
  Clock,
  Search,
  Plus,
  ShoppingCart,
} from "lucide-react";

function OrderControls({ item, shop }) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-end gap-3 border-t border-amber-100 pt-4">
      <button
        type="button"
        aria-label={`Add ${item.name} to cart`}
        disabled={
          !item.available || !shop.data?.settings?.is_open || !!shop.error
        }
        onClick={() => shop.add(item, null)}
        className="inline-flex items-center gap-1.5 rounded-full bg-amber-800 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-amber-900 disabled:opacity-50"
      >
        <Plus size={14} />
        {!item.available
          ? "Sold out"
          : !shop.data?.settings?.is_open
            ? "Closed"
            : "Add to cart"}
      </button>
    </div>
  );
}

function Menu() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const shop = useShop();
  const groups = shop.data?.categories || [];
  const menuData = Object.fromEntries(
    groups.map((group) => {
      return [
        group.key,
        {
          icon: <CategoryIcon category={group} size={20} className="sm:w-6 sm:h-6" />,
          color: "from-amber-900 to-stone-800",
          label: group.name,
          items: group.items.map((item) => ({
            ...item,
            category: group.key,
            is_addon: group.is_addon,
          })),
        },
      ];
    }),
  );
  const categories = [
    {
      id: "all",
      name: "All",
      icon: <Sparkles size={18} className="sm:w-5 sm:h-5" />,
    },
    ...groups.map((group) => ({
      id: group.key,
      name: group.name,
      icon: menuData[group.key].icon,
    })),
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
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-white py-8 sm:py-12">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-900 to-amber-800 text-white py-8 sm:py-10 mb-12 sm:mb-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-700/50 backdrop-blur px-3 sm:px-4 py-1 rounded-full mb-2 sm:mb-3">
            <Coffee className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs tracking-wide">SINCE 2023</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
            Desires Café Menu
          </h1>
          <p className="text-amber-100 text-sm sm:text-base max-w-xl mx-auto px-4">
            Crafted with passion, served with love. Discover our signature
            beverages made from the finest ingredients.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-white/10 backdrop-blur px-3 sm:px-4 py-1 sm:py-1.5 rounded-full">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm">All Prices Inclusive VAT</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {shop.error && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            Menu connection interrupted.{" "}
            <button className="underline" onClick={shop.reload}>
              Try again
            </button>
          </div>
        )}
        {!shop.data && !shop.error && (
          <p role="status" className="py-8 text-center text-amber-800">
            Loading menu…
          </p>
        )}
        {shop.data?.settings && !shop.data.settings.is_open && (
          <p className="mb-6 rounded-xl bg-amber-100 p-4 text-sm text-amber-900">
            Ordering is currently closed. You can still browse our menu.
          </p>
        )}
        <Link
          to="/cart"
          className="floating-menu-cart"
          aria-label={`Checkout with ${shop.count} items`}
          title="View cart and checkout"
        >
          <ShoppingCart size={26} />
          <span className="floating-cart-count" aria-live="polite">
            {shop.count}
          </span>
        </Link>
        {/* Search Bar */}
        <div className="mb-8 sm:mb-10">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search your favorite drink..."
              aria-label="Search menu"
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
                    key={item.id}
                    id={`menu-item-${category}-${idx}`}
                    className="menu-item bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 group"
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
                        <p className="text-gray-400 text-xs sm:text-sm">
                          {item.description}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-lg sm:text-xl font-bold text-amber-800">
                          AED {item.price}
                        </div>
                      </div>
                    </div>
                    <OrderControls item={item} shop={shop} />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
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
                    <p className="text-gray-400 text-xs sm:text-sm">
                      {item.description}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-300 mt-1">
                      {menuData[item.category]?.label || item.category}
                    </p>
                  </div>
                  <div className="text-lg sm:text-xl font-bold text-amber-800 shrink-0">
                    AED {item.price}
                  </div>
                </div>
                <OrderControls item={item} shop={shop} />
              </div>
            ))}
          </div>
        )}

        {shop.data && filteredItems.length === 0 && (
          <div className="text-center py-12 sm:py-20">
            <Coffee
              size={48}
              className="sm:w-16 sm:h-16 mx-auto text-gray-300 mb-4"
            />
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
