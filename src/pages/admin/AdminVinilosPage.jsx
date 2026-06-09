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
  const [isLoading, setIsLoading] = useState(false);

  const closeForm = () => {
    setShowForm(false);
    setSelectedVinilo(null);
  };

  const showSuccessMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 4000);
  };

  const handleCreateVinilo = async (viniloData) => {
    try {
      setIsLoading(true);
      await addProduct(viniloData);
      closeForm();
      showSuccessMessage("Vinilo creado correctamente");
    } catch (error) {
      console.error("Error al crear vinilo:", error);
      setMessage("Error al crear el vinilo");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!viniloToDelete) return;
    try {
      setIsLoading(true);
      await deleteProduct(viniloToDelete.id);
      setViniloToDelete(null);
      showSuccessMessage("Vinilo eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar vinilo:", error);
      setMessage("Error al eliminar el vinilo");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateVinilo = async (viniloId, viniloData) => {
    try {
      setIsLoading(true);
      await updateProduct(viniloId, viniloData);
      closeForm();
      showSuccessMessage("Vinilo actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar vinilo:", error);
      setMessage("Error al actualizar el vinilo");
    } finally {
      setIsLoading(false);
    }
          
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
          isLoading={isLoading}
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
            <img src={product.image} alt={product.title} />
            <div>
              <h3>{product.title}</h3>
              <p>
                {product.artist} ({product.year})
              </p>

              <div className="admin-actions">
                <button
                  disabled={isLoading}
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
                  disabled={isLoading}
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