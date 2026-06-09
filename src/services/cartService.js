const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/cart`;

const getHeaders = (sessionId) => ({
  "Content-Type": "application/json",
  "x-session-id": sessionId,
});

export const getSessionId = () => {
  const key = "vinyl-cart-session";
  let sessionId = localStorage.getItem(key);

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(key, sessionId);
  }

  return sessionId;
};

export const fetchCart = async (sessionId) => {
  const response = await fetch(API_URL, {
    headers: getHeaders(sessionId),
  });

  if (!response.ok) {
    throw new Error("Error al obtener el carrito");
  }

  return response.json();
};

export const addToCart = async (sessionId, vinylId, quantity = 1) => {
  const response = await fetch(`${API_URL}/items`, {
    method: "POST",
    headers: getHeaders(sessionId),
    body: JSON.stringify({ sessionId, vinylId, quantity }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Error al agregar al carrito");
  }

  return data;
};

export const updateCartItem = async (sessionId, vinylId, quantity) => {
  const response = await fetch(`${API_URL}/items/${vinylId}`, {
    method: "PUT",
    headers: getHeaders(sessionId),
    body: JSON.stringify({ sessionId, quantity }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Error al actualizar el carrito");
  }

  return data;
};

export const removeFromCart = async (sessionId, vinylId) => {
  const response = await fetch(`${API_URL}/items/${vinylId}`, {
    method: "DELETE",
    headers: getHeaders(sessionId),
    body: JSON.stringify({ sessionId }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Error al eliminar del carrito");
  }

  return data;
};

export const clearCart = async (sessionId) => {
  const response = await fetch(API_URL, {
    method: "DELETE",
    headers: getHeaders(sessionId),
    body: JSON.stringify({ sessionId }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Error al vaciar el carrito");
  }

  return data;
};
