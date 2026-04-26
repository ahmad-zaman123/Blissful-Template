import React from "react";
import ProductGrid from "./components/ProductGrid";

const BANNER = "https://shopblissfulbeauty.com/cdn/shop/files/cleanser.jpg?v=1738903312&width=1770";

function Cleansers() {
  return <ProductGrid params={{ category: "cleanser" }} banner={BANNER} title="Cleansers" />;
}

export default Cleansers;
