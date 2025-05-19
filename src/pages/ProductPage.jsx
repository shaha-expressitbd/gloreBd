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
  // 1) ROUTE & CONTEXT
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { products, currency, totalQuantity, setCartMenu } =
    useContext(ShopContext);

  // 2) LOCAL STATE
  const [singleProduct, setSingleProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isDesOpen, setIsDesOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);

  // 3) FIND PRODUCT
  useEffect(() => {
    const id = slug?.split("-").pop();
    const found = products.find((p) => p._id === id);
    setSingleProduct(found || null);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug, products]);

  // 4) SET DEFAULT SELECTED IMAGE
  useEffect(() => {
    if (singleProduct?.images?.length) {
      setSelectedImageId(singleProduct.images[0]._id);
    }
  }, [singleProduct]);

  // 5) CALLBACKS
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

  // 6) DERIVED VALUES
  const images = useMemo(
    () =>
      singleProduct?.images?.map((i) => ({
        id: i._id,
        url: i.image.secure_url,
      })) || [],
    [singleProduct]
  );
  const mainImageUrl = useMemo(() => {
    const img = images.find((i) => i.id === selectedImageId);
    return img?.url || images[0]?.url || "";
  }, [images, selectedImageId]);

  const videoUrl = useMemo(
    () =>
      singleProduct?.video?.[0] ? singleProduct.video[0].secure_url : null,
    [singleProduct]
  );

  // EARLY RETURN
  if (!singleProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading product…</p>
      </div>
    );
  }

  // PRICING & STOCK
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

  // OTHER DERIVED
  const shortDesc = singleProduct.short_description || "";
  const categoryNames = (singleProduct.sub_category || [])
    .map((c) => c.name)
    .join(", ");
  const productUrl = window.location.href;

  // RENDER
  return (
    <div className="container mx-auto sm:py-32 lg:px-5 2xl:px-0">
      <Helmet>
        <title>{singleProduct.name}</title>
        <meta property="og:title" content={singleProduct.name} />
        <meta property="og:description" content={shortDesc} />
        <meta property="og:image" content={mainImageUrl} />
        <meta property="og:url" content={productUrl} />
        <meta property="og:type" content="product" />
      </Helmet>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Main Image / Video */}
        <div className="w-full md:w-1/2 lg:w-3/4">
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
              {images.map((img) => (
                <SwiperSlide key={img.id}>
                  <img
                    src={img.url}
                    alt={singleProduct.name}
                    className="object-cover rounded"
                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <img
              src={mainImageUrl}
              alt={singleProduct.name}
              className="w-full h-auto rounded-md"
            />
          )}

          {/* Thumbnails (desktop only) */}
          <div className="hidden lg:flex gap-2 mt-4">
            {images.map((img) => (
              <img
                key={img.id}
                src={img.url}
                alt=""
                className={`w-20 h-20 object-cover rounded cursor-pointer ${
                  img.id === selectedImageId
                    ? "ring-2 ring-default"
                    : "opacity-60"
                }`}
                onClick={() => setSelectedImageId(img.id)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold">{singleProduct.name}</h1>
          <div className="flex gap-1 text-amber-500 my-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>

          <div className="text-3xl font-semibold mb-2">
            {discountAmt > 0 ? (
              <div className="flex items-center gap-4">
                <span className="text-default">
                  {currency} {offerPrice.toLocaleString()}
                </span>
                <span className="text-gray-500 line-through">
                  {currency} {originalPrice.toLocaleString()}
                </span>
              </div>
            ) : (
              <span className="text-default">
                {currency} {originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {discountAmt > 0 && (
            <div className="mb-4 inline-block bg-default/10 text-default px-3 py-1 rounded-full">
              Save: {currency} {discountAmt}
            </div>
          )}

          <p className="text-gray-500 mb-4">Category: {categoryNames}</p>

          {/* Quantity */}
          <div className="flex items-center gap-2 mb-6">
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
              className="w-full bg-default text-white py-3 rounded font-bold mb-6"
            >
              অর্ডার করুন
            </button>
          ) : (
            <p className="text-red-500 mb-6">Out of Stock</p>
          )}

          <hr className="mb-6" />

          {/* Description Accordion */}
          <div className="mb-6">
            <button
              onClick={() => setIsDesOpen((o) => !o)}
              className="flex justify-between w-full text-lg font-medium"
            >
              Description{" "}
              <FaAngleDown className={isDesOpen ? "rotate-180" : ""} />
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
                  mainImageUrl
                )}&description=${encodeURIComponent(shortDesc)}`,
              ],
            ].map(([base, Icon, extra], idx) => (
              <Link
                key={idx}
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

      {/* Back Home */}
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
