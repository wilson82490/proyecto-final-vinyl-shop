import { useState, useEffect, useCallback } from "react";
import { CartContext } from "./cart-context";
import CartToast from "../components/CartToast";
import {
  getSessionId,
  fetchCart,
  addToCart as addToCartApi,
  updateCartItem as updateCartItemApi,
  removeFromCart as removeFromCartApi,
  clearCart as clearCartApi,
} from "../services/cartService";

export function CartProvider({ children }) {
  const [sessionId] = useState(getSessionId);
  const [items, setItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const applyCart = (cart) => {
    setItems(cart.items || []);
    setItemCount(cart.itemCount || 0);
    setTotal(cart.total || 0);
  };

  const getCartQuantity = useCallback(
    (vinylId) => {
      const item = items.find(
        (entry) => String(entry.vinylId) === String(vinylId)
      );
      return item?.quantity || 0;
    },
    [items]
  );

  const canAddMore = useCallback(
    (vinylId, stock, quantity = 1) => {
      return getCartQuantity(vinylId) + quantity <= stock;
    },
    [getCartQuantity]
  );

  const showNotification = useCallback((message, type = "success") => {
    setNotification({ message, type });
  }, []);

  const clearNotification = useCallback(() => {
    setNotification(null);
  }, []);

  useEffect(() => {
    if (!notification) return undefined;

    const timer = setTimeout(() => {
      setNotification(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [notification]);

  const loadCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const cart = await fetchCart(sessionId);
      applyCart(cart);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setItems([]);
      setItemCount(0);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const addToCart = async (vinylId, quantity = 1) => {
    const cart = await addToCartApi(sessionId, vinylId, quantity);
    applyCart(cart);
    return cart;
  };

  const updateQuantity = async (vinylId, quantity) => {
    const cart = await updateCartItemApi(sessionId, vinylId, quantity);
    applyCart(cart);
    return cart;
  };

  const removeFromCart = async (vinylId) => {
    const cart = await removeFromCartApi(sessionId, vinylId);
    applyCart(cart);
    return cart;
  };

  const clearCart = async () => {
    const cart = await clearCartApi(sessionId);
    applyCart(cart);
    return cart;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        total,
        loading,
        error,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        reloadCart: loadCart,
        getCartQuantity,
        canAddMore,
        showNotification,
      }}
    >
      {children}
      <CartToast notification={notification} onClose={clearNotification} />
    </CartContext.Provider>
  );
}
