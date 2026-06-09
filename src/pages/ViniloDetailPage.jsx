import { Link, useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import AddToCartButton from "../components/AddToCartButton";

function ViniloDetailPage() {
  const { products } = useProducts();
  const { id } = useParams();

  const vinilo = products.find((v) => String(v.id) === String(id));

  if (!vinilo) {
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
              <p>Artista: {vinilo.artist}</p>
              <p>Género: {vinilo.category}</p>
              <span>Año: {vinilo.year}</span>
              <p className="vinilo-detail-price">{vinilo.price} €</p>
              <p className={vinilo.stock > 0 ? "stock-available" : "stock-out"}>
                {vinilo.stock > 0
                  ? `${vinilo.stock} en stock`
                  : "Agotado"}
              </p>
              <p>{vinilo.description}</p>

              <AddToCartButton product={vinilo} variant="detail" />
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
