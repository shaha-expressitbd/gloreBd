// src/components/CartMenu.jsx
import React, { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { FaArrowRight, FaMinus, FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { assets } from "../assets/assets";

/* ------------------------------------------------------------------ */
/* 👇  LOCAL helper functions — external file লাগবে না                 */
const isDiscountActive = (variant = {}) => {
  if (!variant.discount_amount) return false;
  const now = Date.now();
  const start = variant.discount_start_date
    ? new Date(variant.discount_start_date).getTime()
    : -Infinity;
  const end = variant.discount_end_date
    ? new Date(variant.discount_end_date).getTime()
    : Infinity;
  return start <= now && now <= end;
};

const getSalePrice = (variant = {}) => {
  const base = Number(variant.selling_price || 0);
  return isDiscountActive(variant)
    ? Math.max(base - Number(variant.discount_amount || 0), 0)
    : base;
};
/* ------------------------------------------------------------------ */

const CartMenu = () => {
  const {
    currency,
    totalQuantity,
    cartProducts,
    handleRemoveFromCart,
    quantityIncrement,
    quantityDecrement,
    clearAllCart,
    setCartMenu,
  } = useContext(ShopContext);

  /* -------- Sub-total -------- */
  const subtotal = useMemo(
    () =>
      cartProducts.reduce((sum, item) => {
        const variant = item.variantsId?.[0] || {};
        return sum + getSalePrice(variant) * item.quantity;
      }, 0),
    [cartProducts]
  );

  const navigate = useNavigate();
  const goCheckout = () => {
    if (totalQuantity > 0) {
      setCartMenu(false);
      navigate("/checkout");
    }
  };

  /* ---------------------------------------------------------------- */
  return (
    <div className="flex flex-col min-h-full p-5">
      {/* Header */}
      <div className="flex justify-between items-center gap-3 p-3 cursor-pointer bg-gray-200 rounded mb-3 border border-b">
        <p>Shopping Cart</p>
        <img
          onClick={() => setCartMenu(false)}
          src={assets.cross_icon}
          className="h-4"
          alt="Close Cart"
        />
      </div>

      {/* Cart Items */}
      <div className="overflow-y-scroll h-[calc(100vh-250px)] sm:min-h-screen sm:pb-52">
        {cartProducts.map((item) => {
          const variant = item.variantsId?.[0] || {};
          const unitPrice = getSalePrice(variant);
          const lineTotal = (unitPrice * item.quantity).toFixed(2);
          const imgUrl =
            variant.image?.secure_url ||
            item.images?.[0]?.image?.secure_url ||
            "";

          const discountActive = isDiscountActive(variant);
          const originalPrice = Number(variant.selling_price || 0);

          return (
            <div
              key={item.productId}
              className="py-4 gap-5 border-b flex justify-between"
            >
              {/* Image */}
              <img
                src={imgUrl}
                alt={item.name}
                className="w-[100px] h-[120px] rounded object-cover"
              />

              {/* Info */}
              <div className="text-black flex-1 pl-2">
                <p className="font-medium text-default mb-2 line-clamp-2">
                  {item.name}
                </p>

                {/* Price + qty */}
                <div className="flex justify-between items-center">
                  <div>
                    {discountActive ? (
                      <>
                        <p className="text-gray-500 text-sm line-through">
                          {currency} {originalPrice.toFixed(2)}
                        </p>
                        <p className="text-default">
                          {currency} {unitPrice.toFixed(2)}
                        </p>
                      </>
                    ) : (
                      <p className="text-default">
                        {currency} {unitPrice.toFixed(2)}
                      </p>
                    )}
                  </div>

                  <p>x</p>

                  {/* Qty controls */}
                  <div className="flex items-center border rounded gap-1 px-1 min-w-20">
                    <button
                      className="px-0.5"
                      onClick={() =>
                        quantityDecrement({
                          id: item.productId,
                          quantity: item.quantity,
                        })
                      }
                    >
                      <FaMinus size={10} />
                    </button>
                    <span className="bg-gray-100 px-2 py-1 w-full text-center">
                      {item.quantity}
                    </span>
                    <button
                      className="px-0.5"
                      onClick={() =>
                        quantityIncrement({
                          id: item.productId,
                          quantity: item.quantity,
                        })
                      }
                    >
                      <FaPlus size={10} />
                    </button>
                  </div>
                </div>

                {/* Line total + delete */}
                <div className="flex justify-between items-center mt-2">
                  <p className="text-default">
                    {currency} {lineTotal}
                  </p>
                  <button onClick={() => handleRemoveFromCart(item.productId)}>
                    <RiDeleteBin6Line size={20} className="text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="absolute left-0 right-0 bottom-0 px-5 pb-5 pt-3 bg-white border border-t">
        <div className="flex items-center justify-between mb-2">
          <p className="text-lg font-semibold">Subtotal:</p>
          <p className="text-lg font-semibold">
            {currency} {subtotal.toFixed(2)}
          </p>
        </div>

        <div className="flex gap-5">
          <button
            onClick={() => {
              clearAllCart();
              setCartMenu(false);
            }}
            className="bg-gray-300 py-2 rounded text-black w-full"
          >
            Clear All
          </button>

          <button
            onClick={goCheckout}
            disabled={totalQuantity === 0}
            className="flex items-center justify-center gap-2 bg-default py-2 rounded text-white w-full disabled:opacity-50"
          >
            Checkout <FaArrowRight className="animate-pulse" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartMenu;
