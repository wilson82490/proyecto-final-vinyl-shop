import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getVinylById } from "../services/api";

function ViniloDetailPage() {
  const { id } = useParams();
  const [vinilo, setVinilo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getVinylById(id)
      .then(setVinilo)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="loading-message">Cargando vinilo...</p>;
  }

  if (error || !vinilo) {
    return (
      <main>
        <section className="catalog-section">
          <div className="container">
            <h1>Contenido no encontrado</h1>
            <Link className="button" to="/discos">
              Volver al catálogo
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="catalog-section">
        <div className="container">
          <article className="vinilo-detail">
            <img src={vinilo.image} alt={vinilo.name} />

            <div className="vinilo-detail-content">
              <h1>{vinilo.name}</h1>
              <h4 className="artist">{vinilo.artist} ({vinilo.year})</h4>
              <p className="label">{vinilo.label} · {vinilo.format}</p>
              <p>Género: {vinilo.category}</p>
              <p>{vinilo.description}</p>
              <div className="card-meta">
                <span className="price">{vinilo.price} €</span>
                <span className="stock">{vinilo.stock} en stock</span>
              </div>
            </div>
          </article>
        </div>

        <div className="container">
          <Link className="button" to="/discos">
            Volver al catálogo
          </Link>
        </div>
      </section>
    </main>
  );
}

export default ViniloDetailPage;
