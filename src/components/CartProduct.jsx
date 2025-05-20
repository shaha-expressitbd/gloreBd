import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaMinus, FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

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

      {cartProducts.map((item, idx) => {
        // pick first variant
        const variant = item.variantsId?.[0] || {};
        const unitPrice = Number(
          variant.offer_price != null
            ? variant.offer_price
            : variant.selling_price || 0
        );
        const lineTotal = (unitPrice * item.quantity).toFixed(2);

        // image URL
        const imgUrl =
          variant.image?.secure_url || item.images?.[0]?.image.secure_url || "";

        return (
          <div key={idx} className="py-4 flex border-b gap-2 justify-between">
            <div className="w-1/3">
              <img
                src={imgUrl}
                alt={item.name}
                className="w-[100px] h-[120px] rounded object-cover"
              />
            </div>

            <div className="w-2/3">
              <p className="font-medium text-default mb-2">{item.name}</p>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-default">
                    {currency} {unitPrice.toFixed(2)}
                  </p>
                </div>
                <p>x</p>
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
                  <p className="px-2 py-1 bg-gray-100 text-center">
                    {item.quantity}
                  </p>
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
