/* function ViniloDetailPage() {
    return;
}


export default ViniloDetailPage; */

import { Link, useParams } from "react-router-dom";
import { products } from "../data/products";

function ViniloDetailPage() {
  const { id } = useParams();

  const vinilo = products.find((v) => v.id === Number(id)); // Comparación segura de tipos

  if (!vinilo) {
    return (
      <main>
        <section className="catalog-section">
          <div className="container">
            <h1>Contenido no encontrado</h1>
            <Link className="button" to="/vinilos">
              Volver al catalogo
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
              <p>Genero: {vinilo.category}</p>
              <span>Año: {vinilo.year}</span>
              <p>{vinilo.description}</p>
            </div>
          </article>
        </div>

        <div className="container">
          <Link className="button" to="/discos">
            Volver al catalogo
          </Link>
        </div>
      </section>
    </main>
  );
}

export default ViniloDetailPage;