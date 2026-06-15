import { getApiBaseUrl, handleResponse } from "./http";

const API_URL = `${getApiBaseUrl()}/api/vinyls`;

export const getVinyls = async () => {
  const response = await fetch(API_URL);
  return handleResponse(response, "Error al obtener los vinilos");
};

export const createVinyl = async (vinylData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vinylData),
  });

  return handleResponse(response, "Error al crear el vinilo");
};

export const updateVinyl = async (id, vinylData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vinylData),
  });

  return handleResponse(response, "Error al actualizar el vinilo");
};

export const deleteVinyl = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  await handleResponse(response, "Error al eliminar el vinilo");
  return { ok: true };
};