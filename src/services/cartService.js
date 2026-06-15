import { getApiBaseUrl, handleResponse } from "./http";

const API_URL = `${getApiBaseUrl()}/api/cart`;

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
  return handleResponse(response, "Error al obtener el carrito");
};

export const addToCart = async (sessionId, vinylId, quantity = 1) => {
  const response = await fetch(`${API_URL}/items`, {
    method: "POST",
    headers: getHeaders(sessionId),
    body: JSON.stringify({ sessionId, vinylId, quantity }),
  });

  return handleResponse(response, "Error al agregar al carrito");
};

export const updateCartItem = async (sessionId, vinylId, quantity) => {
  const response = await fetch(`${API_URL}/items/${vinylId}`, {
    method: "PUT",
    headers: getHeaders(sessionId),
    body: JSON.stringify({ sessionId, quantity }),
  });

  return handleResponse(response, "Error al actualizar el carrito");
};

export const removeFromCart = async (sessionId, vinylId) => {
  const response = await fetch(`${API_URL}/items/${vinylId}`, {
    method: "DELETE",
    headers: getHeaders(sessionId),
    body: JSON.stringify({ sessionId }),
  });

  return handleResponse(response, "Error al eliminar del carrito");
};

export const clearCart = async (sessionId) => {
  const response = await fetch(API_URL, {
    method: "DELETE",
    headers: getHeaders(sessionId),
    body: JSON.stringify({ sessionId }),
  });

  return handleResponse(response, "Error al vaciar el carrito");
};
