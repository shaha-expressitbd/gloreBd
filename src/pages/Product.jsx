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

const Product = ({ bg }) => {
  // ROUTE + CONTEXT
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { products, currency, totalQuantity, setCartMenu } =
    useContext(ShopContext);

  // LOCAL STATE
  const [singleProduct, setSingleProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isShortOpen, setIsShortOpen] = useState(true);
  const [isLongOpen, setIsLongOpen] = useState(false);

  // FIND PRODUCT
  useEffect(() => {
    const id = slug.split("-").pop();
    const found = products.find((p) => p._id === id);
    setSingleProduct(found || null);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug, products]);

  // QUANTITY HANDLERS
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

  // DERIVED VALUES
  const images = useMemo(
    () => singleProduct?.images?.map((i) => i.image.secure_url) || [],
    [singleProduct]
  );
  const videoUrl = useMemo(
    () => singleProduct?.video?.[0]?.video?.secure_url || null,
    [singleProduct]
  );
  if (!singleProduct)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading product…</p>
      </div>
    );

  const variant = singleProduct.variantsId?.[0] || {};
  const originalPrice = Number(variant.selling_price || 0);
  const now = new Date();
  const discountStart = new Date(variant.discount_start_date || "");
  const discountEnd = new Date(variant.discount_end_date || "");
  const isDiscountActive =
    !!variant.discount_amount && discountStart <= now && now <= discountEnd;
  const discountAmount = isDiscountActive
    ? Number(variant.discount_amount || 0)
    : 0;
  const offerPrice = isDiscountActive
    ? parseInt(variant.offer_price || "0")
    : parseInt(variant.selling_price || "0");
  const stock = Number(
    variant.variants_stock ?? singleProduct.total_stock ?? 0
  );

  const shortDesc = singleProduct.short_description || "";
  const longDesc = singleProduct.long_description || "";
  const categoryName = singleProduct.sub_category?.[0]?.name || "";
  const productUrl = window.location.href;

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
                    loading="lazy"
                    className="object-cover rounded"
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
                  loading="lazy"
                  className="min-h-full rounded-md"
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

            <div className="text-3xl font-semibold">
              {originalPrice === offerPrice ? (
                <p className="text-default">
                  {currency} {originalPrice.toLocaleString()}
                </p>
              ) : (
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
              )}
            </div>
            {discountAmount > 0 && (
              <p className="bg-white rounded-full inline-flex px-3 py-1">
                Save: {currency} {discountAmount}
              </p>
            )}
            <p className="text-gray-500">Category: {categoryName}</p>

            <div className="flex items-center gap-2">
              <button onClick={decrement} className="p-2 border rounded">
                <FaMinus />
              </button>
              <span className="px-4">{quantity}</span>
              <button onClick={increment} className="p-2 border rounded">
                <FaPlus />
              </button>
            </div>

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

            {/* Short Description Accordion */}
            <button
              onClick={() => {
                setIsShortOpen((prev) => {
                  const next = !prev;
                  if (next) setIsLongOpen(false); // close long when opening short
                  return next;
                });
              }}
              className="flex justify-between w-full text-lg font-medium mb-2"
            >
              Short Description{" "}
              <FaAngleDown className={isShortOpen ? "rotate-180" : ""} />
            </button>
            {isShortOpen && (
              <p
                className="text-gray-600 mb-6"
                dangerouslySetInnerHTML={{
                  __html: shortDesc.replace(/\r\n/g, "<br/>"),
                }}
              />
            )}

            {/* Long Description Accordion (hide if no longDesc) */}
            {longDesc && (
              <>
                <button
                  onClick={() => {
                    setIsLongOpen((prev) => {
                      const next = !prev;
                      if (next) setIsShortOpen(false); // close short when opening long
                      return next;
                    });
                  }}
                  className="flex justify-between w-full text-lg font-medium mb-2"
                >
                  Long Description{" "}
                  <FaAngleDown className={isLongOpen ? "rotate-180" : ""} />
                </button>
                {isLongOpen && (
                  <p
                    className="text-gray-600 mb-6"
                    dangerouslySetInnerHTML={{
                      __html: longDesc.replace(/\r\n/g, "<br/>"),
                    }}
                  />
                )}
              </>
            )}

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

      {/* Mobile Footer Cart Menu */}
      <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-gradient-to-t from-gray-50 to-white shadow-lg px-6 py-4 flex items-center gap-2 z-50">
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-default text-white py-2 rounded-full font-bold"
        >
          অর্ডার করুন
        </button>
        <button onClick={() => setCartMenu(true)} className="relative">
          <FaShoppingCart size={24} />
          {/* <span className="absolute -top-2 -right-2 bg-sky-400 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-ping">
            {totalQuantity > 9 ? "9+" : totalQuantity}
          </span> */}
          <span
            className={`absolute -top-2 -right-2 bg-sky-400 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full ${bg} ${
              totalQuantity > 0 && "animate-ping"
            }`}
          ></span>
          <span
            className={`absolute -top-2 -right-2 bg-sky-400 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full ${bg}`}
          >
            {totalQuantity > 9 ? "9+" : totalQuantity}
          </span>
        </button>
      </div>

      {/* Related Products */}
      <div className="relative pt-20 pb-40 sm:pb-0">
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
