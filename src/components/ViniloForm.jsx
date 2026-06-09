import { useState } from "react";
import { categories } from "../data/categories";

const initialForm = {
 title: "",
  artist: "",
  year: "",
  description: "",
  genre: "",
  image: "",
  price: "",
  stock: "",
  feature: false,
};

function getFormState(vinilo) {
  if (!vinilo) return initialForm;
  return {
    ...initialForm,
    ...vinilo,
    price: vinilo.price ?? "",
    year: vinilo.year ?? "",
  };
}

function ViniloForm({ onCreateVinilo, onUpdateVinilo, vinilo, onCancel }) {
  const [form, setForm] = useState(() => getFormState(vinilo));
  const isEditing = Boolean(vinilo);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      alert("El nombre es obligatorio");
      return;
    }

    if (!form.description.trim()) {
      alert("La descripción es obligatoria");
      return;
    }

    if (!form.price || Number(form.price) <= 0) {
      alert("El precio debe ser un número positivo");
      return;
    }

    if (!form.category) {
      alert("Selecciona una categoría");
      return;
    }

    if (!form.image.trim()) {
      alert("La URL de la imagen es obligatoria");
      return;
    }

    const year = form.year ? Number(form.year) : null;
    if (year && (year < 1900 || year > new Date().getFullYear())) {
      alert("Ingresa un año válido");
      return;
    }

    if (isEditing) {
      onUpdateVinilo(vinilo.id, form);
    } else {
      onCreateVinilo(form);
    }

    setForm(initialForm);
    onCancel?.();
  };

  return (
    <form className="vinilo-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? "Editar Vinilo" : "Nuevo Vinilo"}</h2>

      <div className="form-group">
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Precio:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={form.price}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Género:</label>
        <select
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option value="">Selecciona un género</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="year">Año:</label>
        <input
          type="number"
          id="year"
          name="year"
          value={form.year}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">URL de la imagen:</label>
        <input
          type="text"
          id="image"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="https://..."
        />
      </div>

      {form.image.trim() && (
        <div className="image-preview">
          <img src={form.image} alt="Vista previa" />
        </div>
      )}

      <div className="form-group">
        <label htmlFor="featured">Destacado:</label>
        <input
          type="checkbox"
          id="featured"
          name="featured"
          checked={form.featured}
          onChange={handleChange}
        />
      </div>

      <button className="button vinilo-form-button" type="submit">
        {isEditing ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
}

export default ViniloForm;