import React from "react";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { RiShoppingBag2Fill } from "react-icons/ri";
const Navbar = ({ isProductPage }) => {
  const {
    scrollNav,
    setShowSearch,
    totalQuantity,
    setCartMenu,
    setMobileMenu,
  } = useContext(ShopContext);

  const navigate = useNavigate();

  return (
    <header
      className={`top-0 left-0 right-0 z-40 transition-shadow duration-500 hidden sm:block ${
        scrollNav
          ? "sm:fixed shadow-lg bg-white px-8"
          : "sm:absolute bg-transparent px-8 xl:px-20"
      } ${isProductPage ? "sm:block" : ""}`}
    >
      <nav
        className={`flex justify-between items-center px-1 py-1 sm:py-2 xl:py-4 font-medium ${
          scrollNav && "container mx-auto"
        }`}
      >
        {/* logo  */}
        <div className="flex items-center gap-10 w-1/3">
          <button
            className="flex items-center gap-2"
            onClick={() => setMobileMenu(true)}
          >
            <HiOutlineMenuAlt1 size={26} /> Menu
          </button>
          <button
            className="flex items-center gap-2"
            onClick={() => {
              navigate("/collections");
              setShowSearch(true);
            }}
          >
            <img
              src={assets.search_icon}
              alt="search"
              className="w-5 cursor-pointer hidden sm:block"
            />{" "}
            Search
          </button>
        </div>

        <div className="w-1/3 flex items-center justify-center">
          <Link to="/">
            <img src={assets.logo} className="w-36" alt="Logo" />
          </Link>
        </div>

        <div className="flex items-center justify-end gap-6 w-1/3">
          <NavLink to="/collections" className="flex items-center gap-2">
            <RiShoppingBag2Fill size={26} />
            Shop
          </NavLink>
          <div
            onClick={() => setCartMenu(true)}
            className="sm:block relative hidden cursor-pointer"
          >
            <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
            {/* <FaShoppingBag size={24}/> */}
            <span
              className={`inline-flex top-3 -right-3 absolute justify-center items-center bg-sky-400 rounded-full w-5 h-5 font-semibold text-md text-white ${
                totalQuantity > 0 && "animate-ping"
              }`}
            >
              {totalQuantity > 9 ? "9+" : totalQuantity}
            </span>
            <span className="top-3 -right-3 absolute flex justify-center items-center bg-default rounded-full w-5 h-5 text-white text-xs">
              {totalQuantity > 9 ? "9+" : totalQuantity}
            </span>
            {/* <span className='right-[-5px] bottom-[-5px] absolute bg-default rounded-full w-4 text-[8px] text-center text-white leading-4 aspect-square'>{totalQuantity}</span> */}
          </div>
        </div>
        {/* <div
          className={`top-0 right-0 bottom-0 z-[100] bg-white fixed transition-all duration-1000 w-[350px] shadow-md h-full ${
            cartMenu ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <Cart setCartMenu={setCartMenu} />
        </div> */}
      </nav>
    </header>
  );
};

export default Navbar;
