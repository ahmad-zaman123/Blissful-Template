require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const { safepayWebhook } = require("./controllers/paymentController");
const { notFound, errorHandler } = require("./middleware/errorHandler");

// Any {"$ne": ...} style operator from a request is matched literally instead of run as a query operator.
mongoose.set("sanitizeFilter", true);

const app = express();
app.disable("x-powered-by");
// "simple" keeps ?a[b]=c as a plain string, so query parameters can't become objects either.
app.set("query parser", "simple");

// In production the shop and the API share one address, so no other site may call the API.
const allowedOrigins = (process.env.CLIENT_ORIGIN || "").split(",").map((o) => o.trim()).filter(Boolean);
app.use(cors({ origin: allowedOrigins.length ? allowedOrigins : false }));

// Safepay webhook must read the raw body for HMAC verification, so it is
// mounted before express.json().
app.post("/api/payments/safepay/webhook", express.raw({ type: "*/*", limit: "64kb" }), async (req, res, next) => {
  try {
    await connectDB();
    return safepayWebhook(req, res, next);
  } catch (err) {
    next(err);
  }
});

app.use(express.json({ limit: "64kb" }));
if (process.env.NODE_ENV !== "test" && process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Lazy-connect on first request — works for both local and serverless.
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
