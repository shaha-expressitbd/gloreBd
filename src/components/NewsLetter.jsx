import React from 'react'

const NewsLetter = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

    return (
        <></>
        // <div className='pb-10 text-center px-2'>
        //     <p className='font-medium text-2xl text-black'>Subscribe now & get 20% off</p>
        //     <p className="mt-3 text-gray-400">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse, velit?</p>
        //     <form onSubmit={onSubmitHandler} action="" className='flex items-center gap-3 mx-auto my-6 pl-3 border w-full sm:w-1/2'>
        //         <input className='sm:flex-1 w-full outline-none' type="email" name="email" id="email" placeholder='Enter Your Email...' required />
        //         <button className='bg-black px-10 py-4 text-white text-xs'>SUBSCRIBE</button>
        //     </form>
        // </div>
    )
}

export default NewsLetter