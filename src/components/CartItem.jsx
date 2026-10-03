import { money, imgSrc } from "../utils/format.js";

// Displays one cart line with controls to change the quantity or remove it.
export default function CartItem({ item, onChangeQuantity, onRemove }) {
  const atMin = item.quantity <= 1;
  const atMax = item.quantity >= item.maxQuantity;

  return (
    <li className="cart-item">
      <img src={imgSrc(item.image)} alt={`${item.name} in ${item.color}`} className="cart-item-img" />

      <div className="cart-item-info">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-options">
          Color: {item.color} · Switch: {item.switchType}
        </p>
        <p className="cart-item-options">{money(item.unitPrice)} each</p>

        <div className="qty-controls" role="group" aria-label={`Quantity for ${item.name}`}>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => onChangeQuantity(item.key, -1)}
            disabled={atMin}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="qty-value" aria-live="polite">
            {item.quantity}
          </span>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => onChangeQuantity(item.key, 1)}
            disabled={atMax}
            aria-label="Increase quantity"
          >
            +
          </button>
          <button type="button" className="btn btn-link text-danger ms-2" onClick={() => onRemove(item.key)}>
            Remove
          </button>
        </div>
        {atMax && <p className="cart-note">Maximum of {item.maxQuantity} for this item.</p>}
      </div>

      <p className="cart-item-total">{money(item.quantity * item.unitPrice)}</p>
    </li>
  );
}
