import { ProductOptionsEditor } from "../components/ProductOptionsEditor";
import { productOptions } from "../lib/productOptions";
import { PasswordField } from "../components/PasswordField";
import { ChangePassword } from "../components/ChangePassword";
import { ThermalPrint } from "../components/ThermalPrint";
import { CategoryIcon } from "../components/CategoryIcon";
import { categoryIcons, categoryIconKey } from "../lib/categoryIcons";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import {
  Bell,
  Coffee,
  LayoutDashboard,
  ShoppingBag,
  UtensilsCrossed,
  Settings,
  LogOut,
  ArrowUpRight,
  Volume2,
  Search,
  Plus,
  X,
  Check,
  RefreshCw,
  Banknote,
  PackageCheck,
  Clock3,
} from "lucide-react";
import toast from "react-hot-toast";
import { api, session, aed, dateTime, statusName, dubaiDate } from "../lib/api";
import { usePolling } from "../lib/usePolling";
import { ReceiptContent } from "../components/ReceiptContent";

const statuses = [
  "new",
  "accepted",
  "preparing",
  "out_for_delivery",
  "delivered",
  "cancelled",
];
const nextStatus = {
  new: "accepted",
  accepted: "preparing",
  preparing: "out_for_delivery",
  out_for_delivery: "delivered",
};
const nextLabel = {
  new: "Accept order",
  accepted: "Start preparing",
  preparing: "Send for delivery",
  out_for_delivery: "Mark delivered",
};
const save = async (path, data, done) => {
  try {
    await api(path, data);
    toast.success("Saved successfully");
    done?.();
  } catch (e) {
    toast.error(e.message);
  }
};

function Login({ onLogin }) {
  const [username, setUsername] = useState(""),
    [password, setPassword] = useState(""),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const result = await api("login/", { username, password });
      onLogin(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="admin-login">
      <div className="login-story">
        <span className="eyebrow">DESIRES CAFÉ · THE BACK OFFICE</span>
        <Coffee size={56} strokeWidth={1} />
        <h1>
          A little care.
          <br />
          An exceptional café.
        </h1>
        <p>
          Your menu, your orders, your everyday.
          <br />
          All in one thoughtfully crafted space.
        </p>
        <span className="login-footer">
          CRAFTED WITH PASSION. SERVED WITH LOVE.
        </span>
      </div>
      <form className="login-form" onSubmit={submit}>
        <span className="eyebrow">WELCOME BACK</span>
        <h2>Let’s open the café.</h2>
        <p className="muted">Sign in to your management dashboard.</p>
        <label>
          Username
          <input
            required
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <PasswordField label="Password" required autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && (
          <div className="error-box" role="alert">
            {error}
          </div>
        )}
        <button disabled={busy} className="cafe-button wide">
          {busy ? "Signing in…" : "Sign in to dashboard"}
          <ArrowUpRight size={18} />
        </button>
        <Link className="text-button" to="/menu">
          ← Back to the café
        </Link>
      </form>
    </div>
  );
}

function OrdersTable({ orders, open }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Order</th>
            <th>Customer</th>
            <th>Placed</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Payment</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className={!o.seen ? "unseen-row" : ""}>
              <td>
                <button className="order-link" onClick={() => open(o.id)}>
                  {!o.seen && <i className="new-dot" />}
                  {o.order_number}
                </button>
              </td>
              <td>
                <strong>{o.name}</strong>
                <small>{o.phone}</small>
              </td>
              <td>{dateTime(o.created_at)}</td>
              <td className="amount-cell">{aed(o.total)}</td>
              <td>
                <span className={`status ${o.status}`}>
                  {statusName(o.status)}
                </span>
              </td>
              <td>
                <span className={`payment ${o.payment_status}`}>
                  {o.payment_status === "collected"
                    ? "Collected"
                    : "COD pending"}
                </span>
              </td>
              <td>
                <button
                  aria-label={`Open ${o.order_number}`}
                  onClick={() => open(o.id)}
                >
                  <ArrowUpRight size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!orders.length && (
        <div className="empty-state">
          <ShoppingBag size={30} />
          <h3>No orders yet</h3>
          <p>Your next café moment will appear here.</p>
        </div>
      )}
    </div>
  );
}

