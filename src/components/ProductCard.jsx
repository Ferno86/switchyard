import { useState } from "react";
import StarRating from "./StarRating.jsx";
import { money, imgSrc, currentPrice, percentOff, maxQuantityFor } from "../utils/format.js";

// Short explanations shown under the switch selector
const SWITCH_HELP = {
  Linear: "Smooth, with no bump. A favorite for gaming and fast typing.",
  Tactile: "A small bump tells you the key registered. Great for typing.",
  Clicky: "A tactile bump plus an audible click. Loud, and satisfying.",
  Silent: "Dampened so it stays quiet in shared rooms.",
};

/*
  One component, two looks:
  - Compact card (default): used inside ProductList on the Shop and Home views. Click to open details.
  - Detailed card (detailed prop): shows every field, the option selectors, and the Add to Cart form.
*/
export default function ProductCard({ product, detailed = false, onSelect, onAddToCart, onViewCart }) {
  return detailed ? (
    <DetailedCard product={product} onAddToCart={onAddToCart} onViewCart={onViewCart} />
  ) : (
    <CompactCard product={product} onSelect={onSelect} />
  );
}

function CompactCard({ product, onSelect }) {
  const soldOut = product.quantityInStock === 0;
  const off = percentOff(product);

  const handleKey = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(product.id);
    }
  };

  return (
    <article
      className="product-card card h-100"
      role="link"
      tabIndex={0}
      aria-label={`${product.name}, ${money(currentPrice(product))}. View details`}
      onClick={() => onSelect(product.id)}
      onKeyDown={handleKey}
    >
      <div className="product-card-media">
        <img src={imgSrc(product.thumbnail)} alt={`${product.name} in ${product.colors[0]}`} loading="lazy" />
        <div className="product-badges">
          {off > 0 && <span className="badge badge-sale">{off}% off</span>}
          {product.newArrival && <span className="badge badge-new">New</span>}
          {soldOut && <span className="badge badge-sold">Sold out</span>}
        </div>
      </div>
      <div className="card-body d-flex flex-column">
        <p className="product-category mb-1">
          {product.layout} layout · {product.wireless ? "Wireless" : "Wired"}
        </p>
        <h3 className="product-name">{product.name}</h3>
        <StarRating rating={product.rating} reviews={product.numberOfReviews} />
        <p className="product-blurb">{product.description}</p>
        <div className="mt-auto">
          <PriceLine product={product} />
          <p className="product-colors mb-0">
            {product.colors.length} {product.colors.length === 1 ? "color" : "colors"} ·{" "}
            {product.switchOptions.length} switch types
            {product.freeShipping && " · Free shipping"}
          </p>
        </div>
      </div>
    </article>
  );
}

function PriceLine({ product }) {
  return (
    <p className="price-line mb-1">
      <span className={product.salePrice ? "price price-sale" : "price"}>{money(currentPrice(product))}</span>
      {product.salePrice && <span className="price-was">{money(product.price)}</span>}
    </p>
  );
}

