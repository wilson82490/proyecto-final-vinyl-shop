import { Link } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-card-image">
        <img src={product.image} alt={product.name} />
      </div>

      <h3>{product.name}</h3>

      <h4 className="artist">
        {product.artist} ({product.year})
      </h4>

      <p className="genre">{product.category}</p>

      <div className="card-meta">
        <span className="price">{product.price} €</span>
        <span className="stock">
          {product.stock > 0 ? `${product.stock} en stock` : "Agotado"}
        </span>
      </div>

      <div className="card-buttons">
        <button className="fav-btn" type="button">❤</button>
        <AddToCartButton product={product} variant="card" />

        <Link to={`/vinilos/${product.id}`} className="detail-btn">
          Ver detalles
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
