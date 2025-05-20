// src/components/ProductItem.jsx
import React, { useContext, useState, useMemo, useCallback } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { addToCart } from "../stores/cart";
import { useDispatch } from "react-redux";
import OrderButton from "./OrderButton";
import ProductImage from "./ProductImage";

const ProductItem = React.memo(({ id, name, product }) => {
  const { currency, setCartMenu } = useContext(ShopContext);
  const [imgLoading, setImgLoading] = useState(true);
  const dispatch = useDispatch();

  // generate slug
  const slug = useMemo(
    () =>
      name
        .trim()
        .toLowerCase()
        .replace(/[^ঀ-৿a-zA-Z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .concat(`-${id}`),
    [name, id]
  );

  // add to cart handler
  const handleAddToCart = useCallback(() => {
    setCartMenu(true);
    dispatch(
      addToCart({
        productId: id,
        quantity: 1,
        variationId: product?.variantsId[0]?._id,
      })
    );
  }, [dispatch, id, setCartMenu]);

  // image URL from API
  const imageUrl = product.images?.[0]?.image?.secure_url || "";

  // pricing from first variant
  const variant = product.variantsId?.[0] || {};
  const originalPrice = Number(variant.selling_price || 0);

  const now = new Date();
  const discountStart = new Date(variant.discount_start_date || "");
  const discountEnd = new Date(variant.discount_end_date || "");

  const isDiscountActive =
    !!variant.discount_amount && discountStart <= now && now <= discountEnd;

  const finalPrice = isDiscountActive
    ? parseInt(variant.offer_price || "0")
    : parseInt(variant.selling_price || "0");
  const discountPercent =
    isDiscountActive && Math.round(variant.discount_percent || 0);

  return (
    <div className="shadow-sm w-full mx-auto bg-white relative rounded-lg overflow-hidden h-full flex flex-col">
      <div className="relative overflow-hidden">
        <Link to={`/singleproduct/${slug}`}>
          <ProductImage
            src={imageUrl}
            alt={name}
            isLoading={imgLoading}
            onLoad={() => setImgLoading(false)}
            onError={() => setImgLoading(false)}
          />
        </Link>

        {discountPercent > 0 && (
          <div className="bg-white rounded-full inline-flex text-xs sm:text-base px-1 sm:px-2 py-0.5 absolute top-1 right-1 sm:top-2 sm:right-2">
            Save: {discountPercent}%
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow">
        <p className="lg:font-bold p-2 lg:px-3 whitespace-nowrap truncate">
          {name}
        </p>

        <div className="flex justify-between items-center mx-auto px-2 lg:px-3 pb-3 mt-auto w-full">
          <OrderButton addToCart={handleAddToCart} />

          <div className="text-right font-semibold">
            {originalPrice > finalPrice ? (
              <div>
                <div className="relative text-center">
                  <div className="text-gray-500 text-xs">
                    {currency} {originalPrice.toLocaleString()}
                  </div>
                  <span className="absolute inset-0 w-full h-[2px] bg-default transform rotate-[-10deg] top-1/2 -translate-y-1/2 left-[0.25px]"></span>
                </div>
                <p className="text-right font-semibold text-default">
                  {currency}
                  {finalPrice.toLocaleString()}
                </p>
              </div>
            ) : (
              <p className="text-default">
                {currency}
                {finalPrice.toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductItem;
