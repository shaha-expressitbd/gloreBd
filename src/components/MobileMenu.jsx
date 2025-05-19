import React, { useContext } from 'react'
import {
  FaHome
} from 'react-icons/fa'
import { NavLink, useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import {
  RiCustomerService2Line,
  RiShoppingBag2Fill,
  RiTeamLine
} from 'react-icons/ri'
import { HiOutlineMenuAlt1 } from 'react-icons/hi'

const MobileMenu = ({ isProductPage }) => {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isMenu = false
  const isCollection = location.pathname === '/collections'
  const isAbout = location.pathname === '/about'
  const isContact = location.pathname === '/contact'

  const { mobileMenu, setMobileMenu } = useContext(ShopContext)
  return (
    <div
      className={`right-0 bottom-0 left-0 z-50 fixed sm:hidden bg-white shadow-lg border-t w-full  ${
        isProductPage && 'sm:block hidden'
      }`}
    >
      <div className='relative flex justify-between items-center px-5 py-3'>
        <button
          onClick={() => setMobileMenu(true)}
          className='flex flex-col items-center group'
        >
          <HiOutlineMenuAlt1
            className={`group-hover:text-default w-7 h-7 ${
              mobileMenu && 'text-default'
            } transition duration-200 text-center ease-in-out text-black`}
          />{' '}
          <span
            className={`group-hover:text-default ${
              mobileMenu && 'text-default'
            } text-xs text-center transition-all duration-500 ease-in-out text-black`}
          >
            Menu
          </span>
        </button>
        <NavLink
          className='flex flex-col items-center mr-10 group'
          to='/collections'
        >
          <RiShoppingBag2Fill
            className={`group-hover:text-default w-7 h-7 ${
              isCollection && 'text-default'
            } transition duration-200 ease-in-out text-black`}
          />
          <span
            className={`group-hover:text-default ${
              isCollection && 'text-default'
            } text-xs transition-all duration-500 ease-in-out text-black`}
          >
            Shop
          </span>
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center ml-10 group'>
          <RiTeamLine
            className={`group-hover:text-default w-7 h-7 ${
              isAbout && 'text-default'
            }  transition duration-200 ease-in-out text-black`}
          />
          <span
            className={`group-hover:text-default ${
              isAbout && 'text-default'
            } text-xs transition-all duration-500 ease-in-out text-black`}
          >
            About US
          </span>
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center group'>
          <RiCustomerService2Line
            className={`group-hover:text-default w-7 h-7 ${
              isContact && 'text-default'
            } transition duration-200 ease-in-out text-black`}
          />
          <span
            className={`group-hover:text-default text-black ${
              isContact && 'text-default'
            } text-xs transition-all duration-500 ease-in-out text-black`}
          >
            Contact
          </span>
        </NavLink>
        <NavLink
          to='/'
          className='left-1/2 absolute flex justify-center items-center border-2 border-gray-200 bg-gray-100 hover:bg-gray-200 shadow-lg hover:shadow-xl rounded-full w-16 h-16 transform transition -translate-x-1/2 -translate-y-1/2 duration-300 ease-in-out'
        >
          <FaHome
            className={`group-hover:text-default w-7 h-7 ${
              isHome && 'text-default'
            } transition duration-200 ease-in-out text-black`}
          />
          {/* <span
            className={`inline-flex top-0 right-0 absolute justify-center items-center bg-sky-400 rounded-full w-5 h-5 text-center ${
              totalQuantity > 0 && 'animate-ping'
            }`}
          ></span>
          <span className='top-0 right-0 absolute flex justify-center items-center bg-default text-white rounded-full w-5 h-5  text-xs'>
            {totalQuantity}
          </span> */}
        </NavLink>
      </div>
    </div>
  )
}

export default MobileMenu
