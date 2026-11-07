const mongoose = require("mongoose");
const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

const getProducts = asyncHandler(async (req, res) => {
  const { category, skinConcern, q } = req.query;
  const filter = {};
  if (typeof category === "string" && category) filter.category = category;
  if (typeof skinConcern === "string" && skinConcern) filter.skinConcern = skinConcern;
  if (typeof q === "string" && q.trim()) {
    if (q.length > 100) throw new ApiError(400, "Search is too long");
    // Searched as plain text: characters like .* or ( ) can't build a slow pattern.
    const escaped = q.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    filter.name = mongoose.trusted({ $regex: escaped, $options: "i" });
  }

  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) throw new ApiError(404, "Product not found");
  const product = await Product.findById(req.params.id);
  if (!product) throw new ApiError(404, "Product not found");
  res.json(product);
});

module.exports = { getProducts, getProductById };
