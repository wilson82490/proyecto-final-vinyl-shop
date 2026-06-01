import { products } from "../data/products";

/* import { useState } from "react"; */
/* import { categories as allCategories } from "../data/categories"; */
import ProductList from "../components/ProductList.jsx";
import SearchBox from "../components/searchbox.jsx";
/* import { useState } from "react"; */
import "../index.css";

function Home() {
  /* const [search, setSearch] = useState(""); */
  /* const [selectedCategory, setSelectedCategory] = useState("Vinilo"); */
 /*  const [sortBy, setSortBy] = useState("default");
 */
  // Empieza con vinilos y aplica filtros
  /* let filteredProducts = products.slice(); */

/*   if (search) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      (product.artist && product.artist.toLowerCase().includes(search.toLowerCase()))
    );
  }

  if (selectedCategory && selectedCategory !== "Vinilo") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === selectedCategory
    );
  }  */

  // Ordenamientos
  /* let sortedProducts = filteredProducts.slice();
  if (sortBy === "az") {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "newest") {
    sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sortBy === "oldest") {
    sortedProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (sortBy === "low") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "high") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } */

   /* const [search, setSearch] = useState(""); */
  const featuredProducts = products.filter((product) => product.featured);

  const newProducts = products
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

/*   const hasResults = filteredProducts.length > 0;

  const categories = allCategories; */

  return (
    <main>
      <section className="hero">
        <div className="container">
          <img
            src="/images/logoEncabezado.svg"
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
            <a className="button" href="#">Explorar discos</a>
            <a className="button" href="#">Suscríbete a novedades</a>
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
