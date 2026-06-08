const API_URL = "http://localhost:3000/api/vinyls";

export const getVinyls = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener vinilos:", error);
    throw new Error("Error al obtener los vinilos", { cause: error });
  }
};

export const createVinyl = async (vinylData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vinylData),
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al crear vinilo:", error);
    throw new Error("Error al crear el vinilo", { cause: error });
  }
};

export const updateVinyl = async (id, vinylData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vinylData),
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al actualizar vinilo:", error);
    throw new Error("Error al actualizar el vinilo", { cause: error });
  }
};

export const deleteVinyl = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return true;
  } catch (error) {
    console.error("Error al eliminar vinilo:", error);
    throw new Error("Error al eliminar el vinilo", { cause: error });
  }
};