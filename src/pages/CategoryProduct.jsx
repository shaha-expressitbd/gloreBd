import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { assets } from "../assets/assets";

const CategoryProduct = () => {
  const { subCategoryId } = useParams();
  const { products, categories } = useContext(ShopContext);
  console.log(products);
  console.log(
    products.map((product) => product.subCategoryId === subCategoryId)
  );
  const [related, setRelated] = useState([]);
  console.log(related);
  const [subName, setSubName] = useState("");

  useEffect(() => {
    if (!subCategoryId) return;

    // filter products by sub-category
    const filtered = products.filter((p) =>
      p.sub_category?.some((sc) => sc._id === subCategoryId)
    );
    setRelated(filtered);

    // find the sub-category name
    const allSubs = categories.reduce((acc, cat) => {
      if (cat.children) acc.push(...cat.children);
      return acc;
    }, []);
    const found = allSubs.find((sc) => sc._id === subCategoryId);
    setSubName(found ? found.name : "");
  }, [products, categories, subCategoryId]);
  console.log(related);
  return (
    <div className="py-5 sm:py-10 xl:py-20 px-3 lg:px-0 container mx-auto">
      <Link to="/">
        <img src={assets.logo} className="w-24 sm:hidden" alt="Logo" />
      </Link>

      <div className="py-2 text-3xl text-center">
        <Title text1="" text2={subName} />
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

export default CategoryProduct;
