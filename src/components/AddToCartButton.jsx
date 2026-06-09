import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function AddToCartButton({ product, variant = "card" }) {
  const { addToCart, getCartQuantity, canAddMore, showNotification } = useCart();
  const [adding, setAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const inCartQty = getCartQuantity(product.id);
  const outOfStock = product.stock <= 0;
  const maxCanAdd = Math.max(0, product.stock - inCartQty);
  const cannotAddMore = maxCanAdd <= 0 && !outOfStock;

  const handleAdd = async () => {
    if (outOfStock) {
      showNotification("Sin stock disponible", "error");
      return;
    }

    const qty = variant === "detail" ? quantity : 1;

    if (!canAddMore(product.id, product.stock, qty)) {
      showNotification(
        inCartQty > 0
          ? `Ya tienes ${inCartQty} en el carrito. Máximo disponible: ${product.stock}`
          : `Solo hay ${product.stock} unidades disponibles`,
        "error"
      );
      return;
    }

    try {
      setAdding(true);
      await addToCart(product.id, qty);
      showNotification(
        `"${product.name}" añadido al carrito (${qty} uds.)`,
        "success"
      );
      if (variant === "detail") setQuantity(1);
    } catch (err) {
      showNotification(err.message, "error");
    } finally {
      setAdding(false);
    }
  };

  const handleQuantityChange = (value) => {
    const parsed = Number(value);
    if (!parsed || parsed < 1) {
      setQuantity(1);
      return;
    }
    setQuantity(Math.min(parsed, maxCanAdd || 1));
  };

  if (variant === "detail") {
    return (
      <div className="add-to-cart-detail">
        {inCartQty > 0 && (
          <p className="add-to-cart-status">
            En tu carrito: <strong>{inCartQty}</strong> uds.
            {maxCanAdd > 0 && (
              <span> · Puedes añadir {maxCanAdd} más</span>
            )}
          </p>
        )}

        <div className="add-to-cart-controls">
          <label htmlFor={`qty-add-${product.id}`}>Cantidad</label>
          <input
            id={`qty-add-${product.id}`}
            type="number"
            min="1"
            max={maxCanAdd || 1}
            value={quantity}
            disabled={outOfStock || cannotAddMore || adding}
            onChange={(e) => handleQuantityChange(e.target.value)}
          />

          <button
            type="button"
            className="button add-btn"
            onClick={handleAdd}
            disabled={adding || outOfStock || cannotAddMore}
          >
            {adding
              ? "Añadiendo..."
              : outOfStock
                ? "Sin stock"
                : cannotAddMore
                  ? "Máximo en carrito"
                  : "Añadir al carrito"}
          </button>
        </div>

        {inCartQty > 0 && (
          <Link to="/carrito" className="add-to-cart-link">
            Ir al carrito →
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="add-to-cart-card">
      <button
        className={`add-btn ${inCartQty > 0 ? "add-btn-in-cart" : ""}`}
        type="button"
        onClick={handleAdd}
        disabled={adding || outOfStock || cannotAddMore}
      >
        {adding
          ? "Añadiendo..."
          : outOfStock
            ? "SIN STOCK"
            : cannotAddMore
              ? "EN CARRITO"
              : inCartQty > 0
                ? `+1 (${inCartQty} en carrito)`
                : "AÑADIR AL CARRITO"}
      </button>
    </div>
  );
}

export default AddToCartButton;
