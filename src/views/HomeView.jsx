import ProductList from "../components/ProductList.jsx";

export default function HomeView({ products, onNavigate, onSelectProduct }) {
  const featured = products.filter((p) => p.featuredProduct).slice(0, 4);
  const hero = products.find((p) => p.name === "Pocket 65") || products[0];

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h1 className="hero-title">Keyboards worth typing on.</h1>
              <p className="hero-lead">
                Switchyard makes mechanical keyboards in five layouts, from pocket-size 60% boards to full-size
                keyboards. Pick your switch, pick your color, and start typing.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <button className="btn btn-cta btn-lg" onClick={() => onNavigate("shop")}>
                  Shop all keyboards
                </button>
                <button className="btn btn-outline-dark btn-lg" onClick={() => onSelectProduct(hero.id)}>
                  See the {hero.name}
                </button>
              </div>
            </div>
            <div className="col-lg-6">
              {/* Decorative keycaps: press one to see it move */}
              <div className="keycaps" aria-hidden="true">
                <span className="keycap">T</span>
                <span className="keycap keycap-dark">Y</span>
                <span className="keycap">P</span>
                <span className="keycap keycap-accent">E</span>
                <span className="keycap keycap-space">Switchyard</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <h2>Customer favorites</h2>
          <button className="btn btn-link" onClick={() => onNavigate("shop")}>
            View all {products.length} keyboards
          </button>
        </div>
        <ProductList products={featured} onSelectProduct={onSelectProduct} />
      </section>

      <section className="band">
        <div className="container section">
          <div className="row g-4">
            <div className="col-md-4">
              <h3>Free shipping</h3>
              <p>Orders of $75 or more ship free. Look for the free shipping note on each keyboard.</p>
            </div>
            <div className="col-md-4">
              <h3>30-day returns</h3>
              <p>Type on it for a few weeks. If the feel is not right, send it back for a refund.</p>
            </div>
            <div className="col-md-4">
              <h3>2-year warranty</h3>
              <p>If a key, switch, or board fails in the first two years, we will repair or replace it.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="row g-5 align-items-start">
          <div className="col-lg-6">
            <h2>Built by people who type all day</h2>
            <p>
              Switchyard was built to provide keyboards that give the customer their desirable switch and aesthetic. We know how important it is to have the perfect keyboard that you will be using for long periods of time. We have a variety of keyboards to fit your needs, whether that being a keyboard with your favorite colors or switches that fit your style. 
            </p>
            <p className="mb-0">
              Browse by layout, check the details, then choose your color and switch type. Your cart stays with
              you as you shop.
            </p>
          </div>
          <div className="col-lg-6">
            <h2 className="h3">Which switch is right for you?</h2>
            <ul className="switch-list">
              <li><strong>Linear</strong> Smooth and bump-free. Popular for gaming and fast typing.</li>
              <li><strong>Tactile</strong> A small bump when the key registers. Great all-around for typing.</li>
              <li><strong>Clicky</strong> A bump and an audible click. Loud, and very satisfying.</li>
              <li><strong>Silent</strong> Dampened for shared rooms and late nights.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
