import React, { useContext, useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

function getLeafSubcategories(node) {
  if (!node.children || node.children.length === 0) {
    return [node];
  }
  return node.children.flatMap((child) => getLeafSubcategories(child));
}

const MobileMegaMenu = () => {
  const navigate = useNavigate();
  const { mobileMenu, setMobileMenu, categories } = useContext(ShopContext);
  const menuRef = useRef(null);

  const [expandedCategory, setExpandedCategory] = useState(null);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileMenu(false);
        setExpandedCategory(null);
      }
    };
    if (mobileMenu) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenu, setMobileMenu]);

  const toggleCategory = (catId) => {
    setExpandedCategory((prev) => (prev === catId ? null : catId));
  };

  const goToSubCategory = (subCatId) => {
    setMobileMenu(false);
    navigate(`/category-product/${subCatId}`);
  };

  return (
    <div ref={menuRef} className="px-4 py-10 space-y-5 h-full bg-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="font-bold text-xl">Categories</span>
        <button onClick={() => setMobileMenu(false)}>
          <FaTimes />
        </button>
      </div>

      {/* Category list */}
      <div className="flex-1 overflow-y-auto text-sm text-black">
        {/* {categories.map((cat) => (
          <div key={cat._id}>
            <button
              onClick={() => toggleCategory(cat._id)}
              className="w-full py-2 border-b border-primary text-left font-medium capitalize hover:text-default"
            >
              {cat.name}
            </button>

            {expandedCategory === cat._id && cat.children && (
              <div className="pl-4 mt-2 space-y-1">
                {cat.children.map((sub) => (
                  <button
                    key={sub._id}
                    onClick={() => goToSubCategory(sub._id)}
                    className="block w-full text-left py-1 hover:text-default"
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))} */}

        {categories.map((cat) => (
          <div key={cat._id}>
            <button
              onClick={() => toggleCategory(cat._id)}
              className="w-full py-2 border-b border-primary text-left font-medium capitalize hover:text-default"
            >
              {cat.name}
            </button>

            {expandedCategory === cat._id && (
              <div className="pl-4 mt-2 space-y-1">
                {getLeafSubcategories(cat).map((leaf) => (
                  <button
                    key={leaf._id}
                    onClick={() => goToSubCategory(leaf._id)}
                    className="block w-full text-left py-1 hover:text-default"
                  >
                    {leaf.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileMegaMenu;