function Dashboard({ open }) {
  const [range, setRange] = useState({ start: dubaiDate(), end: dubaiDate() });
  const { data, error } = usePolling(
    `overview/?start=${range.start}&end=${range.end}`,
  );
  function preset(days) {
    const end = dubaiDate(),
      d = new Date(`${end}T12:00:00Z`);
    d.setUTCDate(d.getUTCDate() - days + 1);
    setRange({ start: d.toISOString().slice(0, 10), end });
  }
  const metrics = data
    ? [
        {
          label: "Orders received",
          value: data.count,
          note: `${data.pending} in progress`,
          icon: ShoppingBag,
        },
        {
          label: "Collected sales",
          value: aed(data.sales),
          note: "Cash marked collected",
          icon: Banknote,
        },
        {
          label: "Pending COD",
          value: aed(data.pending_cod),
          note: "Awaiting cash collection",
          icon: Clock3,
        },
        {
          label: "Delivered orders",
          value: data.delivered,
          note: `${data.cancelled} cancelled`,
          icon: PackageCheck,
        },
      ]
    : [];
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">THE DAILY BREW</span>
          <h1>At a glance.</h1>
          <p>A fresh view of how your café is doing.</p>
        </div>
        <div className="date-filter">
          <div className="button-row">
            <button onClick={() => preset(1)}>Today</button>
            <button onClick={() => preset(7)}>7 days</button>
            <button onClick={() => preset(30)}>30 days</button>
          </div>
          <div>
            <input
              aria-label="Start date"
              type="date"
              value={range.start}
              onChange={(e) => setRange({ ...range, start: e.target.value })}
            />
            <span>—</span>
            <input
              aria-label="End date"
              type="date"
              value={range.end}
              onChange={(e) => setRange({ ...range, end: e.target.value })}
            />
          </div>
        </div>
      </div>
      {error && (
        <div className="error-box">
          {error.message} Displayed data may be out of date.
        </div>
      )}
      {data ? (
        <>
          <div className="metrics">
            {metrics.map(({ label, value, note, icon: Icon }) => (
              <article className="metric" key={label}>
                <div>
                  <span>{label}</span>
                  <Icon size={19} />
                </div>
                <strong>{value}</strong>
                <small>{note}</small>
              </article>
            ))}
          </div>
          <div className="dashboard-grid">
            <section className="surface sales-panel">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">THE NUMBERS</span>
                  <h2>Sales overview</h2>
                </div>
                <span className="soft-pill">AED · Collected cash</span>
              </div>
              <div className="sales-summary">
                <strong>{aed(data.sales)}</strong>
                <span>Order value: {aed(data.order_value)}</span>
              </div>
              {data.chart.length ? (
                <div
                  className="sales-chart"
                  role="img"
                  aria-label="Collected sales by order placement date"
                >
                  {data.chart.map((day) => (
                    <div
                      className="chart-column"
                      key={day.day}
                      title={`${day.day}: ${aed(day.sales)}`}
                    >
                      <span>{aed(day.sales)}</span>
                      <div
                        style={{
                          height: `${Math.max(5, (Number(day.sales) / Math.max(...data.chart.map((d) => Number(d.sales)), 1)) * 130)}px`,
                        }}
                      />
                      <small>{day.day.slice(5)}</small>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="chart-empty">
                  <span>— — — — — — — — —</span>
                  <p>Your first collected sale starts the story.</p>
                </div>
              )}
              <p className="fine-print">
                Grouped by order date · UAE time · Cancelled orders excluded
                from order value
              </p>
            </section>
            <section className="surface">
              <span className="eyebrow">ON EVERYONE’S LIST</span>
              <h2>House favourites</h2>
              <p className="muted">Most ordered in this period</p>
              <div className="popular-list">
                {data.popular.map((item, i) => (
                  <div key={item.item_name}>
                    <span className="rank">0{i + 1}</span>
                    <strong>{item.item_name}</strong>
                    <span>{item.quantity} sold</span>
                  </div>
                ))}
                {!data.popular.length && (
                  <div className="empty-state">
                    <Coffee size={30} />
                    <p>The favourites will find their place.</p>
                  </div>
                )}
              </div>
            </section>
          </div>
          <section className="surface table-surface">
            <div className="section-heading">
              <div>
                <span className="eyebrow">FRESH FROM THE COUNTER</span>
                <h2>Recent orders</h2>
              </div>
              <Link className="text-button" to="/admin/orders">
                View all orders ↗
              </Link>
            </div>
            <OrdersTable orders={data.recent} open={open} />
          </section>
        </>
      ) : (
        !error && <div className="empty-state">Preparing your dashboard…</div>
      )}
    </>
  );
}

function Orders({ open, acknowledge }) {
  const [search, setSearch] = useState(""),
    [filter, setFilter] = useState(""),
    [page, setPage] = useState(1),
    [dates, setDates] = useState({ start: "", end: "" });
  function datePreset(days) {
    const end = dubaiDate();
    const start = new Date(`${end}T12:00:00Z`);
    start.setUTCDate(start.getUTCDate() - days + 1);
    setDates({ start: start.toISOString().slice(0,10), end });
    setPage(1);
  }
  const { data, error } = usePolling(
    `orders/?q=${encodeURIComponent(search)}&status=${filter}&page=${page}&start=${dates.start}&end=${dates.end}`,
  );
  const signature =
    data?.orders
      .filter((o) => !o.seen)
      .map((o) => o.id)
      .join(",") || "";
  useEffect(() => {
    if (!signature || error) return;
    const mark = () => {
      if (document.visibilityState === "visible")
        acknowledge(signature.split(",").map(Number));
    };
    const timer = setTimeout(mark, 800);
    document.addEventListener("visibilitychange", mark);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", mark);
    };
  }, [signature, acknowledge, error, data]);
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">THE LIVE COUNTER</span>
          <h1>Orders</h1>
          <p>Every little detail, from first sip to doorstep.</p>
        </div>
        <span className="soft-pill">{data?.count || 0} orders</span>
      </div>
      <section className="surface table-surface">
        <div className="order-filters">
          <div className="search-field">
            <Search size={18} />
            <input
              aria-label="Search orders"
              placeholder="Order ID, name or phone…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <select
            aria-label="Filter order status"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All statuses</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {statusName(s)}
              </option>
            ))}
          </select>
        </div>
        <div className="order-date-bar">
          <div className="filter-presets" aria-label="Order date presets">
            <button type="button" aria-pressed={!dates.start && !dates.end} onClick={() => { setDates({start:"",end:""}); setPage(1); }}>All dates</button>
            <button type="button" aria-pressed={dates.start === dubaiDate() && dates.end === dubaiDate()} onClick={() => datePreset(1)}>Today</button>
            <button type="button" onClick={() => datePreset(7)}>Last 7 days</button>
            <button type="button" onClick={() => datePreset(30)}>Last 30 days</button>
          </div>
          <div className="filter-date-inputs">
            <label>From<input type="date" aria-label="Orders from date" value={dates.start} max={dates.end || undefined} onChange={e => {setDates({...dates, start:e.target.value}); setPage(1);}} /></label>
            <label>To<input type="date" aria-label="Orders to date" value={dates.end} min={dates.start || undefined} onChange={e => {setDates({...dates, end:e.target.value}); setPage(1);}} /></label>
            <button type="button" className="text-button" onClick={() => {setSearch(""); setFilter(""); setDates({start:"",end:""}); setPage(1);}}>Reset filters</button>
          </div>
          <small>Order dates use UAE time. Choose the same From and To date for a single day.</small>
        </div>
        {error && <div className="error-box">{error.message}</div>}
        {data ? (
          <OrdersTable orders={data.orders} open={open} />
        ) : (
          <div className="empty-state">Loading orders…</div>
        )}
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            ← Previous
          </button>
          <span>Page {page}</span>
          <button
            disabled={!data || page * 25 >= data.count}
            onClick={() => setPage((p) => p + 1)}
          >
            Next →
          </button>
        </div>
      </section>
    </>
  );
}

