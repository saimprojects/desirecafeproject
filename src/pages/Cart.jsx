import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useShop } from "../components/ShopContext";
import { aed, api } from "../lib/api";
export default function Cart() {
  const shop = useShop(),
    navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    area: "",
    notes: "",
  });
  const [busy, setBusy] = useState(false),
    sending = useRef(false),
    [error, setError] = useState("");
  const pendingCheckout = useRef(null);
  const settings = shop.data?.settings,
    areas =
      settings?.delivery_areas
        .split("\n")
        .map((x) => x.trim())
        .filter(Boolean) || [];
  const total = shop.subtotal + Number(settings?.delivery_fee || 0);
  const valid =
    shop.lines.length &&
    shop.lines.every((x) => x.valid) &&
    settings?.is_open &&
    shop.subtotal >= Number(settings.minimum_order) &&
    !shop.error;
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  async function submit(e) {
    e.preventDefault();
    if (!valid || sending.current) return;
    sending.current = true;
    setBusy(true);
    setError("");
    const payload = {
      ...form,
      expected_delivery_fee: settings.delivery_fee,
      items: shop.lines.map((x) => ({
        item_id: x.item_id,
        addon_id: x.addon_id,
        option: x.option || "",
        quantity: x.quantity,
        expected_price: x.price.toFixed(2),
      })),
    };
    const fingerprint = JSON.stringify(payload);
    let saved = pendingCheckout.current;
    try {
      saved =
        saved ||
        JSON.parse(sessionStorage.getItem("desires-checkout") || "null");
    } catch {
      /* optional storage */
    }
    const request_key =
      saved?.fingerprint === fingerprint ? saved.key : crypto.randomUUID();
    pendingCheckout.current = { fingerprint, key: request_key };
    try {
      sessionStorage.setItem(
        "desires-checkout",
        JSON.stringify({ fingerprint, key: request_key }),
      );
    } catch {
      /* optional storage */
    }
    try {
      const result = await api("checkout/", { ...payload, request_key });
      pendingCheckout.current = null;
      try {
        sessionStorage.removeItem("desires-checkout");
      } catch {
        /* optional storage */
      }
      shop.clear();
      navigate(`/order/${result.token}`);
    } catch (err) {
      setError(err.message);
      shop.reload();
    } finally {
      sending.current = false;
      setBusy(false);
    }
  }
  return (
    <div className="cafe-shop shop-container checkout-page">
      <span className="eyebrow">A LITTLE HAPPINESS, ON ITS WAY</span>
      <h1>Your cart & checkout</h1>
      <p className="muted">
        No account needed. Freshly prepared, paid on delivery.
      </p>
      {!shop.cart.length ? (
        <div className="empty-state">
          <ShoppingBag size={40} />
          <h2>Your cart is waiting.</h2>
          <p>Find your next favourite on our menu.</p>
          <Link className="cafe-button" to="/menu">
            Explore the menu <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="checkout-grid">
          <div>
            <section className="surface">
              <h2>Your favourites</h2>
              {shop.lines.map((line, index) => (
                <div
                  className="cart-line"
                  key={`${line.item_id}-${line.addon_id}-${line.option || ""}`}
                >
                  <div>
                    <h3>{line.item?.name || "Unavailable item"}</h3>
                    {line.option && <small>{line.option}</small>}
                    {line.addon && <small>{line.addon.name}</small>}
                    <p>{aed(line.price)} each</p>
                    {!line.valid && (
                      <small className="error-text">
                        Unavailable — please remove or choose again.
                      </small>
                    )}
                  </div>
                  <div className="line-actions">
                    <strong>{aed(line.price * line.quantity)}</strong>
                    <div className="quantity">
                      <button
                        disabled={busy}
                        aria-label={`Reduce ${line.item?.name}`}
                        onClick={() => shop.quantity(index, line.quantity - 1)}
                      >
                        <Minus size={14} />
                      </button>
                      <span>{line.quantity}</span>
                      <button
                        disabled={busy || line.quantity >= 50}
                        aria-label={`Increase ${line.item?.name}`}
                        onClick={() => shop.quantity(index, line.quantity + 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      disabled={busy}
                      className="text-button"
                      onClick={() => shop.quantity(index, 0)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <Link to="/menu" className="text-button">
                + Add something else
              </Link>
            </section>
            <section className="surface totals">
              <div>
                <span>Subtotal (VAT inclusive)</span>
                <strong>{aed(shop.subtotal)}</strong>
              </div>
              <div>
                <span>Delivery</span>
                <strong>{aed(settings?.delivery_fee)}</strong>
              </div>
              <div className="grand-total">
                <span>Total to pay on delivery</span>
                <strong>{aed(total)}</strong>
              </div>
              <p>Cash on Delivery only. Please keep the amount ready.</p>
            </section>
          </div>
          <form className="surface checkout-form" onSubmit={submit}>
            <h2>Where should we deliver?</h2>
            <fieldset disabled={busy}>
              <label>
                Full name
                <input
                  name="name"
                  autoComplete="name"
                  maxLength={100}
                  required
                  value={form.name}
                  onChange={change}
                  placeholder="Your name"
                />
              </label>
              <label>
                Phone number
                <input
                  name="phone"
                  autoComplete="tel"
                  type="tel"
                  maxLength={25}
                  required
                  value={form.phone}
                  onChange={change}
                  placeholder="+971 50 123 4567"
                />
              </label>
              {areas.length > 0 && (
                <label>
                  Delivery area
                  <select
                    name="area"
                    required
                    value={form.area}
                    onChange={change}
                  >
                    <option value="">Choose an area</option>
                    {areas.map((a) => (
                      <option key={a}>{a}</option>
                    ))}
                  </select>
                </label>
              )}
              <label>
                Full Delivery Address (Office Number)
                <textarea
                  name="address"
                  autoComplete="street-address"
                  minLength={10}
                  maxLength={1000}
                  required
                  rows={3}
                  value={form.address}
                  onChange={change}
                  placeholder="Building A, Second Floor, D2, Office No 23"
                />
              </label>
              <label>
                Order notes <span className="muted">(optional)</span>
                <textarea
                  name="notes"
                  maxLength={1000}
                  rows={2}
                  value={form.notes}
                  onChange={change}
                  placeholder="Anything we should know?"
                />
              </label>
            </fieldset>
            {(error || shop.error) && (
              <div role="alert" className="error-box">
                {error ||
                  "Connection lost. Please wait before placing your order."}
              </div>
            )}
            {settings && !settings.is_open && (
              <div className="notice-box">Ordering is currently closed.</div>
            )}
            {settings && shop.subtotal < Number(settings.minimum_order) && (
              <div className="notice-box">
                Minimum order: {aed(settings.minimum_order)}
              </div>
            )}
            <button className="cafe-button wide" disabled={!valid || busy}>
              {busy ? "Placing your order…" : `Place order · ${aed(total)}`}{" "}
              <ArrowRight size={17} />
            </button>
            <p className="fine-print">
              Pay in cash when your order arrives. Your details are used to
              fulfil your delivery.
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
