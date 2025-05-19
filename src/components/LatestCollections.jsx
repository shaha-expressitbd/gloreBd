// src/components/LatestCollections.jsx
import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollections = () => {
  const { products, categories, isLoading } = useContext(ShopContext);

  if (isLoading) return <p className="text-center py-12">Loading...</p>;

  return (
    <div className="pb-10 lg:pt-10 lg:pb-20 bg-secondary">
      <div className="container mx-auto">
        <div className="py-8 text-3xl text-center">
          <Title text1="LATEST" text2="COLLECTIONS" />
          <p className="mx-10 sm:mx-auto sm:w-1/2 text-gray-600 text-xs sm:text-sm md:text-base">
            ✨ নতুন স্টাইলে জ্বলে উঠুন! ✨
            <br />
            ট্রেন্ডিং পণ্যগুলোর সাথে থাকুন সবসময় এক ধাপ এগিয়ে! আপনার ফ্যাশন,
            আপনার পরিচয় <span className="text-default">GloreBD</span> এর সাথে।❤️
          </p>
        </div>

        {categories.map((cat) => {
          // get this category + its children + grandchildren IDs
          const allIds = [
            cat._id,
            ...(cat.children?.map((c) => c._id) || []),
            ...(cat.children || []).flatMap(
              (c) => c.children?.map((gc) => gc._id) || []
            ),
          ];

          // filter products whose sub_category._id is in allIds
          const items = products
            .filter((p) =>
              p.sub_category?.some((sc) => allIds.includes(sc._id))
            )
            .slice(0, 20);

          if (items.length === 0) return null;

          return (
            <section key={cat._id} className="mb-12">
              <h3 className="text-2xl font-semibold mb-4">{cat.name}</h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-5 px-3">
                {items.map((item) => (
                  <ProductItem
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    image={item.images[0]?.image.secure_url} // pass the image URL
                    product={item}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default LatestCollections;
