import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { FaArrowRight, FaMinus, FaPlus } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { assets } from '../assets/assets'

const CartMenu = () => {
  const {
    currency,
    totalAmount,
    totalQuantity,
    cartProducts,
    handleRemoveFromCart,
    quantityIncrement,
    quantityDecrement,
    clearAllCart,
    setCartMenu,
    cloudAPI
  } = useContext(ShopContext)

  const navigate = useNavigate()

  const pageChange = () => {
    if (totalQuantity > 0) {
      setCartMenu(false)
      navigate('/checkout')
    }
  }

  return (
    <div className='flex flex-col min-h-full p-5'>
      {/* Header */}
      <div className='flex justify-between items-center gap-3 p-3 cursor-pointer bg-gray-200 rounded mb-3 border border-b'>
        <p>Shopping Cart</p>
        <img
          onClick={() => setCartMenu(false)}
          src={assets.cross_icon}
          className='h-4'
          alt='Shopping Cart'
        />
      </div>

      {/* Cart Items Scrollable Area */}
      <div className='overflow-y-scroll h-[calc(100vh-250px)] sm:min-h-screen sm:pb-52'>
        {cartProducts?.map((item, index) => (
          <div
            key={index}
            className='py-4 gap-5 border-b flex flex-row justify-between'
          >
            <div className='w-1/3'>
              <img
                src={`${cloudAPI}/image/${item.image}`}
                className='w-[100px] h-[120px] rounded'
                alt={item.name}
              />
            </div>
            <div className='text-black w-2/3'>
              <p className='font-medium text-default mb-2'>{item.name}</p>
              <div className='flex justify-between items-center'>
                <div>
                  {item.discount_amount ? (
                    <p className='text-default mt-1'>
                      {currency}{' '}
                      {Number(item.price) - Number(item.discount_amount)}
                    </p>
                  ) : (
                    <p className='text-default'>
                      {currency} {Number(item.price)}
                    </p>
                  )}
                </div>
                <p>x</p>
                <div className='flex items-center justify-between border rounded gap-1 px-1 min-w-20'>
                  <button
                    className='px-0.5'
                    type='button'
                    onClick={() => quantityDecrement(item)}
                  >
                    <FaMinus size={10} />
                  </button>
                  <p className='bg-gray-100 px-2 py-1 w-full text-center'>
                    {item.quantity}
                  </p>
                  <button
                    className='px-0.5'
                    type='button'
                    onClick={() => quantityIncrement(item)}
                  >
                    <FaPlus size={10} />
                  </button>
                </div>
              </div>
              <div className='flex justify-between items-center mt-2'>
                <p className='text-default'>
                  <span>{currency}</span>{' '}
                  {(item.discount_amount
                    ? Number(item.price) - Number(item.discount_amount)
                    : Number(item.price)) * Number(item.quantity)}
                </p>
                <button onClick={() => handleRemoveFromCart(item.id)}>
                  <RiDeleteBin6Line size={20} className='text-red-600' />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className='absolute left-0 right-0 bottom-0 px-5 pb-5 pt-3 bg-white border border-t'>
        <div className='flex items-center justify-between mb-2'>
          <p className='text-lg font-semibold'>Subtotal:</p>
          <p className='text-lg font-semibold'>৳{totalAmount}</p>
        </div>
        <div className='flex justify-between items-center gap-5'>
          <button
            onClick={() => {
              clearAllCart()
              setCartMenu(false)
            }}
            className='bg-gray-300 py-2 rounded text-black w-full text-center'
          >
            Clear All
          </button>
          <button
            onClick={pageChange}
            disabled={totalQuantity === 0}
            className='flex items-center justify-center gap-2 bg-default py-2 rounded text-white w-full'
          >
            <span>Checkout</span>{' '}
            <FaArrowRight className='animate-pulse disabled:animate-none' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartMenu
