import { Link } from "react-router-dom";

function CartToast({ notification, onClose }) {
  if (!notification) return null;

  return (
    <div
      className={`cart-toast cart-toast-${notification.type}`}
      role="status"
      aria-live="polite"
    >
      <p>{notification.message}</p>
      {notification.type === "success" && (
        <Link to="/carrito" className="cart-toast-link" onClick={onClose}>
          Ver carrito
        </Link>
      )}
      <button
        type="button"
        className="cart-toast-close"
        onClick={onClose}
        aria-label="Cerrar notificación"
      >
        ×
      </button>
    </div>
  );
}

export default CartToast;
