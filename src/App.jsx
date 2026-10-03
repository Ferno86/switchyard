import { useState } from "react";
import products from "./data/products.json";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import HomeView from "./views/HomeView.jsx";
import ShopView from "./views/ShopView.jsx";
import ProductDetailView from "./views/ProductDetailView.jsx";
import AccountView from "./views/AccountView.jsx";
import CreateAccountView from "./views/CreateAccountView.jsx";
import CartView from "./views/CartView.jsx";
import { cartCount } from "./utils/cart.js";
import { currentPrice, maxQuantityFor } from "./utils/format.js";

export default function App() {
  // Which view is showing (and which product, for the detail view)
  const [view, setView] = useState({ name: "home", productId: null });
  // The one shared shopping cart: every component reads from this array
  const [cartItems, setCartItems] = useState([]);

  const navigate = (name, productId = null) => {
    setView({ name, productId });
    window.scrollTo(0, 0);
  };

  // Add a selection to the cart. Same product + switch + color merges into one line.
  const addToCart = ({ product, switchType, color, quantity }) => {
    const key = `${product.id}|${switchType}|${color}`;
    const limit = maxQuantityFor(product);
    const existing = cartItems.find((item) => item.key === key);
    const current = existing ? existing.quantity : 0;
    const newQuantity = Math.min(current + quantity, limit);

    if (existing) {
      setCartItems(cartItems.map((item) => (item.key === key ? { ...item, quantity: newQuantity } : item)));
    } else {
      setCartItems([
        ...cartItems,
        {
          key,
          productId: product.id,
          name: product.name,
          image: product.colorImages[color],
          switchType,
          color,
          quantity: newQuantity,
          unitPrice: currentPrice(product),
          maxQuantity: limit,
        },
      ]);
    }
    return { capped: current + quantity > limit, limit };
  };

  // delta is +1 or -1; quantity always stays between 1 and the item's maximum
  const changeQuantity = (key, delta) => {
    setCartItems(
      cartItems.map((item) =>
        item.key === key
          ? { ...item, quantity: Math.max(1, Math.min(item.maxQuantity, item.quantity + delta)) }
          : item
      )
    );
  };

  const removeItem = (key) => setCartItems(cartItems.filter((item) => item.key !== key));

  let content;
  switch (view.name) {
    case "shop":
      content = <ShopView products={products} onSelectProduct={(id) => navigate("product", id)} />;
      break;
    case "product":
      content = (
        <ProductDetailView
          product={products.find((p) => p.id === view.productId)}
          onAddToCart={addToCart}
          onNavigate={navigate}
        />
      );
      break;
    case "account":
      content = <AccountView onNavigate={navigate} />;
      break;
    case "create-account":
      content = <CreateAccountView onNavigate={navigate} />;
      break;
    case "cart":
      content = (
        <CartView
          cartItems={cartItems}
          onChangeQuantity={changeQuantity}
          onRemove={removeItem}
          onNavigate={navigate}
        />
      );
      break;
    default:
      content = (
        <HomeView products={products} onNavigate={navigate} onSelectProduct={(id) => navigate("product", id)} />
      );
  }

  return (
    <div className="app d-flex flex-column min-vh-100">
      <NavBar currentView={view.name} cartCount={cartCount(cartItems)} onNavigate={navigate} />
      <main className="flex-grow-1">{content}</main>
      <Footer onNavigate={navigate} />
    </div>
  );
}
