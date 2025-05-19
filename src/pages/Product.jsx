import React, { useContext, useEffect, useState, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import {
  FaAngleDown,
  FaAward,
  FaCcMastercard,
  FaFacebook,
  FaHome,
  FaInstagram,
  FaMinus,
  FaPinterest,
  FaPlus,
  FaReddit,
  FaShoppingBag,
  FaShoppingCart,
  FaStar,
  FaTruck,
  FaWhatsapp,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../stores/cart";
import ReactPlayer from "react-player";

// Facebook Share Hashtag
import { Helmet } from "react-helmet-async";

// Swiper JS
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Zoom } from "swiper/modules";
import { FaThreads } from "react-icons/fa6";

const Product = () => {
  // const navigate = useNavigate()
  const { slug } = useParams(); // Extract the slug and ID from the route

  // Product URL
  const productUrl = window.location.href; // Full URL

  const extractIdFromSlug = (slugWithId) => {
    const parts = slugWithId.split("-"); // Split by hyphen
    return parts[parts.length - 1]; // The last part is the ID
  };
  const productId = extractIdFromSlug(slug);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  const dispatch = useDispatch();

  const { products, currency, totalQuantity, setCartMenu, cloudAPI } =
    useContext(ShopContext);

  const [singleProduct, setSingleProduct] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const decrement = () => {
    quantity > 1 && setQuantity(quantity - 1);
  };

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const fetchSingleData = async () => {
    if (productId) {
      let selectedItem = products.find((p) => p.id == productId);
      if (selectedItem) {
        setSingleProduct(selectedItem);
      }
    }
    //  else {
    //   navigate('/collections')
    // }
  };

  const handleAddToCart = (product) => {
    const data = { productId: product, quantity: quantity };
    dispatch(addToCart(data));

    if (!isMobile) {
      toast.success("Product Added to Cart Successfully!");
    }
  };

  useEffect(() => {
    fetchSingleData();
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug, products]);

  const [isDesOpen, setIsDesOpen] = useState(false); // Accordion open state

  const memoizedImages = useMemo(() => {
    return singleProduct?.product_images?.map(
      (image) => `${cloudAPI}/image/${image.name}`
    );
  }, [singleProduct?.product_images]);

  const memoizedVideoUrl = useMemo(() => {
    return singleProduct?.video
      ? `${cloudAPI}/video/${singleProduct?.video}`
      : null;
  }, [singleProduct?.video]);

  return singleProduct ? (
    <div className="container mx-auto sm:py-32 lg:px-5 2xl:px-0">
      {/* SEO META TAG */}
      <Helmet key={slug}>
        <title data-rh="true">{singleProduct?.name}</title>
        <meta
          property="og:title"
          content={singleProduct?.name}
          data-rh="true"
        />
        <meta
          property="og:description"
          content={singleProduct?.short_desc}
          data-rh="true"
        />
        <meta
          property="og:image"
          content={`${cloudAPI}/image/${singleProduct?.image}`}
          data-rh="true"
        />
        <meta property="og:url" content={productUrl} data-rh="true" />
        <meta property="og:type" content="product" data-rh="true" />
      </Helmet>

      <div>
        <div className="flex md:flex-row flex-col gap-12">
          {/* product image */}
          <div
            className={`w-full md:w-1/2 ${
              singleProduct.product_images.length > 1 || singleProduct.video
                ? "lg:w-3/4"
                : ""
            }`}
          >
            {isMobile ? (
              <Swiper
                className="mySwiper"
                effect="fade"
                navigation={{ clickable: true }}
                modules={[Navigation, Zoom]}
              >
                {singleProduct?.video && (
                  <SwiperSlide>
                    <ReactPlayer
                      url={memoizedVideoUrl}
                      playing={true}
                      loop={true}
                      controls={false}
                      muted={true}
                      width="100%"
                      height="100%"
                      className="object-cover"
                      preload="auto"
                    />
                  </SwiperSlide>
                )}
                {memoizedImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      className="object-cover rounded"
                      loading="lazy"
                      alt={singleProduct?.name}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div
                className={`grid gap-2 ${
                  singleProduct.product_images.length > 1 || singleProduct.video
                    ? "lg:grid-cols-2"
                    : "grid-cols-1"
                }`}
              >
                {singleProduct?.video && (
                  <ReactPlayer
                    url={memoizedVideoUrl}
                    playing={true}
                    loop={true}
                    controls={false}
                    muted={true}
                    width="100%"
                    height="100%"
                    className="object-cover"
                    preload="auto"
                  />
                )}
                {memoizedImages.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      loading="lazy"
                      className="min-h-full rounded-md"
                      alt={singleProduct?.name}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="w-full md:w-1/2">
            <div
              className={`sm:sticky top-24 space-y-5 sm:px-0 px-2 z-10 w-full`}
            >
              <h1 className="lg:font-bold text-xl lg:text-3xl">
                {singleProduct?.name}
              </h1>
              <div className="flex items-center gap-1 mt-2">
                <FaStar alt="ratings" className="text-amber-500" />
                <FaStar alt="ratings" className="text-amber-500" />
                <FaStar alt="ratings" className="text-amber-500" />
                <FaStar alt="ratings" className="text-amber-500" />
                <FaStar alt="ratings" className="text-amber-500" />
              </div>

              <div className="text-left font-semibold text-3xl">
                {singleProduct?.discount_amount ? (
                  <div className="flex items-center gap-5">
                    <p className="text-default mt-1">
                      {currency}{" "}
                      {Number(singleProduct?.price) -
                        Number(singleProduct?.discount_amount)}
                    </p>
                    <div className="relative inline-block text-lg text-gray-500">
                      <span className="block">
                        {currency} {singleProduct?.price}
                      </span>
                      <span className="absolute left-0 top-1/2 w-full h-[2px] bg-default rotate-[-10deg] transform -translate-y-1/2"></span>
                    </div>
                  </div>
                ) : (
                  <p className="text-default">
                    {currency} {Number(singleProduct?.price).toFixed(2)}
                  </p>
                )}
              </div>

              {singleProduct?.discount_amount > 0 && (
                <p className="bg-white rounded-full inline-flex px-3 py-1">
                  Save: {currency} {singleProduct?.discount_amount}
                </p>
              )}

              <p className="w-4/5 text-gray-500 text-justify">
                Category: {singleProduct?.category.name}
              </p>

              <div className="flex items-center gap-2">
                <p>Quantity:</p>
                <div className="flex items-center justify-between border rounded-s-lg rounded-r-lg min-w-28">
                  <button className="px-1.5" type="button" onClick={decrement}>
                    <FaMinus />
                  </button>
                  <p className="bg-gray-50 w-full py-1 text-center">
                    {quantity}
                  </p>
                  <button className="px-1.5" type="button" onClick={increment}>
                    <FaPlus />
                  </button>
                </div>
              </div>

              {singleProduct?.stock > 0 ? (
                <>
                  <p>
                    In Stock:{" "}
                    <span className="font-bold">{singleProduct?.stock}</span>
                  </p>
                  <button
                    onClick={() => {
                      setCartMenu(true);
                      handleAddToCart(singleProduct.id);
                    }}
                    className="md:block hidden bg-default active:bg-gray-700 px-8 py-3 rounded w-full font-bold text-sm text-white"
                  >
                    অর্ডার করুন
                  </button>
                </>
              ) : (
                <p className="py-8 text-gray-500">Out of Stock...</p>
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

              {/* Description */}
              <div className="border-b border-gray-300 pb-2">
                <button
                  onClick={() => setIsDesOpen(!isDesOpen)}
                  className="w-full text-left flex justify-between items-center focus:outline-none"
                >
                  <span className="text-lg font-medium">Description</span>
                  <span
                    className={`transform ${
                      isDesOpen && "rotate-180"
                    } duration-500 transition-transform`}
                  >
                    <FaAngleDown />
                  </span>
                </button>
                {isDesOpen && (
                  <p
                    className="pb-2 text-sm text-gray-600 duration-300 text-justify"
                    dangerouslySetInnerHTML={{
                      __html: singleProduct.short_desc?.replace(
                        /\r\n/g,
                        "<br />"
                      ),
                    }}
                  />
                )}
              </div>

              {/* Share Options */}
              <p>Share to</p>
              <div className="flex items-center justify-between sm:justify-start gap-8 text-3xl">
                <Link
                  to={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    productUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook />
                </Link>
                <Link
                  to={`https://www.instagram.com/?url=${encodeURIComponent(
                    productUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </Link>
                <Link
                  to={`https://www.reddit.com/submit?url=${encodeURIComponent(
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
                  to={`https://wa.me/?text=${encodeURIComponent(productUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaThreads />
                </Link>
                <Link
                  to={`https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
                    productUrl
                  )}&media=${cloudAPI}/image/${
                    singleProduct.image
                  }&description=${singleProduct?.short_desc}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaPinterest />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Cart Menu  */}
        <div className="right-0 bottom-0 left-0 z-40 fixed flex flex-row justify-between items-center gap-2 sm:hidden bg-gradient-to-t from-gray-50 to-white shadow-lg px-6 py-4 w-full">
          <button
            className="flex-1 bg-default shadow-lg py-2 rounded-full font-medium text-center text-lg text-white"
            onClick={() => {
              setCartMenu(true);
              handleAddToCart(singleProduct.id);
            }}
          >
            অর্ডার করুন
          </button>
          <button
            className="flex justify-center items-center bg-default rounded-full w-12 h-12"
            onClick={() => setCartMenu(true)}
          >
            <FaShoppingCart size={20} className="text-white" />
            <span
              className={`inline-flex top-4 right-5 absolute justify-center items-center bg-sky-400 rounded-full w-5 h-5 font-semibold text-md text-white  ${
                totalQuantity > 0 && "animate-ping"
              }`}
            ></span>
            <span className="top-4 right-5 absolute flex justify-center items-center bg-sky-400 rounded-full w-5 h-5 text-white text-xs">
              {totalQuantity}
            </span>
          </button>
        </div>
      </div>
      <div className="relative pt-20 pb-40 sm:pb-0">
        {/* display related products */}
        <RelatedProducts
          category={singleProduct?.category.name}
          id={singleProduct?.id}
        />
      </div>
      <div className="absolute sm:hidden top-4 left-4 z-50">
        <Link
          to="/"
          className="rounded-full flex items-center justify-center bg-default/50 w-10 h-10"
        >
          <FaHome
            className="text-white bg-default/80 p-1.5 rounded-full opacity-100"
            size={25}
          />
        </Link>
      </div>
    </div>
  ) : (
    <div className="bg-secondary min-h-screen flex items-center justify-center w-full py-20 animate-pulse">
      <div className="container mx-auto px-2 sm:px-5 2xl:px-0">
        <div className="flex sm:flex-row flex-col gap-12">
          <div className="bg-slate-200 rounded hidden sm:block sm:w-1/2"></div>
          <div className="flex-1 space-y-3 sm:w-1/2">
            <div className="bg-slate-200 rounded h-40"></div>
            <div className="space-y-3">
              <div className="gap-4 grid grid-cols-3">
                <div className="col-span-2 bg-slate-200 rounded h-20"></div>
                <div className="col-span-1 bg-slate-200 rounded h-20"></div>
              </div>
              <div className="bg-slate-200 rounded h-40"></div>
              <div className="bg-slate-200 rounded h-40"></div>
              <div className="gap-4 grid grid-cols-3">
                <div className="col-span-2 bg-slate-200 rounded h-20"></div>
                <div className="col-span-1 bg-slate-200 rounded h-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
