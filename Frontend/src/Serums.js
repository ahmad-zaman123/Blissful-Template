import React from "react";
import ProductGrid from "./components/ProductGrid";

const BANNER = "https://shopblissfulbeauty.com/cdn/shop/files/serum_category.jpg?v=1738903312&width=1770";

function Serums() {
  return <ProductGrid params={{ category: "serum" }} banner={BANNER} title="Serums" />;
}

export default Serums;
