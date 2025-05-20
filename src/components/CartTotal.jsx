import React, { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";

const CartTotal = ({ deliveryCharge = 0 }) => {
  const { currency, totalAmount, discountAmount } = useContext(ShopContext);

  /* মেমো-করা মান */
  const delCharge = useMemo(
    () => Number(deliveryCharge) || 0,
    [deliveryCharge]
  );

  const subTotal = useMemo(
    () => Number(totalAmount) + Number(discountAmount),
    [totalAmount, discountAmount]
  );

  const grandTotal = useMemo(
    () => Number(totalAmount) + delCharge,
    [totalAmount, delCharge]
  );

  return (
    <div className="w-full">
      <div className="flex flex-col gap-1 sm:gap-2 sm:mt-2 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency} {subTotal.toFixed(2)}
          </p>
        </div>

        {/* Discount */}
        {discountAmount > 0 && (
          <>
            <hr />
            <div className="flex justify-between text-green-600">
              <p>Discount</p>
              <p>
                - {currency} {Number(discountAmount).toFixed(2)}
              </p>
            </div>
          </>
        )}

        {/* Delivery */}
        <hr />
        <div className="flex justify-between">
          <p>Delivery Charge</p>
          <p>
            {currency} {delCharge.toFixed(2)}
          </p>
        </div>

        {/* Grand Total */}
        <hr />
        <div className="flex justify-between">
          <p>
            <strong>Total</strong>
          </p>
          <p className="font-bold">
            {currency} {grandTotal.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
