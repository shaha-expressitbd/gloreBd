// src/pages/Checkout.jsx
import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";
import CartProduct from "../components/CartProduct";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    totalQuantity,
    clearAllCart,
    businessAPI,
    totalAmount,
    business,
  } = useContext(ShopContext);

  // delivery fees from your business API
  const insideFee = business?.insideDhaka || 0;
  const outsideFee = business?.outsideDhaka || 0;
  const subDhakaFee = business?.subDhaka || 0;

  const [method, setMethod] = useState("cod");
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
    delivery_area: "",
  });
  const [errors, setErrors] = useState({});

  // Scroll up when validation errors appear
  useEffect(() => {
    if (Object.keys(errors).length) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [errors]);

  // Handle form fields and update deliveryCharge on area change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "delivery_area") {
      const fee =
        value === "inside_dhaka"
          ? insideFee
          : value === "outside_dhaka"
          ? outsideFee
          : value === "sub_dhaka"
          ? subDhakaFee
          : 0;
      setDeliveryCharge(fee);
    }
  };

  // Basic client-side validation
  const validateForm = (data) => {
    const errs = {};
    if (!data.name || data.name.length < 3)
      errs.name = "সর্বনিম্ন ৩ অক্ষরের নাম দিন";
    if (!data.phone) errs.phone = "আপনার ফোন নাম্বার দিন";
    if (!data.address) errs.address = "আপনার ঠিকানা দিন";
    if (!data.delivery_area)
      errs.delivery_area = "ডেলিভারি এলাকা নির্বাচন করুন";
    if (data.note && data.note.length < 5)
      errs.note = "নোট কমপক্ষে ৫ অক্ষরের হতে হবে";
    if (cartItems.length === 0) errs.products = "Cart is empty";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (totalQuantity === 0) {
      navigate("/collections");
      return;
    }

    const newErrors = validateForm(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    // Build products array
    const products = cartItems.map((i) => ({
      productId: i.variationId,
      quantity: i.quantity,
    }));

    const dueAmount = Number(deliveryCharge) + Number(totalAmount);

    const payload = {
      customer_name: formData.name,
      customer_phone: formData.phone,
      customer_address: formData.address,
      delivery_area: formData.delivery_area,
      customer_note: formData?.note || undefined,
      products,
      due: dueAmount.toString(),
    };

    console.log("Submitting order payload:", payload);

    try {
      const res = await axios.post(`${businessAPI}/online-order`, payload);
      console.log(res?.response);
      if (res.data.success) {
        clearAllCart();
        navigate(`/thankyou/${res.data.data.id}`);
      }
    } catch (err) {
      console.error("Order submission failed:", err?.response?.data);
    }
  };

  return (
    <div
      className="mx-auto px-2 lg:px-0 container relative min-h-screen"
      id="top"
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-10 lg:py-10">
          {/* Left Side: Cart Items */}
          <div className="sm:w-1/2 shadow p-5 mb-52 sm:mb-0 bg-white rounded-md">
            <CartProduct />
          </div>

          {/* Right Side: Delivery & Payment */}
          <div className="flex flex-col gap-5 bg-white sm:w-1/2 shadow p-6 mt-5 sm:mt-0 rounded-md">
            <Title text1="DELIVERY" text2="INFORMATION" />
            <p className="text-xs text-gray-500 mt-1">
              অর্ডার কনফার্ম করতে আপনার নাম, ঠিকানা, মোবাইল নাম্বার লিখে অর্ডার
              কনফার্ম করুন।
            </p>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block mb-1 text-sm font-bold">
                আপনার নাম*
              </label>
              <input
                id="name"
                name="name"
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.name ? "border-red-500" : "border-secondary"
                }`}
                placeholder="Enter Full Name"
              />
              {errors.name && (
                <p className="mt-1 text-red-600 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block mb-1 text-sm font-bold">
                আপনার ফোন নাম্বার*
              </label>
              <input
                id="phone"
                name="phone"
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.phone ? "border-red-500" : "border-secondary"
                }`}
                placeholder="Enter Contact Number"
              />
              {errors.phone && (
                <p className="mt-1 text-red-600 text-sm">{errors.phone}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block mb-1 text-sm font-bold">
                আপনার ডেলিভারি ঠিকানা দিন*
              </label>
              <textarea
                id="address"
                name="address"
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.address ? "border-red-500" : "border-secondary"
                }`}
                placeholder="Enter Delivery Address"
              />
              {errors.address && (
                <p className="mt-1 text-red-600 text-sm">{errors.address}</p>
              )}
            </div>

            {/* Delivery Area */}
            <div>
              <label
                htmlFor="delivery_area"
                className="block mb-1 text-sm font-bold"
              >
                ডেলিভারি এলাকা*
              </label>
              <select
                id="delivery_area"
                name="delivery_area"
                onChange={handleChange}
                className={`w-full p-2 rounded border ${
                  errors.delivery_area ? "border-red-500" : "border-secondary"
                }`}
                defaultValue=""
              >
                <option value="">Select Delivery Area</option>
                <option value="inside_dhaka">ঢাকার ভিতরে ৳ {insideFee}</option>
                <option value="outside_dhaka">
                  ঢাকার বাইরে ৳ {outsideFee}
                </option>
                <option value="sub_dhaka">সাব-ঢাকা ৳ {subDhakaFee}</option>
              </select>
              {errors.delivery_area && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.delivery_area}
                </p>
              )}
            </div>

            {/* Note */}
            <div>
              <label htmlFor="note" className="block mb-1 text-sm font-bold">
                গ্রাহক নোট (optional)
              </label>
              <input
                id="note"
                name="note"
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.note ? "border-red-500" : "border-secondary"
                }`}
                placeholder="Enter Your Note"
              />
              {errors.note && (
                <p className="mt-2 text-sm text-red-600">{errors.note}</p>
              )}
            </div>

            {/* Payment Method */}
            <div className="sm:flex justify-between items-center">
              <p className="mb-2 text-sm font-semibold">Payment Method</p>
              <div className="flex gap-3">
                <div
                  onClick={() => setMethod("cod")}
                  className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer ${
                    method === "cod"
                      ? "border-secondary"
                      : "border-gray-300 hover:border-secondary"
                  }`}
                >
                  <span className="w-5 h-5 border-2 rounded-full flex items-center justify-center">
                    {method === "cod" && (
                      <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                    )}
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    Cash on Delivery
                  </span>
                </div>
              </div>
            </div>

            {/* Cart Totals (Desktop) */}
            <div className="hidden sm:block">
              <Title text1="CART" text2="TOTALS" />
              <CartTotal deliveryCharge={deliveryCharge} />
            </div>

            {/* Submit Button (Desktop) */}
            <button
              type="submit"
              className="hidden sm:block w-full bg-default text-white py-3 rounded hover:bg-[#9F2B68]"
            >
              অর্ডারটি নিশ্চিত করুন
            </button>
          </div>
        </div>

        {/* Mobile Footer Cart Menu */}
        <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-gradient-to-t from-gray-50 to-white shadow-lg px-6 py-4">
          <div className="pb-3">
            <h2 className="text-lg font-semibold">Cart Total</h2>
            <CartTotal deliveryCharge={deliveryCharge} />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-default shadow-lg py-2 rounded-full font-medium text-white hover:bg-[#9F2B68]"
          >
            অর্ডারটি নিশ্চিত করুন
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
