const Order = require("../models/Order");
const CartItem = require("../models/CartItem");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { buildOrder, hashSession, sessionIdOf } = require("../utils/checkout");
const { createTracker, fetchTrackerState, isConfigured } = require("../utils/safepay");

// What Safepay's own record of a payment means for the order.
const STATE_TO_STATUS = {
  TRACKER_ENDED: "paid",
  TRACKER_OCCURRED: "paid",
  OCCURRED: "paid",
  PAID: "paid",
  DECLINED: "failed",
  CANCELLED: "cancelled",
  EXPIRED: "failed",
};

const getConfig = asyncHandler(async (_req, res) => {
  res.json({ safepay: isConfigured() });
});

/**
 * Build the order from the request, persist it as `pending_payment`,
 * then ask Safepay for a checkout URL and return it to the client.
 */
const createSafepayCheckout = asyncHandler(async (req, res) => {
  if (!isConfigured()) throw new ApiError(503, "Safepay is not configured on the server");
  const sessionId = sessionIdOf(req.body.sessionId);
  const details = await buildOrder(req.body);

  const order = await Order.create({
    ...details,
    paymentMethod: "safepay",
    status: "pending_payment",
    sessionHash: hashSession(sessionId),
  });

  const baseUrl = process.env.PUBLIC_BASE_URL || "http://localhost:3000";
  const redirectUrl = `${baseUrl}/order-confirmation/${order._id}`;

  try {
    const { tracker, checkoutUrl } = await createTracker({
      orderId: String(order._id),
      amountPkr: details.total,
      customerEmail: details.customer.email,
      redirectUrl,
    });
    order.safepayTracker = tracker;
    await order.save();
    await CartItem.deleteMany({ sessionId });
    res.status(201).json({ orderId: order._id, checkoutUrl });
  } catch (err) {
    console.error("[safepay] checkout failed:", err.message);
    order.status = "failed";
    await order.save();
    throw new ApiError(502, "Couldn't start the card payment. Please try again or choose cash on delivery.");
  }
});

/**
 * Sets a waiting order's status from Safepay's own record of the payment. The status is never taken from a
 * request, so a forged webhook or a crafted page visit can't mark an order paid.
 */
const refreshPaymentStatus = async (order) => {
  if (order.status !== "pending_payment" || !order.safepayTracker || !isConfigured()) return order;
  let state;
  try {
    state = await fetchTrackerState(order.safepayTracker);
  } catch (err) {
    console.error("[safepay] status check failed:", err.message);
    return order;
  }
  const next = STATE_TO_STATUS[state];
  if (!next) return order;
  // Only a still-waiting order changes, so two checks at once can't overwrite a later status.
  const updated = await Order.findOneAndUpdate(
    { _id: order._id, status: "pending_payment" },
    { $set: { status: next } },
    { new: true }
  );
  return updated || (await Order.findById(order._id));
};

/**
 * Safepay calls this when a payment changes. The body only says which payment to look at: Misconfigured or
 * forged calls can at most make the server ask Safepay about a payment it already knows.
 */
const safepayWebhook = asyncHandler(async (req, res) => {
  let payload;
  try {
    payload = JSON.parse(req.body instanceof Buffer ? req.body.toString("utf8") : "");
  } catch {
    return res.status(400).json({ message: "Invalid JSON" });
  }
  const tracker = payload?.data?.tracker ?? payload?.tracker;
  if (typeof tracker !== "string" || !/^[A-Za-z0-9_-]{1,200}$/.test(tracker)) {
    return res.status(400).json({ message: "Missing tracker" });
  }
  const order = await Order.findOne({ safepayTracker: tracker });
  if (!order) return res.status(404).json({ message: "Order not found" });
  await refreshPaymentStatus(order);
  res.json({ ok: true });
});

module.exports = { getConfig, createSafepayCheckout, safepayWebhook, refreshPaymentStatus, STATE_TO_STATUS };
