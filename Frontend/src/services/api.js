import axios from "axios";

const baseURL =
  process.env.REACT_APP_API_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "/api");

const SESSION_KEY = "blissful_session_id";
const getSessionId = () => {
  let sid = localStorage.getItem(SESSION_KEY);
  if (!sid) {
    sid =
      (window.crypto?.randomUUID && window.crypto.randomUUID()) ||
      `s_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(SESSION_KEY, sid);
  }
  return sid;
};

const api = axios.create({ baseURL });
api.interceptors.request.use((config) => {
  config.headers["x-session-id"] = getSessionId();
  return config;
});

// Map a backend product into the field shape the UI components already use
// (img / product_name / newprice / oldprice / images / discount / inStock / size / description)
// while preserving _id so we can route to /description/:id.
export const mapProduct = (p) => ({
  _id: p._id,
  id: p._id,
  img: p.mainImage,
  images: p.images || [],
  product_name: p.name,
  newprice: p.price,
  oldprice: p.oldPrice,
  discount: p.discount,
  inStock: p.inStock,
  size: p.size,
  description: p.description,
  category: p.category,
  skinConcern: p.skinConcern,
});

export const fetchProducts = async (params = {}) => {
  const { data } = await api.get("/products", { params });
  return data.map(mapProduct);
};

export const fetchProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return mapProduct(data);
};

export const fetchCart = async () => {
  const { data } = await api.get("/cart");
  return data.map((item) => ({
    _id: item._id,
    quantity: item.quantity,
    product: item.product ? mapProduct(item.product) : null,
  }));
};

export const addCartItem = async (productId, quantity = 1) => {
  const { data } = await api.post("/cart", { productId, quantity });
  return {
    _id: data._id,
    quantity: data.quantity,
    product: data.product ? mapProduct(data.product) : null,
  };
};

export const removeCartItem = async (id) => {
  const { data } = await api.delete(`/cart/${id}`);
  return data;
};

export const createOrder = async (payload) => {
  const { data } = await api.post("/orders", { ...payload, sessionId: getSessionId() });
  return data;
};

export const fetchOrderById = async (id) => {
  const { data } = await api.get(`/orders/${id}`);
  return data;
};

export const fetchPaymentConfig = async () => {
  const { data } = await api.get("/payments/config");
  return data;
};

export const createSafepayCheckout = async (payload) => {
  const { data } = await api.post("/payments/safepay/checkout", { ...payload, sessionId: getSessionId() });
  return data;
};

export { getSessionId };
export default api;
