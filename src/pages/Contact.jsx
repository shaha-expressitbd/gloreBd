import React from 'react'

import NewsLetter from '../components/NewsLetter'
import Title from '../components/Title'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='my-0 sm:py-20 border-t container mx-auto'>
      <div className='text-2xl text-center pt-10 sm:pt-0'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>
      <div className='py-5 sm:flex sm:flex-row gap-16 items-center justify-center'>
        <div className='sm:w-1/2 px-2 sm:px-0 hidden sm:block'>
          <img src={assets.about_img} alt='' />
        </div>
        <div className='relative w-full h-full sm:hidden'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1579.845936009183!2d90.36981035429673!3d23.79872935440741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1013025176f%3A0x9d59fa9abda1c024!2sRASNA%20722%2F3!5e0!3m2!1sen!2sbd!4v1734024615061!5m2!1sen!2sbd'
            width={`100%`}
            height='300'
            allowFullScreen='allow'
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          ></iframe>
        </div>
        <div className='sm:w-1/2 px-2 sm:px-0 py-5 sm:py-0 lg:sticky lg:top-40'>
          <div className='flex flex-col gap-10 sm:gap-2 text-gray-600'>
            <h1 className='text-3xl text-gray-800 mb-2'>Our Store</h1>
            <p className='text-sm text-justify'>
              <b>ঠিকানা: </b> ৭২২/৩ রসনা ভিলা, ৪র্থ তলা বসুন্ধরা লেন, পশ্চিম
              কাজীপাড়া, মিরপুর - 1216
            </p>
            <Link
              to='tel:+8801855375963'
              target='_blank'
              className='text-sm text-justify'
            >
              <b>মোবাইল নং:</b> (+88) 01855-375963
            </Link>
            <Link
              to='mailto:hello@glorebd.com'
              target='_blank'
              className='text-sm text-justify'
            >
              <b>ইমেইল:</b> hello@glorebd.com
            </Link>
          </div>
        </div>
      </div>
      <NewsLetter />
    </div>
  )
}

export default Contact
