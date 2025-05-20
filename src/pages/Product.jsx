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
  FaAward,
  FaTruck,
  FaCcMastercard,
  FaShoppingBag,
} from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import RelatedProducts from "../components/RelatedProducts";

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
    const id = slug.split("-").pop();
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
    dispatch(
      addToCart({
        productId: singleProduct._id,
        quantity,
        variationId: singleProduct?.variantsId[0]?._id,
      })
    );
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

  // ─── EARLY RETURN ─────────────────────────────────────────────────────
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
  const categoryName = singleProduct.sub_category?.[0]?.name || "";
  const productUrl = window.location.href;

  // ─── RENDER ───────────────────────────────────────────────────────────
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
                Save: {currency} {discountAmt}
              </p>
            )}

            <p className="text-gray-500">Category: {categoryName}</p>

            {/* Quantity */}
            <div className="flex items-center gap-2">
              <button onClick={decrement} className="p-2 border rounded">
                <FaMinus />
              </button>
              <span className="px-4">{quantity}</span>
              <button onClick={increment} className="p-2 border rounded">
                <FaPlus />
              </button>
            </div>

            {/* Add to Cart */}
            {stock > 0 ? (
              <button
                onClick={handleAddToCart}
                className="w-full bg-default text-white py-3 rounded font-bold mt-4"
              >
                অর্ডার করুন
              </button>
            ) : (
              <p className="text-gray-500 mt-4">Out of Stock...</p>
            )}

            <hr className="mt-8 sm:w-4/5" />

            <div className="mt-5 text-gray-500 text-sm space-y-3">
              <div className="flex gap-2">
                <FaAward size={20} />
                <p>100% Original Product.</p>
              </div>
              <div className="flex gap-2">
                <FaTruck size={20} />
                <p>Express Shipping</p>
              </div>
              <div className="flex gap-2">
                <FaCcMastercard size={20} />
                <p>Cash on Delivery Available</p>
              </div>
              <div className="flex gap-2">
                <FaShoppingBag size={20} />
                <p>Easy return and exchange policy within 3 days</p>
              </div>
            </div>
            {/* Description Accordion */}
            <button
              onClick={() => setIsDesOpen((o) => !o)}
              className="flex justify-between w-full text-lg font-medium mb-2"
            >
              Description{" "}
              <FaAngleDown className={isDesOpen ? "rotate-180" : ""} />
            </button>
            {isDesOpen && (
              <p
                className="text-gray-600 mb-6"
                dangerouslySetInnerHTML={{
                  __html: shortDesc.replace(/\r\n/g, "<br/>"),
                }}
              />
            )}

            {/* Share Buttons */}
            <div className="flex gap-4 text-2xl">
              {[
                ["facebook.com/sharer/sharer.php?u=", FaFacebook],
                ["instagram.com/?url=", FaInstagram],
                ["reddit.com/submit?url=", FaReddit],
                ["wa.me/?text=", FaWhatsapp],
                ["threads.net/share?text=", FaThreads],
                [
                  "pinterest.com/pin/create/button/?url=",
                  FaPinterest,
                  `&media=${encodeURIComponent(
                    images[0]
                  )}&description=${encodeURIComponent(shortDesc)}`,
                ],
              ].map(([base, Icon, extra], i) => (
                <Link
                  key={i}
                  to={`https://${base}${encodeURIComponent(productUrl)}${
                    extra || ""
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Cart Menu (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-gradient-to-t from-gray-50 to-white shadow-lg px-6 py-4 flex items-center gap-2 z-50">
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-default text-white py-2 rounded-full font-bold"
        >
          অর্ডার করুন
        </button>
        <button onClick={() => setCartMenu(true)} className="relative">
          <FaShoppingCart size={24} />
          <span className="absolute top-0 right-0 bg-sky-400 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {totalQuantity}
          </span>
        </button>
      </div>

      {/* Related Products */}
      <div className="relative pt-20 pb-40 sm:pb-0 ">
        <RelatedProducts category={categoryName} id={singleProduct._id} />
      </div>

      {/* Back Home Button (Mobile) */}
      <div className="absolute sm:hidden top-4 left-4 z-50">
        <Link
          to="/"
          className="w-10 h-10 flex items-center justify-center bg-default/50 rounded-full"
        >
          <FaHome className="text-white" size={25} />
        </Link>
      </div>
    </div>
  );
};

export default Product;
