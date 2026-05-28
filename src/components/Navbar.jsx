import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

       <div className="navbar-logo">
        <img src="/images/logoNavbar.svg" alt="Logo Vinilos" />
      </div>

      <div className="navbar-left">
        <a href="/">Inicio</a>
        <a href="/discos">Discos</a>
        <a href="#">Géneros</a>
        <a href="#">Novedades</a>
      </div>

      <div className="navbar-right">
        <a href="#">Registro</a>
        <a href="#" className="btn-login">Entrar</a>
      </div>
    </nav>
  );
}

export default Navbar;
