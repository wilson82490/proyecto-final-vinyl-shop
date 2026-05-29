import Header from '../components/Header';
import { Outlet, Link} from 'react-router-dom';
import Footer from '../components/Footer';


function AdminLayout() {
    return (
        <>
            <Header />
             <main className="admin-page">
        <div className="container">
          <div className="admin-header">
            <h1>Panel Administración</h1>
            <p>Gestiona el contenido del catalogo</p>
          </div>

          <nav className="admin-nav">
            <Link to="/admin/vinilos">Vinilos</Link>
            <Link to="/discos">Ver sitio publico</Link>
          </nav>

          <Outlet />
        </div>
      </main>


            <Footer />
        </>

      
    )
}

export default AdminLayout;