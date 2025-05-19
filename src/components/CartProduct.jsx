import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'

const CartProduct = () => {
  const {
    currency,
    cartProducts,
    handleRemoveFromCart,
    quantityIncrement,
    quantityDecrement,
    cloudAPI
  } = useContext(ShopContext)

  return (
    <div className=''>
      <div className='flex justify-between items-center p-3 cursor-pointer bg-default rounded'>
        <p className='text-white'>Shopping Items</p>
      </div>
      {cartProducts?.map((item, index) => (
        <div
          key={index}
          className='py-4 gap-2 border-b flex flex-row justify-between'
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
                    {Number(item?.price) - Number(item?.discount_amount)}
                  </p>
                ) : (
                  <p className='text-default'>
                    {currency} {Number(item?.price)}
                  </p>
                )}
              </div>
              <p>x</p>
              <div className='flex items-center justify-between border rounded-s-lg rounded-r-lg gap-1 px-1 min-w-20'>
                <button
                  className='px-0.5'
                  type='button'
                  onClick={() => quantityDecrement(item)}
                >
                  <FaMinus size={10} />
                </button>
                <p className='bg-gray-100 px-2 py-1'>{item.quantity}</p>
                <button
                  className='px-0.5'
                  type='button'
                  onClick={() => quantityIncrement(item)}
                >
                  <FaPlus size={10} />
                </button>
              </div>
            </div>
            <div className='flex justify-between items-center pt-2'>
              <p className='text-default text-xl'>
                = <span>{currency}</span>{' '}
                {(item.discount_amount
                  ? item.price - item.discount_amount
                  : item?.price) * item?.quantity}
              </p>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className='text-red-600'
              >
                <RiDeleteBin6Line size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CartProduct
