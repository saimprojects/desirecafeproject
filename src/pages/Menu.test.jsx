// @vitest-environment jsdom
import { beforeEach, afterEach, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Menu from "./Menu";
import { useShop } from "../components/ShopContext";
import original from "../../../backend/shop/menu_seed.json";

vi.mock("../components/ShopContext", () => ({ useShop: vi.fn() }));
beforeEach(() => {
  HTMLDialogElement.prototype.showModal = function() { this.setAttribute("open", ""); };
  HTMLDialogElement.prototype.close = function() { this.removeAttribute("open"); };
});
afterEach(cleanup);
function mount(options = [], cart = [], required = options.length > 0) {
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
      options,
      options_required: required,
      allows_milk: group.key === "coffee",
    })),
  }));
  const shop = {
    data: { categories, settings: { is_open: true } },
    count: 0,
    cart,
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
  fireEvent.click(screen.getByRole("button", {name:/Add 1 to cart/}));
  expect(shop.add).toHaveBeenCalledWith(
    expect.objectContaining({ name: "Espresso" }),
    null, 1, "",
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
    fireEvent.click(screen.getByRole("button", {name:/Add 1 to cart/}));
    expect(shop.add).toHaveBeenCalledWith(expect.objectContaining({name}), null, 1, "");
  }
});

it("requires a choice, accepts quantity, and shows existing cart choices on cards", () => {
  const shop = mount(["Hot", "Cold"], [{item_id:1, quantity:2, option:"Hot"}]);
  expect(screen.getByText("In your cart: 2")).toBeTruthy();
  expect(screen.getByText("2 × Hot")).toBeTruthy();
  fireEvent.click(screen.getByRole("button", {name:"Add Espresso to cart"}));
  expect(screen.getByRole("button", {name:/Add 1 to cart/}).disabled).toBe(true);
  fireEvent.click(screen.getByLabelText("Cold"));
  fireEvent.click(screen.getByRole("button", {name:"Increase quantity"}));
  fireEvent.click(screen.getByRole("button", {name:/Add 2 to cart/}));
  expect(shop.add).toHaveBeenCalledWith(expect.objectContaining({name:"Espresso"}),null,2,"Cold");
  expect(screen.queryByRole("dialog")).toBeNull();
});

it("updates the popup total using the optional option price", () => {
  mount([{name:"Hot",price:null},{name:"Cold",price:"20.50"}]);
  fireEvent.click(screen.getByRole("button", {name:"Add Espresso to cart"}));
  fireEvent.click(screen.getByLabelText("Cold"));
  fireEvent.click(screen.getByRole("button", {name:"Increase quantity"}));
  expect(screen.getByRole("button", {name:/Add 2 to cart/}).textContent).toContain("41.00");
  fireEvent.click(screen.getByLabelText("Hot"));
  expect(screen.getByRole("button", {name:/Add 2 to cart/}).textContent).toContain("29.50");
});


it("allows no selection for optional choices and can clear a selected choice", () => {
  const shop = mount(["Hot", "Cold"], [], false);
  fireEvent.click(screen.getByRole("button", {name:"Add Espresso to cart"}));
  expect(screen.getByRole("button", {name:/Add 1 to cart/}).disabled).toBe(false);
  fireEvent.click(screen.getByLabelText("Cold"));
  fireEvent.click(screen.getByLabelText(/No option/));
  fireEvent.click(screen.getByRole("button", {name:/Add 1 to cart/}));
  expect(shop.add).toHaveBeenCalledWith(expect.objectContaining({name:"Espresso"}), null, 1, "");
});
