import { useEffect } from "react";

function DeleteViniloModal({ vinilo, onConfirm, onCancel }) {
  useEffect(() => {
    if (!vinilo) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onCancel();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [vinilo, onCancel]);

  if (!vinilo) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onCancel}
      role="presentation"
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h3 id="delete-modal-title">Eliminar vinilo</h3>
        <p className="modal-text">
          ¿Estás seguro de que deseas eliminar{" "}
          <strong>{vinilo.name}</strong>
          {vinilo.artist ? (
            <>
              {" "}
              de <em>{vinilo.artist}</em>
            </>
          ) : null}
          ? Esta acción no se puede deshacer.
        </p>

        <div className="modal-actions">
          <button
            type="button"
            className="button modal-btn-cancel"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="button modal-btn-delete"
            onClick={onConfirm}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteViniloModal;