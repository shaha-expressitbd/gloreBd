import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import Title from '../Title'
import ProductItem from '../ProductItem'
import DiscountProductItem from './DiscountProductItem'

const DiscountCollections = () => {
  const { products } = useContext(ShopContext)

  const [discountProducts, setDiscountProducts] = useState([])

  const fetchDiscountProducts = () => {
    const LatestDiscountProducts = products.filter(item => {
      return item.discount_amount > 0
    })
    setDiscountProducts(LatestDiscountProducts)
  }

  useEffect(() => {
    fetchDiscountProducts()
  }, [products])

  return (
    <div className='pb-28 min-h-screen bg-third'>
      <div className='container mx-auto'>
        <div className='py-8 text-2xl sm:text-3xl text-center'>
          <div className='inline-flex gap-2 items-center mb-3'>
            <p className='text-black'>
              DISCOUNT{' '}
              <span className='text-fourth font-bold sm:font-medium'>COLLECTIONS</span>
            </p>
            <p className='w-8 sm:w-12 h-0.5 bg-fourth'></p>
          </div>
          <p className='mx-10 sm:mx-auto sm:w-1/2 text-gray-800 text-xs sm:text-sm md:text-base'>
            ✨আমাদের সেরা কালেকশনে মেতে উঠুন নতুন ডিসকাউন্ট প্রাইসে! <br />
            <span className='hidden sm:block'>
              আপনার পছন্দ অনুযায়ী এক্সক্লুসিভ আউটফিট খুঁজে পান এবং হয়ে উঠুন আইকন{' '}
              -
            </span>
            <span className='text-fourth'> GloreBD</span> এর সাথে। 💖
          </p>
        </div>

        {/* Rendering Products  */}
        <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-5 px-3'>
          {discountProducts.map((item, index) => (
            <DiscountProductItem
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

export default DiscountCollections
