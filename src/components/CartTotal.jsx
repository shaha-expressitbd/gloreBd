import React, { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";

const CartTotal = ({ deliveryCharge }) => {
  const { currency, cartProducts } = useContext(ShopContext);

  // compute subtotal from cartProducts & their variants
  const subTotal = useMemo(() => {
    return cartProducts.reduce((sum, item) => {
      const variant = item.variantsId?.[0] || {};
      const price = Number(
        variant.offer_price != null
          ? variant.offer_price
          : variant.selling_price || 0
      );
      return sum + price * item.quantity;
    }, 0);
  }, [cartProducts]);

  const delCharge = useMemo(
    () => Number(deliveryCharge) || 0,
    [deliveryCharge]
  );
  const grandTotal = useMemo(() => subTotal + delCharge, [subTotal, delCharge]);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-1 sm:gap-2 sm:mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency} {subTotal.toFixed(2)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Delivery Charge</p>
          <p>
            {currency} {delCharge.toFixed(2)}
          </p>
        </div>
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
