// src/components/CartProduct.jsx
import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaMinus, FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

/* ------------------------------------------------------------------ */
/* 👇 LOCAL helper – আলাদা ফাইল দরকার নেই                               */
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

const CartProduct = () => {
  const {
    currency,
    cartProducts,
    handleRemoveFromCart,
    quantityIncrement,
    quantityDecrement,
  } = useContext(ShopContext);

  return (
    <div>
      <div className="flex justify-between items-center p-3 bg-default rounded mb-3">
        <p className="text-white font-semibold">Shopping Items</p>
      </div>

      {cartProducts.map((item) => {
        /* pick first variant */
        const variant = item.variantsId?.[0] || {};
        const unitPrice = getSalePrice(variant); // ★
        const lineTotal = (unitPrice * item.quantity).toFixed(2);
        const imgUrl =
          variant.image?.secure_url ||
          item.images?.[0]?.image?.secure_url ||
          "";

        const discountActive = isDiscountActive(variant); // ★
        const originalPrice = Number(variant.selling_price || 0).toFixed(2);

        return (
          <div
            key={item.productId}
            className="py-4 flex border-b gap-2 justify-between"
          >
            {/* image */}
            <div className="w-1/3">
              <img
                src={imgUrl}
                alt={item.name}
                className="w-[100px] h-[120px] rounded object-cover"
              />
            </div>

            {/* details */}
            <div className="w-2/3">
              <p className="font-medium text-default mb-2 line-clamp-2">
                {item.name}
              </p>

              {/* price + qty */}
              <div className="flex justify-between items-center">
                <div>
                  {discountActive ? (
                    <>
                      <p className="text-gray-500 text-sm line-through">
                        {currency} {originalPrice}
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

                {/* qty controls */}
                <div className="flex items-center border rounded gap-1 px-1">
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
                  <span className="px-2 py-1 bg-gray-100">{item.quantity}</span>
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

              {/* line total + delete */}
              <div className="flex justify-between items-center pt-2">
                <p className="text-default text-xl">
                  = {currency} {lineTotal}
                </p>
                <button
                  onClick={() => handleRemoveFromCart(item.productId)}
                  className="text-red-600"
                >
                  <RiDeleteBin6Line size={20} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartProduct;
