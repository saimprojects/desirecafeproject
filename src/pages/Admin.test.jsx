// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  configure,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Admin from "./Admin";
import { api, session } from "../lib/api";

vi.mock("../lib/api", async (importOriginal) => ({
  ...(await importOriginal()),
  api: vi.fn(),
  session: vi.fn(),
}));
vi.mock("react-hot-toast", () => ({
  default: { error: vi.fn(), success: vi.fn() },
}));
const makeOrder = (id) => ({
  id,
  order_number: `DC-00000${id}`,
  name: `Guest ${id}`,
  phone: "+971500000000",
  total: "29.50",
  subtotal: "29.50",
  delivery_fee: "0.00",
  status: "new",
  payment_status: "pending",
  seen: false,
  created_at: new Date().toISOString(),
  address: "Test Street, Dubai",
  notes: "",
  area: "",
  items: [{ name: "Espresso", addon: "", unit_price: "14.75", quantity: 2 }],
  history: [],
});
let orders, sound;
configure({ asyncUtilTimeout: 5000 });
beforeEach(() => {
  Object.defineProperty(document, "visibilityState", {
    configurable: true,
    value: "visible",
  });
  orders = [];
  session.mockResolvedValue({ authenticated: true, username: "Admin" });
  vi.stubGlobal(
    "Audio",
    class {
      constructor() {
        sound = this;
        this.play = vi.fn().mockResolvedValue();
        this.pause = vi.fn();
        this.currentTime = 0;
      }
    },
  );
  api.mockImplementation(async (path, body) => {
    if (path === "alerts/")
      return {
        count: orders.filter((o) => !o.seen).length,
        orders: orders.filter((o) => !o.seen).map((o) => ({ ...o })),
      };
    if (path.startsWith("overview/"))
      return {
        count: orders.length,
        sales: "0",
        order_value: "0",
        pending_cod: "0",
        pending: orders.length,
        delivered: 0,
        cancelled: 0,
        chart: [],
        popular: [],
        recent: orders.map((o) => ({ ...o })),
      };
    if (path.startsWith("orders/"))
      return { count: orders.length, orders: orders.map((o) => ({ ...o })) };
    if (path.startsWith("order/?"))
      return { ...orders.find((o) => o.id === Number(path.split("=")[1])) };
    if (path === "seen/") {
      orders = orders.map((o) =>
        body.ids.includes(o.id) ? { ...o, seen: true } : o,
      );
      return { ok: true };
    }
    return { ok: true };
  });
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});
const mount = (path = "/admin") =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </MemoryRouter>,
  );

