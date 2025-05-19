import React from 'react'
// Swiper JS
// import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom'
// import { Pagination } from 'swiper/modules';
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='bg-primary px-4 md:px-8 py-8 sm:py-20 xl:p-20'>
      <div
        className='mySwiper w-full '
        // spaceBetween={30}
        // effect={'fade'}
        // pagination={true} modules={[Pagination]}
      >
        <div className='bg-secondary rounded-3xl w-full relative overflow-hidden'>
          <div className='grid grid-cols-12 gap-4'>
            {/* Left Side (Text and Button) */}
            <div className='col-span-7 flex flex-col justify-center items-center text-center'>
              {/* Logo for smaller screens */}
              <div className='md:hidden block w-32 m-2'>
                <img src={assets.logo} alt='logo' />
              </div>

              {/* Heading and Paragraph */}
              <div className='space-y-4 pt-5 md:pt-10'>
                <h1 className='text-3xl lg:text-6xl font-bold leading-tight lg:leading-normal'>
                  <span>নতুন</span> <br />
                  <span className='text-default'>কালেকশন</span>
                </h1>
                <p className='text-sm md:text-lg md:leading-relaxed'>
                  ✨ <span className='text-default'>GloreBD</span> - এর সাথে
                  ফ্যাশনে পা রাখুন নতুন দিগন্তে! ❤️
                  <span className='hidden sm:block'>
                    আমাদের এক্সক্লুসিভ নতুন কালেকশন এখন উপলব্ধ! <br />
                    আপনার প্রিয় ফ্যাশন স্টাইল খুঁজে নিন আর নিজেকে সাজান
                    অনন্যভাবে। ❤️
                  </span>
                </p>
              </div>

              {/* Button Section */}
              <div className='pt-2 pb-5 md:py-5 lg:py-10'>
                <Link
                  to='/collections'
                  className='inline-block bg-default px-3 py-2 md:px-10 md:py-3.5 rounded-xl font-bold text-sm md:text-base text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg'
                >
                  অর্ডার করুন
                </Link>
              </div>
            </div>

            {/* Right Side (Image) */}
            <div className='col-span-5 flex justify-center'>
              <img
                src={assets.hero}
                alt='GloreBD'
                className='pt-5 md:w-[450px] rounded-lg'
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="z-20 absolute inset-0 flex flex-row-reverse justify-center items-center py-10 w-full h-full translate-y-1/2">
                <div className='text-[#414141]'>
                    <div className='flex items-center gap-2'>
                        <span className='bg-[#414141] w-8 md:w-11 h-[2px]'></span>
                        <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
                    </div>
                    <h1 className='sm:py-3 font-prata text-3xl lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
                    <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
                        <span className='bg-[#414141] w-8 md:w-11 h-[1px]'></span>
                    </div>
                </div>
            </div> */}
      {/* Hero right side */}
      {/* absolute inset-0 bg-center  */}
      {/* <div>
                <img className='lg:rounded-xl w-full h-full' src={heroImage} alt="glore image" />
            </div> */}
    </div>
  )
}

export default Hero
