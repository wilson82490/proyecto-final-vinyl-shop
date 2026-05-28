

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />

      <h3>{product.name}</h3>
      <h4 className="artist">{product.artist} ({product.year})</h4>
      <p className="label">{product.label} · {product.format}</p>
      <p>{product.description}</p>

      <div className="card-meta">
        <span className="price">{product.price} €</span>
        <span className="stock">{product.stock} en stock</span>
      </div>

      <div className="card-buttons">
        <button className="fav-btn">❤</button>
        <button className="add-btn">AÑADIR AL CARRITO</button>
      </div>
    </div>
  );
};

export default ProductCard;