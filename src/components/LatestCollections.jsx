import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollections = () => {
  const { products } = useContext(ShopContext)
  const [latestProducts, setLatestProducts] = useState([])

  const fetchCategoryProduct = () => {
    const firstCategoryName = products.filter(item => {
      return item.category?.name.toLowerCase() === 'indian dress'
    })
    setLatestProducts(firstCategoryName.slice(0, 20))
  }

  useEffect(() => {
    fetchCategoryProduct()
  }, [products])

  return (
    <div className='pb-10 lg:pt-10 lg:pb-20 min-h-screen bg-secondary'>
      <div className='container mx-auto'>
        <div className='py-8 text-3xl text-center'>
          <Title text1={'LATEST'} text2={'COLLECTIONS'} />
          <p className='mx-10 sm:mx-auto sm:w-1/2 text-gray-600 text-xs sm:text-sm md:text-base'>
            ✨ নতুন স্টাইলে জ্বলে উঠুন! ✨<br /> ট্রেন্ডিং পণ্যগুলোর সাথে থাকুন
            সবসময় এক ধাপ এগিয়ে! আপনার ফ্যাশন, আপনার পরিচয়{' '}
            <span className='text-default'>GloreBD</span> এর সাথে।❤️
          </p>
        </div>

        {/* Rendering Products  */}
        <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-5 px-3'>
          {latestProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item.id}
              name={item.name}
              product={item}
            />
          ))}
        </div>
      </div>{' '}
    </div>
  )
}

export default LatestCollections
