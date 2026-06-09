const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/dashboard`;

export const getDashboardStats = async () => {
  const response = await fetch(`${API_URL}/stats`);

  if (!response.ok) {
    throw new Error("Error al obtener estadísticas del dashboard");
  }

  return response.json();
};
