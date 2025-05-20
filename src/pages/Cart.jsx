import React, { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { FaArrowRight, FaMinus, FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { assets } from "../assets/assets";

/* helpers */
const isDiscountActive = (v = {}) => {
  if (!v.discount_amount) return false;
  const now = Date.now();
  const start = v.discount_start_date
    ? new Date(v.discount_start_date).getTime()
    : -Infinity;
  const end = v.discount_end_date
    ? new Date(v.discount_end_date).getTime()
    : Infinity;
  return start <= now && now <= end;
};
const getSalePrice = (v = {}) => {
  const base = Number(v.selling_price || 0);
  return isDiscountActive(v)
    ? Math.max(base - Number(v.discount_amount || 0), 0)
    : base;
};

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

  const subtotal = useMemo(
    () =>
      cartProducts.reduce((s, i) => {
        const v = i.variantsId?.[0] || {};
        return s + getSalePrice(v) * i.quantity;
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

  return (
    <div className="flex flex-col min-h-full p-5">
      {/* Header */}
      <div className="flex justify-between items-center gap-3 p-3 bg-gray-200 rounded mb-3 border-b">
        <p>Shopping Cart</p>
        <img
          onClick={() => setCartMenu(false)}
          src={assets.cross_icon}
          className="h-4"
          alt="Close Cart"
        />
      </div>

      {/* Items */}
      <div className="overflow-y-scroll h-[calc(100vh-250px)] sm:pb-52">
        {cartProducts.map((item, idx) => {
          const v = item.variantsId?.[0] || {};
          const unit = getSalePrice(v);
          const line = (unit * item.quantity).toFixed(2);
          const img =
            v.image?.secure_url || item.images?.[0]?.image?.secure_url || "";
          const discount = isDiscountActive(v);
          const original = Number(v.selling_price || 0).toFixed(2);

          return (
            <div
              key={item.productId ?? idx}
              className="py-4 gap-5 border-b flex justify-between"
            >
              <img
                src={img}
                alt={item.name}
                className="w-[100px] h-[120px] rounded object-cover"
              />

              <div className="flex-1 pl-2">
                <p className="font-medium text-default mb-2 line-clamp-2">
                  {item.name}
                </p>

                {/* price & qty */}
                <div className="flex justify-between items-center">
                  <div>
                    {discount ? (
                      <>
                        <p className="text-gray-500 text-sm line-through">
                          {currency} {original}
                        </p>
                        <p className="text-default">
                          {currency} {unit.toFixed(2)}
                        </p>
                      </>
                    ) : (
                      <p className="text-default">
                        {currency} {unit.toFixed(2)}
                      </p>
                    )}
                  </div>

                  <p>x</p>

                  <div className="flex items-center border rounded gap-1 px-1 min-w-20">
                    <button
                      className="px-0.5"
                      onClick={() =>
                        quantityDecrement({
                          productId: item.productId,
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
                          productId: item.productId,
                          quantity: item.quantity,
                        })
                      }
                    >
                      <FaPlus size={10} />
                    </button>
                  </div>
                </div>

                {/* line total + delete */}
                <div className="flex justify-between items-center mt-2">
                  <p className="text-default">
                    {currency} {line}
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
      <div className="absolute inset-x-0 bottom-0 bg-white border-t px-5 pb-5 pt-3">
        <div className="flex justify-between mb-2">
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
            className="bg-gray-300 py-2 w-full rounded"
          >
            Clear All
          </button>

          <button
            onClick={goCheckout}
            disabled={totalQuantity === 0}
            className="flex items-center justify-center gap-2 bg-default py-2 w-full rounded text-white disabled:opacity-50"
          >
            Checkout <FaArrowRight className="animate-pulse" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartMenu;
