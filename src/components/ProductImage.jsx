import React, { memo } from "react";

const ProductImage = memo(function ProductImage({
  src,
  alt,
  isLoading,
  onLoad,
  onError,
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={onLoad}
      onError={onError}
      className={`w-full min-h-80 lg:min-h-96 xl:min-h-[28rem] object-cover transition-transform duration-500 ease-in-out sm:hover:scale-125 rounded ${
        isLoading ? "animate-pulse bg-gray-300" : ""
      }`}
    />
  );
});

export default ProductImage;
