import { useState, useEffect } from "react";
import { products as mockProducts } from "../data/products";
import { ProductsContext } from "./products-context";
import {
  getVinyls,
  createVinyl,
  updateVinyl,
  deleteVinyl,
} from "../services/vinylServices";

const normalize = (product) => ({
  id: product._id || product.id,
  name: product.name || product.title || "Sin nombre",
  artist: product.artist || "Artista desconocido",
  price: product.price ?? 0,
  image: product.image || "",
  category: product.category || product.genre || "Vinilo",
  featured: product.featured ?? product.feature ?? false,
  createdAt: product.createdAt || new Date().toISOString(),
  year: product.year || null,
  description: product.description || "",
  label: product.label || "",
  format: product.format || 'Vinilo 12" LP',
  stock: product.stock ?? 0,
});

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // =========================
  // GET ALL
  // =========================
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getVinyls();
        const normalized = Array.isArray(data) ? data.map(normalize) : [];
        setProducts(normalized);
      } catch (err) {
        console.error("Error cargando productos:", err);
        setError(err.message);
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // =========================
  // CREATE
  // =========================
  const addProduct = async (data) => {
    try {
      const raw = await createVinyl({
        ...data,
        price: Number(data.price),
        year: data.year ? Number(data.year) : undefined,
      });

      const newProduct = normalize(raw);

      setProducts((prev) => [...prev, newProduct]);

      return newProduct;
    } catch (err) {
      console.error("Error al agregar producto:", err);
      throw err;
    }
  };

  // =========================
  // UPDATE
  // =========================
  const updateProduct = async (id, data) => {
    try {
      const raw = await updateVinyl(id, {
        ...data,
        price: Number(data.price),
        year: data.year ? Number(data.year) : undefined,
      });

      const updatedProduct = normalize(raw);

      setProducts((prev) =>
        prev.map((p) => (p.id === id ? updatedProduct : p))
      );

      return updatedProduct;
    } catch (err) {
      console.error("Error al actualizar producto:", err);
      throw err;
    }
  };

  // =========================
  // DELETE
  // =========================
  const deleteProduct = async (id) => {
    try {
      await deleteVinyl(id);

      setProducts((prev) => prev.filter((p) => p.id !== id));
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