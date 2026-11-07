const crypto = require("crypto");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const ApiError = require("./ApiError");

const SHIPPING_FEE = 200;
const MAX_QUANTITY = 20;
const MAX_LINES = 50;
// The browser makes this id with crypto.randomUUID (or a fallback of letters, digits and _).
const SESSION_ID = /^[A-Za-z0-9_-]{8,100}$/;

/** The shopper's session id, or a 400. A non-string (such as {"$ne": null}) can never reach a query. */
const sessionIdOf = (value) => {
  if (typeof value !== "string" || !SESSION_ID.test(value)) throw new ApiError(400, "Missing or invalid session id");
  return value;
};

/** Orders keep only a hash of the session id, so the stored value can't be used to read the order. */
const hashSession = (sessionId) => crypto.createHash("sha256").update(sessionId).digest("hex");

const quantityOf = (value) => {
  const n = Number(value ?? 1);
  if (!Number.isInteger(n) || n < 1 || n > MAX_QUANTITY) {
    throw new ApiError(400, `Quantity must be a whole number from 1 to ${MAX_QUANTITY}`);
  }
  return n;
};

const isObjectId = (value) => typeof value === "string" && mongoose.isValidObjectId(value);

const text = (value, name, max) => {
  if (typeof value !== "string" || !value.trim()) throw new ApiError(400, `${name} is required`);
  if (value.length > max) throw new ApiError(400, `${name} is too long`);
  return value.trim();
};

/** Checks the customer and address, and prices the items from the database, never from the request. */
const buildOrder = async ({ customer, shippingAddress, items }) => {
  const details = {
    customer: {
      email: text(customer?.email, "Email", 200),
      firstName: text(customer?.firstName, "First name", 100),
      lastName: text(customer?.lastName, "Last name", 100),
      phone: text(customer?.phone, "Phone", 40),
    },
    shippingAddress: {
      address: text(shippingAddress?.address, "Shipping address", 500),
      ...(typeof shippingAddress?.country === "string" && shippingAddress.country.trim()
        ? { country: text(shippingAddress.country, "Country", 100) }
        : {}),
    },
  };
  if (!Array.isArray(items) || items.length === 0) throw new ApiError(400, "Order must contain at least one item");
  if (items.length > MAX_LINES) throw new ApiError(400, "Too many items in one order");

  const lines = items.map((item) => {
    if (!isObjectId(item?.productId)) throw new ApiError(400, "Invalid product id");
    return { productId: item.productId, quantity: quantityOf(item.quantity) };
  });
  const products = await Product.find({ _id: mongoose.trusted({ $in: lines.map((l) => l.productId) }) });
  const byId = new Map(products.map((p) => [String(p._id), p]));
  const orderItems = lines.map(({ productId, quantity }) => {
    const p = byId.get(productId);
    if (!p) throw new ApiError(404, `Product not found: ${productId}`);
    return { product: p._id, name: p.name, price: p.price, quantity, image: p.mainImage };
  });

  const subtotal = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return { ...details, items: orderItems, subtotal, shippingFee: SHIPPING_FEE, total: subtotal + SHIPPING_FEE };
};

module.exports = { buildOrder, hashSession, isObjectId, quantityOf, sessionIdOf, MAX_QUANTITY };
