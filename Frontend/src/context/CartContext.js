import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { fetchCart, addCartItem, removeCartItem } from "../services/api";

const STORAGE_KEY = "blissful_cart";
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const remote = await fetchCart();
      setItems(remote.filter((i) => i.product));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addToCart = useCallback(async (product, quantity = 1) => {
    if (!product?._id) return;
    setError(null);
    try {
      const item = await addCartItem(product._id, quantity);
      setItems((prev) => {
        const idx = prev.findIndex((i) => i._id === item._id);
        if (idx === -1) return [...prev, item];
        const next = [...prev];
        next[idx] = item;
        return next;
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  }, []);

  const removeFromCart = useCallback(async (cartItemId) => {
    setError(null);
    const prev = items;
    setItems((cur) => cur.filter((i) => i._id !== cartItemId));
    try {
      await removeCartItem(cartItemId);
    } catch (err) {
      setItems(prev);
      setError(err.response?.data?.message || err.message);
    }
  }, [items]);

  const clearLocal = useCallback(() => setItems([]), []);

  const subtotal = items.reduce(
    (sum, it) => sum + (Number(it.product?.newprice) || 0) * (it.quantity || 0),
    0
  );
  const count = items.reduce((sum, it) => sum + (it.quantity || 0), 0);

  return (
    <CartContext.Provider
      value={{ items, loading, error, addToCart, removeFromCart, refresh, clearLocal, subtotal, count }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
