import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import {
  FaFacebook,
  FaFacebookMessenger,
  FaInstagram,
  FaTwitter
} from 'react-icons/fa'

const Footer = () => {
  const d = new Date()
  let year = d.getFullYear()

  return (
    <div className='bg-black footer pb-10 sm:pb-0'>
      <div className='justify-center items-center mx-auto px-2 lg:px-0 p-12 lg:pb-0 text-white container'>
        <div className='grid sm:grid-flow-col grid-flow-row sm:grid-cols-4 justify-between lg:gap-8 space-y-10 lg:space-y-0 pb-10'>
          <div>
            <Link to='/'>
              <img
                src={assets.logoFooter}
                alt='logo'
                className='w-60 md:w-60'
              />
            </Link>
            <p className='leading-loose text-sm pt-5'>
              আমাদের কালেকশন আপনাকে দেবে ফ্যাশনের আধুনিকতা এবং ঐতিহ্যের একটি
              নিখুঁত সংমিশ্রণ।
            </p>
          </div>
          <div>
            <p className='mb-5 font-medium text-xl'>Explore More</p>
            <ul className='flex flex-col gap-1 text-gray-400'>
              <li>
                <Link to='/collections'>New Arrivals</Link>
              </li>
              <li>
                <Link to='/about'>About Us</Link>
              </li>
              <li>
                <Link to='/contact'>Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className='mb-5 font-medium text-xl'>Client Experience</p>
            <ul className='flex flex-col gap-1 text-gray-400'>
              <li>Track Your Order</li>
              <li>Returns & Exchanges</li>
              <li>Customer Reviews</li>
              <li>Privacy Policy</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div>
            <p className='mb-5 font-medium text-xl'>GET IN TOUCH</p>
            <div className='flex flex-col gap-1 mb-5 text-gray-400'>
              <Link
                to='tel:+8801855375963'
                target='_blank'
                className='text-sm text-justify anchor'
              >
                <b>মোবাইল নং:</b> (+88) 01855-375963
              </Link>
              <Link
                to='mailto:hello@glorebd.com'
                target='_blank'
                className='text-sm text-justify anchor'
              >
                <b>ইমেইল:</b> hello@glorebd.com
              </Link>
            </div>
            <div className='flex items-center gap-8 text-3xl'>
              <Link
                target='_Blank'
                to='https://www.facebook.com/people/GLore/61565365121765/'
              >
                <FaFacebook className='anchor' />
              </Link>
              <Link target='_Blank' to='https://www.m.me/EMegaDeal'>
                <FaFacebookMessenger className='anchor' />
              </Link>
              <FaTwitter className='anchor' />
              <FaInstagram className='anchor' />
            </div>
          </div>
        </div>
        <div>
          <hr />
          <p className='py-5 text-center'>
            Copyright - {year} &copy; All right reserved. Designed and Developed
            by{' '}
            <Link
              to='https://expressitbd.net'
              className='text-default'
              target='_Blank'
            >
              ExpressITbd
            </Link>{' '}
            Team
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
