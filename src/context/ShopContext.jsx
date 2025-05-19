import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  cartQuantityDecrement,
  cartQuantityIncrement,
  clearCart,
  removeFromCart,
} from "../stores/cart";
import { data } from "autoprefixer";

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
  // const cloudAPI = "https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/6";

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const [mobileMenu, setMobileMenu] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);

  // const productAPI = 'https://admin.ezicalc.com/api/public/products/get/6'
  // const productAPI = "https://admin.ezicalc.com/api/public/products/get/6";
  const productAPI =
    "http://192.168.0.250:5000/v2/api/public/67e1167340fa1b061c4b5389/6800959381b0b41ac48282a1/products";

  const businessAPI =
    "http://192.168.0.250:5000/v2/api/public/67e1167340fa1b061c4b5389/6800959381b0b41ac48282a1";

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(productAPI);
        // setProducts(response?.data?.data);
        console.log(response?.data);
        setProducts(response?.data?.data);
        // console.log(response.data.data.data)
        setIsLoading(false);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };

    fetchData();
  }, [productAPI]);

  const [categories, setCategories] = useState([]);
  // const [maxDiscount, setMaxDiscount] = useState(0)

  const fetchCategory = async () => {
    let generateCategories = [
      ...new Map(
        products.map((item) => [item.category.id, item.category])
      ).values(),
    ];
    setCategories(generateCategories);
  };
  useEffect(() => {
    if (products.length > 1) {
      fetchCategory();
    }
  }, [products]);

  const currency = "৳";

  const delivery_fee_Inside = 80;
  const delivery_fee_Outside = 150;

  const [search, setSearch] = useState("");

  const [showSearch, setShowSearch] = useState(false);

  const [cartMenu, setCartMenu] = useState(false);

  const [cartProducts, setCartProducts] = useState([]);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    let mergedArray = cartItems.map((user) => {
      let product = products.find((pref) => pref.id === user.productId);
      return { ...product, ...user };
    });

    setCartProducts(mergedArray);
  }, [cartItems, products]);

  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    let subQuantity = 0;
    cartItems.forEach((item) => (subQuantity += item.quantity));
    setTotalQuantity(subQuantity);
  }, [cartItems]);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };
  const quantityDecrement = (product) => {
    const updateQuantity = Number(product.quantity) - 1;
    if (updateQuantity >= 1) {
      product = { id: product.id, quantity: updateQuantity };
      // console.log(product)
      dispatch(cartQuantityDecrement(product));
    }
  };
  const quantityIncrement = (product) => {
    const updateQuantity = Number(product.quantity) + 1;
    if (updateQuantity < 100) {
      product = { id: product.id, quantity: updateQuantity };
      // console.log(product)
      dispatch(cartQuantityIncrement(product));
    }
  };

  const clearAllCart = () => {
    dispatch(clearCart());
  };

  const [totalAmount, setTotalAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    let subTotal = 0;
    let subDiscountAmount = 0;
    cartProducts.map((item) => {
      subTotal =
        Number(subTotal) +
        Number(item.quantity) *
          (item.discount_amount
            ? Number(item.price) - Number(item.discount_amount)
            : Number(item?.price));
      subDiscountAmount =
        subDiscountAmount +
        Number(item.quantity) *
          (item.discount_amount ? Number(item.discount_amount) : 0);
    });
    setTotalAmount(subTotal);
    setDiscountAmount(subDiscountAmount);
  }, [cartItems, cartProducts]);

  const [scrollNav, setScrollNav] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setScrollNav(true);
      } else {
        setScrollNav(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const value = {
    isLoading,
    products,
    currency,
    isMobile,
    mobileMenu,
    setMobileMenu,
    delivery_fee_Inside,
    delivery_fee_Outside,
    search,
    setSearch,
    scrollNav,
    showSearch,
    setShowSearch,
    cartItems,
    totalQuantity,
    setCartMenu,
    cartMenu,
    categories,
    handleRemoveFromCart,
    quantityIncrement,
    quantityDecrement,
    clearAllCart,
    cartProducts,
    totalAmount,
    discountAmount,
    // cloudAPI,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
