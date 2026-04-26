import React from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "./components/ProductGrid";

function ShopAll() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const params = q ? { q } : {};
  const title = q ? `Search: "${q}"` : undefined;
  return <ProductGrid params={params} title={title} />;
}

export default ShopAll;