function OrderDetail({ id, close, acknowledge }) {
  const { data, error, reload } = usePolling(`order/?id=${id}`);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (data?.id === id && !data.seen) acknowledge([id]);
  }, [data, id, acknowledge]);
  async function update(change) {
    setBusy(true);
    await save("order/", { id, ...change }, reload);
    setBusy(false);
  }
  return (
    <div className="modal-backdrop" onClick={close}>
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Order details"
        className="order-drawer printable"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer-toolbar no-print">
          <span>ORDER DETAILS</span>
          <button aria-label="Close order details" onClick={close}>
            <X />
          </button>
        </div>
        {error && <div className="error-box">{error.message}</div>}
        {data ? (
          <>
            <ReceiptContent order={data} />
            <div className="order-controls no-print">
              {nextStatus[data.status] && (
                <button
                  disabled={busy}
                  className="cafe-button"
                  onClick={() => update({ status: nextStatus[data.status] })}
                >
                  <Check size={17} />
                  {nextLabel[data.status]}
                </button>
              )}
              {data.status === "delivered" &&
                data.payment_status === "pending" && (
                  <button
                    disabled={busy}
                    className="cafe-button"
                    onClick={() => update({ payment_status: "collected" })}
                  >
                    Mark cash collected
                  </button>
                )}
              {!["delivered", "cancelled"].includes(data.status) && (
                <button
                  disabled={busy}
                  className="danger-button"
                  onClick={() => {
                    if (
                      window.confirm(
                        `Cancel ${data.order_number}? This cannot be undone.`,
                      )
                    )
                      update({ status: "cancelled" });
                  }}
                >
                  Cancel order
                </button>
              )}
              <ThermalPrint order={data} />
            </div>
            <div className="history no-print">
              <h3>Order timeline</h3>
              {data.history.map((event, i) => (
                <div key={i}>
                  <i />
                  <div>
                    <strong>{event.message}</strong>
                    <small>
                      {dateTime(event.created_at)} · {event.actor}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">Loading order…</div>
        )}
      </section>
    </div>
  );
}

async function resizeProductImage(file) {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 10 * 1024 * 1024) {
    throw new Error("Choose a JPG, PNG or WebP image up to 10 MB.");
  }
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = url;
    await image.decode();
    const scale = Math.min(1, 800 / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext("2d");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    for (const quality of [0.85, 0.7, 0.5]) {
      const result = canvas.toDataURL("image/jpeg", quality);
      if (result.length <= 400000) return result;
    }
    throw new Error("Image is too detailed. Please choose a smaller photo.");
  } finally { URL.revokeObjectURL(url); }
}

function MenuEditor() {
  const { data, error, reload } = usePolling("menu/");
  const [editing, setEditing] = useState(null),
    [category, setCategory] = useState(null),
    [search, setSearch] = useState(""),
    [busy, setBusy] = useState(false);
  const groups = data?.categories || [];
  async function submit(e) {
    e.preventDefault();
    if (editing?.option_mode !== "multi" && editing?.options_required && !productOptions(editing).length) {
      toast.error("Add at least one option or uncheck Option Compulsory.");
      return;
    }
    setBusy(true);
    try {
      await api(editing ? "menu-item/" : "category/", editing ? {
        ...editing,
        options: editing.option_mode === "multi" ? undefined : productOptions(editing).map(option => ({ ...option, name: option.name.trim() })),
        option_groups: editing.option_mode === "multi" ? editing.option_groups || [] : undefined,
      } : category);
      toast.success("Menu updated");
      setEditing(null);
      setCategory(null);
      reload();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  }
  async function remove(kind, record) {
    const message =
      kind === "category"
        ? `Delete category "${record.name}" and all ${record.items?.length || 0} items in it? Existing orders will be kept.`
        : `Delete "${record.name}" from the menu? Existing orders will be kept.`;
    if (!window.confirm(message)) return;
    setBusy(true);
    try {
      await api("menu-delete/", { kind, id: record.id });
      setEditing(null);
      setCategory(null);
      reload();
      toast.success(kind === "category" ? "Category deleted" : "Item deleted");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBusy(false);
    }
  }
  const field = (name, value) =>
    editing
      ? setEditing({ ...editing, [name]: value })
      : setCategory({ ...category, [name]: value });
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">CURATED BY YOU</span>
          <h1>The menu</h1>
          <p>Your original favourites, ready to serve.</p>
        </div>
        <div className="button-row">
          <button
            className="outline-button"
            onClick={() =>
              setCategory({
                name: "",
                position: groups.length,
                is_addon: false,
                icon: "coffee",
              })
            }
          >
            Add category
          </button>
          <button
            className="cafe-button"
            disabled={!groups.length}
            onClick={() =>
              setEditing({
                name: "",
                description: "",
                price: "",
                category: groups[0]?.id,
                popular: false,
                available: true,
                allows_milk: false,
                options: [],
                options_required: false,
                image: "",
              })
            }
          >
            <Plus size={17} /> Add item
          </button>
        </div>
      </div>
      {error && <div className="error-box">{error.message}</div>}
      <div className="search-field menu-admin-search">
        <Search size={18} />
        <input
          aria-label="Search menu items"
          placeholder="Search menu items…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {groups.map((g) => (
        <section className="surface menu-admin-group" key={g.id}>
          <div className="section-heading">
            <div>
              <h2 className="category-title"><CategoryIcon category={g} size={25} />{g.name}</h2>
              <span className="muted">
                {g.items.length} {g.is_addon ? "add-ons" : "items"}
              </span>
            </div>
            <button
              className="text-button"
              onClick={() => setCategory({ ...g })}
            >
              Edit category
            </button>
            <button
              className="danger-button"
              disabled={busy}
              onClick={() => remove("category", g)}
            >
              Delete category
            </button>
          </div>
          <div className="admin-menu-grid">
            {g.items
              .filter((i) =>
                i.name.toLowerCase().includes(search.toLowerCase()),
              )
              .map((item) => (
                <button
                  className="admin-menu-card"
                  key={item.id}
                  onClick={() => setEditing({ ...item })}
                >
                  <div className="menu-icon">
                    {item.image ? <img src={item.image} alt={item.name} className="product-photo admin-product-photo" /> : <CategoryIcon category={g} size={22} />}
                  </div>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <strong>{aed(item.price)}</strong>
                  </div>
                  <span
                    className={`availability ${item.available ? "" : "unavailable"}`}
                  >
                    {item.available ? "Available" : "Sold out"}
                  </span>
                </button>
              ))}
          </div>
        </section>
      ))}
      {(editing || category) && (
        <div className="modal-backdrop">
          <form className="edit-modal" onSubmit={submit}>
            <div className="section-heading">
              <h2>
                {editing ? (editing.id ? "Edit item" : "New item") : "Category"}
              </h2>
              <button
                type="button"
                aria-label="Close editor"
                onClick={() => {
                  setEditing(null);
                  setCategory(null);
                }}
              >
                <X />
              </button>
            </div>
            <fieldset disabled={busy}>
              <label>
                Name
                <input
                  required
                  maxLength={editing ? 150 : 100}
                  value={(editing || category).name}
                  onChange={(e) => field("name", e.target.value)}
                />
              </label>
              {editing ? (
                <>
                  <label>
                    Category
                    <select
                      value={editing.category}
                      onChange={(e) =>
                        field("category", Number(e.target.value))
                      }
                    >
                      {groups.map((g) => (
                        <option key={g.id} value={g.id}>
                          {g.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Description
                    <textarea
                      maxLength={1000}
                      value={editing.description}
                      onChange={(e) => field("description", e.target.value)}
                    />
                  </label>
                  <label>
                    Price (AED, VAT inclusive)
                    <input
                      required
                      type="number"
                      min="0"
                      max="999999.99"
                      step="0.01"
                      value={editing.price}
                      onChange={(e) => field("price", e.target.value)}
                    />
                  </label>
                  <label>
                    Product image (optional)
                    <input type="file" accept="image/jpeg,image/png,image/webp" onChange={async e => {
                      const file = e.target.files?.[0];
                      e.target.value = "";
                      if (!file) return;
                      setBusy(true);
                      try {
                        const image = await resizeProductImage(file);
                        setEditing(current => current ? { ...current, image_data: image } : current);
                      } catch (error) { toast.error(error.message); }
                      finally { setBusy(false); }
                    }} />
                  </label>
                  <p className="muted">Upload JPG, PNG or WebP (up to 10 MB). Images are resized automatically. Without a photo, the category icon is shown.</p>
                  {(editing.image_data ?? editing.image) && <div className="product-image-preview">
                    <img src={editing.image_data ?? editing.image} alt={`Preview of ${editing.name || "product"}`} className="product-photo" />
                    <button type="button" className="text-button" onClick={() => field("image_data", "")}>Remove image</button>
                  </div>}
                  <ProductOptionsEditor item={editing} field={field} />
                  {[
                    ["available", "Available for ordering"],
                    ["popular", "House favourite"],
                  ].map(([key, label]) => (
                    <label className="check-label" key={key}>
                      <input
                        type="checkbox"
                        checked={!!editing[key]}
                        onChange={(e) => field(key, e.target.checked)}
                      />
                      {label}
                    </label>
                  ))}
                </>
              ) : (
                <>
                  <fieldset className="category-icon-picker">
                    <legend>Category icon</legend>
                    <div className="category-icon-grid">
                      {categoryIcons.map(({ key, Icon, label }) => (
                        <button type="button" key={key} title={label}
                          aria-label={label} aria-pressed={categoryIconKey(category) === key}
                          onClick={() => field("icon", key)}>
                          <Icon size={23} /><span>{label}</span>
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <label>
                    Display position
                    <input
                      type="number"
                      min="0"
                      value={category.position}
                      onChange={(e) =>
                        field("position", Number(e.target.value))
                      }
                    />
                  </label>
                  {!category.id && (
                    <label className="check-label">
                      <input
                        type="checkbox"
                        checked={category.is_addon}
                        onChange={(e) => field("is_addon", e.target.checked)}
                      />
                      Milk add-on category
                    </label>
                  )}
                </>
              )}
            </fieldset>
            <button className="cafe-button wide" disabled={busy}>
              {busy ? "Saving…" : "Save changes"}
            </button>
            {editing?.id && (
              <button
                type="button"
                className="danger-button wide"
                disabled={busy}
                onClick={() => remove("item", editing)}
              >
                Delete item
              </button>
            )}
          </form>
        </div>
      )}
    </>
  );
}

function StoreSettings() {
  const [form, setForm] = useState(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  useEffect(() => {
    api("settings/")
      .then(setForm)
      .catch((e) => setError(e.message));
  }, []);
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    await save("settings/", form);
    setBusy(false);
  }
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">THE FINISHING TOUCHES</span>
          <h1>Café settings</h1>
          <p>Keep every delivery running smoothly.</p>
        </div>
      </div>
      {error && <div className="error-box">{error}</div>}
      {form && (
        <form className="surface settings-form" onSubmit={submit}>
          <h2>Ordering & delivery</h2>
          <fieldset disabled={busy}>
            <label className="check-label">
              <input
                type="checkbox"
                checked={form.is_open}
                onChange={(e) =>
                  setForm({ ...form, is_open: e.target.checked })
                }
              />
              Accept new orders
            </label>
            <label>
              Delivery fee (AED)
              <input
                required
                type="number"
                min="0"
                max="999999.99"
                step="0.01"
                value={form.delivery_fee}
                onChange={(e) =>
                  setForm({ ...form, delivery_fee: e.target.value })
                }
              />
            </label>
            <label>
              Minimum order (AED)
              <input
                required
                type="number"
                min="0"
                max="999999.99"
                step="0.01"
                value={form.minimum_order}
                onChange={(e) =>
                  setForm({ ...form, minimum_order: e.target.value })
                }
              />
            </label>
            <label>
              Delivery areas
              <textarea
                rows={5}
                maxLength={5000}
                value={form.delivery_areas}
                placeholder={"Dubai Marina\nJumeirah\nBusiness Bay"}
                onChange={(e) =>
                  setForm({ ...form, delivery_areas: e.target.value })
                }
              />
              <small className="muted">
                One area per line. Leave empty to accept any address.
              </small>
            </label>
          </fieldset>
          <div className="notice-box">
            Currency: AED · Payment: Cash on Delivery · Menu prices include VAT.
          </div>
          <button className="cafe-button" disabled={busy}>
            {busy ? "Saving…" : "Save settings"}
          </button>
        </form>
      )}
      <ChangePassword />
      <section className="surface sound-help">
        <h2>New order sound</h2>
        <p>
          Order sound is always on, including after refresh. It repeats while
          orders remain unseen. Use Test sound to check playback.
        </p>
        <p className="muted">
          Keep the admin panel open and your device awake. Closed browsers
          cannot play alerts. If autoplay is blocked, click Activate sound once.
        </p>
      </section>
    </>
  );
}

function AdminShell({ user, onLogout }) {
  const navigate = useNavigate(),
    alerts = usePolling("alerts/");
  const [selected, setSelected] = useState(null),
    [bell, setBell] = useState(false),
    [audioBlocked, setAudioBlocked] = useState(false),
    [previewing, setPreviewing] = useState(false),
    [soundError, setSoundError] = useState("");
  const audio = useRef(null),
    soundReady = useRef(false),
    currentSoundState = useRef({ count: 0, previewing: false }),
    previewTimer = useRef(null),
    acknowledged = useRef(new Set());
  const [localSeen, setLocalSeen] = useState([]);
  const count = Math.max(
    0,
    (alerts.data?.count || 0) -
      (alerts.data?.orders || []).filter((o) => localSeen.includes(o.id))
        .length,
  );
  const unseen = (alerts.data?.orders || []).filter(
    (o) => !localSeen.includes(o.id),
  );
  const enabled = true;
  currentSoundState.current = { count, previewing };
  useEffect(() => {
    const sound = new Audio("/track1.mp3");
    sound.loop = true;
    sound.preload = "auto";
    sound.volume = 1;
    sound.muted = false;
    audio.current = sound;
    return () => {
      clearTimeout(previewTimer.current);
      sound.pause();
      audio.current = null;
    };
  }, []);
  useEffect(() => {
    // Unlock on the first interaction when autoplay needs user activation.
    // The always-on preference is never switched off on refresh or failure.
    const activate = (event) => {
      if (soundReady.current || event.target.closest?.("[data-sound-control]"))
        return;
      const sound = audio.current;
      if (!sound) return;
      sound
        .play()
        .then(() => {
          if (audio.current !== sound) return;
          soundReady.current = true;
          setAudioBlocked(false);
          setSoundError("");
          const state = currentSoundState.current;
          if (!state.count && !state.previewing) {
            sound.pause();
            sound.currentTime = 0;
          }
        })
        .catch(() => {
          /* The dedicated activation button shows playback errors. */
        });
    };
    document.addEventListener("pointerdown", activate);
    document.addEventListener("keydown", activate);
    return () => {
      document.removeEventListener("pointerdown", activate);
      document.removeEventListener("keydown", activate);
    };
  }, []);
  useEffect(() => {
    if (!audio.current) return;
    let active = true;
    if (enabled && (count > 0 || previewing))
      audio.current
        .play()
        .then(() => {
          if (!active) return;
          soundReady.current = true;
          setAudioBlocked(false);
          setSoundError("");
        })
        .catch((error) => {
          if (!active || error.name === "AbortError") return;
          setSoundError(
            error.name === "NotAllowedError"
              ? "Order sound is on, but your browser needs one click. Activate sound to hear waiting orders."
              : "Cannot play track1.mp3. Check the sound file and try Test sound.",
          );
          soundReady.current = false;
          setAudioBlocked(true);
        });
    else {
      audio.current.pause();
      audio.current.currentTime = 0;
    }
    return () => {
      active = false;
    };
  }, [count, enabled, previewing]);
  useEffect(() => {
    document.title = count
      ? `(${count}) New orders · Desires Café`
      : "Desires Café · Admin";
    return () => {
      document.title = "Desires Café";
    };
  }, [count]);
  useEffect(() => {
    if (alerts.error?.status === 401) onLogout();
  }, [alerts.error, onLogout]);
  const acknowledge = useCallback(async (ids) => {
    const fresh = ids.filter((id) => !acknowledged.current.has(id));
    if (!fresh.length) return;
    fresh.forEach((id) => acknowledged.current.add(id));
    try {
      await api("seen/", { ids: fresh });
      setPreviewing(false);
      setLocalSeen((previous) => [...new Set([...previous, ...fresh])]);
    } catch (e) {
      fresh.forEach((id) => acknowledged.current.delete(id));
      toast.error(e.message);
    }
  }, []);
  function open(id) {
    setSelected(id);
    setBell(false);
  }
  async function enableAudio() {
    try {
      setSoundError("");
      clearTimeout(previewTimer.current);
      audio.current.volume = 1;
      audio.current.muted = false;
      await audio.current.play();
      // Let the user actually hear a sample instead of pausing immediately.
      setPreviewing(!count);
      soundReady.current = true;
      setAudioBlocked(false);
      if (!count)
        previewTimer.current = setTimeout(() => setPreviewing(false), 3000);
    } catch (error) {
      setSoundError(
        error.name === "NotAllowedError"
          ? "Your browser blocked playback. Allow sound for this site and click Activate sound."
          : "Could not play track1.mp3. Add the file and try again.",
      );
      soundReady.current = false;
      setAudioBlocked(true);
    }
  }
  async function logoutAdmin() {
    try {
      await api("logout/", {});
      onLogout();
    } catch (e) {
      toast.error(e.message);
    }
  }
  return (
    <div className="admin-app">
      <aside className="admin-sidebar no-print">
        <Link to="/admin" className="admin-brand">
          <img className="admin-logo" src="https://res.cloudinary.com/dxommxt6d/image/upload/v1779088277/Untitled_design_pvenmx.png" alt="Desires Café" />
        </Link>
        <span className="sidebar-label">WORKSPACE</span>
        <nav>
          {[
            [LayoutDashboard, "Dashboard", "/admin"],
            [ShoppingBag, "Orders", "/admin/orders"],
            [UtensilsCrossed, "Menu", "/admin/menu"],
            [Settings, "Settings", "/admin/settings"],
          ].map(([Icon, label, path]) => (
            <NavLink key={path} to={path} end={path === "/admin"}>
              <Icon size={19} />
              <span>{label}</span>
              {label === "Orders" && count > 0 && <b>{count}</b>}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-note">
            <Coffee size={22} />
            <h3>Where Desires are Brewed</h3>
          </div>
          <Link to="/menu" target="_blank" rel="noreferrer">
            Visit storefront <ArrowUpRight size={16} />
          </Link>
          <button onClick={logoutAdmin}>
            <LogOut size={17} /> Sign out
          </button>
        </div>
      </aside>
      <div className="admin-body">
        <header className="admin-topbar no-print">
          <span className={`connection ${alerts.error ? "offline" : ""}`}>
            <i />
            {alerts.error
              ? "Reconnecting…"
              : alerts.data
                ? "Live updates · every 3s"
                : "Connecting…"}
          </span>
          <div className="topbar-actions">
            <button
              className={`sound-toggle ${enabled ? "enabled" : ""}`}
              onClick={enableAudio}
              data-sound-control
              title="Play a 3-second sound test and enable new-order alerts"
            >
              <Volume2 size={17} />
              {audioBlocked ? "Activate sound" : "Sound always on"}
            </button>
            {enabled && (
              <button
                className="sound-toggle"
                onClick={enableAudio}
                aria-label="Test order sound"
                data-sound-control
              >
                {previewing ? "Playing test…" : "Test sound"}
              </button>
            )}
            <div className="bell-wrap">
              <button
                className="bell-button"
                aria-label="Order notifications"
                onClick={() => setBell(!bell)}
              >
                <Bell size={20} />
                {count > 0 && <b>{count}</b>}
              </button>
              {bell && (
                <div className="notification-menu">
                  <h3>
                    New orders <span>{count}</span>
                  </h3>
                  {unseen.map((o) => (
                    <button key={o.id} onClick={() => open(o.id)}>
                      <strong>
                        {o.order_number} · {aed(o.total)}
                      </strong>
                      <small>
                        {o.name} · {dateTime(o.created_at)}
                      </small>
                    </button>
                  ))}
                  {!count && <p>You’re all caught up.</p>}
                  <button
                    className="text-button"
                    onClick={() => {
                      setBell(false);
                      navigate("/admin/orders");
                    }}
                  >
                    View all orders →
                  </button>
                </div>
              )}
            </div>
            <button
              className="mobile-logout"
              aria-label="Sign out"
              onClick={logoutAdmin}
            >
              <LogOut size={17} />
            </button>
            <span className="admin-avatar">
              {user.username.slice(0, 1).toUpperCase()}
            </span>
            <span className="admin-user">
              {user.username}
              <small>Administrator</small>
            </span>
          </div>
        </header>
        <main className="admin-main">
          {soundError && (
            <div className="notice-box no-print">{soundError}</div>
          )}
          {count > 0 && (
            <button
              className="new-order-banner no-print"
              onClick={() => open(unseen[0]?.id || alerts.data.orders[0]?.id)}
            >
              <Bell size={20} />
              <span>
                <strong>
                  {count} new {count === 1 ? "order is" : "orders are"} waiting
                </strong>
                <small>Open an order or visit Orders to acknowledge.</small>
              </span>
              <ArrowUpRight size={20} />
            </button>
          )}
          <Routes>
            <Route index element={<Dashboard open={open} />} />
            <Route
              path="orders"
              element={<Orders open={open} acknowledge={acknowledge} />}
            />
            <Route path="menu" element={<MenuEditor />} />
            <Route path="settings" element={<StoreSettings />} />
            <Route path="*" element={<Dashboard open={open} />} />
          </Routes>
          <footer className="admin-footer no-print">
            <span>DESIRES CAFÉ</span>
            <span>Made for the everyday extraordinary. · All times UAE</span>
          </footer>
        </main>
      </div>
      {selected && (
        <OrderDetail
          key={selected}
          id={selected}
          close={() => setSelected(null)}
          acknowledge={acknowledge}
        />
      )}
    </div>
  );
}

export default function Admin() {
  const [user, setUser] = useState(undefined),
    [error, setError] = useState("");
  const onLogout = useCallback(() => setUser(null), []);
  useEffect(() => {
    session()
      .then((s) => setUser(s.authenticated ? s : null))
      .catch((e) => {
        setError(e.message);
        setUser(null);
      });
  }, []);
  if (user === undefined)
    return (
      <div className="admin-loading">
        <RefreshCw /> Opening the café…
      </div>
    );
  return (
    <>
      {error && <div className="error-box">{error}</div>}
      {user ? (
        <AdminShell user={user} onLogout={onLogout} />
      ) : (
        <Login
          onLogin={(u) => {
            setUser(u);
            setError("");
          }}
        />
      )}
    </>
  );
}
