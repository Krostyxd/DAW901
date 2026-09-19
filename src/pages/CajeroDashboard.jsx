import { useState } from 'react';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

export default function CajeroDashboard() {
  const { products, cart, updateQuantity, user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { id: 'promociones', name: 'Promociones', img: 'https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=400&q=80' },
    { id: 'boxes', name: 'Boxes', img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80' },
    { id: 'pollo', name: 'Pollo', img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&q=80' },
    { id: 'boneless', name: 'Bonelles', img: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80' },
    { id: 'hamburguesas', name: 'Hamburguesas', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80' },
    { id: 'postres', name: 'Postres y complementos', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80' }
  ];

  const categoryProducts = selectedCategory
    ? products.filter(p => p.categoria === selectedCategory)
    : [];

  return (
    <div className="kfc-app-container">
      <Header title="Toma de Pedidos" showCart={true} />

      <main className="kfc-main-content">
        {!selectedCategory ? (
          <div className="d-flex flex-column flex-grow-1">
            <div className="text-center my-3">
              <h1 className="kfc-script-font display-4 mb-0">¡Para Chuparse</h1>
              <h2 className="kfc-script-font display-6 text-danger">los dedos!</h2>
              <p className="text-muted small mt-1">Selecciona una categoría para armar el pedido</p>
            </div>

            <div className="row g-3 g-md-4 flex-grow-1 align-items-stretch">
              {categories.map(cat => (
                <div key={cat.id} className="col-6 col-md-4 col-lg-4">
                  <div
                    className="kfc-category-card"
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <div className="kfc-category-banner">{cat.name}</div>
                    <div className="p-3 flex-grow-1 d-flex align-items-center justify-content-center bg-white">
                      <img
                        src={cat.img}
                        alt={cat.name}
                        style={{ height: '140px', width: '100%', objectFit: 'cover', borderRadius: '8px' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="kfc-content-card d-flex flex-column flex-grow-1">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 pb-2 border-bottom">
              <div>
                <h2 className="kfc-script-font fs-2 m-0 text-capitalize">
                  {categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <span className="small text-muted">Selecciona productos y ajusta cantidades</span>
              </div>

              <div className="d-flex gap-2">
                <div className="d-none d-md-flex gap-1 overflow-auto">
                  {categories.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.id)}
                      className={`btn btn-sm rounded-pill px-3 ${selectedCategory === c.id ? 'btn-danger fw-bold' : 'btn-light border'}`}
                      style={{ fontSize: '0.8rem' }}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedCategory(null)}
                  className="btn btn-outline-danger btn-sm px-3"
                >
                  <i className="bi bi-grid me-1"></i> Categorías
                </button>
              </div>
            </div>

            <div className="row g-3 flex-grow-1 overflow-auto">
              {categoryProducts.map(prod => {
                const qty = cart[prod.id] || 0;
                return (
                  <div key={prod.id} className="col-6 col-md-4 col-lg-3">
                    <div className="kfc-product-card justify-content-between">
                      <div>
                        <img src={prod.img} alt={prod.nombre} className="kfc-product-img" />
                        <div className="fw-bold mb-1 text-truncate" title={prod.nombre}>
                          {prod.nombre}
                        </div>
                        <div className="text-danger fw-bold fs-5 my-1">
                          ${prod.precio.toFixed(2)}
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                        <span className="small text-muted d-none d-sm-inline">Cantidad:</span>
                        <div className="qty-counter">
                          <button
                            type="button"
                            className="qty-btn"
                            onClick={() => updateQuantity(prod.id, -1)}
                          >
                            -
                          </button>
                          <span className="qty-display">{qty}</span>
                          <button
                            type="button"
                            className="qty-btn"
                            onClick={() => updateQuantity(prod.id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
