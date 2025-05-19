// src/pages/Product.jsx
import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ShopContext } from "../context/ShopContext";
import { addToCart } from "../stores/cart";
import ReactPlayer from "react-player";
import { Helmet } from "react-helmet-async";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Zoom } from "swiper/modules";
import {
  FaAngleDown,
  FaMinus,
  FaPlus,
  FaStar,
  FaFacebook,
  FaInstagram,
  FaReddit,
  FaWhatsapp,
  FaPinterest,
  FaShoppingCart,
  FaHome,
} from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";

const Product = () => {
  // 1) ROUTE + CONTEXT
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { products, currency, totalQuantity, setCartMenu } =
    useContext(ShopContext);

  // 2) LOCAL STATE
  const [singleProduct, setSingleProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isDesOpen, setIsDesOpen] = useState(false);

  // 3) FIND PRODUCT WHENEVER slug OR products CHANGE
  useEffect(() => {
    const id = slug?.split("-").pop();
    const found = products.find((p) => p._id === id);
    setSingleProduct(found || null);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug, products]);

  // 4) STABLE CALLBACKS
  const decrement = useCallback(
    () => setQuantity((q) => Math.max(1, q - 1)),
    []
  );
  const increment = useCallback(() => setQuantity((q) => q + 1), []);
  const handleAddToCart = useCallback(() => {
    if (!singleProduct) return;
    dispatch(addToCart({ productId: singleProduct._id, quantity }));
    setCartMenu(true);
  }, [dispatch, singleProduct, quantity, setCartMenu]);

  // 5) DERIVED VALUES
  const images = useMemo(
    () => singleProduct?.images?.map((i) => i.image.secure_url) || [],
    [singleProduct]
  );
  const videoUrl = useMemo(
    () => singleProduct?.video?.[0]?.secure_url || null,
    [singleProduct]
  );

  // ─── EARLY RETURN: product not yet loaded ───────────────────────────
  if (!singleProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading product…</p>
      </div>
    );
  }

  // 6) PRICING & STOCK
  const variant = singleProduct.variantsId?.[0] || {};
  const originalPrice = Number(
    variant.selling_price || singleProduct.price || 0
  );
  const discountAmt = Number(variant.discount_amount || 0);
  const offerPrice =
    variant.offer_price != null
      ? Number(variant.offer_price)
      : originalPrice - discountAmt;
  const stock = Number(
    variant.variants_stock ?? singleProduct.total_stock ?? 0
  );

  // 7) OTHER DERIVED
  const shortDesc = singleProduct.short_description || "";
  const categoryNames = (singleProduct.sub_category || [])
    .map((c) => c.name)
    .join(", ");
  const productUrl = window.location.href;

  // 8) RENDER
  return (
    <div className="container mx-auto sm:py-32 lg:px-5 2xl:px-0">
      <Helmet>
        <title>{singleProduct.name}</title>
        <meta property="og:title" content={singleProduct.name} />
        <meta property="og:description" content={shortDesc} />
        <meta property="og:image" content={images[0]} />
        <meta property="og:url" content={productUrl} />
        <meta property="og:type" content="product" />
      </Helmet>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Images / Video */}
        <div
          className={`w-full md:w-1/2 ${
            images.length > 1 || videoUrl ? "lg:w-3/4" : ""
          }`}
        >
          {window.innerWidth < 640 ? (
            <Swiper navigation modules={[Navigation, Zoom]}>
              {videoUrl && (
                <SwiperSlide>
                  <ReactPlayer
                    url={videoUrl}
                    playing
                    loop
                    muted
                    width="100%"
                    height="100%"
                  />
                </SwiperSlide>
              )}
              {images.map((src, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={src}
                    alt={singleProduct.name}
                    className="object-cover rounded"
                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div
              className={`grid gap-2 ${
                images.length > 1 || videoUrl ? "lg:grid-cols-2" : "grid-cols-1"
              }`}
            >
              {videoUrl && (
                <ReactPlayer
                  url={videoUrl}
                  playing
                  loop
                  muted
                  width="100%"
                  height="100%"
                />
              )}
              {images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={singleProduct.name}
                  className="min-h-full rounded-md"
                  loading="lazy"
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2">
          <div className="sm:sticky top-24 space-y-5 px-2 sm:px-0 z-10">
            <h1 className="text-xl lg:text-3xl font-bold">
              {singleProduct.name}
            </h1>

            <div className="flex gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            {/* Pricing */}
            <div className="text-3xl font-semibold">
              {discountAmt > 0 ? (
                <div className="flex items-center gap-5">
                  <p className="text-default">
                    {currency} {offerPrice.toLocaleString()}
                  </p>
                  <div className="relative inline-block text-lg text-gray-500">
                    <span>
                      {currency} {originalPrice.toLocaleString()}
                    </span>
                    <span className="absolute inset-0 w-full h-[2px] bg-default transform rotate-[-10deg] top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              ) : (
                <p className="text-default">
                  {currency} {originalPrice.toLocaleString()}
                </p>
              )}
            </div>

            {discountAmt > 0 && (
              <p className="bg-white rounded-full inline-flex px-3 py-1">
                Save: {currency} {discountAmt.toLocaleString()}
              </p>
            )}

            {/* Category */}
            <p className="text-gray-500">Category: {categoryNames}</p>

            {/* Quantity */}
            <div className="flex items-center gap-2">
              <p>Quantity:</p>
              <div className="flex items-center border rounded">
                <button className="px-2" onClick={decrement}>
                  <FaMinus />
                </button>
                <span className="px-4">{quantity}</span>
                <button className="px-2" onClick={increment}>
                  <FaPlus />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            {stock > 0 ? (
              <button
                onClick={handleAddToCart}
                className="bg-default text-white px-8 py-3 rounded w-full font-bold"
              >
                অর্ডার করুন
              </button>
            ) : (
              <p className="text-gray-500">Out of Stock...</p>
            )}

            <hr className="my-5" />

            {/* Description Accordion */}
            <div>
              <button
                onClick={() => setIsDesOpen((o) => !o)}
                className="flex justify-between w-full text-lg font-medium"
              >
                Description{" "}
                <FaAngleDown
                  className={isDesOpen ? "transform rotate-180" : ""}
                />
              </button>
              {isDesOpen && (
                <p
                  className="mt-2 text-gray-600"
                  dangerouslySetInnerHTML={{
                    __html: shortDesc.replace(/\r\n/g, "<br/>"),
                  }}
                />
              )}
            </div>

            {/* Share Buttons */}
            <div className="mt-5 flex gap-4 text-2xl">
              <Link
                to={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  productUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </Link>
              <Link
                to={`https://instagram.com/?url=${encodeURIComponent(
                  productUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </Link>
              <Link
                to={`https://reddit.com/submit?url=${encodeURIComponent(
                  productUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaReddit />
              </Link>
              <Link
                to={`https://wa.me/?text=${encodeURIComponent(productUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp />
              </Link>
              <Link
                to={`https://threads.net/share?text=${encodeURIComponent(
                  productUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaThreads />
              </Link>
              <Link
                to={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                  productUrl
                )}&media=${encodeURIComponent(
                  images[0]
                )}&description=${encodeURIComponent(shortDesc)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaPinterest />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 sm:hidden flex justify-between items-center shadow-lg">
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-default text-white py-2 rounded"
        >
          অর্ডার করুন
        </button>
        <button onClick={() => setCartMenu(true)} className="ml-4 relative">
          <FaShoppingCart size={24} />
          <span className="absolute top-0 right-0 bg-sky-400 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {totalQuantity}
          </span>
        </button>
      </div>

      {/* Back Home on Mobile */}
      <Link
        to="/"
        className="absolute top-4 left-4 sm:hidden bg-default/50 p-2 rounded-full"
      >
        <FaHome className="text-white" size={24} />
      </Link>
    </div>
  );
};

export default Product;
