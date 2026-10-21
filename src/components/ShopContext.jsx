import { validProductOption, optionPrice, selectionKey, optionLabel } from "../lib/productOptions";
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePolling } from "../lib/usePolling";
import toast from "react-hot-toast";
const ShopContext = createContext(null);
export const useShop = () => useContext(ShopContext);
function readCart() {
  try {
    const saved = JSON.parse(localStorage.getItem("desires-cart") || "[]");
    return Array.isArray(saved)
      ? saved
          .filter(
            (x) =>
              x && (x.selections === undefined || (Array.isArray(x.selections) && x.selections.every(s => s && typeof s.category === "string" && typeof s.option === "string"))) &&
              Number.isInteger(x.item_id) &&
              Number.isInteger(x.quantity) &&
              x.quantity > 0 &&
              x.quantity <= 50,
          )
          .slice(0, 50)
      : [];
  } catch {
    return [];
  }
}
export function ShopProvider({ children }) {
  const [cart, setCart] = useState(readCart);
  const menu = usePolling("menu/", 3000);
  useEffect(() => {
    try {
      localStorage.setItem("desires-cart", JSON.stringify(cart));
    } catch {
      /* Storage may be disabled. */
    }
  }, [cart]);
  const items = useMemo(
    () =>
      (menu.data?.categories || []).flatMap((g) =>
        g.items.map((i) => ({ ...i, is_addon: g.is_addon })),
      ),
    [menu.data],
  );
  const lines = cart.map((line) => {
    const item = items.find((x) => x.id === line.item_id),
      addon = items.find((x) => x.id === line.addon_id);
    return {
      ...line,
      item,
      addon,
      option_label: optionLabel(line.option, line.selections),
      price: optionPrice(item, line.option, line.selections) + Number(addon?.price || 0),
      valid: Boolean(
        item?.available &&
        validProductOption(item, line.option || "", line.selections) &&
        (!line.addon_id ||
          (addon?.available && addon.is_addon && item.allows_milk)),
      ),
    };
  });
  function add(item, addonId = null, quantity = 1, option = "", selections = []) {
    const existing = cart.find(x => x.item_id === item.id && x.addon_id === addonId && (x.option || "") === option && selectionKey(x.selections) === selectionKey(selections));
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 50 || (existing?.quantity || 0) + quantity > 50) {
      toast.error("Maximum 50 per option. Adjust the quantity in your cart."); return false;
    }
    if (!existing && cart.length >= 50) { toast.error("Your cart is full. Please checkout first."); return false; }
    if (!item.available || !menu.data?.settings?.is_open || menu.error) return false;
    if (!validProductOption(item, option, selections)) { toast.error("Please choose a current option."); return false; }
    setCart(old => {
      const index = old.findIndex(x => x.item_id === item.id && x.addon_id === addonId && (x.option || "") === option && selectionKey(x.selections) === selectionKey(selections));
      return index < 0 ? [...old, {item_id:item.id, addon_id:addonId, quantity, option, selections}]
        : old.map((x,i) => i === index ? {...x, quantity:Math.min(50,x.quantity+quantity)} : x);
    });
    toast.success(`${quantity} × ${item.name}${optionLabel(option, selections) ? ` · ${optionLabel(option, selections)}` : ""} added to cart`);
    return true;
  }
  function quantity(index, value) {
    setCart((old) =>
      old
        .map((x, i) =>
          i === index ? { ...x, quantity: Math.min(50, value) } : x,
        )
        .filter((x) => x.quantity > 0),
    );
  }
  return (
    <ShopContext.Provider
      value={{
        ...menu,
        cart,
        lines,
        add,
        quantity,
        clear: () => setCart([]),
        count: cart.reduce((n, x) => n + x.quantity, 0),
        subtotal:
          lines.reduce(
            (n, x) => n + Math.round(x.price * 100) * x.quantity,
            0,
          ) / 100,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}
