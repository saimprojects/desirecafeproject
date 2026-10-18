// @vitest-environment jsdom
import { afterEach, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Menu from "./Menu";
import { useShop } from "../components/ShopContext";
import original from "../../../backend/shop/menu_seed.json";

vi.mock("../components/ShopContext", () => ({ useShop: vi.fn() }));
afterEach(cleanup);
function mount() {
  let id = 0;
  const categories = original.map((group, index) => ({
    id: index + 1,
    key: group.key,
    name: group.name,
    is_addon: group.key === "milkAlt",
    items: group.items.map((item) => ({
      ...item,
      id: ++id,
      available: true,
      allows_milk: group.key === "coffee",
    })),
  }));
  const shop = {
    data: { categories, settings: { is_open: true } },
    count: 0,
    add: vi.fn(),
  };
  useShop.mockReturnValue(shop);
  render(
    <MemoryRouter>
      <Menu />
    </MemoryRouter>,
  );
  return shop;
}
it("shows the original headings and every original item description, including milk alternatives", () => {
  mount();
  expect(
    screen.getByRole("heading", { name: "Desires Café Menu" }),
  ).toBeTruthy();
  for (const group of original) {
    expect(screen.getByRole("heading", { name: group.name })).toBeTruthy();
    for (const item of group.items) {
      expect(screen.getByRole("heading", { name: item.name })).toBeTruthy();
      expect(screen.getByText(item.description)).toBeTruthy();
    }
  }
  expect(
    screen.getByText("All Prices Inclusive VAT | Free WiFi Available"),
  ).toBeTruthy();
});
it("keeps category/search filtering and the floating checkout working in the original layout", () => {
  const shop = mount();
  fireEvent.click(screen.getByRole("button", { name: "Milk Alternative" }));
  expect(screen.getByRole("heading", { name: "Oat Milk" })).toBeTruthy();
  expect(screen.queryByRole("heading", { name: "Espresso" })).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "All" }));
  fireEvent.change(screen.getByLabelText("Search menu"), {
    target: { value: "Espresso" },
  });
  expect(screen.queryByRole("combobox")).toBeNull();
  fireEvent.click(screen.getByRole("button", { name: "Add Espresso to cart" }));
  expect(shop.add).toHaveBeenCalledWith(
    expect.objectContaining({ name: "Espresso" }),
    null,
  );
  expect(
    screen
      .getByRole("link", { name: "Checkout with 0 items" })
      .getAttribute("href"),
  ).toBe("/cart");
});

it("lets customers add every milk alternative directly to the cart", () => {
  const shop = mount();
  for (const name of ["Almond Milk", "Oat Milk", "Coconut Milk"]) {
    fireEvent.click(screen.getByRole("button", {name: `Add ${name} to cart`}));
    expect(shop.add).toHaveBeenCalledWith(expect.objectContaining({name}), null);
  }
});
