import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboardStats } from "../../services/dashboardService";

function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return <p className="loading-message">Cargando dashboard...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <section className="admin-section dashboard-section">
      <div className="admin-section-header">
        <div>
          <h2>Dashboard</h2>
          <p>Resumen general de la tienda</p>
        </div>
        <Link className="button" to="/admin/vinilos">
          Gestionar vinilos
        </Link>
      </div>

      <div className="dashboard-grid">
        <article className="dashboard-card">
          <h3>Total vinilos</h3>
          <p className="dashboard-value">{stats.totalVinilos}</p>
        </article>
        <article className="dashboard-card">
          <h3>Destacados</h3>
          <p className="dashboard-value">{stats.featuredVinilos}</p>
        </article>
        <article className="dashboard-card">
          <h3>Stock total</h3>
          <p className="dashboard-value">{stats.totalStock}</p>
        </article>
        <article className="dashboard-card">
          <h3>Valor inventario</h3>
          <p className="dashboard-value">{stats.inventoryValue} €</p>
        </article>
        <article className="dashboard-card dashboard-card-warning">
          <h3>Stock bajo</h3>
          <p className="dashboard-value">{stats.lowStockVinilos}</p>
        </article>
        <article className="dashboard-card dashboard-card-danger">
          <h3>Sin stock</h3>
          <p className="dashboard-value">{stats.outOfStockVinilos}</p>
        </article>
        <article className="dashboard-card">
          <h3>Carritos activos</h3>
          <p className="dashboard-value">{stats.activeCarts}</p>
        </article>
        <article className="dashboard-card">
          <h3>Items en carritos</h3>
          <p className="dashboard-value">{stats.cartItemsTotal}</p>
        </article>
        <article className="dashboard-card dashboard-card-highlight">
          <h3>Valor en carritos</h3>
          <p className="dashboard-value">{stats.cartRevenue} €</p>
        </article>
      </div>

      <div className="dashboard-panels">
        <section className="dashboard-panel">
          <h3>Vinilos por categoría</h3>
          <ul className="dashboard-category-list">
            {stats.categories.map((category) => (
              <li key={category.name}>
                <span>{category.name}</span>
                <strong>{category.count}</strong>
              </li>
            ))}
          </ul>
        </section>

        <section className="dashboard-panel">
          <h3>Últimos vinilos añadidos</h3>
          <ul className="dashboard-recent-list">
            {stats.recentVinilos.map((vinyl) => (
              <li key={vinyl.id}>
                <div>
                  <strong>{vinyl.name}</strong>
                  <span>
                    {vinyl.artist} · {vinyl.category}
                  </span>
                </div>
                <span>{vinyl.stock} uds · {vinyl.price} €</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}

export default DashboardPage;
