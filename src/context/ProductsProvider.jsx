import { useState } from "react";
import { products as initialProducts } from "../data/products";
import { ProductsContext } from "./products-context";

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);

  const addProduct = (data) => {
    const newProduct = {
      artist: "Artista desconocido",
      label: "",
      format: 'Vinilo 12" LP',
      stock: 0,
      featured: false,
      createdAt: new Date().toISOString().slice(0, 10),
      ...data,
      id: Date.now(),
      price: Number(data.price),
      year: data.year ? Number(data.year) : undefined,
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (id, data) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              ...data,
              price: Number(data.price ?? product.price),
              year: data.year ? Number(data.year) : product.year,
            }
          : product
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <ProductsContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
