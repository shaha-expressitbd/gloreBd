// src/components/RelatedProducts.jsx
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";

const RelatedProducts = ({ category, id }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const relatedProducts = products
        .filter(
          (item) =>
            // match on sub_category names instead of nonexistent category field
            item.sub_category?.some((sc) => sc.name === category) &&
            // exclude the current product by its _id
            item._id !== id
        )
        .slice(0, 8);
      setRelated(relatedProducts);
    }
  }, [products, category, id]);

  if (related.length === 0) {
    return (
      <div className="text-right">
        <Link
          to="/collections"
          className="font-medium px-4 py-2 rounded-xl text-2xl bg-default text-white"
        >
          Explore All Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="py-2 text-3xl text-center">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-5">
        {related.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            product={item}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
