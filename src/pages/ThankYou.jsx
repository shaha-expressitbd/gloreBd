import React from 'react'
import { FaFacebook, FaInstagram, FaShoppingBag, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const ThankYou = () => {


    return (<div className="flex justify-center items-center h-screen"><div className="bg-white  rounded-lg p-8  w-full text-center">
        <div className="mb-4 md:mb-8 text-5xl flex justify-center text-default">
            <FaShoppingBag />
        </div>
        <h1 className="text-3xl md:text-5xl font-semibold text-gray-800 mb-8">ধন্যবাদ! আপনার অর্ডারটি সম্পন্ন হয়েছে।</h1><p className="text-gray-600 mb-8">আমাদের একজন কাস্টমার কেয়ার এক্সিকিউটিভ খুব শীঘ্রই আপনার সাথে যোগাযোগ করে <br /> অর্ডারটি কনফার্ম করে নিবে। G'lorebd এ অর্ডার করার জন্য&nbsp;অসংখ্য&nbsp;ধন্যবাদ</p><div className="flex justify-center gap-4 mt-6"><Link className="px-6 py-2 rounded-full bg-default text-white font-medium inline-block text-center" to="/collections">Continue Shopping</Link>
            <Link to="/" className="px-6 py-2 rounded-full bg-gray-500 text-white font-medium hover:bg-gray-600 transition">Go Back</Link></div>
        <div className="mt-8">
            <div className="flex items-center justify-center gap-8 text-3xl">
                <Link><FaFacebook className='text-blue-700' /></Link>
                <Link><FaWhatsapp className='text-green-700' /></Link>
                <Link><FaInstagram className='text-default' /></Link>
            </div>
        </div>
    </div>
    </div>
    )
}

export default ThankYou