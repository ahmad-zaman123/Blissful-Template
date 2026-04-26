import React from "react";
import ProductGrid from "./components/ProductGrid";

const BANNER = "https://shopblissfulbeauty.com/cdn/shop/files/sunscreen.jpg?v=1738903313&width=1770";

function Sunscreen() {
  return <ProductGrid params={{ category: "sunscreen" }} banner={BANNER} title="Sunscreens" />;
}

export default Sunscreen;
