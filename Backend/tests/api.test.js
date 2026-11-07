const { test, before, after, beforeEach } = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const request = require("supertest");

// A fake Safepay: what it says about each tracker is the only thing that can change an order's payment status.
const safepay = {
  states: {},
  lookups: [],
  isConfigured: () => true,
  getEnv: () => "sandbox",
  createTracker: async ({ orderId }) => ({ tracker: `track_${orderId}`, checkoutUrl: "https://sandbox.example/checkout" }),
  fetchTrackerState: async (tracker) => {
    safepay.lookups.push(tracker);
    return safepay.states[tracker] ?? "TRACKER_STARTED";
  },
};
const safepayPath = path.resolve(__dirname, "../utils/safepay.js");
require.cache[safepayPath] = { id: safepayPath, filename: safepayPath, loaded: true, exports: safepay };

let mongo;
let app;
let Order;
let Product;
let CartItem;
let serum;
let cleanser;

const ME = "3f1c6a52-7d2e-4f0b-9a51-1b2c3d4e5f60";
const SOMEONE_ELSE = "s_1793964450000_abc123def";
const customer = { email: "sara@example.com", firstName: "Sara", lastName: "Khan", phone: "0300 1234567" };
const shippingAddress = { address: "12 Mall Road, Lahore" };

before(async () => {
  mongo = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongo.getUri();
  process.env.NODE_ENV = "test";
  delete process.env.CLIENT_ORIGIN;
  app = require("../app");
  Order = require("../models/Order");
  Product = require("../models/Product");
  CartItem = require("../models/CartItem");
});

after(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI).catch(() => {});
  await Promise.all([Order.deleteMany({}), Product.deleteMany({}), CartItem.deleteMany({})]);
  safepay.states = {};
  safepay.lookups = [];
  [serum, cleanser] = await Product.create([
    { name: "Vitamin C Serum", price: 2500, mainImage: "/serum.png", category: "serum" },
    { name: "Gentle (Foam) Cleanser", price: 1200, mainImage: "/cleanser.png", category: "cleanser" },
  ]);
});

const placeOrder = (session = ME, body = {}) =>
  request(app)
    .post("/api/orders")
    .set("x-session-id", session)
    .send({ customer, shippingAddress, items: [{ productId: String(serum._id), quantity: 2 }], sessionId: session, ...body });

// Orders

test("there is no way to list everyone's orders", async () => {
  await placeOrder();
  const res = await request(app).get("/api/orders");
  assert.equal(res.status, 404);
  assert.ok(!JSON.stringify(res.body).includes("sara@example.com"));
});

test("an order is priced from the database, not from the request", async () => {
  const res = await placeOrder(ME, { items: [{ productId: String(serum._id), quantity: 2, price: 1 }], total: 1 });
  assert.equal(res.status, 201);
  assert.equal(res.body.subtotal, 5000);
  assert.equal(res.body.total, 5200);
  assert.equal(res.body.paymentMethod, "cod");
});

test("only the browser that placed an order can read it", async () => {
  const { body: order } = await placeOrder();

  const mine = await request(app).get(`/api/orders/${order._id}`).set("x-session-id", ME);
  assert.equal(mine.status, 200);
  assert.equal(mine.body.customer.email, "sara@example.com");

  for (const headers of [{ "x-session-id": SOMEONE_ELSE }, {}]) {
    const res = await request(app).get(`/api/orders/${order._id}`).set(headers);
    assert.ok([400, 404].includes(res.status), `got ${res.status}`);
    assert.ok(!JSON.stringify(res.body).includes("sara@example.com"));
  }
  const notAnId = await request(app).get("/api/orders/not-an-id").set("x-session-id", ME);
  assert.equal(notAnId.status, 404);
});

test("orders never show the payment tracker or the session hash", async () => {
  const { body } = await request(app)
    .post("/api/payments/safepay/checkout")
    .send({ customer, shippingAddress, items: [{ productId: String(serum._id) }], sessionId: ME });
  const res = await request(app).get(`/api/orders/${body.orderId}`).set("x-session-id", ME);
  assert.equal(res.status, 200);
  assert.equal(res.body.safepayTracker, undefined);
  assert.equal(res.body.sessionHash, undefined);
  const stored = await Order.findById(body.orderId);
  assert.ok(stored.safepayTracker && stored.sessionHash && stored.sessionHash !== ME);
});

test("bad quantities, ids and customer details are refused", async () => {
  for (const quantity of [0, -3, 1.5, 21, "lots", { $gt: 0 }]) {
    const res = await placeOrder(ME, { items: [{ productId: String(serum._id), quantity }] });
    assert.equal(res.status, 400, `quantity ${JSON.stringify(quantity)}`);
  }
  for (const productId of [{ $ne: null }, "nope"]) {
    const res = await placeOrder(ME, { items: [{ productId }] });
    assert.equal(res.status, 400);
  }
  const res = await placeOrder(ME, { customer: { ...customer, email: { $ne: "" } } });
  assert.equal(res.status, 400);
  assert.equal(await Order.countDocuments(), 0);
});

// Carts

