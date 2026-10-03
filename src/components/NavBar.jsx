import { useState } from "react";
import { imgSrc } from "../utils/format.js";

const LINKS = [
  { name: "home", label: "Home" },
  { name: "shop", label: "Shop" },
  { name: "account", label: "Account" },
];

export default function NavBar({ currentView, cartCount, onNavigate }) {
  // Controls the collapsed menu on small screens (Bootstrap's "show" class)
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (event, name) => {
    event.preventDefault();
    setMenuOpen(false);
    onNavigate(name);
  };

  // The create-account page belongs to the Account section; product pages belong to Shop
  const section = currentView === "create-account" ? "account" : currentView === "product" ? "shop" : currentView;

  return (
    <header className="site-header sticky-top">
      <nav className="navbar navbar-expand-md" aria-label="Main navigation">
        <div className="container">
          <a href="#home" className="navbar-brand brand" onClick={(e) => go(e, "home")}>
            <img src={imgSrc("logo.svg")} alt="" width="38" height="38" />
            <span>Switchyard</span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            aria-controls="main-menu"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className={`collapse navbar-collapse justify-content-end ${menuOpen ? "show" : ""}`} id="main-menu">
            <ul className="navbar-nav align-items-md-center gap-md-2">
              {LINKS.map((link) => (
                <li className="nav-item" key={link.name}>
                  <a
                    href={`#${link.name}`}
                    className={`nav-link ${section === link.name ? "active" : ""}`}
                    aria-current={section === link.name ? "page" : undefined}
                    onClick={(e) => go(e, link.name)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="nav-item">
                <a
                  href="#cart"
                  className={`nav-link cart-link ${section === "cart" ? "active" : ""}`}
                  aria-current={section === "cart" ? "page" : undefined}
                  onClick={(e) => go(e, "cart")}
                >
                  Cart
                  <span className="cart-badge" aria-label={`${cartCount} items in cart`}>
                    {cartCount}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
