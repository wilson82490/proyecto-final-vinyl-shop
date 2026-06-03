import { Link } from "react-router-dom";
import ProductList from "../components/ProductList.jsx";
import SearchBox from "../components/SearchBox.jsx";
import { useProducts } from "../hooks/useProducts";
/* import { useState } from "react"; */
import "../index.css";

function Home() {
  const { products } = useProducts();
  const featuredProducts = products.filter((product) => product.featured);

  const newProducts = products
    .slice()
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
          <SearchBox products={products}/>
         {/*   <input
            className="search-input"
            type="text"
            placeholder="Buscar productos..."
            name="search"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          /> */}

          

        

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
     

      {/* <section className="catalog-section">
        <div className="container">
          <input
            className="search-input"
            type="text"
            placeholder="Buscar productos..."
            name="search"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="category-select"
            name="category"
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            className="filter-price"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Precio</option>
            <option value="low">Menor a mayor</option>
            <option value="high">Mayor a menor</option>
          </select>
          <select
            className="filter-price"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="default">Orden por defecto</option>
            <option value="az">A-Z</option>
            <option value="newest">Más nuevo</option>
            <option value="oldest">Más viejo</option>
          </select>

          {search && !hasResults && (
            <p className="empty-message">
              No encontramos resultados para "{search}"
            </p>
          )}
          {hasResults && <ProductList products={sortedProducts} />}
        </div>
      </section> */}

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
