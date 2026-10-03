import Cart from "../components/Cart.jsx";

export default function CartView({ cartItems, onChangeQuantity, onRemove, onNavigate }) {
  return (
    <div className="container section">
      <h1 className="page-title">Your cart</h1>
      <Cart
        cartItems={cartItems}
        onChangeQuantity={onChangeQuantity}
        onRemove={onRemove}
        onContinueShopping={() => onNavigate("shop")}
      />
    </div>
  );
}
