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
      price: Number(item?.price || 0) + Number(addon?.price || 0),
      valid: Boolean(
        item?.available &&
        (!line.addon_id ||
          (addon?.available && addon.is_addon && item.allows_milk)),
      ),
    };
  });
  function add(item, addonId) {
    setCart((old) => {
      const index = old.findIndex(
        (x) => x.item_id === item.id && x.addon_id === addonId,
      );
      return index < 0
        ? [...old, { item_id: item.id, addon_id: addonId, quantity: 1 }].slice(
            0,
            50,
          )
        : old.map((x, i) =>
            i === index ? { ...x, quantity: Math.min(50, x.quantity + 1) } : x,
          );
    });
    toast.success(`${item.name} added to cart`);
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
