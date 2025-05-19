import React from 'react'

// const Completionist = () => <span>Time&apos;s up!</span>

const TimeCountDown = ({ days, hours, minutes, seconds, completed }) => {
  const timeItems = [
    { label: 'Days', value: days },
    { label: 'Hrs', value: hours },
    { label: 'Mins', value: minutes },
    { label: 'Secs', value: seconds }
  ]

  if (completed) {
    // Render a completed state
    return <span>Time&apos;s up!</span>
  }
  return (
    <div className='flex justify-center gap-1 md:gap-2 lg:gap-4'>
      {timeItems.map((item, idx) => (
        <React.Fragment key={item.label}>
          {/* number box */}
          <div className='flex flex-col xl:gap-2'>
            <div className='flex items-center'>
              <span className='w-10 h-10 md:w-14 md:h-14 lg:w-20 lg:h-20 md:text-2xl flex items-center justify-center rounded-xl text-second bg-third'>
                {item.value}
              </span>
            </div>
            <div key={item.label} className='flex-1 text-center'>
              <span className='block text-sm md:text-base text-third'>
                {item.label}
              </span>
            </div>
          </div>

          <div className='pt-1 md:pt-2 lg:pt-5'>
            {/* colon separator */}
            {idx < timeItems.length - 1 && (
              <span className='text-xl md:text-3xl font-bold text-third'>
                :
              </span>
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

export default TimeCountDown
