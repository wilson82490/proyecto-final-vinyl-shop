import "./Navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/images/logoNavbar.svg" alt="Logo Vinilos" />
      </div>

      {/* Botón Hamburguesa */}
      <button
        className={`navbar-menu-toggle ${isMenuOpen ? "active" : ""}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Overlay */}
      {isMenuOpen && (
        <div className="navbar-overlay" onClick={closeMenu}></div>
      )}

      {/* Menú Izquierdo - Drawer en móvil */}
      <div className={`navbar-left ${isMenuOpen ? "open" : ""}`}>
        <Link to="/" onClick={closeMenu}>Inicio</Link>
        <Link to="/discos" onClick={closeMenu}>Discos</Link>
        <a href="#" onClick={closeMenu}>Géneros</a>
        <a href="#" onClick={closeMenu}>Novedades</a>
        
        {/* Botones en menú móvil */}
        <div className="navbar-mobile-buttons">
          <a href="#" className="mobile-link" onClick={closeMenu}>Registro</a>
          <a href="#" className="btn-login mobile-link" onClick={closeMenu}>Entrar</a>
          <Link to="/admin" className="btn-admin mobile-link" onClick={closeMenu}>Admin</Link>
        </div>
      </div>

      <div className="navbar-right">
        <a href="#">Registro</a>
        <a href="#" className="btn-login">Entrar</a>
        <Link to="/admin" className="btn-admin">Admin</Link>
      </div>
    </nav>
  );
}

export default Navbar;
