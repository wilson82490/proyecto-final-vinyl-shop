import { Link } from 'react-router-dom';
import {products} from '../../data/products';


function AdminVinilosPage(){
    return (
        <section className="admin-section">
            <div className="admin-section-header">
                <div>
                    <h2>Admin Vinilos</h2>
                    <p>Listado interno de vinilos</p>
                </div>
            </div>

            <Link to="#" className="button">Nuevo Vinilo</Link>

           <div className="admin-list">
                {products.map((product) => (
                    <article className="admin-list-item" key={product.id}>
                        <img src={product.image} alt={product.name} />
                        <div>
                            <h3>{product.name}</h3>
                            <p>
                                {product.artist} ({product.year})
                            </p>
                            
                        </div>
                    </article>
                ))}

           </div>
        </section>
    )
}

export default AdminVinilosPage;
