import { Link } from "react-router-dom";
import ProductList from "../components/ProductList.jsx";
import SearchBox from "../components/SearchBox.jsx";
import { useProducts } from "../hooks/useProducts";
import "../index.css";

function Home() {
  const { products } = useProducts();
  const featuredProducts = products.filter(
    (product) => product.featured === true
  );

  const newProducts = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <main>
      <section className="hero">
        <div className="container">
          <img
            src="/images/logo-header.png"
            alt="Logo Vinyl Corner"
            className="hero-logo"
          />
          <SearchBox products={products} />

          <h1 className="hero-title">Vinyl Corner — Tu tienda de discos</h1>

          <p className="hero-description">
            Compra vinilos originales, reediciones y joyas para coleccionistas.
          </p>

          <div className="hero-actions">
            <Link className="button" to="/discos">
              Explorar discos
            </Link>
            <Link className="button" to="/discos">
              Ver novedades
            </Link>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <h2>· Vinilos Destacados·</h2>

          <ProductList products={featuredProducts} />
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <h2>· Novedades ·</h2>

          <ProductList products={newProducts} />
        </div>
      </section>
    </main>
  );
}

export default Home;
