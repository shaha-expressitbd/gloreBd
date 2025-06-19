// src/pages/Collections.jsx
import React, { useContext, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import PriceRangeFilter from "../components/PriceRange/PriceRangeFilter";
import SearchBar from "../components/SearchBar";
import { assets } from "../assets/assets";

/* ------------------------------------------------------------------ */
/* Helper utilities                                                    */
/* ------------------------------------------------------------------ */

// ভিত্তি-মূল্য (ডিসকাউন্ট ছাড়া)
const basePrice = (p) => Number(p?.variantsId?.[0]?.selling_price || 0);

// একটি প্রোডাক্টে যত সাব-ক্যাটেগরি আছে, সব আইডি ফিরিয়ে দাও
const productSubCatIds = (p) =>
  Array.isArray(p?.sub_category) ? p.sub_category.map((sc) => sc._id) : [];

// ক্যাটেগরির যে কোনো লেভেল থেকে সব children ফ্ল্যাট করে আনো
const flattenSubCats = (nodes = []) => {
  const list = [];
  const walk = (arr) =>
    arr.forEach((n) => {
      if (!list.some((x) => x._id === n._id))
        list.push({ _id: n._id, name: n.name });
      if (Array.isArray(n.children) && n.children.length) walk(n.children);
    });
  walk(nodes);
  return list;
};
/* ------------------------------------------------------------------ */

const Collections = () => {
  const { products, search, showSearch, setShowSearch, currency, categories } =
    useContext(ShopContext);

  /* ------------ state ------------- */
  const [priceRange, setPriceRange] = useState([0, 0]); // পাবলিক রেঞ্জ
  const [range, setRange] = useState([0, 0]); // সিলেক্টেড রেঞ্জ
  const [showFilter, setShowFilter] = useState(false);
  const [selectedSubs, setSelectedSubs] = useState([]); // সাব-ক্যাটেগরি আইডি
  const [sortType, setSortType] = useState("relavent");
  const [list, setList] = useState([]);

  // সব সাব-ক্যাটেগরির ফ্ল্যাট লিস্ট (parent + nested)
  const subCats = flattenSubCats(categories);

  /* ---------- প্রাইস রেঞ্জ init ---------- */
  useEffect(() => {
    if (!products.length) return;
    const prices = products.map(basePrice).filter((n) => n > 0);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    setPriceRange([min, max]);
    setRange([min, max]);
  }, [products]);

  /* ---------- filter + sort ---------- */
  const applyFilters = useCallback(() => {
    let out = [...products];

    // সার্চ
    if (showSearch && search.trim()) {
      const term = search.toLowerCase();
      out = out.filter((p) => p.name.toLowerCase().includes(term));
    }

    // সাব-ক্যাটেগরি
    if (selectedSubs.length) {
      out = out.filter((p) =>
        productSubCatIds(p).some((id) => selectedSubs.includes(id))
      );
    }

    // প্রাইস
    out = out.filter((p) => {
      const price = basePrice(p);
      return price >= range[0] && price <= range[1];
    });

    // sort
    const byPrice = (a, b) => basePrice(a) - basePrice(b);
    switch (sortType) {
      case "low-high":
        out.sort(byPrice);
        break;
      case "high-low":
        out.sort((a, b) => byPrice(b, a));
        break;
      case "name-asc":
        out.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        out.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "latest":
        out.sort(
          (a, b) =>
            new Date(b.created_at || b.createdAt) -
            new Date(a.created_at || a.createdAt)
        );
        break;
      case "oldest":
        out.sort(
          (a, b) =>
            new Date(a.created_at || a.createdAt) -
            new Date(b.created_at || b.createdAt)
        );
        break;
      case "stock-high":
        out.sort(
          (a, b) =>
            (b.variantsId?.[0]?.variants_stock ?? 0) -
            (a.variantsId?.[0]?.variants_stock ?? 0)
        );
        break;
      case "stock-low":
        out.sort(
          (a, b) =>
            (a.variantsId?.[0]?.variants_stock ?? 0) -
            (b.variantsId?.[0]?.variants_stock ?? 0)
        );
        break;
      default:
        break; // relavent = default order
    }
    setList(out);
  }, [products, search, showSearch, selectedSubs, range, sortType]);

  useEffect(applyFilters, [applyFilters]);

  /* ---------- handlers ---------- */
  const toggleSubCat = (e) => {
    const id = e.target.value;
    setSelectedSubs((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  /* ---------------- JSX ---------------- */
  return (
    <div className="container mx-auto relative pb-20 sm:py-20 sm:pb-10 min-h-screen px-3 sm:px-0">
      {/* Desktop search */}
      <div className="hidden  sm:block">
        <SearchBar />
      </div>

      <div className="flex sm:flex-row flex-col gap-1 sm:gap-10 pt-5 py-10 border-t sm:space-y-5">
        {/* ------------- Sidebar ------------- */}
        <div className="min-w-60">
          {/* Mobile top bar */}
          <div className="flex items-center justify-between px-2 sm:px-0 sm:hidden">
            <div className="w-1/3">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center gap-2 my-2 text-xl"
              >
                FILTERS
                <FaAngleRight
                  className={`h-3 transition duration-200 ${
                    showFilter ? "rotate-90" : ""
                  }`}
                />
              </button>
            </div>
            <Link to="/">
              <img src={assets.logo} alt="Logo" className="w-24" />
            </Link>
            <div className="w-1/3 flex justify-end">
              <button onClick={() => setShowSearch(!showSearch)}>
                <img
                  src={assets.search_icon}
                  alt="search"
                  className="w-5 cursor-pointer"
                />
              </button>
            </div>{" "}
          </div>

          {/* Filters */}
          <div
            className={`border rounded border-gray-300 sm:mt-12 p-5 mb-5 ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            {/* Sub-category filter */}
            <div className="mb-5 sm:mb-10 space-y-3">
              <span className="font-semibold">Filter by Sub-Category</span>
              <div className="flex flex-col gap-2 text-sm text-gray-700 max-h-60 overflow-y-auto pr-1">
                {subCats.map((sc) => (
                  <label key={sc._id} className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      value={sc._id}
                      checked={selectedSubs.includes(sc._id)}
                      onChange={toggleSubCat}
                      className="w-3 h-3"
                    />
                    {sc.name}
                  </label>
                ))}
              </div>
            </div>

            {/* Price filter */}
            <div className="space-y-3">
              <span className="font-semibold">Filter by Price</span>
              <PriceRangeFilter
                min={priceRange[0]}
                max={priceRange[1]}
                minDifference={100}
                onRangeChange={setRange}
                currency={currency}
              />
            </div>
          </div>
        </div>

        {/* ------------- Products ------------- */}
        <div className="flex-1">
          {/* heading + sort */}
          <div className="flex justify-between items-center my-5 px-2 sm:px-0 text-base sm:text-2xl">
            <Title text1="ALL" text2="COLLECTIONS" />
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="border-2 border-default px-2 text-sm rounded"
            >
              <option value="relavent">Sort by: Relevant</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="latest">Latest to Oldest</option>
              <option value="oldest">Oldest to Latest</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="stock-high">Stock: High to Low</option>
              <option value="stock-low">Stock: Low to High</option>
            </select>
          </div>

          {/* grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-5">
            {list.length ? (
              list.map((p) => (
                <ProductItem key={p._id} id={p._id} name={p.name} product={p} />
              ))
            ) : (
              <p className="col-span-full text-center py-10 text-gray-500">
                No products found
              </p>
            )}
          </div>
          <div className="bottom-0 left-0 w-full bg-black py-2 mt-5 text-center flex items-center justify-center gap-1 z-10">
            <p className="text-white text-sm">
              &copy; {new Date().getFullYear()} Powered by
            </p>
            <Link to="https://calquick.app">
              <img
                className="w-[70px]"
                src="/image/logo-white.webp"
                alt="CalQuick Logo"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
