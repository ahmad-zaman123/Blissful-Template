const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    discount: { type: String },
    mainImage: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String, default: "" },
    inStock: { type: Boolean, default: true },
    size: { type: String },
    category: {
      type: String,
      enum: ["serum", "cleanser", "moisturizer", "sunscreen", "bundle", "other"],
      default: "other",
      index: true,
    },
    skinConcern: {
      type: [String],
      enum: ["acne", "dryness", "aging", "dark-spots", "hydration", "general"],
      default: ["general"],
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
