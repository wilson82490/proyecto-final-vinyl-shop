function ViniloFilters({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  priceSort,
  onPriceSortChange,
  sortBy,
  onSortByChange,
  onReset,
  categories,
}) {
  return (
    <div className="vinilo-filters">
      <div className="vinilo-filters-search">
        <input
          className="search-input"
          type="search"
          placeholder="Buscar por nombre, artista o género..."
          name="search"
          id="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <button
          type="button"
          className="button btn-search"
          onClick={onReset}
        >
          Search
        </button>
      </div>

      <select
        className="category-select"
        name="category"
        id="category"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="all">Todas las categorías</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>

      <select
        className="filter-price"
        name="priceSort"
        id="priceSort"
        value={priceSort}
        onChange={(e) => onPriceSortChange(e.target.value)}
      >
        <option value="">Precio</option>
        <option value="low">Menor a mayor</option>
        <option value="high">Mayor a menor</option>
      </select>

      <select
        className="filter-sort"
        name="sortBy"
        id="sortBy"
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value)}
      >
        <option value="default">Orden por defecto</option>
        <option value="az">A-Z</option>
        <option value="newest">Más nuevo</option>
        <option value="oldest">Más viejo</option>
      </select>
    </div>
  );
}

export default ViniloFilters;
