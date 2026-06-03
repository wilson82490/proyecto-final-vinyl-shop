import { useState } from "react";
import ViniloForm from "../../components/ViniloForm";
import DeleteViniloModal from "../../components/DeleteViniloModal";
import { useProducts } from "../../hooks/useProducts";

function AdminVinilosPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const [selectedVinilo, setSelectedVinilo] = useState(null);
  const [viniloToDelete, setViniloToDelete] = useState(null);
  const [message, setMessage] = useState("");

  const closeForm = () => {
    setShowForm(false);
    setSelectedVinilo(null);
  };

  const showSuccessMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 4000);
  };

  const handleCreateVinilo = (viniloData) => {
    addProduct(viniloData);
    closeForm();
    showSuccessMessage("Vinilo creado correctamente");
  };

  const handleConfirmDelete = () => {
    if (!viniloToDelete) return;
    deleteProduct(viniloToDelete.id);
    setViniloToDelete(null);
    showSuccessMessage("Vinilo eliminado correctamente");
  };

  const handleUpdateVinilo = (viniloId, viniloData) => {
    updateProduct(viniloId, viniloData);
    closeForm();
    showSuccessMessage("Vinilo actualizado correctamente");
  };

  return (
    <section className="admin-section">
      <DeleteViniloModal
        vinilo={viniloToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => setViniloToDelete(null)}
      />

      {message && (
        <p className="admin-message" role="status">
          {message}
        </p>
      )}
      <div className="admin-section-header">
        <div>
          <h2>Admin Vinilos</h2>
          <p>Listado interno de vinilos</p>
        </div>
        <button
          type="button"
          className="button"
          onClick={() => {
            if (showForm) {
              closeForm();
            } else {
              setSelectedVinilo(null);
              setShowForm(true);
            }
          }}
        >
          {showForm ? "Cancelar" : "Nuevo Vinilo"}
        </button>
      </div>

      {showForm && (
        <ViniloForm
          key={selectedVinilo?.id ?? "new"}
          vinilo={selectedVinilo}
          onCreateVinilo={handleCreateVinilo}
          onUpdateVinilo={handleUpdateVinilo}
          onCancel={closeForm}
        />
      )}

      <div className="admin-list">
        {products.map((product) => (
          <article className="admin-list-item" key={product.id}>
            <img src={product.image} alt={product.name} />
            <div>
              <h3>{product.name}</h3>
              <p>
                {product.artist} ({product.year})
              </p>

              <div className="admin-actions">
                <button
                  type="button"
                  className="add-btn"
                  onClick={() => {
                    setSelectedVinilo(product);
                    setShowForm(true);
                  }}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="detail-btn btn-delete"
                  onClick={() => setViniloToDelete(product)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AdminVinilosPage;
