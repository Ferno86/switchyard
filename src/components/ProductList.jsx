import ProductCard from "./ProductCard.jsx";

// Receives the product collection as a prop and uses .map() to create one ProductCard per product.
export default function ProductList({ products, onSelectProduct }) {
  if (products.length === 0) {
    return <p className="empty-note">No keyboards match that filter. Try choosing a different category.</p>;
  }

  return (
    <div className="row g-4">
      {products.map((product) => (
        <div className="col-6 col-lg-4 col-xl-3" key={product.id}>
          <ProductCard product={product} onSelect={onSelectProduct} />
        </div>
      ))}
    </div>
  );
}
