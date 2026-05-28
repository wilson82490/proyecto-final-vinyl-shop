import { products } from "../data/products";
import ProductList from "./ProductList";

function ProductsPage() {
	return (
		<main>
			<section className="products-page container">
				<h2>Catálogo de Discos</h2>
				<ProductList products={products} />
			</section>
		</main>
	);
}

export default ProductsPage;
