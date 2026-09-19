import { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEYS = {
  USERS: 'kfc_users',
  SESSION: 'kfc_session',
  CART: 'kfc_cart',
  ORDERS: 'kfc_orders'
};

const ROLES = {
  ADMIN: 'admin',
  CAJERO: 'cajero'
};

const INITIAL_PRODUCTS = [
  { id: 'PRD-01', categoria: 'promociones', nombre: 'Mega Pack', precio: 24.99, stock: 45, img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&q=80' },
  { id: 'PRD-02', categoria: 'promociones', nombre: 'Wow Pack', precio: 13.99, stock: 30, img: 'https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=400&q=80' },
  { id: 'PRD-03', categoria: 'promociones', nombre: 'Duo Kruncher Jr.', precio: 12.00, stock: 25, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80' },
  { id: 'PRD-04', categoria: 'promociones', nombre: 'Wow Box tu box', precio: 5.50, stock: 50, img: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&q=80' },
  { id: 'PRD-05', categoria: 'boxes', nombre: 'Kruncher Jr Box', precio: 5.50, stock: 40, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80' },
  { id: 'PRD-06', categoria: 'boxes', nombre: 'Kruncher Jr Box con Papa', precio: 6.50, stock: 35, img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80' },
  { id: 'PRD-07', categoria: 'boxes', nombre: 'Big Kruncher XL Box', precio: 9.99, stock: 20, img: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&q=80' },
  { id: 'PRD-08', categoria: 'pollo', nombre: 'Duo Coronel', precio: 7.15, stock: 60, img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&q=80' },
  { id: 'PRD-09', categoria: 'pollo', nombre: 'Duo Full', precio: 7.90, stock: 55, img: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&q=80' },
  { id: 'PRD-10', categoria: 'boneless', nombre: 'Combo KFC Dippers', precio: 6.50, stock: 40, img: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80' },
  { id: 'PRD-11', categoria: 'boneless', nombre: 'KFC Dippers Full', precio: 8.75, stock: 35, img: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=400&q=80' },
  { id: 'PRD-12', categoria: 'hamburguesas', nombre: 'Big Kruncher', precio: 6.60, stock: 45, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80' },
  { id: 'PRD-13', categoria: 'hamburguesas', nombre: 'Big Kruncher Buffalo', precio: 6.60, stock: 30, img: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&q=80' },
  { id: 'PRD-14', categoria: 'postres', nombre: 'Papas Fritas Medianas', precio: 2.25, stock: 100, img: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=400&q=80' },
  { id: 'PRD-15', categoria: 'postres', nombre: '1 Pie Manzana', precio: 1.50, stock: 40, img: 'https://images.unsplash.com/photo-1519915028121-7d346b7240c2?w=400&q=80' },
  { id: 'PRD-16', categoria: 'postres', nombre: 'Biscuit', precio: 0.60, stock: 80, img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80' },
  { id: 'PRD-17', categoria: 'postres', nombre: 'Soda Lata', precio: 1.25, stock: 120, img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80' }
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    seedUsers();
    const storedSession = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (storedSession) {
      try {
        setUser(JSON.parse(storedSession));
      } catch (e) {
        localStorage.removeItem(STORAGE_KEYS.SESSION);
      }
    }

    const storedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch (e) {
        setOrders([]);
      }
    }

    setLoading(false);
  }, []);

  const seedUsers = () => {
    if (localStorage.getItem(STORAGE_KEYS.USERS)) return;

    const defaultUsers = [
      {
        id: 'USR-01',
        nombre: 'Gerente General',
        email: 'admin@kfc.sv',
        password: 'password123',
        rol: ROLES.ADMIN,
        activo: true,
        creadoEn: new Date().toISOString()
      },
      {
        id: 'USR-02',
        nombre: 'Cajero Principal',
        email: 'cajero@kfc.sv',
        password: 'password123',
        rol: ROLES.CAJERO,
        activo: true,
        creadoEn: new Date().toISOString()
      }
    ];

    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultUsers));
  };

  const getUsers = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || [];
    } catch (e) {
      return [];
    }
  };

  const saveUsers = (usersList) => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(usersList));
  };

  const login = (email, password) => {
    if (!email || !email.trim()) {
      return { success: false, message: 'El correo electrónico es obligatorio.' };
    }
    if (!password || !password.trim()) {
      return { success: false, message: 'La contraseña es obligatoria.' };
    }

    const users = getUsers();
    const foundUser = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());

    if (!foundUser) {
      return { success: false, message: 'No se encontró una cuenta con ese correo.' };
    }
    if (!foundUser.activo) {
      return { success: false, message: 'Esta cuenta ha sido desactivada.' };
    }
    if (foundUser.password !== password) {
      return { success: false, message: 'La contraseña es incorrecta.' };
    }

    const sessionData = {
      id: foundUser.id,
      nombre: foundUser.nombre,
      email: foundUser.email,
      rol: foundUser.rol,
      loginTimestamp: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(sessionData));
    setUser(sessionData);

    return { success: true, rol: foundUser.rol };
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    setUser(null);
    setCart({});
  };

  const registerUser = (userData) => {
    const { nombre, email, password, rol = ROLES.CAJERO, telefono, direccion, fechaNacimiento } = userData;

    if (!nombre || !nombre.trim()) {
      return { success: false, message: 'El nombre es obligatorio.' };
    }
    if (!email || !email.trim()) {
      return { success: false, message: 'El correo es obligatorio.' };
    }
    if (!password || password.length < 6) {
      return { success: false, message: 'La contraseña debe tener mínimo 6 caracteres.' };
    }

    const users = getUsers();
    if (users.some(u => u.email.toLowerCase() === email.trim().toLowerCase())) {
      return { success: false, message: 'Ya existe una cuenta con ese correo.' };
    }

    const newUser = {
      id: 'USR-' + String(users.length + 1).padStart(2, '0'),
      nombre: nombre.trim(),
      email: email.trim().toLowerCase(),
      password,
      rol,
      telefono: telefono || '',
      direccion: direccion || '',
      fechaNacimiento: fechaNacimiento || '',
      activo: true,
      creadoEn: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    return { success: true, message: 'Cuenta creada exitosamente.' };
  };

  const updateQuantity = (productId, delta) => {
    setCart(prev => {
      const current = prev[productId] || 0;
      const updated = Math.max(0, current + delta);
      const clone = { ...prev };
      if (updated === 0) {
        delete clone[productId];
      } else {
        clone[productId] = updated;
      }
      return clone;
    });
  };

  const clearCart = () => setCart({});

  const createOrder = (paymentMethod) => {
    const items = Object.entries(cart).map(([pId, qty]) => {
      const prd = products.find(p => p.id === pId);
      return { ...prd, quantity: qty, subtotal: prd.precio * qty };
    });

    const total = items.reduce((sum, item) => sum + item.subtotal, 0);

    const newOrder = {
      id: 'ORD-' + Date.now().toString().slice(-6),
      fecha: new Date().toISOString(),
      cliente: user?.nombre || 'Cliente General',
      cajeroId: user?.id,
      items,
      total,
      metodoPago: paymentMethod,
      estado: 'En preparación'
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updatedOrders));
    clearCart();

    return newOrder;
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      registerUser,
      getUsers,
      ROLES,
      products,
      cart,
      updateQuantity,
      clearCart,
      createOrder,
      orders
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
