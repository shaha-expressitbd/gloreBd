import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const OrderButton = ({ addToCart }) => {
  const { setCartMenu } = useContext(ShopContext)
  return (
    <button
      onClick={() => {
        addToCart();
        setCartMenu(true)
      }}
      className='font-semibold text-sm bg-default px-1.5 py-1 sm:px-4 rounded sm:py-2'
    >
      <span className='text-white'>অর্ডার করুন</span>
    </button>
  )
}

export default OrderButton
