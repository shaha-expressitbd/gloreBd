import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { FaShoppingCart } from 'react-icons/fa'

const CartIcon = ({bg}) => {
  const { setCartMenu, totalQuantity } = useContext(ShopContext)
  return (
    <div className='fixed top-1/2 transform -translate-y-1/2 right-6 z-50 sm:hidden'>
      <button
        onClick={() => setCartMenu(true)}
        className='bottom-0 left-1/2 absolute flex justify-center items-center  bg-white shadow-lg hover:shadow-xl rounded-xl h-10 w-10 transform transition -translate-x-1/2 duration-300 ease-in-out'
      >
        <FaShoppingCart size={20} />
        <span
          className={`inline-flex -top-1 right-0 absolute justify-center items-center rounded-full w-4 h-4 font-semibold text-md text-white ${bg} ${
            totalQuantity > 0 && 'animate-ping'
          }`}
        ></span>
        <span
          className={`-top-1 right-0 absolute flex justify-center items-center rounded-full w-4 h-4 text-white text-xs ${bg}`}
        >
          {totalQuantity}
        </span>
      </button>
    </div>
  )
}

export default CartIcon
