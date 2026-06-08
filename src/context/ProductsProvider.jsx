import { useState, useEffect } from "react";
import { products as initialProducts } from "../data/products";
import { ProductsContext } from "./products-context";
import {
  getVinyls,
  createVinyl,
  updateVinyl,
  deleteVinyl,
} from "../services/vinylsService";

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar productos desde la API al montar
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        let data = await getVinyls();
        console.log("API DATA:", data);
        // Normalizar productos: asegurar propiedades necesarias
        data = data.map((product, index) => ({
          id: product._id || index + 1,
          name: product.name || "Sin nombre",
          artist: product.artist || "Artista desconocido",
          price: product.price || 0,
          image: product.image || "",
          category: product.category || "Vinilo",
          featured: product.featured !== undefined ? product.featured : (index < 3), // Primeros 3 como destacados
          createdAt: product.createdAt || new Date().toISOString().slice(0, 10),
          year: product.year || new Date().getFullYear(),
          description: product.description || "",
          label: product.label || "",
          format: product.format || 'Vinilo 12" LP',
          stock: product.stock || 0,
          ...product, // Mantener otras propiedades
        }));
        
        setProducts(data);
      } catch (err) {
        console.error("Error cargando productos:", err);
        setError(err.message);
        // Mantener datos iniciales si hay error
        setProducts(initialProducts);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const addProduct = async (data) => {
    try {
      const newProduct = await createVinyl({
        artist: "Artista desconocido",
        label: "",
        format: 'Vinilo 12" LP',
        stock: 0,
        featured: false,
        createdAt: new Date().toISOString().slice(0, 10),
        ...data,
        price: Number(data.price),
        year: data.year ? Number(data.year) : undefined,
      });
      setProducts((prev) => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      console.error("Error al agregar producto:", err);
      throw err;
    }
  };

  const updateProduct = async (id, data) => {
    try {
      const updatedProduct = await updateVinyl(id, {
        ...data,
        price: Number(data.price),
        year: data.year ? Number(data.year) : undefined,
      });
      setProducts((prev) =>
        prev.map((product) => (product.id === id ? updatedProduct : product))
      );
      return updatedProduct;
    } catch (err) {
      console.error("Error al actualizar producto:", err);
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteVinyl(id);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      throw err;
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        loading,
        error,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
