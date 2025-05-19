import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import LatestCollections from "../components/LatestCollections";
import OurPolicy from "../components/OurPolicy";
import NewsLetter from "../components/NewsLetter";
import CartIcon from "../components/CartIcon";
// import { useNavigate } from 'react-router-dom'
// import Cookies from 'js-cookie'

const Home = () => {
  // const navigate = useNavigate()
  // const [loading, setLoading] = useState(true) // Track loading state

  // useEffect(() => {
  //   const visited = Cookies.get('visited')

  //   if (!visited) {
  //     Cookies.set('visited', 'true', {
  //       sameSite: 'Lax',
  //       secure: true,
  //       expires: 7
  //     })

  //     navigate('/big-deal')
  //   } else {
  //     setLoading(false)
  //   }
  // }, [navigate])

  // if (loading) {
  //   return (
  //     <div className='bg-secondary min-h-screen flex items-center justify-center w-full py-20 animate-pulse'>
  //       <div className='container mx-auto px-2 sm:px-5 2xl:px-0'>
  //         <div className='flex sm:flex-row flex-col gap-12'>
  //           <div className='bg-slate-200 rounded hidden sm:block sm:w-1/2'></div>
  //           <div className='flex-1 space-y-3 sm:w-1/2'>
  //             <div className='bg-slate-200 rounded h-40'></div>
  //             <div className='space-y-3'>
  //               <div className='gap-4 grid grid-cols-3'>
  //                 <div className='col-span-2 bg-slate-200 rounded h-20'></div>
  //                 <div className='col-span-1 bg-slate-200 rounded h-20'></div>
  //               </div>
  //               <div className='bg-slate-200 rounded h-40'></div>
  //               <div className='bg-slate-200 rounded h-40'></div>
  //               <div className='gap-4 grid grid-cols-3'>
  //                 <div className='col-span-2 bg-slate-200 rounded h-20'></div>
  //                 <div className='col-span-1 bg-slate-200 rounded h-20'></div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }
  return (
    <div className="relative">
      <Hero />
      <LatestCollections />
      <OurPolicy />
      <NewsLetter />
      <CartIcon bg="bg-sky-400" />
    </div>
  );
};

export default Home;
