import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { useNavigate } from 'react-router-dom'
import CartProduct from '../components/CartProduct'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'

const Checkout = () => {
  const navigate = useNavigate()

  // delivery_fee_Inside,
  // delivery_fee_Outside,
  const {
    discountAmount,
    totalAmount,
    clearAllCart,
    cartItems,
    totalQuantity
  } = useContext(ShopContext)

  // Bangla Convert Code
  // const toBn = number => {
  //   return number.toString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d])
  // }

  const [method, setMethod] = useState('cod')

  const [deliveryCharge, setDeliveryCharge] = useState(0)

  const productIDs = cartItems.map(item => item.productId)
  const productQty = cartItems.map(item => item.quantity)

  const productPostApi = 'https://admin.ezicalc.com/api/public/order/create'

  // ------------------validation---------------
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    deliveryCharge: '',
    address: '',
    note: ''
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [errors])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const validateForm = data => {
    const errors = {}

    if (!data.name) {
      errors.name = 'আপনার নাম দিন'
    } else if (data.name.length < 3) {
      errors.name = 'সর্বনিম্ন ৩ অক্ষরের নাম দিন'
    }

    let validPhone = /^(\+8801|01)[3-9]\d{8}$/

    if (!data.phone) {
      errors.phone = 'আপনার ফোন নাম্বার দিন'
    } else if (!validPhone.test(data.phone)) {
      errors.phone = 'আপনার সঠিক ১১ সংখ্যার ফোন নাম্বার দিন'
    }
    if (deliveryCharge == 0) {
      errors.deliveryCharge = 'আপনার ডেলিভারি ঠিকানা দিন'
    }
    if (!data.address) {
      errors.address = 'আপনার ঠিকানা দিন'
    }

    return errors
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (totalQuantity == 0) {
      navigate('/collections')
      return
    }

    // 1) validate using your formData
    const newErrors = validateForm(formData)
    setErrors(newErrors)

    // 2) compute a boolean “isValid”
    const isValid = Object.keys(newErrors).length === 0

    // 3) only proceed if no validation errors AND deliveryCharge > 0
    if (!isValid || deliveryCharge <= 0) return

    // 4) build your payload from state
    const { name, phone, address, note } = formData
    const formPostData = {
      client_id: 6,
      business_id: 9,
      product_ids: productIDs.join(','),
      s_product_qty: productQty.join(','),
      name,
      phone,
      address,
      item_total: Number(totalAmount),
      delivery_charge: Number(deliveryCharge),
      cod_amount: Number(totalAmount) + Number(deliveryCharge),
      discount_amount: Number(discountAmount),
      note
    }

    // console.log('Form values:', formPostData)
    // // if you want a table-style view:
    // console.table(formPostData)
    // // or a pretty JSON dump:
    // console.log(JSON.stringify(formPostData, null, 2))

    // 5) post it
    try {
      const response = await axios.post(productPostApi, formPostData)
      const orderId = response.data?.data?.id
      if (orderId) {
        navigate(`/thankyou/${orderId}`)
        clearAllCart()
      } else {
        console.error('❌ Order ID is missing from the response')
      }
    } catch (err) {
      console.error('❌ Failed to submit order:', err)
    }
  }

  const handleDeliveryChargeSet = e => {
    console.log(e)
    if (e == 1) {
      setDeliveryCharge(80)
    }
    if (e == 2) {
      setDeliveryCharge(150)
    }
  }

  // useEffect(() => {
  //   if (totalQuantity == 0) {
  //     navigate('/')
  //   }
  // }, [totalQuantity])

  return (
    <div
      className='mx-auto px-2 lg:px-0 container relative min-h-screen'
      id='top'
    >
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col-reverse sm:flex-row justify-between gap-10 lg:py-10'>
          {/* Left Side  */}
          <div className='sm:w-1/2 shadow p-5 mb-52 sm:mb-0 bg-white rounded-md'>
            <CartProduct />
          </div>

          {/* Right Side */}
          <div className='flex flex-col gap-5 bg-white sm:w-1/2 shadow p-6 sm:mt-0 mt-5 rounded-md'>
            {/* Delivery Info Title */}
            <div>
              <Title text1='DELIVERY' text2='INFORMATION' />
              <p className='text-xs text-gray-500 mt-1'>
                অর্ডার কনফার্ম করতে আপনার নাম, ঠিকানা, মোবাইল নাম্বার লিখে
                অর্ডার কনফার্ম করুন বাটনে ক্লিক করুন
              </p>
            </div>

            {/* Name */}
            <div>
              <label htmlFor='name' className='block mb-1 text-sm font-bold'>
                আপনার নাম*
              </label>
              <input
                className={`w-full px-4 py-2 text-gray-700 bg-white rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink focus:border-transparent transition duration-200 ${
                  errors.name ? 'border-red-500' : 'border-secondary'
                }`}
                type='text'
                name='name'
                id='name'
                placeholder='Enter Full Name'
                onChange={handleChange}
              />
              {errors.name && (
                <p className='mt-2 text-sm text-red-600'>{errors.name}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor='phone' className='block mb-1 text-sm font-bold'>
                আপনার ফোন নাম্বার*
              </label>
              <input
                className={`w-full px-4 py-2 text-gray-700 bg-white rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink focus:border-transparent transition duration-200 ${
                  errors.phone ? 'border-red-500' : 'border-secondary'
                }`}
                type='number'
                min='0'
                name='phone'
                id='phone'
                placeholder='Enter Contact Number'
                onChange={handleChange}
              />
              {errors.phone && (
                <p className='mt-2 text-sm text-red-600'>{errors.phone}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label htmlFor='address' className='block mb-1 text-sm font-bold'>
                আপনার ডেলিভারি ঠিকানা দিন*
              </label>
              <textarea
                className={`w-full px-4 py-2 text-gray-700 bg-white rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink focus:border-transparent transition duration-200 ${
                  errors.address ? 'border-red-500' : 'border-secondary'
                }`}
                name='address'
                placeholder='Enter Delivery Address'
                onChange={handleChange}
              />
              {errors.address && (
                <p className='mt-1 text-sm text-red-600'>{errors.address}</p>
              )}
            </div>

            {/* Delivery Area */}
            <div>
              <label
                htmlFor='deliveryCharge'
                className='block mb-1 text-sm font-bold'
              >
                ডেলিভারি এলাকা*
              </label>
              <select
                onChange={e => handleDeliveryChargeSet(e.target.value)}
                defaultValue=''
                name='deliveryCharge'
                id='deliveryCharge'
                className={`w-full p-2.5 rounded text-sm border focus:outline-none focus:ring-2 focus:ring-pink focus:border-pink ${
                  errors.deliveryCharge ? 'border-red-500' : 'border-secondary'
                }`}
              >
                <option value='0'>Select Delivery Area</option>
                <option value='1'>
                  {/* ঢাকার ভিতরে ৳{toBn(delivery_fee_Inside)} */}
                  ঢাকার ভিতরে ৳ ৮০
                </option>
                <option value='2'>ঢাকার বাইরে ৳ ১৫০</option>
              </select>
              {errors.deliveryCharge && (
                <p className='mt-2 text-sm text-red-600'>
                  {errors.deliveryCharge}
                </p>
              )}
            </div>

            {/* Note */}
            <div>
              <label htmlFor='note' className='block mb-1 text-sm font-bold'>
                গ্রাহক নোট (optional)
              </label>
              <input
                className={`w-full px-4 py-2 text-gray-700 bg-white rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink focus:border-transparent transition duration-200 ${
                  errors?.note ? 'border-red-500' : 'border-secondary'
                }`}
                type='text'
                name='note'
                id='note'
                placeholder='Enter Your Note'
                onChange={handleChange}
              />
              {errors.note && (
                <p className='mt-2 text-sm text-red-600'>{errors.note}</p>
              )}
            </div>

            {/* Payment Method */}
            <div className='sm:flex justify-between items-center'>
              <p className='mb-2 text-sm font-semibold'>Payment Method</p>
              <div className='flex flex-col sm:flex-row gap-3'>
                <div
                  onClick={() => setMethod('cod')}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                    method === 'cod'
                      ? 'border-secondary'
                      : 'border-gray-300 hover:border-secondary'
                  }`}
                >
                  <span className='w-5 h-5 border-2 rounded-full flex items-center justify-center'>
                    {method === 'cod' && (
                      <span className='w-2.5 h-2.5 bg-green-500 rounded-full'></span>
                    )}
                  </span>
                  <span className='text-sm font-medium text-gray-700'>
                    Cash on Delivery
                  </span>
                </div>
              </div>
            </div>

            {/* Cart Totals */}
            <div className='sm:block hidden'>
              <Title text1='CART' text2='TOTALS' />
              <CartTotal deliveryCharge={deliveryCharge} />
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='bg-default w-full mt-2 text-white text-sm px-8 py-3 rounded hidden sm:block hover:bg-[#9F2B68]'
            >
              অর্ডারটি নিশ্চিত করুন
            </button>
          </div>
        </div>
        {/* Footer Cart Menu  */}
        <div className='right-0 bottom-0 left-0 z-40 fixed sm:hidden bg-gradient-to-t border-gray-100 border-t-2 from-gray-50 to-white shadow-lg px-6 pt-2 pb-4 w-full'>
          <div className='pb-3'>
            <h2 className='text-lg font-semibold'>Cart Total</h2>
            <CartTotal deliveryCharge={deliveryCharge} />
          </div>
          <button className='w-full bg-default shadow-lg py-2 rounded-full font-medium text-center text-lg text-white hover:bg-[#9F2B68] '>
            অর্ডারটি নিশ্চিত করুন
          </button>
        </div>
      </form>
    </div>
  )
}

export default Checkout
