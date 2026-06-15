import { Link } from "react-router-dom";
import ProductList from "../components/ProductList.jsx";
import SearchBox from "../components/SearchBox.jsx";
import { useProducts } from "../hooks/useProducts";
import "../index.css";

function Home() {
  const { products, loading, error } = useProducts();

  const featuredFromDb = products.filter((product) => product.featured);
  const featuredProducts =
    featuredFromDb.length > 0 ? featuredFromDb : products.slice(0, 2);

  const newProducts = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  if (loading) {
    return <p className="loading-message">Cargando vinilos...</p>;
  }

  return (
    <main>
      <section className="hero">
        <div className="container">
          <div className="hero-logo-wrap">
            <img
              src="/images/logoEncabezadero.png"
              alt="Logo Vinyl Corner"
              className="hero-logo"
            />
          </div>
          <SearchBox products={products} />

          <h1 className="hero-title">Mezcal Records — Tu tienda de discos</h1>

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

      {error && (
        <p className="error-message" role="alert">
          No se pudo conectar con la API. Mostrando datos locales.
        </p>
      )}

      <section className="featured-section">
        <div className="container">
          <h2>· Vinilos Destacados·</h2>

          {featuredProducts.length > 0 ? (
            <ProductList products={featuredProducts} />
          ) : (
            <p className="empty-message">No hay vinilos destacados.</p>
          )}
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <h2>· Novedades ·</h2>

          {newProducts.length > 0 ? (
            <ProductList products={newProducts} />
          ) : (
            <p className="empty-message">No hay novedades disponibles.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default Home;
