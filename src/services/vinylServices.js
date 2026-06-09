/* const API_URL = "http://localhost:3000/api/vinyls";


export const getVinyls = async () => {
    const response = await fetch (API_URL);

    if(!response.ok){
        throw new Error ("Error al obtener los vinilos");
    }

    const data = await response.json();

    return data;
};
 */

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/vinyls`;

export const getVinyls = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Error al obtener los vinilos");
  }

  return await response.json();
};

export const createVinyl = async (vinylData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vinylData),
  });

  if (!response.ok) {
    throw new Error("Error al crear el vinilo");
  }

  return await response.json();
};

export const updateVinyl = async (id, vinylData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vinylData),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el vinilo");
  }

  return await response.json();
};

export const deleteVinyl = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error al eliminar el vinilo");
  }

  return true;
};