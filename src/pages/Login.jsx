import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { user, login, registerUser, ROLES } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState('login');
  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [registerData, setRegisterData] = useState({
    nombre: '',
    fechaNacimiento: '',
    telefono: '',
    direccion: '',
    email: '',
    password: ''
  });

  if (user) {
    return <Navigate to={user.rol === ROLES.ADMIN ? '/admin' : '/cajero'} replace />;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setAlertMsg(null);
    setLoading(true);

    setTimeout(() => {
      const res = login(email, password);
      if (res.success) {
        navigate(res.rol === ROLES.ADMIN ? '/admin' : '/cajero');
      } else {
        setAlertMsg(res.message);
      }
      setLoading(false);
    }, 400);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setAlertMsg(null);
    setLoading(true);

    setTimeout(() => {
      const res = registerUser({
        ...registerData,
        rol: ROLES.CAJERO
      });

      if (res.success) {
        setAlertMsg('Registro exitoso. Inicia sesión con tus credenciales.');
        setStep('login');
        setEmail(registerData.email);
        setPassword(registerData.password);
      } else {
        setAlertMsg(res.message);
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="kfc-app-container justify-content-center align-items-center py-4 px-3">
      {step === 'login' && (
        <div className="kfc-auth-card kfc-auth-card-wide">
          <div className="kfc-auth-side-banner d-none d-lg-flex">
            <div className="bg-white p-3 rounded-4 shadow-sm mb-4" style={{ width: '150px' }}>
              <img src="/mockups/logo1.png" alt="KFC" className="img-fluid" />
            </div>
            <h2 className="fw-bold mb-2">Sistema Operativo </h2>
            <p className="small text-white-50 mb-4">Gestión integral de restaurantes KFC El Salvador</p>
            <div className="border-top border-white border-opacity-25 pt-3 w-100 small text-white-50">
              <div>DAW901 — Universidad Don Bosco</div>
              
            </div>
          </div>

          <div className="kfc-auth-side-form">
            <div className="bg-danger text-center py-3 d-lg-none" style={{ background: '#E4002B', margin: '-3rem -2.5rem 1.5rem -2.5rem' }}>
              <div className="bg-white d-inline-block p-2 rounded-3 shadow-sm" style={{ width: '130px' }}>
                <img src="/mockups/logo1.png" alt="KFC" className="img-fluid" />
              </div>
            </div>

            <h3 className="fw-bold mb-1">Iniciar sesión :</h3>
            <p className="text-muted small mb-4">Ingresa tus credenciales para acceder al sistema</p>

            {alertMsg && (
              <div className="alert alert-warning py-2 px-3 small rounded-3 mb-3">
                {alertMsg}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="kfc-input-group">
                <div className="kfc-input-icon-box">
                  <i className="bi bi-person"></i>
                </div>
                <input
                  type="email"
                  className="kfc-input-field"
                  placeholder="Correo institucional (@kfc.sv)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="kfc-input-group">
                <div className="kfc-input-icon-box">
                  <i className="bi bi-lock"></i>
                </div>
                <input
                  type="password"
                  className="kfc-input-field"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-kfc-dark mt-2" disabled={loading}>
                {loading ? 'Verificando...' : 'Entrar'}
              </button>
            </form>

            <div className="text-center mt-4">
              <span className="fw-semibold">¿No tienes cuenta? </span>
              <button
                onClick={() => { setStep('register'); setAlertMsg(null); }}
                className="text-danger fw-bold border-0 bg-transparent p-0"
                style={{ cursor: 'pointer' }}
              >
                Iniciar
              </button>
            </div>

          </div>
        </div>
      )}

      {step === 'register' && (
        <div className="kfc-auth-card" style={{ maxWidth: '600px' }}>
          <div style={{ height: '140px', overflow: 'hidden', position: 'relative', background: '#333' }}>
            <img
              src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80"
              alt="Pollo frito KFC"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.35)'
              }}
            >
              <div className="bg-white px-3 py-1 rounded-2 shadow">
                <span className="text-danger fs-3" style={{ fontWeight: 900 }}>KFC</span>
              </div>
            </div>
          </div>

          <div className="p-4">
            <h4 className="fw-bold text-center mb-3">Ingrese sus datos :</h4>

            {alertMsg && (
              <div className="alert alert-warning py-2 px-3 small rounded-3 mb-3">
                {alertMsg}
              </div>
            )}

            <form onSubmit={handleRegister}>
              <div className="row g-2">
                <div className="col-12 col-md-6 mb-2">
                  <label className="form-label small fw-bold mb-1">Nombre :</label>
                  <input
                    type="text"
                    className="form-control"
                    style={{ background: '#EAEAEA', border: 'none' }}
                    value={registerData.nombre}
                    onChange={(e) => setRegisterData({ ...registerData, nombre: e.target.value })}
                    required
                  />
                </div>

                <div className="col-12 col-md-6 mb-2">
                  <label className="form-label small fw-bold mb-1">Fecha de nacimiento:</label>
                  <input
                    type="date"
                    className="form-control"
                    style={{ background: '#EAEAEA', border: 'none' }}
                    value={registerData.fechaNacimiento}
                    onChange={(e) => setRegisterData({ ...registerData, fechaNacimiento: e.target.value })}
                  />
                </div>

                <div className="col-12 col-md-6 mb-2">
                  <label className="form-label small fw-bold mb-1">Número de teléfono:</label>
                  <input
                    type="tel"
                    className="form-control"
                    style={{ background: '#EAEAEA', border: 'none' }}
                    value={registerData.telefono}
                    onChange={(e) => setRegisterData({ ...registerData, telefono: e.target.value })}
                  />
                </div>

                <div className="col-12 col-md-6 mb-2">
                  <label className="form-label small fw-bold mb-1">Dirección :</label>
                  <input
                    type="text"
                    className="form-control"
                    style={{ background: '#EAEAEA', border: 'none' }}
                    value={registerData.direccion}
                    onChange={(e) => setRegisterData({ ...registerData, direccion: e.target.value })}
                  />
                </div>

                <div className="col-12 col-md-6 mb-2">
                  <label className="form-label small fw-bold mb-1">Correo:</label>
                  <input
                    type="email"
                    className="form-control"
                    style={{ background: '#EAEAEA', border: 'none' }}
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label small fw-bold mb-1">Contraseña:</label>
                  <input
                    type="password"
                    className="form-control"
                    style={{ background: '#EAEAEA', border: 'none' }}
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-kfc-red mt-2" disabled={loading}>
                {loading ? 'Guardando...' : 'Aceptar'}
              </button>

              <div className="text-center mt-3">
                <button
                  type="button"
                  onClick={() => { setStep('login'); setAlertMsg(null); }}
                  className="btn btn-link text-muted btn-sm text-decoration-none"
                >
                  ← Volver a Iniciar sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
