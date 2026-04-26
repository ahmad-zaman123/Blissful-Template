import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronRight } from "lucide-react"; // Import icons

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Navbar Button (Now Moved Above Everything) */}
      <div className="relative z-50 p-4 md:hidden" style={{ marginTop: "-110px", marginBottom: "45px" }}>
        <button onClick={() => setIsOpen(true)} className="text-black">
          <Menu size={30} />
        </button>
      </div>

      {/* Wide-screen Navbar (Hidden on Small Screens) */}
      <div className="sticky top-0 z-50 bg-white shadow-sm hidden md:block">
        <nav className="flex justify-center pt-3 pb-2 space-x-5 relative">
          <Link to="/HOME" className="navbar-brand bg-pink-300 text-white p-2 rounded-xl">
            HOME
          </Link>
          <Link to="/SHOPALL" className="navbar-brand bg-pink-300 text-white p-2 rounded-xl">
            SHOP ALL
          </Link>

          {/* SHOP BY CATEGORY DROPDOWN */}
          <div className="relative group">
            <div className="navbar-brand bg-pink-300 text-white p-2 rounded-xl block">
              SHOP BY CATEGORY
            </div>
            <div className="absolute top-full left-0 w-48 bg-pink-200 shadow-lg rounded-md hidden group-hover:block">
              <Link to="/SHOP-BY-CATEGORY/SERUMS" className="block px-4 py-2 text-white hover:bg-pink-300 border-b border-pink-300 no-underline">
                Serums
              </Link>
              <Link to="/shop-by-category/moisturisers" className="block px-4 py-2 text-white hover:bg-pink-300 border-b border-pink-300 no-underline">
                Moisturisers
              </Link>
              <Link to="/shop-by-category/cleansers" className="block px-4 py-2 text-white hover:bg-pink-300 border-b border-pink-300 no-underline">
                Cleansers
              </Link>
              <Link to="/shop-by-category/sunscreens" className="block px-4 py-2 text-white hover:bg-pink-300 no-underline">
                Sunscreens
              </Link>
            </div>
          </div>

          {/* SHOP BY SKIN CONCERN DROPDOWN */}
          <div className="relative group">
            <div className="navbar-brand bg-pink-300 text-white p-2 rounded-xl block">
              SHOP BY SKIN CONCERN
            </div>
            <div className="absolute top-full left-0 w-48 bg-pink-200 shadow-lg rounded-md hidden group-hover:block">
              <Link to="/shop-by-skin-concern/breakouts_acne" className="block px-4 py-2 text-white hover:bg-pink-300 border-b border-pink-300 no-underline">
                Breakouts & Acne
              </Link>
              <Link to="/shop-by-skin-concern/dryness" className="block px-4 py-2 text-white hover:bg-pink-300 border-b border-pink-300 no-underline">
                Dryness
              </Link>
              <Link to="/shop-by-skin-concern/dark-spots" className="block px-4 py-2 text-white hover:bg-pink-300 border-b border-pink-300 no-underline">
                Dark Spots
              </Link>
              <Link to="/shop-by-skin-concern/healthy-aging" className="block px-4 py-2 text-white hover:bg-pink-300 no-underline">
                Healthy Aging
              </Link>
            </div>
          </div>

          <Link to="/BUNDLES" className="navbar-brand bg-pink-300 text-white p-2 rounded-xl">
            BUNDLES
          </Link>
          <Link to="/ABOUTUS" className="navbar-brand bg-pink-300 text-white p-2 rounded-xl">
            ABOUT US
          </Link>
          <Link to="/CONTACTUS" className="navbar-brand bg-pink-300 text-white p-2 rounded-xl">
            CONTACT US
          </Link>
        </nav>
      </div>

      {/* Sidebar Menu (Overlay + Sliding Menu) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Background overlay */}
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setIsOpen(false)}></div>

          {/* Sidebar */}
          <div className="relative w-[90%] bg-white h-full shadow-lg z-50 overflow-y-auto">
            {/* Close Button */}
            <div className="flex justify-between items-center p-3 border-b">
              <span className="text-lg font-bold">Menu</span>
              <button onClick={() => setIsOpen(false)}>
                <X size={28} />
              </button>
            </div>

            {/* Menu Links */}
            <nav className="flex flex-col text-md font-semibold bg-white text-black">
              <Link to="/HOME" className="p-3 border-b border-gray-300 hover:bg-gray-100 uppercase no-underline text-black">
                HOME
              </Link>
              <Link to="/SHOPALL" className="p-3 no-underline text-black  border-b border-gray-300 hover:bg-gray-100 uppercase">
                SHOP ALL
              </Link>

              {/* SHOP BY CATEGORY (Expandable) */}
              <div className="flex items-center justify-between p-3 no-underline text-black border-b border-gray-300 hover:bg-gray-100 cursor-pointer">
                <Link to="/shop-by-category" className="uppercase no-underline text-black">SHOP BY CATEGORY</Link>
                <ChevronRight size={20} />
              </div>

              {/* SHOP BY SKIN CONCERN (Expandable) */}
              <div className="flex items-center justify-between p-3 no-underline text-black border-b border-gray-300 hover:bg-gray-100 cursor-pointer">
                <Link to="/shop-by-skin-concern" className="uppercase no-underline text-black">SHOP BY SKIN CONCERN</Link>
                <ChevronRight size={20} />
              </div>

              <Link to="/BUNDLES" className="p-3  no-underline text-black border-b border-gray-300 hover:bg-gray-100 uppercase">
                BUNDLES
              </Link>
              <Link to="/ABOUTUS" className="p-3 no-underline text-black border-b border-gray-300 hover:bg-gray-100 uppercase">
                ABOUT US
              </Link>
              <Link to="/CONTACTUS" className="p-3 no-underline text-black border-b border-gray-300 hover:bg-gray-100 uppercase">
                CONTACT US
              </Link>
            </nav>

          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
