function useFilteredSortedVinyl(products, search, selectedCategory, priceSort, sortBy) {
  let filteredProducts = products.slice();

  const normalizedSearch = search.trim().toLowerCase();

  if (normalizedSearch) {
    filteredProducts = filteredProducts.filter((product) => {
      const name = product.name?.toLowerCase() || "";
      const artist = product.artist?.toLowerCase() || "";
      const category = product.category?.toLowerCase() || "";

      return (
        name.includes(normalizedSearch) ||
        artist.includes(normalizedSearch) ||
        category.includes(normalizedSearch)
      );
    });
  }

  if (selectedCategory && selectedCategory !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === selectedCategory
    );
  }

  const sortedProducts = filteredProducts.slice();

  if (priceSort === "low") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (priceSort === "high") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "az") {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "newest") {
    sortedProducts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  } else if (sortBy === "oldest") {
    sortedProducts.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  }

  return { filteredProducts, sortedProducts };
}

export default useFilteredSortedVinyl;
