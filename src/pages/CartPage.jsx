import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function CartPage() {
  const {
    items,
    total,
    loading,
    error,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const handleQuantityChange = async (vinylId, value, stock) => {
    const quantity = Number(value);
    if (!quantity || quantity < 1) return;
    if (quantity > stock) return;

    try {
      await updateQuantity(vinylId, quantity);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRemove = async (vinylId) => {
    try {
      await removeFromCart(vinylId);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleClear = async () => {
    if (!window.confirm("¿Vaciar el carrito?")) return;

    try {
      await clearCart();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <p className="loading-message">Cargando carrito...</p>;
  }

  return (
    <main>
      <section className="catalog-section cart-section">
        <div className="container">
          <h2>Mi Carrito</h2>

          {error && <p className="error-message">{error}</p>}

          {items.length === 0 ? (
            <div className="cart-empty">
              <p className="empty-message">Tu carrito está vacío.</p>
              <Link className="button" to="/discos">
                Ir al catálogo
              </Link>
            </div>
          ) : (
            <>
              <div className="cart-list">
                {items.map((item) => (
                  <article className="cart-item" key={String(item.vinylId)}>
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>

                    <div className="cart-item-info">
                      <h3>{item.name}</h3>
                      <p>{item.artist}</p>
                      <p className="cart-item-price">{item.price} €</p>
                    </div>

                    <div className="cart-item-actions">
                      <label htmlFor={`qty-${item.vinylId}`}>Cantidad</label>
                      <input
                        id={`qty-${item.vinylId}`}
                        type="number"
                        min="1"
                        max={item.stock}
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            String(item.vinylId),
                            e.target.value,
                            item.stock
                          )
                        }
                      />
                      <button
                        type="button"
                        className="button btn-delete"
                        onClick={() => handleRemove(String(item.vinylId))}
                      >
                        Eliminar
                      </button>
                    </div>

                    <p className="cart-item-subtotal">
                      {(item.price * item.quantity).toFixed(2)} €
                    </p>
                  </article>
                ))}
              </div>

              <div className="cart-summary">
                <p className="cart-total">
                  Total: <strong>{total.toFixed(2)} €</strong>
                </p>
                <div className="cart-summary-actions">
                  <button
                    type="button"
                    className="button btn-delete"
                    onClick={handleClear}
                  >
                    Vaciar carrito
                  </button>
                  <button type="button" className="button btn-checkout">
                    Finalizar compra
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default CartPage;
