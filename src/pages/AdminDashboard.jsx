import { useState } from 'react';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { user, products, orders, getUsers } = useAuth();

  const [activeTab, setActiveTab] = useState('menu');
  const [currentCategory, setCurrentCategory] = useState('promociones');

  const usersList = getUsers();

  const categories = [
    { id: 'promociones', name: 'Promociones' },
    { id: 'boxes', name: 'Boxes' },
    { id: 'pollo', name: 'Pollo' },
    { id: 'boneless', name: 'Boneless' },
    { id: 'hamburguesas', name: 'Hamburguesas' },
    { id: 'postres', name: 'Postres y complementos' }
  ];

  const filteredProducts = products.filter(p => p.categoria === currentCategory);
  const totalVentas = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="kfc-app-container">
      <Header title="Panel de Administración" showCart={false} />

      <main className="kfc-main-content">
        {activeTab === 'menu' && (
          <div className="d-flex flex-column flex-grow-1">
            <div className="text-center my-3">
              <h1 className="kfc-script-font display-5 mb-1">Panel de Administración</h1>
              <p className="text-muted">Bienvenido al sistema de control, {user?.nombre || 'Administrador'}</p>
            </div>

            <div className="row g-4 my-auto justify-content-center">
              <div className="col-12 col-sm-6 col-lg-3">
                <div
                  className="admin-action-btn-card"
                  onClick={() => setActiveTab('inventario')}
                >
                  <div className="admin-card-tag">Inventario disponible</div>
                  <div className="d-flex align-items-center justify-content-center flex-grow-1 py-3">
                    <img
                      src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=300&q=80"
                      alt="Inventario"
                      style={{ maxHeight: '110px', objectFit: 'contain' }}
                    />
                  </div>
                  <span className="small text-muted fw-bold mt-2">Consultar stock por categoría</span>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <div
                  className="admin-action-btn-card"
                  onClick={() => setActiveTab('reportes')}
                >
                  <div className="admin-card-tag">Reporte de ventas</div>
                  <div className="d-flex align-items-center justify-content-center flex-grow-1 py-3">
                    <i className="bi bi-briefcase-fill text-dark" style={{ fontSize: '4.5rem' }}></i>
                    <i className="bi bi-graph-up-arrow text-danger ms-2" style={{ fontSize: '2.8rem' }}></i>
                  </div>
                  <span className="small text-muted fw-bold mt-2">Total de ingresos y tickets</span>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <div
                  className="admin-action-btn-card"
                  onClick={() => setActiveTab('pedidos')}
                >
                  <div className="admin-card-tag">Consulta de pedidos</div>
                  <div className="d-flex align-items-center justify-content-center flex-grow-1 py-3">
                    <i className="bi bi-scooter text-dark" style={{ fontSize: '4.5rem' }}></i>
                  </div>
                  <span className="small text-muted fw-bold mt-2">Seguimiento de órdenes</span>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <div
                  className="admin-action-btn-card"
                  onClick={() => setActiveTab('usuarios')}
                >
                  <div className="admin-card-tag" style={{ background: '#333' }}>Gestión de Usuarios</div>
                  <div className="d-flex align-items-center justify-content-center flex-grow-1 py-3">
                    <i className="bi bi-people-fill text-secondary" style={{ fontSize: '4rem' }}></i>
                  </div>
                  <span className="small text-muted fw-bold mt-2">Roles y accesos del personal</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inventario' && (
          <div className="kfc-content-card d-flex flex-column flex-grow-1">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 pb-2 border-bottom">
              <div>
                <h2 className="kfc-script-font fs-2 m-0 text-capitalize">
                  Inventario {currentCategory}
                </h2>
                <span className="small text-muted">Gestión de existencias en sucursal</span>
              </div>
              <button
                onClick={() => setActiveTab('menu')}
                className="btn btn-outline-danger btn-sm px-3"
              >
                <i className="bi bi-arrow-left me-1"></i> Volver al panel
              </button>
            </div>

            <div className="d-flex gap-2 overflow-auto pb-2 mb-4">
              {categories.map(c => (
                <button
                  key={c.id}
                  onClick={() => setCurrentCategory(c.id)}
                  className={`btn btn-sm text-nowrap rounded-pill px-3 py-1 ${currentCategory === c.id ? 'btn-danger fw-bold' : 'btn-light border'}`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            <div className="row g-3 flex-grow-1 overflow-auto">
              {filteredProducts.map(prod => (
                <div key={prod.id} className="col-6 col-md-4 col-lg-3">
                  <div className="kfc-product-card">
                    <img src={prod.img} alt={prod.nombre} className="kfc-product-img" />
                    <div className="fw-bold mb-1 text-truncate" title={prod.nombre}>
                      {prod.nombre}
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-auto pt-2">
                      <span className="text-danger fw-bold fs-5">${prod.precio.toFixed(2)}</span>
                      <span className="badge bg-secondary">Stock: {prod.stock}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reportes' && (
          <div className="kfc-content-card d-flex flex-column flex-grow-1">
            <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
              <h2 className="kfc-script-font fs-2 m-0">Reporte de ventas</h2>
              <button onClick={() => setActiveTab('menu')} className="btn btn-outline-danger btn-sm px-3">
                <i className="bi bi-arrow-left me-1"></i> Volver
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1 text-center py-5">
                <i className="bi bi-receipt text-muted mb-3" style={{ fontSize: '4rem' }}></i>
                <h4 className="fw-bold">No hay ventas por el momento</h4>
                <p className="text-muted">Las órdenes cobradas se registrarán automáticamente aquí.</p>
              </div>
            ) : (
              <div className="flex-grow-1 overflow-auto">
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-6">
                    <div className="p-3 bg-light rounded-3 border">
                      <div className="text-muted small">Total Facturado</div>
                      <div className="display-6 fw-bold text-success">${totalVentas.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="p-3 bg-light rounded-3 border">
                      <div className="text-muted small">Total de Transacciones</div>
                      <div className="display-6 fw-bold text-dark">{orders.length}</div>
                    </div>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Orden</th>
                        <th>Fecha y Hora</th>
                        <th>Método</th>
                        <th>Artículos</th>
                        <th className="text-end">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(ord => (
                        <tr key={ord.id}>
                          <td className="fw-bold text-danger">{ord.id}</td>
                          <td>{new Date(ord.fecha).toLocaleString('es-SV')}</td>
                          <td>
                            <span className="badge bg-secondary">{ord.metodoPago}</span>
                          </td>
                          <td>
                            <small>{ord.items.map(it => `${it.quantity}x ${it.nombre}`).join(', ')}</small>
                          </td>
                          <td className="text-end fw-bold text-success fs-6">
                            ${ord.total.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'pedidos' && (
          <div className="kfc-content-card d-flex flex-column flex-grow-1">
            <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
              <h2 className="kfc-script-font fs-2 m-0">Consulta de pedidos</h2>
              <button onClick={() => setActiveTab('menu')} className="btn btn-outline-danger btn-sm px-3">
                <i className="bi bi-arrow-left me-1"></i> Volver
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1 text-center py-5">
                <i className="bi bi-box2 text-muted mb-3" style={{ fontSize: '4rem' }}></i>
                <h4 className="fw-bold">No hay pedidos por el momento</h4>
                <p className="text-muted">Las órdenes tomadas en mostrador aparecerán en este panel de control.</p>
              </div>
            ) : (
              <div className="row g-3 overflow-auto">
                {orders.map(ord => (
                  <div key={ord.id} className="col-12 col-md-6 col-lg-4">
                    <div className="card h-100 shadow-sm border rounded-3">
                      <div className="card-header bg-white d-flex justify-content-between align-items-center py-2">
                        <span className="fw-bold text-danger">{ord.id}</span>
                        <span className="badge bg-warning text-dark">{ord.estado}</span>
                      </div>
                      <div className="card-body p-3">
                        <div className="small text-muted mb-2">
                          {new Date(ord.fecha).toLocaleTimeString('es-SV')} • {ord.metodoPago}
                        </div>
                        <ul className="list-unstyled small mb-3">
                          {ord.items.map((it, idx) => (
                            <li key={idx} className="d-flex justify-content-between py-1 border-bottom border-light">
                              <span>{it.quantity}x {it.nombre}</span>
                              <span className="fw-semibold">${(it.subtotal).toFixed(2)}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="d-flex justify-content-between fw-bold pt-1">
                          <span>Total:</span>
                          <span className="text-danger fs-5">${ord.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'usuarios' && (
          <div className="kfc-content-card d-flex flex-column flex-grow-1">
            <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
              <h2 className="kfc-script-font fs-2 m-0">Gestión de Usuarios</h2>
              <button onClick={() => setActiveTab('menu')} className="btn btn-outline-danger btn-sm px-3">
                <i className="bi bi-arrow-left me-1"></i> Volver
              </button>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Rol</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.map(u => (
                    <tr key={u.id}>
                      <td><code>{u.id}</code></td>
                      <td className="fw-semibold">{u.nombre}</td>
                      <td>{u.email}</td>
                      <td>{u.telefono || '—'}</td>
                      <td>
                        <span className={`badge ${u.rol === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                          {u.rol}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-success">Activo</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
