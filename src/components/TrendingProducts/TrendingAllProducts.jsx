import React, { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { addToCart } from '../../stores/cart';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const TrendingAllProducts = () => {
  const { products, cloudAPI } = useContext(ShopContext);
  const dispatch = useDispatch();

  const handleAddToCart = (id) => {
    const data = { productId: id, quantity: 1 };
    dispatch(addToCart(data));
    toast.success('Product Added to Cart Successfully!');
  }

  return (
    <div className="py-10 px-4 bg-[#fff6f7] min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-10">🛒 All Trending Products</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4  gap-4 gap-y-10">
        {
          products.map((item, index) => (

            <div key={index} className="bg-[#ffecf0]   rounded-lg shadow-md p-4 text-center">
              <Link to={`/singleproduct/${item.id}`}>
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={`${cloudAPI}/image/${item.image}`}
                    alt={item.name}
                    className="w-full mb-2 mx-auto rounded-xl transform transition-transform duration-500 hover:scale-110"
                  />
                </div>
              </Link>

              <div className=" ">
                <h2 className="text-base font-semibold mb-3 text-gray-800 hover:text-green-700 text-start">{item.name}</h2>

                <div className=' flex justify-between items-center gap-2 mb-2'>
                  <p className="text-sm text-gray-500 mt-1">
                    ক্যাটাগরি: <span className="font-medium text-gray-700">{item.category?.name}</span>
                  </p>



                  <p className="text-sm text-green-600">
                    স্টকে আছে: <span className="font-semibold">{item.stock}</span>
                  </p>

                </div>
                <div className=' flex justify-between items-center gap-2'>

                  <p className="text-lg font-bold text-default-600 mt-2">
                    ৳ {item.price}
                  </p>
                  <button
                    onClick={() => handleAddToCart(item.id)}
                    className='font-semibold text-sm bg-default px-1.5 py-1 sm:px-4 rounded sm:py-2 bg-gradient-to-r from-pink-500 via-red-400 to-pink-600 hover:opacity-90'
                  >
                    <span className='text-white'>অর্ডার করুন</span>
                  </button>
                </div>
              </div>



            </div>

          ))
        }
      </div>
    </div>
  )
}

export default TrendingAllProducts;
