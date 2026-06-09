import {Link} from "react-router-dom";

function NotFoundPage() {
  return (
    <main>
      <section className="not-found-page">
        <div className="container">
          <h1>404 - Página no encontrada</h1>

          <p>Lo sentimos, la página que estás buscando no existe.</p>

          <Link className="button" to="/">
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
   );
 }

 export default NotFoundPage;