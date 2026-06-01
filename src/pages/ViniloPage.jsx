import { useState } from "react";
import { categories as allCategories } from "../data/categories";
import { products } from "../data/products";
import ProductList from "../components/ProductList.jsx";
import ViniloFilters from "../components/ViniloFilters.jsx";
import useFilteredSortedVinyl from "../hooks/useFilteredSortedVinyl.jsx";




function ViniloPage() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Vinilo");
    const [sortBy, setSortBy] = useState("default");
    const { filteredProducts, sortedProducts } = useFilteredSortedVinyl(
        products,
        search,
        selectedCategory,
        sortBy
    )


    // Empieza con vinilos y aplica filtros
      
    
      // Ordenamientos
      


       const hasResults = filteredProducts.length > 0;

       const categories = allCategories;

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
}

export default ViniloPage;