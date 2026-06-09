import "./Navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { categories } from "../data/categories";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const { itemCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsCategoriesOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/images/logoNavbar.svg" alt="Logo Vinilos" />
      </div>

      <button
        className={`navbar-menu-toggle ${isMenuOpen ? "active" : ""}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {isMenuOpen && (
        <div className="navbar-overlay" onClick={closeMenu}></div>
      )}

      <div className={`navbar-left ${isMenuOpen ? "open" : ""}`}>
        <Link to="/" onClick={closeMenu}>Inicio</Link>
        <Link to="/discos" onClick={closeMenu}>Discos</Link>
        <div className="navbar-categories">
          <button
            type="button"
            className="navbar-categories-trigger"
            onClick={() => setIsCategoriesOpen((prev) => !prev)}
            aria-expanded={isCategoriesOpen}
          >
            Categorías
          </button>
          {isCategoriesOpen && (
            <div className="navbar-categories-menu">
              <Link
                to="/discos?category=all"
                onClick={closeMenu}
                className="navbar-categories-item"
              >
                Todas
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/discos?category=${encodeURIComponent(category.name)}`}
                  onClick={closeMenu}
                  className="navbar-categories-item"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="navbar-mobile-buttons">
          {!isAuthenticated ? (
            <>
              <Link to="/registro" className="mobile-link" onClick={closeMenu}>Registro</Link>
              <Link to="/login" className="btn-login mobile-link" onClick={closeMenu}>Entrar</Link>
            </>
          ) : (
            <>
              <span className="mobile-user">Hola, {user?.name}</span>
              <button
                type="button"
                className="btn-login mobile-link"
                onClick={() => {
                  logout();
                  closeMenu();
                }}
              >
                Cerrar sesión
              </button>
            </>
          )}
          <Link to="/admin" className="btn-admin mobile-link" onClick={closeMenu}>Admin</Link>
        </div>
      </div>

      <div className="navbar-right">
        <Link to="/carrito" className="btn-cart">
          Carrito
          {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
        </Link>
        {!isAuthenticated ? (
          <>
            <Link to="/registro">Registro</Link>
            <Link to="/login" className="btn-login">Entrar</Link>
          </>
        ) : (
          <>
            <span className="navbar-user">Hola, {user?.name}</span>
            <button type="button" className="btn-login" onClick={logout}>
              Cerrar sesión
            </button>
          </>
        )}
        <Link to="/admin" className="btn-admin">Admin</Link>
      </div>
    </nav>
  );
}

export default Navbar;