function DetailedCard({ product, onAddToCart, onViewCart }) {
  // Selected options live in state until the shopper adds them to the cart
  const [color, setColor] = useState(product.colors[0]);
  const [switchType, setSwitchType] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [switchError, setSwitchError] = useState("");
  const [notice, setNotice] = useState(null);

  const stock = product.quantityInStock;
  const maxQty = maxQuantityFor(product);
  const soldOut = stock === 0;
  const off = percentOff(product);
  const help = switchType ? SWITCH_HELP[switchType.split(" ")[0]] : "Choose the feel you want under your fingers.";

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!switchType) {
      setSwitchError("Select a switch type before adding to cart.");
      return;
    }
    const result = onAddToCart({ product, switchType, color, quantity });
    setNotice(
      result.capped
        ? { type: "warning", text: `Added. You can buy up to ${result.limit} of this keyboard.` }
        : { type: "success", text: `Added ${quantity} × ${product.name} (${color}, ${switchType}) to your cart.` }
    );
  };

  const details = [
    ["Layout", `${product.layout} (${product.keyCount} keys)`],
    ["Connectivity", product.connectivity],
    ["Case", product.caseMaterial],
    ["Keycaps", `${product.keycapMaterial} keycaps`],
    ["Hot-swappable", product.hotSwappable ? "Yes" : "No"],
    ["Backlight", product.backlight],
    ["Weight", product.weight],
    ["Category", product.category],
    ["SKU", product.sku],
  ];

  return (
    <article className="row g-4 product-detail">
      <div className="col-lg-5">
        <div className="detail-media">
          <img src={imgSrc(product.colorImages[color])} alt={`${product.name} in ${color}`} />
        </div>
      </div>

      <div className="col-md-7 col-lg-4">
        <p className="product-category mb-1">{product.category}</p>
        <h1 className="detail-title">{product.name}</h1>
        <p className="text-muted mb-2">by {product.brand}</p>
        <StarRating rating={product.rating} reviews={product.numberOfReviews} />

        <p className="price-line my-3">
          <span className={product.salePrice ? "price price-lg price-sale" : "price price-lg"}>
            {money(currentPrice(product))}
          </span>
          {product.salePrice && <span className="price-was">{money(product.price)}</span>}
          {off > 0 && <span className="badge badge-sale ms-2">{off}% off</span>}
          {product.newArrival && <span className="badge badge-new ms-2">New</span>}
        </p>

        <p>{product.longDescription}</p>

        <ul className="feature-list">
          {product.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>

        <div className="perks">
          {product.freeShipping && <span>Free shipping</span>}
          <span>30-day returns</span>
          <span>2-year warranty</span>
        </div>

        <h2 className="h5 mt-4">Product details</h2>
        <dl className="spec-grid">
          {details.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="col-md-5 col-lg-3">
        <form className="buy-box" onSubmit={handleSubmit} noValidate>
          <fieldset className="mb-3">
            <legend className="buy-label">
              Color: <span className="fw-normal">{color}</span>
            </legend>
            <div className="swatches">
              {product.colors.map((c) => (
                <button
                  type="button"
                  key={c}
                  className={`swatch ${c === color ? "selected" : ""}`}
                  style={{ backgroundColor: product.colorHex[c] }}
                  aria-label={c}
                  aria-pressed={c === color}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </fieldset>

          <div className="mb-3">
            <label htmlFor="switch" className="buy-label">
              Switch type
            </label>
            <select
              id="switch"
              className={`form-select ${switchError ? "is-invalid" : ""}`}
              value={switchType}
              disabled={soldOut}
              onChange={(e) => {
                setSwitchType(e.target.value);
                setSwitchError("");
              }}
              aria-describedby="switch-error switch-help"
            >
              <option value="">Select a switch</option>
              {product.switchOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <div id="switch-error" className="invalid-feedback">
              {switchError}
            </div>
            <div id="switch-help" className="form-text">
              {help}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="quantity" className="buy-label">
              Quantity
            </label>
            <select
              id="quantity"
              className="form-select quantity-select"
              value={quantity}
              disabled={soldOut}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {Array.from({ length: Math.max(maxQty, 1) }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <p className={`stock ${soldOut ? "stock-out" : stock <= 10 ? "stock-low" : "stock-in"}`}>
            {soldOut ? "Out of stock" : stock <= 10 ? `Only ${stock} left` : `In stock (${stock} available)`}
          </p>

          <button type="submit" className="btn btn-cta w-100" disabled={soldOut}>
            {soldOut ? "Sold out" : "Add to cart"}
          </button>

          {notice && (
            <div className={`alert alert-${notice.type} mt-3 mb-0`} role="status">
              {notice.text}{" "}
              <button type="button" className="btn btn-link p-0 align-baseline" onClick={onViewCart}>
                View cart
              </button>
            </div>
          )}
        </form>
      </div>
    </article>
  );
}
