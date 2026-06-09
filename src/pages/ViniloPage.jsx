/* import { useState } from "react";
import { categories as allCategories } from "../data/categories";
import { useProducts } from "../hooks/useProducts";
import ProductList from "../components/ProductList.jsx";
import ViniloFilters from "../components/ViniloFilters.jsx";
import useFilteredSortedVinyl from "../hooks/useFilteredSortedVinyl.jsx";

function ViniloPage() {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Vinilo");
  const [sortBy, setSortBy] = useState("default");



  const { filteredProducts, sortedProducts } = useFilteredSortedVinyl(
    products,
    search,
    selectedCategory,
    sortBy
  );

  const hasResults = filteredProducts.length > 0;
  const categories = allCategories;

  if (loading) {
    return <p className="empty-message">Cargando Vinilos...</p>;
  }

  if (error) {
    return <p className="empty-error">{error}</p>;
  }

    return (
        <main>
           <section className="catalog-section">
        <div className="container">
          <ViniloFilters
            search={search}
            onSearchChange={setSearch}
            selectedCategory={selectedCategory}
            setCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            categories={categories}
          />
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
} */

/* import { useState, useEffect } from "react";
import { categories as allCategories } from "../data/categories";
import { getVinyls, } from "../services/vinylsService";
import ProductList from "../components/ProductList";
import ViniloFilters from "../components/ViniloFilters";
import useFilteredSortedVinyl from "../hooks/useFilteredSortedVinyl";

function ViniloPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Vinilo");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const data = await getVinyls();

        setProducts(data);
        setError("");
      } catch (err) {
        setError(err.message || "Error al cargar los vinilos");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const { filteredProducts, sortedProducts } = useFilteredSortedVinyl(
    products,
    search,
    selectedCategory,
    sortBy
  );

  const hasResults = filteredProducts.length > 0;
  const categories = allCategories;

  if (loading) {
    return <p className="empty-message">Cargando Vinilos...</p>;
  }

  if (error) {
    return <p className="empty-error">{error}</p>;
  }

  return (
    <main>
      <section className="catalog-section">
        <div className="container">
          <ViniloFilters
            search={search}
            onSearchChange={setSearch}
            selectedCategory={selectedCategory}
            setCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            categories={categories}
          />

          {search && !hasResults && (
            <p className="empty-message">
              No encontramos resultados para "{search}"
            </p>
          )}

          {hasResults && (
            <ProductList products={sortedProducts} />
          )}
        </div>
      </section>
    </main>
  );
}

export default ViniloPage;
 */




import { useContext, useState } from "react";
import { ProductsContext } from "../context/products-context";
import { categories as allCategories } from "../data/categories";
import ProductList from "../components/ProductList";
import ViniloFilters from "../components/ViniloFilters";
import useFilteredSortedVinyl from "../hooks/useFilteredSortedVinyl";

function ViniloPage() {
  const { products, loading, error } = useContext(ProductsContext);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Vinilo");
  const [sortBy, setSortBy] = useState("default");

  const { filteredProducts, sortedProducts } = useFilteredSortedVinyl(
    products,
    search,
    selectedCategory,
    sortBy
  );

  const hasResults = filteredProducts.length > 0;

  if (loading) {
    return <p className="empty-message">Cargando Vinilos...</p>;
  }

  if (error) {
    return <p className="empty-error">{error}</p>;
  }

  return (
    <main>
      <section className="catalog-section">
        <div className="container">
          <ViniloFilters
            search={search}
            onSearchChange={setSearch}
            selectedCategory={selectedCategory}
            setCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            categories={allCategories}
          />

          {search && !hasResults && (
            <p className="empty-message">
              No encontramos resultados para "{search}"
            </p>
          )}

          {hasResults && (
            <ProductList products={sortedProducts} />
          )}
        </div>
      </section>
    </main>
  );
}

export default ViniloPage;