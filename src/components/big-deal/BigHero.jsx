import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import TimeCountDown from '../TimeCountdown'
import Countdown from 'react-countdown'

const BigHero = () => {
  return (
    <div className=' bg-gradient-to-tl from-first to-second w-full '>
      <div className='py-8 sm:py-20 relative container mx-auto px-3'>
        <div className='rounded-3xl w-full'>
          <div className='grid grid-cols-12 gap-4'>
            {/* Left Side (Text and Button) */}
            <div className='col-span-8 md:col-span-7 flex flex-col justify-center items-center text-center'>
              <div className='space-y-2 py-5 lg:py-10'>
                <h1 className='text-third text-4xl lg:text-6xl font-bold leading-tight lg:leading-normal'>
                  BIG DEAL
                </h1>
                <p className='text-xl text-white sm:text-2xl font-medium'>
                  Unbelieveable Price Drop***
                </p>
                <p className='text-sm md:text-lg md:leading-relaxed text-white hidden sm:block'>
                  {/* আমাদের সেরা কালেকশনে মেতে উঠুন নতুন ডিসকাউন্ট প্রাইসে! <br />
                আপনার পছন্দ অনুযায়ী এক্সক্লুসিভ আউটফিট খুঁজে পান এবং হয়ে উঠুন
                আইকন। 💖 */}
                  "Limited time offer! Don&apos;t miss out."💖
                </p>
              </div>
              <Countdown
                date={new Date('2025-04-30T23:59:59')}
                renderer={props => <TimeCountDown {...props} />}
              />
              {/* Button Section */}
              <div className='pt-2 pb-5 md:py-5 lg:py-10'>
                <Link
                  to='/singleproduct/women-wedding-party-wear-ghagra-319'
                  className='inline-block bg-fourth px-5 py-2.5 md:px-10 md:py-3.5 rounded-xl font-bold text-sm md:text-base text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg'
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Right Side (Image) */}
        <div className='absolute w-80 sm:w-[450px] lg:w-[550px] top-0 -right-20 sm:-right-10 xl:right-20 xl:top-10 z-40'>
          <img src={assets.hero2} alt='GloreBD' className='object-contain' />
        </div>
      </div>
    </div>
  )
}

export default BigHero
