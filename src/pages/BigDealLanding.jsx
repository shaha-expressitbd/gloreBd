import React from 'react'
import CartIcon from '../components/CartIcon'
import BigHero from '../components/big-deal/BigHero'
import DiscountCollections from '../components/big-deal/DiscountCollections'

const BigDealLanding = () => {
  return (
    <div className='relative bg-fifth overflow-x-hidden'>
      <BigHero />
      <div className='my-10 px-3 container mx-auto'>
        <div className=''>
          <h1 className='bg-third sm:text-xl px-2 py-0.5 lg:p-2 rounded w-1/2'>
            "Dress quality excellent - Limited Stock Offer!"
          </h1>
          <ul className='mt-5 space-y-2 pl-3 sm:pl-5 lg:pl-20'>
            {[
              'Cash on delivery',
              'Easy return policy',
              'Premium quality products',
              'Fast and reliable delivery within 1-3 days'
            ].map((item, index) => (
              <li key={index} className='flex items-center gap-2'>
                <span className='w-6 h-6 bg-second text-white rounded-full flex items-center justify-center text-sm'>
                  ✔
                </span>
                <span className='capitalize'>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <DiscountCollections />
      <CartIcon bg='bg-fourth' />
    </div>
  )
}
export default BigDealLanding
