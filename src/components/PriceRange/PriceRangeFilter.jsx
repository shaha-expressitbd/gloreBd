import React, { useState, useEffect } from 'react'

const PriceRangeFilter = ({
  min,
  max,
  onRangeChange,
  currency,
  minDifference
}) => {
  const [value, setValue] = useState([min, max])

  useEffect(() => {
    setValue([min, max])
  }, [min, max])

  const handleChange = e => {
    const newValue = parseInt(e.target.value, 10)
    setValue(prev => {
      const updated = [...prev]
      if (e.target.name === 'min') {
        updated[0] = Math.min(newValue, updated[1] - minDifference)
      }
      if (e.target.name === 'max') {
        updated[1] = Math.max(newValue, updated[0] + minDifference)
      }
      return updated
    })
  }

  useEffect(() => {
    if (onRangeChange) {
      onRangeChange(value)
    }
  }, [value, onRangeChange])

  const calculatePercentage = val => ((val - min) / (max - min)) * 100

  return (
    <div className='flex flex-col gap-2'>
      <div className='relative w-full h-[6px] bg-gray-300 rounded'>
        <div className='absolute w-full h-[6px] bg-gray-300 rounded' />
        <div
          className='absolute h-[6px] bg-pink-500 rounded z-[1]'
          style={{
            left: `${calculatePercentage(value[0])}%`,
            right: `${100 - calculatePercentage(value[1])}%`
          }}
        />
        <input
          type='range'
          name='min'
          id='min'
          min={min}
          max={max}
          value={value[0]}
          onChange={handleChange}
          className='slider-thumb absolute w-full h-2.5 bg-transparent appearance-none pointer-events-none z-[2] cursor-pointer'
        />
        <input
          type='range'
          name='max'
          id='max'
          min={min}
          max={max}
          value={value[1]}
          onChange={handleChange}
          className='slider-thumb absolute w-full h-2.5 bg-transparent appearance-none pointer-events-none z-[2] cursor-pointer'
        />
      </div>
      <div className='flex justify-between text-sm text-gray-700'>
        <span>
          Min: {currency}
          {value[0]}
        </span>
        <span>
          Max: {currency}
          {value[1]}
        </span>
      </div>

      <style jsx='true'>{`
        input.slider-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          background-color: #fff;
          border: 4px solid #ec4899; /* Tailwind pink-500 */
          height: 16px;
          width: 16px;
          border-radius: 9999px;
          pointer-events: all;
          cursor: pointer;
          margin-top: -6px;
        }

        input.slider-thumb::-moz-range-thumb {
          background-color: #fff;
          border: 4px solid #ec4899;
          height: 16px;
          width: 16px;
          border-radius: 9999px;
          pointer-events: all;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

export default PriceRangeFilter
