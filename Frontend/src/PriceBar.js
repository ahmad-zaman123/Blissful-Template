import React, { useState, useEffect, useMemo } from "react";
import { X, Filter, ChevronUp, ChevronDown } from "lucide-react";
import { formatPrice } from "./utils/format";

const sliderStyles = `
  .blissful-range {
    position: absolute;
    top: 12px;
    left: 0;
    width: 100%;
    height: 4px;
    background: transparent;
    pointer-events: none;
    -webkit-appearance: none;
    appearance: none;
    outline: none;
    margin: 0;
  }
  .blissful-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #000;
    cursor: pointer;
    pointer-events: auto;
    border: none;
    margin-top: -6px;
  }
  .blissful-range::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #000;
    cursor: pointer;
    pointer-events: auto;
    border: none;
  }
  .blissful-range::-moz-range-track {
    background: transparent;
    border: none;
  }
`;

const Section = ({ title, open, onToggle, children }) => (
  <div className="mt-4 border-t pt-2">
    <button
      type="button"
      className="flex w-full justify-between items-center text-sm font-semibold uppercase"
      onClick={onToggle}
    >
      <span>{title}</span>
      {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
    </button>
    {open && <div className="mt-2">{children}</div>}
  </div>
);

const PriceBar = ({ onPriceChange, productList = [] }) => {
  const { sliderMin, sliderMax } = useMemo(() => {
    const prices = productList
      .map((p) => Number(p.newprice))
      .filter(Number.isFinite);
    if (!prices.length) return { sliderMin: 0, sliderMax: 9999 };
    const lo = Math.floor(Math.min(...prices));
    const hi = Math.ceil(Math.max(...prices));
    return { sliderMin: lo === hi ? lo - 1 : lo, sliderMax: hi };
  }, [productList]);

  const [priceRange, setPriceRange] = useState([sliderMin, sliderMax]);
  const [minInput, setMinInput] = useState(String(sliderMin));
  const [maxInput, setMaxInput] = useState(String(sliderMax));
  const [showInStock, setShowInStock] = useState(true);
  const [showOutOfStock, setShowOutOfStock] = useState(true);
  const [availabilityOpen, setAvailabilityOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // Reset price range when bounds change (catalog loaded / changed); preserve current stock toggles
  useEffect(() => {
    setPriceRange([sliderMin, sliderMax]);
    setMinInput(String(sliderMin));
    setMaxInput(String(sliderMax));
    onPriceChange([sliderMin, sliderMax], { showInStock, showOutOfStock });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderMin, sliderMax]);

  const apply = (range = priceRange, inStock = showInStock, outOfStock = showOutOfStock) => {
    onPriceChange(range, { showInStock: inStock, showOutOfStock: outOfStock });
  };

  const handleSliderChange = (e, index) => {
    const value = Number(e.target.value);
    const newRange = [...priceRange];
    newRange[index] = value;
    if (index === 0 && value > newRange[1]) newRange[1] = value;
    if (index === 1 && value < newRange[0]) newRange[0] = value;
    setPriceRange(newRange);
    setMinInput(String(newRange[0]));
    setMaxInput(String(newRange[1]));
    apply(newRange);
  };

  const commitInput = (index) => {
    const raw = index === 0 ? minInput : maxInput;
    const parsed = Number(raw);
    let next = Number.isFinite(parsed) ? parsed : priceRange[index];
    next = Math.min(Math.max(next, sliderMin), sliderMax);
    const newRange = [...priceRange];
    newRange[index] = next;
    if (index === 0 && next > newRange[1]) newRange[1] = next;
    if (index === 1 && next < newRange[0]) newRange[0] = next;
    setPriceRange(newRange);
    setMinInput(String(newRange[0]));
    setMaxInput(String(newRange[1]));
    apply(newRange);
  };

  const toggleInStock = () => {
    const next = !showInStock;
    setShowInStock(next);
    apply(priceRange, next, showOutOfStock);
  };

  const toggleOutOfStock = () => {
    const next = !showOutOfStock;
    setShowOutOfStock(next);
    apply(priceRange, showInStock, next);
  };

  const clearFilters = () => {
    setPriceRange([sliderMin, sliderMax]);
    setMinInput(String(sliderMin));
    setMaxInput(String(sliderMax));
    setShowInStock(true);
    setShowOutOfStock(true);
    onPriceChange([sliderMin, sliderMax], { showInStock: true, showOutOfStock: true });
  };

  // Counts
  const inStockCount = productList.filter(
    (p) => p.newprice >= priceRange[0] && p.newprice <= priceRange[1] && p.inStock
  ).length;
  const outOfStockCount = productList.filter(
    (p) => p.newprice >= priceRange[0] && p.newprice <= priceRange[1] && !p.inStock
  ).length;
  const resultCount = productList.filter(
    (p) =>
      p.newprice >= priceRange[0] &&
      p.newprice <= priceRange[1] &&
      ((showInStock && p.inStock) || (showOutOfStock && !p.inStock))
  ).length;

  const span = sliderMax - sliderMin || 1;
  const leftPct = ((priceRange[0] - sliderMin) / span) * 100;
  const rightPct = ((priceRange[1] - sliderMin) / span) * 100;

  const Panel = (
    <div className="bg-white" style={{ width: "100%" }}>
      {/* Header */}
      <div className="flex justify-between items-center text-sm font-semibold pb-2">
        <span className="uppercase text-gray-900">Refined By</span>
        <button className="text-gray-500 underline text-xs" onClick={clearFilters}>
          Clear All
        </button>
      </div>

      {/* Result count */}
      <div className="text-xs text-gray-600 pb-2">{resultCount} results</div>

      {/* Selected range chip */}
      <div className="bg-gray-100 text-gray-700 text-sm p-2 flex justify-between rounded-md">
        <span>
          Rs.{formatPrice(priceRange[0])} - Rs.{formatPrice(priceRange[1])}
        </span>
        <button className="text-gray-600 text-xs" onClick={clearFilters}>
          ✕
        </button>
      </div>

      {/* Availability */}
      <Section
        title="Availability"
        open={availabilityOpen}
        onToggle={() => setAvailabilityOpen((v) => !v)}
      >
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showInStock}
            onChange={toggleInStock}
            id="filter-instock"
          />
          <label htmlFor="filter-instock" className="text-sm">
            In Stock ({inStockCount})
          </label>
        </div>
        <div className="flex items-center space-x-2 mt-1">
          <input
            type="checkbox"
            checked={showOutOfStock}
            onChange={toggleOutOfStock}
            id="filter-outstock"
          />
          <label htmlFor="filter-outstock" className="text-sm">
            Out Of Stock ({outOfStockCount})
          </label>
        </div>
      </Section>

      {/* Price */}
      <Section
        title="Price"
        open={priceOpen}
        onToggle={() => setPriceOpen((v) => !v)}
      >
        <div className="relative" style={{ width: "100%", height: "32px" }}>
          <div
            className="absolute w-full bg-gray-300 rounded-md"
            style={{ top: "14px", height: "4px" }}
          />
          <div
            className="absolute bg-black rounded-md"
            style={{
              top: "14px",
              height: "4px",
              left: `${leftPct}%`,
              right: `${100 - rightPct}%`,
            }}
          />
          <input
            type="range"
            className="blissful-range"
            style={{ zIndex: priceRange[0] > sliderMax - (sliderMax - sliderMin) / 2 ? 4 : 3 }}
            min={sliderMin}
            max={sliderMax}
            value={priceRange[0]}
            onChange={(e) => handleSliderChange(e, 0)}
          />
          <input
            type="range"
            className="blissful-range"
            style={{ zIndex: 3 }}
            min={sliderMin}
            max={sliderMax}
            value={priceRange[1]}
            onChange={(e) => handleSliderChange(e, 1)}
          />
        </div>

        <div className="flex items-center mt-3" style={{ gap: "8px" }}>
          <div className="flex flex-1 items-center border rounded-md p-1" style={{ minWidth: 0 }}>
            <span className="text-xs px-1">Rs</span>
            <input
              type="number"
              value={minInput}
              min={sliderMin}
              max={priceRange[1]}
              onChange={(e) => setMinInput(e.target.value)}
              onBlur={() => commitInput(0)}
              onKeyDown={(e) => { if (e.key === "Enter") e.currentTarget.blur(); }}
              className="w-100 text-sm text-center outline-none"
              style={{ minWidth: 0, border: "none" }}
            />
          </div>
          <span className="text-xs">to</span>
          <div className="flex flex-1 items-center border rounded-md p-1" style={{ minWidth: 0 }}>
            <span className="text-xs px-1">Rs</span>
            <input
              type="number"
              value={maxInput}
              min={priceRange[0]}
              max={sliderMax}
              onChange={(e) => setMaxInput(e.target.value)}
              onBlur={() => commitInput(1)}
              onKeyDown={(e) => { if (e.key === "Enter") e.currentTarget.blur(); }}
              className="w-100 text-sm text-center outline-none"
              style={{ minWidth: 0, border: "none" }}
            />
          </div>
        </div>
      </Section>

      {/* Apply button (live updates already applied; click is idempotent) */}
      <button
        type="button"
        onClick={() => apply()}
        className="mt-4 w-[100%] text-white py-2 rounded-md text-sm font-semibold uppercase"
        style={{ backgroundColor: "#f9a8d4" }}
      >
        Apply
      </button>
    </div>
  );

  return (
    <>
      <style>{sliderStyles}</style>

      {/* Mobile filter toggle */}
      <div
        className="relative d-flex justify-content-center z-50 p-4 md:hidden"
        style={{ marginBottom: "15px" }}
      >
        <button
          className="md:hidden flex items-center space-x-2 p-2 rounded-md"
          onClick={() => setIsOpen(true)}
        >
          <Filter size={25} />
          <span className="text-sm font-semibold">Filter</span>
        </button>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block">{Panel}</div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="relative w-[90%] bg-white h-full shadow-lg z-50 overflow-y-auto">
            <div className="flex justify-between items-center p-3 border-b">
              <span className="text-lg font-bold">SideBar</span>
              <button onClick={() => setIsOpen(false)}>
                <X size={28} />
              </button>
            </div>
            {Panel}
          </div>
        </div>
      )}
    </>
  );
};

export default PriceBar;
