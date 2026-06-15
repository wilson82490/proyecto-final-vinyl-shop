import { getApiBaseUrl, handleResponse } from "./http";

const API_URL = `${getApiBaseUrl()}/api/dashboard`;

export const getDashboardStats = async () => {
  const response = await fetch(`${API_URL}/stats`);
  return handleResponse(response, "Error al obtener estadísticas del dashboard");
};