describe("admin live order notifications", () => {
  it("automatically plays waiting alerts after a fresh mount without enabling sound", async () => {
    orders = [makeOrder(1)];
    mount();
    await screen.findByText("1 new order is waiting");
    await waitFor(() => expect(sound.play).toHaveBeenCalled());
    expect(screen.getByText("Sound always on")).toBeTruthy();
  });
  it("keeps sound on and offers activation when the browser blocks autoplay", async () => {
    mount();
    await screen.findByText("At a glance.");
    sound.play.mockRejectedValue(
      Object.assign(new Error("blocked"), { name: "NotAllowedError" }),
    );
    orders = [makeOrder(1)];
    await screen.findByText("Activate sound", {}, { timeout: 4500 });
    expect(screen.getByText("1 new order is waiting")).toBeTruthy();
    sound.play.mockResolvedValue();
    fireEvent.click(screen.getByRole("button", { name: "Activate sound" }));
    await screen.findByText("Sound always on");
    expect(sound.loop).toBe(true);
  });
  it("plays an audible-length preview even when there are no orders", async () => {
    mount();
    await screen.findByText("At a glance.");
    await waitFor(() => expect(sound?.pause).toBeDefined());
    const pauses = sound.pause.mock.calls.length;
    fireEvent.click(screen.getByRole("button", { name: /Test order sound/ }));
    await screen.findByText("Playing test…");
    expect(sound.play).toHaveBeenCalled();
    expect(sound.pause.mock.calls.length).toBe(pauses);
    await screen.findByText("Test sound", {}, { timeout: 4500 });
    await waitFor(() => expect(sound.pause.mock.calls.length).toBeGreaterThan(pauses));
  });
  it("plays a loop for unseen orders and stops after viewing without accepting", async () => {
    orders = [makeOrder(1)];
    mount();
    await screen.findByText("1 new order is waiting");
    fireEvent.click(screen.getByRole("button", { name: /Test order sound/ }));
    await screen.findByText("Sound always on");
    expect(sound.loop).toBe(true);
    await waitFor(() => expect(sound?.pause).toBeDefined());
    const pauses = sound.pause.mock.calls.length;
    fireEvent.click(
      screen.getByRole("button", { name: /1 new order is waiting/ }),
    );
    await screen.findByRole("dialog", { name: "Order details" });
    await waitFor(() =>
      expect(api).toHaveBeenCalledWith("seen/", { ids: [1] }),
    );
    await waitFor(() =>
      expect(screen.queryByText("1 new order is waiting")).toBeNull(),
    );
    await waitFor(() => expect(sound.pause.mock.calls.length).toBeGreaterThan(pauses));
    expect(orders[0].status).toBe("new");
  });

  it("keeps alerting when another order remains unseen", async () => {
    orders = [makeOrder(1), makeOrder(2)];
    mount();
    await screen.findByText("2 new orders are waiting");
    fireEvent.click(screen.getByRole("button", { name: /Test order sound/ }));
    await screen.findByText("Sound always on");
    fireEvent.click(
      screen.getByRole("button", { name: /2 new orders are waiting/ }),
    );
    await screen.findByRole("dialog", { name: "Order details" });
    await screen.findByText("1 new order is waiting");
    expect(orders.filter((o) => !o.seen)).toHaveLength(1);
    expect(sound.play).toHaveBeenCalled();
  });

  it("polls for a new order after the dashboard is already open", async () => {
    mount();
    await screen.findByText("At a glance.");
    expect(screen.queryByText("1 new order is waiting")).toBeNull();
    orders = [makeOrder(1)];
    await screen.findByText("1 new order is waiting", {}, { timeout: 4500 });
  });

  it("acknowledges displayed orders on the Orders page", async () => {
    orders = [makeOrder(1)];
    mount("/admin/orders");
    await screen.findByRole("button", { name: "DC-000001" });
    await waitFor(
      () => expect(api).toHaveBeenCalledWith("seen/", { ids: [1] }),
      { timeout: 2000 },
    );
    expect(orders[0].status).toBe("new");
  });

  it("shows an actionable message when the sound file is unavailable", async () => {
    orders = [makeOrder(1)];
    mount();
    await screen.findByText("1 new order is waiting");
    sound.play.mockRejectedValue(new Error("missing audio"));
    fireEvent.click(screen.getByRole("button", { name: /Test order sound/ }));
    await screen.findByText(
      "Could not play track1.mp3. Add the file and try again.",
    );
    expect(screen.getByText("1 new order is waiting")).toBeTruthy();
  });

  it("requires staff login before showing management pages", async () => {
    session.mockResolvedValue({ authenticated: false, username: "" });
    mount();
    await screen.findByRole("heading", { name: "Let’s open the café." });
    expect(screen.queryByText("At a glance.")).toBeNull();
    expect(
      within(
        screen.getByRole("button", { name: /Sign in to dashboard/ }),
      ).queryByText("Orders"),
    ).toBeNull();
  });
});

it("sends order date filters to the API and resets them", async () => {
  mount("/admin/orders");
  const start = await screen.findByLabelText("Orders from date");
  fireEvent.change(start, {target:{value:"2026-10-17"}});
  fireEvent.change(screen.getByLabelText("Orders to date"), {target:{value:"2026-10-17"}});
  await waitFor(() => expect(api.mock.calls.some(([path]) => path.startsWith("orders/") && path.includes("start=2026-10-17&end=2026-10-17"))).toBe(true));
  fireEvent.click(screen.getByRole("button", {name:"Reset filters"}));
  expect(start.value).toBe("");
  expect(screen.getByLabelText("Orders to date").value).toBe("");
});
it("edits product images and compulsory options while preserving structured option prices", async () => {
  const previous = api.getMockImplementation();
  api.mockImplementation(async (path, body) => path === "menu/" ? {
    categories: [{id:1,key:"coffee",name:"Coffee",items:[{id:1,category:1,name:"Espresso",description:"",price:"14.75",available:true,popular:false,options_required:false,options:[{name:"Cold",price:"20.50"}],image:"/api/menu-image/?id=1"}]}],
    settings: {is_open:true},
  } : previous(path, body));
  mount("/admin/menu");
  fireEvent.click(await screen.findByRole("button", {name:/Espresso/}));
  expect(screen.getByAltText("Preview of Espresso").getAttribute("src")).toBe("/api/menu-image/?id=1");
  fireEvent.click(screen.getByLabelText("Option Compulsory"));
  fireEvent.click(screen.getByRole("button", {name:"Remove image"}));
  fireEvent.submit(screen.getByRole("heading", {name:"Edit item"}).closest("form"));
  await waitFor(() => expect(api).toHaveBeenCalledWith("menu-item/", expect.objectContaining({
    options_required:true, image_data:"", options:[{name:"Cold",price:"20.50"}],
  })));
});
