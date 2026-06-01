function useFilteredSortedVinyl( products, search, selectedCategory, sortBy) {
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

      

    return { filteredProducts, sortedProducts,  };
}

export default useFilteredSortedVinyl;