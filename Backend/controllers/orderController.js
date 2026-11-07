const Order = require("../models/Order");
const CartItem = require("../models/CartItem");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { buildOrder, hashSession, isObjectId, sessionIdOf } = require("../utils/checkout");
const { refreshPaymentStatus } = require("./paymentController");

const createOrder = asyncHandler(async (req, res) => {
  const sessionId = sessionIdOf(req.body.sessionId);
  const order = await Order.create({
    ...(await buildOrder(req.body)),
    // Card payments start at /api/payments/safepay/checkout, so an order made here is always cash on delivery.
    paymentMethod: "cod",
    sessionHash: hashSession(sessionId),
  });
  await CartItem.deleteMany({ sessionId });
  res.status(201).json(order);
});

/** Only the browser that placed the order can read it. Anyone else gets the same 404 as a missing order. */
const getOrderById = asyncHandler(async (req, res) => {
  const sessionId = sessionIdOf(req.header("x-session-id"));
  if (!isObjectId(req.params.id)) throw new ApiError(404, "Order not found");
  let order = await Order.findOne({ _id: req.params.id, sessionHash: hashSession(sessionId) });
  if (!order) throw new ApiError(404, "Order not found");
  // Back from Safepay before its webhook arrived: ask Safepay directly.
  if (order.status === "pending_payment") order = await refreshPaymentStatus(order);
  res.json(order);
});

module.exports = { createOrder, getOrderById };
