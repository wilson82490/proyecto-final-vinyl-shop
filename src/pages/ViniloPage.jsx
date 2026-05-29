import { useState } from "react";
import { categories as allCategories } from "../data/categories";
import { products } from "../data/products";
import ProductList from "../components/ProductList.jsx";




function ViniloPage() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Vinilo");
    const [sortBy, setSortBy] = useState("default");


    // Empieza con vinilos y aplica filtros
      let filteredProducts = products.slice();
    
      if (search) {
        filteredProducts = filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          (product.artist && product.artist.toLowerCase().includes(search.toLowerCase()))
        );
      }
    
      if (selectedCategory && selectedCategory !== "Vinilo") {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === selectedCategory
        );
      }
    
      // Ordenamientos
      let sortedProducts = filteredProducts.slice();
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
      }



       const hasResults = filteredProducts.length > 0;

       const categories = allCategories;

    return (
        <main>
           <section className="catalog-section">
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
      </section>
        </main>

    )
}

export default ViniloPage;