function ViniloFilters({ search, onSearchChange, selectedCategory, setCategoryChange, sortBy, onSortByChange, categories }) {
    return(
        <div className = "vinilo-filters">


            <input
            className="search-input"
            type="search"
            placeholder="Buscar productos..."
            name="search"
            id="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <select
            className="category-select"
            name="category"
            id="category"
            value={selectedCategory}
            onChange={(e) => setCategoryChange(e.target.value)}
          >
            <option value="Vinilo">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            className="filter-price"
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
          >
            <option value="">Precio</option>
            <option value="low">Menor a mayor</option>
            <option value="high">Mayor a menor</option>
          </select>
          <select
            className="filter-price"
            value={sortBy}
            onChange={(event) => onSortByChange(event.target.value)}
          >
            <option value="default">Orden por defecto</option>
            <option value="az">A-Z</option>
            <option value="newest">Más nuevo</option>
            <option value="oldest">Más viejo</option>
          </select>


        </div>
    )
}

export default ViniloFilters;