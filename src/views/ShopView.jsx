import { useState } from "react";
import ProductList from "../components/ProductList.jsx";
import Pagination from "../components/Pagination.jsx";
import { currentPrice } from "../utils/format.js";

const PAGE_SIZE = 10;

export default function ShopView({ products, onSelectProduct }) {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  let shown = category === "All" ? products : products.filter((p) => p.category === category);
  shown = [...shown];
  if (sort === "price-low") shown.sort((a, b) => currentPrice(a) - currentPrice(b));
  if (sort === "price-high") shown.sort((a, b) => currentPrice(b) - currentPrice(a));
  if (sort === "rating") shown.sort((a, b) => b.rating - a.rating);
  if (sort === "featured") shown.sort((a, b) => Number(b.featuredProduct) - Number(a.featuredProduct) || a.id - b.id);

  const start = (page - 1) * PAGE_SIZE;
  const pageItems = shown.slice(start, start + PAGE_SIZE);

  return (
    <div className="container section">
      <h1 className="page-title">Shop all keyboards</h1>

      <div className="shop-controls">
        <div className="btn-group flex-wrap" role="group" aria-label="Filter by category">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={`btn btn-filter ${c === category ? "active" : ""}`}
              aria-pressed={c === category}
              onClick={() => {
                setCategory(c);
                setPage(1);
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="sort-box">
          <label htmlFor="sort" className="form-label mb-0">
            Sort by
          </label>
          <select
            id="sort"
            className="form-select form-select-sm"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
      </div>

      <p className="results-count" aria-live="polite">
        {shown.length === 0
          ? "No keyboards found"
          : `Showing ${start + 1}–${start + pageItems.length} of ${shown.length} keyboards`}
      </p>

      <ProductList products={pageItems} onSelectProduct={onSelectProduct} />

      <Pagination
        totalItems={shown.length}
        pageSize={PAGE_SIZE}
        currentPage={page}
        onPageChange={(p) => {
          setPage(p);
          window.scrollTo(0, 0);
        }}
      />
    </div>
  );
}
