import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

export default function OrderView() {
  const { cart, products, updateQuantity, createOrder } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState('summary');

  const [cardForm, setCardForm] = useState({
    name: '',
    number: '',
    month: '',
    year: '',
    cvv: ''
  });

  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const prod = products.find(p => p.id === id);
    return { ...prod, quantity: qty, subtotal: prod.precio * qty };
  });

  const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  const handleFinishCash = () => {
    createOrder('Efectivo');
    setStep('success');
  };

  const handleFinishCard = (e) => {
    e.preventDefault();
    createOrder('Tarjeta');
    setStep('success');
  };

  return (
    <div className="kfc-app-container">
      <Header backToMenu={true} showCart={false} title="Gestión de Orden" />

      <main className="kfc-main-content justify-content-center align-items-center">
        {step === 'summary' && (
          <div className="kfc-content-card w-100" style={{ maxWidth: '820px' }}>
            <h1 className="kfc-script-font fs-1 text-center mb-3">Orden del Cliente</h1>

            {cartItems.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-cart-x text-muted mb-3" style={{ fontSize: '4.5rem' }}></i>
                <h4>Tu orden está vacía</h4>
                <p className="text-muted">Agrega productos desde el menú para procesar un pedido.</p>
                <button onClick={() => navigate('/cajero')} className="btn-kfc-red mt-3" style={{ maxWidth: '220px' }}>
                  Ir al Menú
                </button>
              </div>
            ) : (
              <div className="row g-4">
                <div className="col-12 col-md-7">
                  <h6 className="fw-bold mb-3 border-bottom pb-2">Artículos Seleccionados</h6>
                  <div className="overflow-auto pe-2" style={{ maxHeight: '380px' }}>
                    {cartItems.map(item => (
                      <div key={item.id} className="card mb-2 p-2 border shadow-sm rounded-3">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center gap-3">
                            <img src={item.img} alt={item.nombre} style={{ width: 55, height: 55, objectFit: 'cover', borderRadius: 8 }} />
                            <div>
                              <div className="fw-bold text-truncate" style={{ maxWidth: '200px' }}>{item.nombre}</div>
                              <div className="text-danger fw-bold">${item.precio.toFixed(2)} c/u</div>
                            </div>
                          </div>

                          <div className="d-flex align-items-center gap-3">
                            <div className="qty-counter">
                              <button type="button" className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                              <span className="qty-display">{item.quantity}</span>
                              <button type="button" className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                            </div>
                            <div className="fw-bold text-end" style={{ width: '60px' }}>
                              ${item.subtotal.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-12 col-md-5">
                  <div className="p-3 bg-light rounded-3 border h-100 d-flex flex-column justify-content-between">
                    <div>
                      <h6 className="fw-bold mb-3 border-bottom pb-2">Resumen de Cuenta</h6>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">Subtotal:</span>
                        <span className="fw-bold">${total.toFixed(2)}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-3">
                        <span className="text-muted">Impuestos (IVA 13% incluido):</span>
                        <span className="text-muted">${(total * 0.13).toFixed(2)}</span>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <span className="fw-bold fs-5">Total a Cancelar :</span>
                        <span className="text-danger fw-bold fs-3">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 fw-bold small">Forma de pago:</div>
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          onClick={handleFinishCash}
                          className="btn-kfc-red flex-grow-1"
                        >
                          <i className="bi bi-cash me-1"></i> Efectivo
                        </button>
                        <button
                          type="button"
                          onClick={() => setStep('card')}
                          className="btn-kfc-red flex-grow-1"
                        >
                          <i className="bi bi-credit-card me-1"></i> Tarjeta
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 'card' && (
          <div className="kfc-content-card w-100" style={{ maxWidth: '520px' }}>
            <h2 className="kfc-script-font fs-1 text-center mb-3">Pago con tarjeta</h2>

            <div className="p-2 border border-dashed rounded-2 text-center mb-3 bg-light">
              <span className="small text-muted d-block mb-1">Pasarela de Pago Aceptada</span>
              <div className="d-flex justify-content-center gap-3 fs-4">
                <i className="bi bi-credit-card-2-front text-primary"></i>
                <i className="bi bi-shield-check text-success"></i>
              </div>
            </div>

            <form onSubmit={handleFinishCard}>
              <div className="mb-3">
                <label className="form-label small fw-bold mb-1">Nombre en la tarjeta</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej. Juan Pérez"
                  value={cardForm.name}
                  onChange={(e) => setCardForm({ ...cardForm, name: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold mb-1">Número de tarjeta</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  value={cardForm.number}
                  onChange={(e) => setCardForm({ ...cardForm, number: e.target.value })}
                  required
                />
              </div>

              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="form-label small fw-bold mb-1">Mes de Exp.</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="MM"
                    maxLength={2}
                    value={cardForm.month}
                    onChange={(e) => setCardForm({ ...cardForm, month: e.target.value })}
                    required
                  />
                </div>
                <div className="col-6">
                  <label className="form-label small fw-bold mb-1">Año de Exp.</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="AA"
                    maxLength={2}
                    value={cardForm.year}
                    onChange={(e) => setCardForm({ ...cardForm, year: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold mb-1">Código de Seguridad (CVV)</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="123"
                  maxLength={4}
                  value={cardForm.cvv}
                  onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value })}
                  required
                />
              </div>

              <div className="d-flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('summary')}
                  className="btn btn-outline-secondary flex-grow-1"
                >
                  Regresar
                </button>
                <button type="submit" className="btn-kfc-dark flex-grow-1">
                  Pagar ${total.toFixed(2)}
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 'success' && (
          <div className="kfc-content-card text-center p-5 w-100" style={{ maxWidth: '540px' }}>
            <h1 className="kfc-script-font display-4 text-danger mb-4">Orden en Camino</h1>

            <div className="bg-light p-4 rounded-4 d-inline-block shadow-sm mb-4 border">
              <i className="bi bi-scooter text-danger" style={{ fontSize: '5.5rem' }}></i>
            </div>

            <h4 className="fw-bold mb-2">El repartidor se contactará pronto con usted.</h4>
            <p className="text-muted mb-4">El pedido ya fue registrado en el sistema y enviado a la estación de cocina.</p>

            <button
              onClick={() => navigate('/cajero')}
              className="btn-kfc-red mx-auto"
              style={{ maxWidth: '240px' }}
            >
              <i className="bi bi-plus-circle me-1"></i> Tomar Otro Pedido
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
