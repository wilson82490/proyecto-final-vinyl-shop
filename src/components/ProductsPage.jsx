import { useState, useEffect } from "react";
import { getVinyls } from "../services/api";
import ProductList from "./ProductList";

function ProductsPage() {
	const [vinyls, setVinyls] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		getVinyls()
			.then(setVinyls)
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	}, []);

	if (loading) {
		return <p className="loading-message">Cargando vinilos...</p>;
	}

	if (error) {
		return <p className="error-message">{error}</p>;
	}

	return (
		<main>
			<section className="products-page container">
				<h2>Catálogo de Discos</h2>
				<ProductList products={vinyls} />
			</section>
		</main>
	);
}

export default ProductsPage;
