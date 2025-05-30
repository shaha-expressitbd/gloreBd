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

  /* ── UI ── */
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartMenu, setCartMenu] = useState(false);

  /* ── DATA ── */
  const [business, setBusiness] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  /* ── CART ── */
  const { cartItems } = useSelector((s) => s.cart);
  const [cartProducts, setCartProducts] = useState([]);

  /* ── TOTALS ── */
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [scrollNav, setScrollNav] = useState(false);

  /* ── CONST ── */
  const currency = "৳";
  const delivery_fee_Inside = 80;
  const delivery_fee_Outside = 150;

  /* ── API ── */
  const businessAPI =
    "https://backend.calquick.app/v2/api/public/682ad002c20c6404b3e2a884/682ad06cc20c6404b3e2a898";
  const productAPI = `${businessAPI}/products`;

  /* 1) Fetch business + products */
  useEffect(() => {
    (async () => {
      try {
        const [bus, prod] = await Promise.all([
          axios.get(businessAPI),
          axios.get(productAPI),
        ]);

        if (bus.data.success && Array.isArray(bus.data.data)) {
          const biz = bus.data.data[0];
          setBusiness(biz);
          setCategories(biz.categories || []);
        }
        if (prod.data.success && Array.isArray(prod.data.data)) {
          setProducts(prod.data.data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  /* 2) Resize listener */
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* 3) Merge cartItems → cartProducts */
  useEffect(() => {
    const merged = cartItems.map((ci) => {
      const prod = products.find((p) => p._id === ci.productId);
      return { ...prod, ...ci };
    });
    setCartProducts(merged);
  }, [cartItems, products]);

  /* 4) Totals */
  useEffect(() => {
    setTotalQuantity(cartItems.reduce((s, i) => s + i.quantity, 0));
  }, [cartItems]);

  useEffect(() => {
    let sub = 0;
    let disc = 0;

    cartProducts.forEach((item) => {
      const v = item.variantsId?.[0] || {};
      const qty = item.quantity;
      const base = Number(v.selling_price || 0);

      const now = Date.now();
      const start = v.discount_start_date
        ? new Date(v.discount_start_date).getTime()
        : -Infinity;
      const end = v.discount_end_date
        ? new Date(v.discount_end_date).getTime()
        : Infinity;
      const active = !!v.discount_amount && start <= now && now <= end;

      const da = active ? Number(v.discount_amount || 0) : 0;

      sub += base * qty;
      disc += da * qty;
    });

    setDiscountAmount(disc);
    setTotalAmount(sub - disc);
  }, [cartProducts]);

  /* 5) Scroll-nav */
  useEffect(() => {
    const onScroll = () => setScrollNav(window.scrollY > 200);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* CART actions */
  const handleRemoveFromCart = (productId) =>
    dispatch(removeFromCart(productId));

  const quantityDecrement = ({ productId, quantity }) => {
    const q = quantity - 1;
    if (q >= 1) dispatch(cartQuantityDecrement({ productId, quantity: q }));
  };

  const quantityIncrement = ({ productId, quantity }) => {
    const q = quantity + 1;
    if (q < 100) dispatch(cartQuantityIncrement({ productId, quantity: q }));
  };

  const clearAllCart = () => dispatch(clearCart());

  /* PROVIDER */
  return (
    <ShopContext.Provider
      value={{
        /* UI */
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

        /* Data */
        business,
        categories,
        products,
        businessAPI,

        /* Cart */
        cartItems,
        cartProducts,
        totalQuantity,
        totalAmount,
        discountAmount,

        /* Misc */
        scrollNav,
        currency,
        delivery_fee_Inside,
        delivery_fee_Outside,

        /* Cart handlers */
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
