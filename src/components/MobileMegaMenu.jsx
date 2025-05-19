import React, { useContext, useEffect, useRef } from 'react'
import { FaTimes } from 'react-icons/fa'
import { ShopContext } from '../context/ShopContext'
import { Link, useNavigate } from 'react-router-dom'

const MobileMegaMenu = () => {
  const navigate = useNavigate()
  const { mobileMenu, setMobileMenu, categories } = useContext(ShopContext)
  const menuRef = useRef(null)

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenu(false)
      }
    }

    if (mobileMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [mobileMenu, setMobileMenu])

  const routeChange = productId => {
    setMobileMenu(false)
    navigate(`/category-product/${productId}`)
  }
  return (
    <div className='px-4 py-10 space-y-5 h-full bg-white'>
      {/* Header */}
      <div className='flex justify-between items-center shrink-0'>
        <div>
          <span className='font-bold text-xl text-default'>Categories</span>
        </div>
        <button onClick={() => setMobileMenu(false)}>
          <FaTimes />
        </button>
      </div>

      {/* Scrollable Menu */}
      <div className='flex-1 overflow-y-auto text-sm text-black text-left'>
        {categories.map((item, index) => (
          <button
            key={index}
            onClick={() => routeChange(item.id)}
            className='py-2 border-b block w-full border-primary cursor-pointer hover:text-default duration-300 ease-in-out text-left font-medium capitalize'
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default MobileMegaMenu
