export const handleResponse = async (response, fallbackMessage) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || fallbackMessage || "Error en la petición");
  }

  return data;
};

const trimTrailingSlash = (value) => value.replace(/\/+$/, "");

export const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL?.trim();
  const fallback = "http://localhost:3000";

  if (!envUrl) return fallback;

  const normalized = trimTrailingSlash(envUrl);
  // Permite usar VITE_API_URL como:
  // - http://localhost:3000
  // - http://localhost:3000/api
  // - http://localhost:3000/api/vinyls (legacy)
  if (normalized.endsWith("/api/vinyls")) {
    return normalized.slice(0, -"/api/vinyls".length);
  }
  if (normalized.endsWith("/api")) {
    return normalized.slice(0, -"/api".length);
  }
  return normalized;
};
