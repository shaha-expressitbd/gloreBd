import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaMinus, FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

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
        const v = item.variantsId?.[0] || {};
        const unit = getSalePrice(v);
        const line = (unit * item.quantity).toFixed(2);
        const img =
          v.image?.secure_url || item.images?.[0]?.image?.secure_url || "";
        const discount = isDiscountActive(v);
        const original = Number(v.selling_price || 0).toFixed(2);

        return (
          <div
            key={item.productId}
            className="py-4 flex border-b gap-2 justify-between"
          >
            <img
              src={img}
              alt={item.name}
              className="w-[100px] h-[120px] rounded object-cover"
            />

            <div className="w-2/3">
              <p className="font-medium text-default mb-2 line-clamp-2">
                {item.name}
              </p>

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

                <div className="flex items-center border rounded gap-1 px-1">
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
                  <span className="px-2 py-1 bg-gray-100">{item.quantity}</span>
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

              <div className="flex justify-between items-center pt-2">
                <p className="text-default text-xl">
                  = {currency} {line}
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
