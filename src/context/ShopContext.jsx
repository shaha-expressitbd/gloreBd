// src/context/ShopContext.jsx
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  cartQuantityDecrement,
  cartQuantityIncrement,
  clearCart,
  removeFromCart,
} from "../stores/cart";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  // UI state
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartMenu, setCartMenu] = useState(false);

  // Data state
  const [business, setBusiness] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // Cart state
  const { cartItems } = useSelector((state) => state.cart);
  const [cartProducts, setCartProducts] = useState([]);

  // Totals & flags
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [scrollNav, setScrollNav] = useState(false);

  // Constants
  const currency = "৳";
  const delivery_fee_Inside = 80;
  const delivery_fee_Outside = 150;

  // API endpoints
  const businessAPI =
    "http://192.168.0.250:5000/v2/api/public/67e1167340fa1b061c4b5389/6800959381b0b41ac48282a1";
  const productAPI = `${businessAPI}/products`;

  // 1) Fetch business & products
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [busRes, prodRes] = await Promise.all([
          axios.get(businessAPI),
          axios.get(productAPI),
        ]);

        if (busRes.data.success && Array.isArray(busRes.data.data)) {
          const biz = busRes.data.data[0];
          setBusiness(biz);
          setCategories(biz.categories || []);
        }
        if (prodRes.data.success && Array.isArray(prodRes.data.data)) {
          setProducts(prodRes.data.data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAll();
  }, []);

  // 2) Window resize listener
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // 3) Merge cartItems with products
  useEffect(() => {
    const merged = cartItems.map((item) => {
      const prod = products.find((p) => p._id === item.productId);
      return { ...prod, ...item };
    });
    setCartProducts(merged);
  }, [cartItems, products]);

  // 4) Totals
  useEffect(() => {
    setTotalQuantity(cartItems.reduce((sum, i) => sum + i.quantity, 0));
  }, [cartItems]);

  // useEffect(() => {
  //   let sub = 0,
  //     disc = 0;
  //   cartProducts.forEach((it) => {
  //     const price = Number(it.price);
  //     const da = Number(it.discount_amount || 0);
  //     sub += it.quantity * (price - da);
  //     disc += it.quantity * da;
  //   });
  //   setTotalAmount(sub);
  //   setDiscountAmount(disc);
  // }, [cartProducts]);

  useEffect(() => {
    const subTotal = cartProducts.reduce((sum, item) => {
      const variant = item.variantsId?.[0] || {};
      // const price = Number(
      //   variant.offer_price != null
      //     ? variant.offer_price
      //     : variant.selling_price || 0
      // );
      const price = Number(variant.selling_price);
      return sum + price * item.quantity;
    }, 0);
    setTotalAmount(subTotal);
  }, [cartProducts]);

  // 5) Scroll nav toggle
  useEffect(() => {
    const onScroll = () => setScrollNav(window.scrollY > 200);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cart handlers
  const handleRemoveFromCart = (id) => dispatch(removeFromCart(id));
  const quantityDecrement = (item) => {
    const q = item.quantity - 1;
    if (q >= 1) dispatch(cartQuantityDecrement({ id: item.id, quantity: q }));
  };
  const quantityIncrement = (item) => {
    const q = item.quantity + 1;
    if (q < 100) dispatch(cartQuantityIncrement({ id: item.id, quantity: q }));
  };
  const clearAllCart = () => dispatch(clearCart());

  return (
    <ShopContext.Provider
      value={{
        isLoading,
        mobileMenu,
        setMobileMenu,
        isMobile,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartMenu,
        setCartMenu,
        business,
        categories,
        products,
        cartItems,
        cartProducts,
        totalQuantity,
        totalAmount,
        businessAPI,
        discountAmount,
        scrollNav,
        currency,
        delivery_fee_Inside,
        delivery_fee_Outside,
        handleRemoveFromCart,
        quantityDecrement,
        quantityIncrement,
        clearAllCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
