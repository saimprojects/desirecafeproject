// @vitest-environment jsdom
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Cart from "./Cart";
import { useShop } from "../components/ShopContext";
import { api } from "../lib/api";

vi.mock("../components/ShopContext", () => ({ useShop: vi.fn() }));
vi.mock("../lib/api", async (importOriginal) => ({
  ...(await importOriginal()),
  api: vi.fn(),
}));
let shop;
beforeEach(() => {
  sessionStorage.clear();
  shop = {
    data: {
      settings: {
        delivery_fee: "0.00",
        minimum_order: "0.00",
        delivery_areas: "",
        is_open: true,
      },
    },
    cart: [{ item_id: 1, quantity: 2 }],
    lines: [
      {
        item_id: 1,
        addon_id: null,
        quantity: 2,
        valid: true,
        price: 14.75,
        item: { name: "Espresso" },
      },
    ],
    subtotal: 29.5,
    clear: vi.fn(),
    reload: vi.fn(),
    quantity: vi.fn(),
  };
  useShop.mockReturnValue(shop);
});
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
const mount = () =>
  render(
    <MemoryRouter initialEntries={["/cart"]}>
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/order/:token" element={<p>Order confirmed</p>} />
      </Routes>
    </MemoryRouter>,
  );
function fill() {
  fireEvent.change(screen.getByLabelText("Full name"), {
    target: { value: "Guest Test" },
  });
  fireEvent.change(screen.getByLabelText("Phone number"), {
    target: { value: "+971500000000" },
  });
  fireEvent.change(screen.getByLabelText("Full Delivery Address (Office Number)"), {
    target: { value: "Apartment 12, Test Street, Dubai" },
  });
}

it("reuses checkout key after a network failure and clears it on success", async () => {
  api
    .mockRejectedValueOnce(new Error("Connection interrupted"))
    .mockResolvedValueOnce({ token: "private-token" });
  mount();
  fill();
  fireEvent.click(screen.getByRole("button", { name: /Place order/ }));
  await screen.findByText("Connection interrupted");
  await waitFor(() =>
    expect(screen.getByRole("button", { name: /Place order/ }).disabled).toBe(
      false,
    ),
  );
  const key = api.mock.calls[0][1].request_key;
  fireEvent.click(screen.getByRole("button", { name: /Place order/ }));
  await screen.findByText("Order confirmed");
  expect(api.mock.calls[1][1].request_key).toBe(key);
  expect(api.mock.calls[1][1].items[0].expected_price).toBe("14.75");
  expect(shop.clear).toHaveBeenCalledOnce();
  expect(sessionStorage.getItem("desires-checkout")).toBeNull();
});

it("disables checkout when the store is closed or an item is unavailable", () => {
  shop.data.settings.is_open = false;
  mount();
  expect(screen.getByRole("button", { name: /Place order/ }).disabled).toBe(
    true,
  );
  expect(screen.getByText("Ordering is currently closed.")).toBeTruthy();
});

it("blocks duplicate clicks while checkout is in flight", async () => {
  let finish;
  api.mockImplementation(
    () =>
      new Promise((resolve) => {
        finish = resolve;
      }),
  );
  mount();
  fill();
  const button = screen.getByRole("button", { name: /Place order/ });
  fireEvent.click(button);
  fireEvent.click(button);
  expect(api).toHaveBeenCalledOnce();
  finish({ token: "private-token" });
  await screen.findByText("Order confirmed");
});
