import React, { useContext, useState, useMemo, useCallback } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { addToCart } from '../stores/cart'
import { useDispatch } from 'react-redux'
import OrderButton from './OrderButton'
import ProductImage from './ProductImage'

const ProductItem = React.memo(({ id, name, product }) => {
  const { loading, currency, cloudAPI, setCartMenu } = useContext(ShopContext)

  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

  // Memoize slug so it won't recalc each render
  const slug = useMemo(() => {
    return name
      .trim()
      .toLowerCase()
      .replace(/[^ঀ-৿a-zA-Z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .concat(`-${id}`)
  }, [name, id])

  // Stable callback so it doesn’t change each render
  const handleAddToCart = useCallback(() => {
    setCartMenu(true)
    dispatch(addToCart({ productId: id, quantity: 1 }))
  }, [dispatch, id, setCartMenu])

  const imageUrl = `${cloudAPI}/image/${product.image}`

  if (loading) {
    return (
      <div className='px-4 py-5 rounded animate-pulse w-full shadow'>
        <div className='bg-slate-200 p-4 rounded h-[200px]'></div>
        <div className='flex-1 mt-3 py-1'>
          <div className='space-y-5'>
            <div className='bg-slate-200 rounded h-2'></div>
            <div className='bg-slate-200 rounded h-2'></div>
            <div className='bg-slate-200 rounded h-2'></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='shadow-sm w-full mx-auto bg-white relative rounded-lg overflow-hidden h-full flex flex-col'>
      <div className='relative overflow-hidden'>
        <Link to={`/singleproduct/${slug}`}>
          <ProductImage
            src={imageUrl}
            alt={name}
            isLoading={isLoading}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        </Link>

        {product.discount_percent > 0 && (
          <div className='bg-white rounded-full inline-flex text-xs sm:text-base px-1 sm:px-2 py-0.5 absolute top-1 right-1 sm:top-2 sm:right-2'>
            Save: {product.discount_percent}%
          </div>
        )}
      </div>

      <div className='flex flex-col flex-grow'>
        <p className='lg:font-bold p-2 lg:px-3 text-nowrap truncate'>{name}</p>

        <div
          className={`flex justify-between items-center mx-auto px-2 lg:px-3 pb-3 mt-auto w-full ${
            !product.discount_amount && 'items-center'
          }`}
        >
          <OrderButton addToCart={handleAddToCart} />
          <div className='text-right font-semibold'>
            {product.discount_amount ? (
              <div>
                <div className='relative text-center'>
                  <div className='text-gray-500 text-xs'>
                    {currency} {product.price}
                  </div>
                  <span className='absolute inset-0 w-full h-[2px] bg-default transform rotate-[-10deg] top-1/2 -translate-y-1/2 left-[0.25px]'></span>
                </div>
                <p className='text-right font-semibold text-default'>
                  {currency}
                  {product.price - product.discount_amount}
                </p>
              </div>
            ) : (
              <p className='text-default'>
                {currency}
                {product.price}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})

export default ProductItem
