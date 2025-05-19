import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const CartTotal = ({ deliveryCharge }) => {

    const { currency, totalAmount } = useContext(ShopContext);

    return (
        <div className='w-full'>
            <div className='flex flex-col gap-1 sm:gap-2 sm:mt-2 text-sm'>
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>{currency} {totalAmount}</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <p>Delivery Charge</p>
                    <p>{currency} {deliveryCharge}</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <p><b>Total</b></p>
                    <p className='font-bold'>{currency} {totalAmount == 0 ? 0 : (totalAmount + Number(deliveryCharge))}</p>
                </div>
            </div>
        </div>
    )
}

export default CartTotal