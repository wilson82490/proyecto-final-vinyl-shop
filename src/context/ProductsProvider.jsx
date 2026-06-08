import { useState, useEffect } from "react";
import { products as initialProducts } from "../data/products";
import { ProductsContext } from "./products-context";
import {
  getVinyls,
  createVinyl,
  updateVinyl,
  deleteVinyl,
} from "../services/vinyls.Service";

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
        const data = await getVinyls();
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
