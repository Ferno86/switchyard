import CartItem from "./CartItem.jsx";
import { cartCount, cartSubtotal } from "../utils/cart.js";
import { money } from "../utils/format.js";

// Receives cartItems[] as a prop; count and subtotal are calculated from it, never stored separately.
export default function Cart({ cartItems, onChangeQuantity, onRemove, onContinueShopping }) {
  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2 className="h4">Your cart is empty</h2>
        <p>Choose a keyboard and a switch type, and it will show up here.</p>
        <button className="btn btn-cta" onClick={onContinueShopping}>
          Shop all keyboards
        </button>
      </div>
    );
  }

  return (
    <div className="row g-4">
      <div className="col-lg-8">
        <ul className="cart-list">
          {cartItems.map((item) => (
            <CartItem key={item.key} item={item} onChangeQuantity={onChangeQuantity} onRemove={onRemove} />
          ))}
        </ul>
      </div>

      <div className="col-lg-4">
        <aside className="cart-summary" aria-label="Order summary">
          <h2 className="h5">Order summary</h2>
          <dl className="summary-rows">
            <div>
              <dt>Items in cart</dt>
              <dd>{cartCount(cartItems)}</dd>
            </div>
            <div className="summary-total">
              <dt>Subtotal</dt>
              <dd>{money(cartSubtotal(cartItems))}</dd>
            </div>
          </dl>
          <button className="btn btn-cta w-100" disabled>
            Checkout
          </button>
          <p className="summary-note">Checkout is not part of this project, so no payment is taken.</p>
          <button className="btn btn-link p-0" onClick={onContinueShopping}>
            Continue shopping
          </button>
        </aside>
      </div>
    </div>
  );
}
