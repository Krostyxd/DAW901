// Claves maestras para localStorage
export const STORAGE_KEYS = {
  USERS: "kfc_users",
  SESSION: "kfc_session",
  ORDERS: "kfc_orders",
  MENU: "kfc_menu",
  INVENTORY: "kfc_inventory"
};

// Estados permitidos de los pedidos
export const ESTADOS_PEDIDO = {
  PENDIENTE: "Pendiente",
  EN_PREPARACION: "En Preparación",
  LISTO: "Listo",
  ENTREGADO: "Entregado",
  CANCELADO: "Cancelado"
};

// Menú inicial semilla
export const INITIAL_MENU = [
  {
    id: "PROD-01",
    name: "Combo Coronel Clásico",
    price: 5.99,
    category: "Combos",
    stock: 25,
    description: "2 piezas de pollo, puré y ensalada",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400"
  },
  {
    id: "PROD-02",
    name: "Mega Bucket 8 Piezas",
    price: 14.50,
    category: "Buckets",
    stock: 15,
    description: "8 piezas de pollo con receta secreta",
    image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=400"
  },
  {
    id: "PROD-03",
    name: "Sandwich Kentucky Deluxe",
    price: 4.75,
    category: "Sandwiches",
    stock: 30,
    description: "Filete de pechuga crujiente con queso y mayonesa",
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400"
  },
  {
    id: "PROD-04",
    name: "Papas Fritas Medianas",
    price: 1.50,
    category: "Complementos",
    stock: 50,
    description: "Papas doradas al estilo KFC",
    image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=400"
  }
];

// Pedidos iniciales para demostración
export const INITIAL_ORDERS = [
  {
    id: "ORD-101",
    cliente: "Mostrador General",
    fecha: new Date().toISOString(),
    total: 10.74,
    estado: ESTADOS_PEDIDO.ENTREGADO,
    metodoPago: "Efectivo",
    items: [
      { id: "PROD-01", name: "Combo Coronel Clásico", cantidad: 1, price: 5.99 },
      { id: "PROD-03", name: "Sandwich Kentucky Deluxe", cantidad: 1, price: 4.75 }
    ]
  }
];

// Formateador de moneda en USD
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(amount || 0);
};

// Formateador de fechas
export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("es-SV", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};
