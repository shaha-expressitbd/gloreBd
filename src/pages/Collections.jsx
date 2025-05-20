// src/pages/Collections.jsx
import React, { useContext, useEffect, useState, useCallback } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import PriceRangeFilter from "../components/PriceRange/PriceRangeFilter";
import { FaAngleRight } from "react-icons/fa";
import SearchBar from "../components/SearchBar";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

/* ------------------------------------------------------------------ */
/* helper: প্রোডাক্ট থেকে বেস-প্রাইস বের করি (ডিসকাউন্ট নয়)           */
const getBasePrice = (product = {}) => {
  const variant = product.variantsId?.[0] || {};
  return Number(variant.selling_price || 0); // NaN হলে 0 হবে
};

/* helper: প্রোডাক্টের ক্যাটেগরি-আইডি */
const getCategoryId = (product = {}) =>
  product.sub_category?.[0]?._id ||
  product.category?._id ||
  product.category?.id ||
  ""; // সুবিধামতো ফলো-ব্যাক

/* ------------------------------------------------------------------ */

const Collections = () => {
  /* ------------- Context ------------- */
  const { products, search, setShowSearch, showSearch, currency, categories } =
    useContext(ShopContext);

  /* ------------- Price slider state ------------- */
  const [priceRange, setPriceRange] = useState([0, 0]); // [min,max] in UI
  const [rangeValues, setRangeValues] = useState([0, 0]); // chosen range

  /* ------------- Filters / sort ------------- */
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]); // selected category ids
  const [sortType, setSortType] = useState("relavent");

  /* ------------------------------------------------------------------ */
  /* INIT: range + default products                                     */
  useEffect(() => {
    if (!products.length) return;

    const priceList = products.map(getBasePrice).filter(Boolean); // remove 0/NaN
    const min = Math.min(...priceList);
    const max = Math.max(...priceList);

    setPriceRange([min, max]);
    setRangeValues([min, max]);
    setFilterProducts(products); // show all by default
  }, [products]);

  /* ------------------------------------------------------------------ */
  /* toggle category selection                                          */
  const toggleCategory = (e) => {
    const value = String(e.target.value);
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  /* ------------------------------------------------------------------ */
  /* applyFilter: search + category + price                             */
  const applyFilter = useCallback(() => {
    let out = [...products];

    /* search */
    if (showSearch && search) {
      out = out.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    /* category */
    if (category.length) {
      out = out.filter((p) => category.includes(getCategoryId(p)));
    }

    /* price */
    out = out.filter((p) => {
      const price = getBasePrice(p);
      return price >= rangeValues[0] && price <= rangeValues[1];
    });

    setFilterProducts(out);
  }, [products, search, showSearch, category, rangeValues]);

  /* ------------------------------------------------------------------ */
  /* sortProducts                                                       */
  const sortProducts = useCallback(
    (list) => {
      let fp = [...list];
      switch (sortType) {
        case "low-high":
          fp.sort((a, b) => getBasePrice(a) - getBasePrice(b));
          break;

        case "high-low":
          fp.sort((a, b) => getBasePrice(b) - getBasePrice(a));
          break;

        case "name-asc":
          fp.sort((a, b) => a.name.localeCompare(b.name));
          break;

        case "name-desc":
          fp.sort((a, b) => b.name.localeCompare(a.name));
          break;

        case "stock-high":
          fp.sort(
            (a, b) =>
              (b.variantsId?.[0]?.variants_stock ?? 0) -
              (a.variantsId?.[0]?.variants_stock ?? 0)
          );
          break;

        case "stock-low":
          fp.sort(
            (a, b) =>
              (a.variantsId?.[0]?.variants_stock ?? 0) -
              (b.variantsId?.[0]?.variants_stock ?? 0)
          );
          break;

        case "latest":
          fp.sort(
            (a, b) =>
              new Date(b.created_at || b.createdAt) -
              new Date(a.created_at || a.createdAt)
          );
          break;

        case "oldest":
          fp.sort(
            (a, b) =>
              new Date(a.created_at || a.createdAt) -
              new Date(b.created_at || b.createdAt)
          );
          break;

        default:
          break; // "relavent" => keep as is
      }
      setFilterProducts(fp);
    },
    [sortType]
  );

  /* ------------------------------------------------------------------ */
  /* triggers: filtering & sorting                                      */
  useEffect(() => {
    applyFilter();
  }, [applyFilter]);

  useEffect(() => {
    sortProducts(filterProducts);
  }, [sortType]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ------------------------------------------------------------------ */
  /* JSX                                                                */
  return (
    <div className="container mx-auto relative pb-20 sm:py-20 sm:pb-10 min-h-screen px-3 sm:px-0">
      {/* desktop search */}
      <div className="hidden sm:block">
        <SearchBar />
      </div>

      <div className="flex sm:flex-row flex-col gap-1 sm:gap-10 pt-5 py-10 border-t sm:space-y-5">
        {/* ---------------------------------------------------------------- */}
        {/* LEFT pane: filters                                               */}
        <div className="min-w-60">
          {/* mobile top-bar */}
          <div className="flex items-center justify-between px-2 sm:px-0 sm:hidden">
            {/* filter btn */}
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
            {/* logo */}
            <div className="w-1/3 flex justify-center">
              <Link to="/">
                <img src={assets.logo} className="w-24" alt="Logo" />
              </Link>
            </div>
            {/* search btn */}
            <div className="w-1/3 flex justify-end">
              <button onClick={() => setShowSearch(!showSearch)}>
                <img
                  src={assets.search_icon}
                  alt="search"
                  className="w-5 cursor-pointer"
                />
              </button>
            </div>
          </div>

          {/* actual filters */}
          <div
            className={`border rounded border-gray-300 sm:mt-12 p-5 mb-5 ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            {/* Category filter */}
            <div className="mb-5 sm:mb-10 space-y-3">
              <span className="font-semibold">Filter by Category</span>
              <div className="flex flex-col gap-5 font-medium text-gray-700 text-sm">
                {categories.map((c) => (
                  <label key={c._id || c.id} className="flex gap-2">
                    <input
                      type="checkbox"
                      className="w-3"
                      value={c._id || c.id}
                      checked={category.includes(String(c._id || c.id))}
                      onChange={toggleCategory}
                    />
                    {c.name}
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
                onRangeChange={setRangeValues}
                currency={currency}
              />
            </div>
          </div>
        </div>

        {/* mobile search */}
        <div className="sm:hidden">
          <SearchBar />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* RIGHT pane: products                                             */}
        <div className="flex-1">
          {/* title + sort */}
          <div className="flex justify-between my-5 sm:mt-0 text-base sm:text-2xl px-2 sm:px-0">
            <Title text1="ALL" text2="COLLECTIONS" />
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="border-2 border-default px-2 text-sm rounded"
            >
              <option value="relavent">Sort by: Relavent</option>
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

          {/* product grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-5">
            {filterProducts.length ? (
              filterProducts.map((p) => (
                <ProductItem key={p._id} id={p._id} name={p.name} product={p} />
              ))
            ) : (
              <p className="col-span-full text-center py-10 text-gray-500">
                No products found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
