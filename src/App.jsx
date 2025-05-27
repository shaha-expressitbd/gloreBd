import React, { useContext, useEffect, useRef } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";
import MobileMenu from "./components/MobileMenu";
import TrendingAllProducts from "./components/TrendingProducts/TrendingAllProducts";
import { ShopContext } from "./context/ShopContext";
import CartMenu from "./pages/Cart";
import MobileMegaMenu from "./components/MobileMegaMenu";
import CategoryProduct from "./pages/CategoryProduct";
import BigDealLanding from "./pages/BigDealLanding";

function App() {
  const location = useLocation();

  const { cartMenu, setCartMenu, mobileMenu, setMobileMenu } =
    useContext(ShopContext);

  // Check if the current route is not the product page
  const isProductPage = location.pathname.startsWith("/singleproduct/");
  const isCheckoutPage = location.pathname.startsWith("/checkout");
  const isBigDealPage = location.pathname.startsWith("/big-deal");

  // const isHome = location.pathname.startsWith('')
  // const isCollections = location.pathname.startsWith('/collections')

  // Define routes where the footer should not appear
  const noFooterRoutes = [
    "/singleproduct",
    "/cart",
    "/checkout",
    "/collections",
    "/orders",
    "/big-deal",
  ];
  // Check if the current route matches any no-footer routes
  const showFooter = noFooterRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  const noMobileFooterRoutes = [
    "/singleproduct",
    "/cart",
    "/checkout",
    "/orders",
  ];
  const showMobileMenu = noMobileFooterRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  // --------------------------

  const cartRef = useRef(null); // For cart menu
  const mobileMenuRef = useRef(null); // For mobile menu

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartMenu(false);
      }
    };

    if (cartMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartMenu, setCartMenu]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenu(false);
      }
    };

    if (mobileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenu, setMobileMenu]);
  // --------------------------

  useEffect(() => {
    if (cartMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // cleanup in case of unmount
    };
  }, [cartMenu]);

  return (
    <div className="relative bg-secondary">
      {isCheckoutPage || isBigDealPage ? (
        <></>
      ) : (
        <Navbar isProductPage={isProductPage} />
      )}
      {cartMenu && (
        <div
          className="fixed inset-0 z-[80] bg-black bg-opacity-50"
          onClick={() => setCartMenu(false)}
        />
      )}
      {/* Prevent background scroll inside */}
      <div className="h-full" onClick={(e) => e.stopPropagation()}>
        <div
          ref={cartRef}
          className={`top-0 right-0 bottom-0 z-[100] bg-white fixed transition-all duration-1000 ease-in-out w-80 md:w-[350px] shadow-md ${
            cartMenu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <CartMenu setCartMenu={setCartMenu} />
        </div>
      </div>

      {/* Left Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`top-0 left-0 bottom-0 z-50 bg-white fixed transition-transform duration-500 ease-in-out w-60 md:w-[350px] shadow-md h-full transform ${
          mobileMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <MobileMegaMenu />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/big-deal" element={<BigDealLanding />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/trending-products" element={<TrendingAllProducts />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/category-product/:subCategoryId"
          element={<CategoryProduct />}
        />
        <Route path="/singleproduct/:slug" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/thankyou/:OrderId" element={<ThankYou />} />
        {/* <Route path='*' element={<Navigate to='/' replace />} /> */}
      </Routes>
      <div className="relative overflow-x-hidden">
        {!showMobileMenu && <MobileMenu />}
        {!showFooter && <Footer />}
      </div>
    </div>
  );
}

export default App;