test("query operators can't read or empty other shoppers' carts", async () => {
  await CartItem.create({ sessionId: SOMEONE_ELSE, product: serum._id, quantity: 1 });

  const read = await request(app).get("/api/cart?sessionId[$ne]=x");
  assert.equal(read.status, 400);
  const read2 = await request(app).get("/api/cart").set("x-session-id", "{\"$ne\":\"x\"}");
  assert.equal(read2.status, 400);

  const order = await placeOrder(ME, { sessionId: { $ne: null } });
  assert.equal(order.status, 400);
  assert.equal(await CartItem.countDocuments({ sessionId: SOMEONE_ELSE }), 1);
});

test("a cart holds sensible quantities only", async () => {
  const add = (quantity) =>
    request(app).post("/api/cart").set("x-session-id", ME).send({ productId: String(cleanser._id), quantity });
  assert.equal((await add(-5)).status, 400);
  assert.equal((await add(20)).status, 201);
  assert.equal((await add(1)).status, 400);
  const cart = await request(app).get("/api/cart").set("x-session-id", ME);
  assert.equal(cart.body.length, 1);
  assert.equal(cart.body[0].quantity, 20);
});

test("placing an order empties only your own cart", async () => {
  await CartItem.create([
    { sessionId: ME, product: serum._id, quantity: 2 },
    { sessionId: SOMEONE_ELSE, product: serum._id, quantity: 1 },
  ]);
  assert.equal((await placeOrder()).status, 201);
  assert.equal(await CartItem.countDocuments({ sessionId: ME }), 0);
  assert.equal(await CartItem.countDocuments({ sessionId: SOMEONE_ELSE }), 1);
});

// Products

test("search treats its text literally", async () => {
  const res = await request(app).get("/api/products").query({ q: "(Foam)" });
  assert.equal(res.status, 200);
  assert.deepEqual(res.body.map((p) => p.name), ["Gentle (Foam) Cleanser"]);
  const pattern = await request(app).get("/api/products").query({ q: ".*" });
  assert.deepEqual(pattern.body, []);
  // Not a filter at all: the parameter is named "category[$ne]", so it is ignored like any unknown one.
  const operator = await request(app).get("/api/products?category[$ne]=serum");
  assert.equal(operator.status, 200);
  assert.equal(operator.body.length, 2);
  const real = await request(app).get("/api/products?category=serum");
  assert.deepEqual(real.body.map((p) => p.name), ["Vitamin C Serum"]);
  assert.equal((await request(app).get("/api/products").query({ q: "a".repeat(101) })).status, 400);
});

// Payments

const startCheckout = async () => {
  const { body } = await request(app)
    .post("/api/payments/safepay/checkout")
    .send({ customer, shippingAddress, items: [{ productId: String(serum._id) }], sessionId: ME });
  return Order.findById(body.orderId);
};
const webhook = (payload) =>
  request(app).post("/api/payments/safepay/webhook").set("content-type", "application/json").send(JSON.stringify(payload));

test("a forged webhook can't mark an order paid", async () => {
  const order = await startCheckout();
  const res = await webhook({ type: "payment.succeeded", data: { tracker: order.safepayTracker, state: "PAID" } });
  assert.equal(res.status, 200);
  assert.equal((await Order.findById(order._id)).status, "pending_payment");
  assert.deepEqual(safepay.lookups, [order.safepayTracker]);
});

test("a webhook makes the server ask Safepay, and Safepay's answer sets the status", async () => {
  const order = await startCheckout();
  safepay.states[order.safepayTracker] = "TRACKER_ENDED";
  await webhook({ data: { tracker: order.safepayTracker } });
  assert.equal((await Order.findById(order._id)).status, "paid");

  // A later "declined" can't undo a payment that went through.
  safepay.states[order.safepayTracker] = "DECLINED";
  await webhook({ data: { tracker: order.safepayTracker } });
  assert.equal((await Order.findById(order._id)).status, "paid");
});

test("the confirmation page picks up a payment even if the webhook never came", async () => {
  const order = await startCheckout();
  safepay.states[order.safepayTracker] = "TRACKER_ENDED";
  const res = await request(app).get(`/api/orders/${order._id}`).set("x-session-id", ME);
  assert.equal(res.body.status, "paid");
});

test("webhooks for unknown or malformed trackers are refused", async () => {
  assert.equal((await webhook({ data: { tracker: "track_missing" } })).status, 404);
  assert.equal((await webhook({ data: { tracker: { $ne: null } } })).status, 400);
  const notJson = await request(app).post("/api/payments/safepay/webhook").set("content-type", "text/plain").send("hello");
  assert.equal(notJson.status, 400);
});

// The rest

test("other websites can't call the API from a browser", async () => {
  const res = await request(app).get("/api/products").set("Origin", "https://evil.example");
  assert.equal(res.headers["access-control-allow-origin"], undefined);
});

test("unexpected errors don't reveal their details", async () => {
  const original = Product.find;
  Product.find = () => {
    throw new Error("MongoServerError: secret internal detail");
  };
  try {
    const res = await request(app).get("/api/products");
    assert.equal(res.status, 500);
    assert.equal(res.body.message, "Server error");
  } finally {
    Product.find = original;
  }
});
