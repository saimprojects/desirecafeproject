import { useState } from "react";
import { Link } from "react-router-dom";
import { Coffee, Plus, Search, ShoppingBag, Star } from "lucide-react";
import { useShop } from "../components/ShopContext";
import { aed } from "../lib/api";
function MenuCard({ item, addons, open, add }) {
  const [addon, setAddon] = useState("");
  return (
    <article className="menu-product">
      <div className="product-top">
        <Coffee size={25} />
        <span>
          {item.popular && (
            <>
              <Star size={12} fill="currentColor" /> House favourite
            </>
          )}
        </span>
      </div>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      {item.allows_milk && (
        <select
          aria-label={`Milk option for ${item.name}`}
          value={addon}
          onChange={(e) => setAddon(e.target.value)}
        >
          <option value="">Standard milk</option>
          {addons
            .filter((a) => a.available)
            .map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} + {aed(a.price)}
              </option>
            ))}
        </select>
      )}
      <div className="product-bottom">
        <strong>{aed(item.price)}</strong>
        <button
          className="cafe-button"
          disabled={!item.available || !open}
          onClick={() => add(item, addon ? Number(addon) : null)}
        >
          <Plus size={16} />
          {!item.available ? "Sold out" : "Add to cart"}
        </button>
      </div>
    </article>
  );
}
export default function OrderMenu() {
  const shop = useShop();
  const [category, setCategory] = useState("all"),
    [search, setSearch] = useState("");
  const groups = shop.data?.categories || [],
    addons = groups.filter((g) => g.is_addon).flatMap((g) => g.items);
  const displayed = groups
    .filter((g) => !g.is_addon && (category === "all" || category === g.key))
    .map((g) => ({
      ...g,
      items: g.items.filter((i) =>
        `${i.name} ${i.description}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    }))
    .filter((g) => g.items.length);
  return (
    <div className="cafe-shop">
      <section className="menu-hero">
        <span className="eyebrow">DESIRES CAFÉ · MADE WITH LOVE</span>
        <h1>
          Your daily dose
          <br />
          of something lovely.
        </h1>
        <p>Signature sips, slow moments, and your favourites delivered.</p>
        <span className="hero-pill">
          AED · VAT inclusive · Cash on Delivery
        </span>
      </section>
      <div className="shop-container">
        {shop.error && (
          <div className="error-box">
            Menu connection interrupted. {shop.error.message}{" "}
            <button onClick={shop.reload}>Retry</button>
          </div>
        )}
        {!shop.data ? (
          <div className="empty-state">Brewing the menu…</div>
        ) : (
          <>
            {!shop.data.settings.is_open && (
              <div className="notice-box">
                We’re currently closed for orders. You can still browse our
                menu.
              </div>
            )}
            <div className="menu-toolbar">
              <div className="search-field">
                <Search size={18} />
                <input
                  placeholder="Find your favourite…"
                  aria-label="Search menu"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Link className="cafe-button" to="/cart">
                <ShoppingBag size={17} /> Your bag ({shop.count})
              </Link>
            </div>
            <div className="category-tabs">
              <button
                className={category === "all" ? "active" : ""}
                onClick={() => setCategory("all")}
              >
                All favourites
              </button>
              {groups
                .filter((g) => !g.is_addon)
                .map((g) => (
                  <button
                    className={category === g.key ? "active" : ""}
                    key={g.id}
                    onClick={() => setCategory(g.key)}
                  >
                    {g.name}
                  </button>
                ))}
            </div>
            {displayed.map((g) => (
              <section className="menu-section" key={g.id}>
                <div className="section-heading">
                  <h2>{g.name}</h2>
                  <span>{g.items.length} selections</span>
                </div>
                <div className="menu-grid">
                  {g.items.map((item) => (
                    <MenuCard
                      key={item.id}
                      item={item}
                      addons={addons}
                      open={shop.data.settings.is_open && !shop.error}
                      add={shop.add}
                    />
                  ))}
                </div>
              </section>
            ))}
            {!displayed.length && (
              <div className="empty-state">
                No favourites found. Try a different search.
              </div>
            )}
            {!!addons.length && (
              <div className="addon-note">
                <h3>Make it yours</h3>
                <p>
                  Milk alternatives available on selected drinks:{" "}
                  {addons.map((a) => `${a.name} (${aed(a.price)})`).join(" · ")}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
