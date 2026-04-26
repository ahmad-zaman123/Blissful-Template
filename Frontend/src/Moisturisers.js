import React from "react";
import ProductGrid from "./components/ProductGrid";

const BANNER = "https://shopblissfulbeauty.com/cdn/shop/files/water_cream.jpg?v=1738903312&width=1770";

function Moisturisers() {
  return <ProductGrid params={{ category: "moisturizer" }} banner={BANNER} title="Moisturisers" />;
}

export default Moisturisers;
