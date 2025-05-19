import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TrendingItem from './TrendingItem'
import { ShopContext } from '../../context/ShopContext'
import Title from '../Title'

const TrendingProducts = () => {
    const { products } = useContext(ShopContext)
    const [latestProducts, setLatestProducts] = useState([])

    useEffect(() => {
        setLatestProducts(products.slice(0, 4))
    }, [products])

    const firstCategoryName = latestProducts[0]?.category?.name || ''

    return (
        <div className='lg:mt-10 bg-primary pb-6'>
            <div className='py-8 text-3xl '>
                <div className='text-center'>
                    <Title text1={'Trending'} text2={'Products'} />
                </div>

                <p className='mx-10 sm:mx-auto sm:w-1/2 text-gray-600 text-center text-xs sm:text-sm md:text-base'>
                    🔥 ট্রেন্ডিং পণ্যগুলোর সাথে থাকুন সবসময় এক ধাপ এগিয়ে! <br />
                    সবচেয়ে জনপ্রিয় ও চাহিদাসম্পন্ন আইটেম এখন আপনার হাতের নাগালে। আজই অর্ডার করুন এবং স্টাইলিশ থাকুন প্রতিদিন। ✨
                </p>

                <div className="flex items-center mr-10 mt-4 ml-12 gap-2 text-sm sm:text-base">
                    {firstCategoryName && (
                        <span className='text-gray-700  mr-2'>
                       {firstCategoryName}
                        </span>
                    )}
                    <Link to="/trending-products">
                        <button className="bg-default border border-pink px-6 py-2 rounded hover:bg-default-700 text-white">
                            View All
                        </button>
                    </Link>
                </div>
            </div>

            {/* Trending Products Grid */}
            <div className="gap-2 gap-y-10 lg:gap-4 grid grid-cols-2 lg:grid-cols-4 px-4">
                {
                    latestProducts.map((item, index) => (
                        <TrendingItem key={index} {...item} item={item} index={index} />
                    ))
                }
            </div>
        </div>
    )
}

export default TrendingProducts
