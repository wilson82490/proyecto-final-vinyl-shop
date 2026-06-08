const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const getVinyls = async () => {
  const res = await fetch(`${BASE_URL}/api/vinyls`);
  if (!res.ok) throw new Error('Error al obtener los vinilos');
  return res.json();
};

export const getVinylById = async (id) => {
  const res = await fetch(`${BASE_URL}/api/vinyls/${id}`);
  if (!res.ok) throw new Error('Vinilo no encontrado');
  return res.json();
};

export const createVinyl = async (data) => {
  const res = await fetch(`${BASE_URL}/api/vinyls`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear el vinilo');
  return res.json();
};

export const updateVinyl = async (id, data) => {
  const res = await fetch(`${BASE_URL}/api/vinyls/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar el vinilo');
  return res.json();
};

export const deleteVinyl = async (id) => {
  const res = await fetch(`${BASE_URL}/api/vinyls/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al borrar el vinilo');
  return res.json();
};
