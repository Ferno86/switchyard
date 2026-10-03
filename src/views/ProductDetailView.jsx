import ProductCard from "../components/ProductCard.jsx";

export default function ProductDetailView({ product, onAddToCart, onNavigate }) {
  if (!product) {
    return (
      <div className="container section">
        <h1 className="page-title">We couldn't find that keyboard</h1>
        <button className="btn btn-cta" onClick={() => onNavigate("shop")}>
          Back to the shop
        </button>
      </div>
    );
  }

  const go = (event, name) => {
    event.preventDefault();
    onNavigate(name);
  };

  return (
    <div className="container section">
      <nav aria-label="Breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#home" onClick={(e) => go(e, "home")}>Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#shop" onClick={(e) => go(e, "shop")}>Shop</a>
          </li>
          <li className="breadcrumb-item">{product.category}</li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* key resets the selected options when the shopper opens a different product */}
      <ProductCard
        key={product.id}
        product={product}
        detailed
        onAddToCart={onAddToCart}
        onViewCart={() => onNavigate("cart")}
      />
    </div>
  );
}
