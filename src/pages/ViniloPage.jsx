import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { categories as allCategories } from "../data/categories";
import { useProducts } from "../hooks/useProducts";
import ProductList from "../components/ProductList";
import ViniloFilters from "../components/ViniloFilters";
import useFilteredSortedVinyl from "../hooks/useFilteredSortedVinyl";

function ViniloPage() {
  const { products, loading, error } = useProducts();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceSort, setPriceSort] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const handlePriceSortChange = (value) => {
    setPriceSort(value);
    if (value) setSortBy("default");
  };

  const handleSortByChange = (value) => {
    setSortBy(value);
    if (value !== "default") setPriceSort("");
  };

  const handleResetFilters = () => {
    setSearch("");
    setSelectedCategory("all");
    setPriceSort("");
    setSortBy("default");
  };

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (!categoryFromUrl) return;

    const categoryExists = allCategories.some(
      (entry) => entry.name === categoryFromUrl
    );

    if (categoryFromUrl === "all" || categoryExists) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  const { filteredProducts, sortedProducts } = useFilteredSortedVinyl(
    products,
    search,
    selectedCategory,
    priceSort,
    sortBy
  );

  const hasActiveFilters =
    search.trim() !== "" ||
    selectedCategory !== "all" ||
    priceSort !== "" ||
    sortBy !== "default";

  const hasResults = filteredProducts.length > 0;

  if (loading) {
    return <p className="empty-message">Cargando vinilos...</p>;
  }

  if (error) {
    return <p className="empty-error">{error}</p>;
  }

  return (
    <main>
      <section className="catalog-section">
        <div className="container">
          <h2>Catálogo de Discos</h2>

          <ViniloFilters
            search={search}
            onSearchChange={setSearch}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceSort={priceSort}
            onPriceSortChange={handlePriceSortChange}
            sortBy={sortBy}
            onSortByChange={handleSortByChange}
            onReset={handleResetFilters}
            categories={allCategories}
          />

          {!hasResults && hasActiveFilters && (
            <p className="empty-message">
              No encontramos resultados
              {search.trim() ? ` para "${search.trim()}"` : ""}
              {selectedCategory !== "all" ? ` en ${selectedCategory}` : ""}.
            </p>
          )}

          {!hasResults && !hasActiveFilters && (
            <p className="empty-message">No hay vinilos disponibles.</p>
          )}

          {hasResults && <ProductList products={sortedProducts} />}
        </div>
      </section>
    </main>
  );
}

export default ViniloPage;
