const CartItem = require("../models/CartItem");
const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { isObjectId, quantityOf, sessionIdOf, MAX_QUANTITY } = require("../utils/checkout");

const sessionOf = (req) => sessionIdOf(req.header("x-session-id"));

const getCart = asyncHandler(async (req, res) => {
  const items = await CartItem.find({ sessionId: sessionOf(req) }).populate("product");
  res.json(items);
});

const addToCart = asyncHandler(async (req, res) => {
  const sessionId = sessionOf(req);
  const { productId } = req.body;
  if (!isObjectId(productId)) throw new ApiError(400, "productId is required");
  const quantity = quantityOf(req.body.quantity);

  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, "Product not found");

  const existing = await CartItem.findOne({ sessionId, product: productId });
  if (existing && existing.quantity + quantity > MAX_QUANTITY) {
    throw new ApiError(400, `You can add up to ${MAX_QUANTITY} of one product`);
  }
  const item = await CartItem.findOneAndUpdate(
    { sessionId, product: productId },
    { $inc: { quantity }, $setOnInsert: { sessionId, product: productId } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  ).populate("product");

  res.status(201).json(item);
});

const removeFromCart = asyncHandler(async (req, res) => {
  const sessionId = sessionOf(req);
  if (!isObjectId(req.params.id)) throw new ApiError(404, "Cart item not found");
  const removed = await CartItem.findOneAndDelete({ sessionId, _id: req.params.id });
  if (!removed) throw new ApiError(404, "Cart item not found");
  res.json({ message: "Removed", id: req.params.id });
});

module.exports = { getCart, addToCart, removeFromCart };
