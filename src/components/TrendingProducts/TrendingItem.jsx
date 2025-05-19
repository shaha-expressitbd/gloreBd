import React, { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ShopContext } from '../../context/ShopContext';
import { addToCart } from '../../stores/cart';

const TrendingItem = ({ id, image, name, price, index }) => {

    const location = useLocation();
    const isCollection = location.pathname === "/collections";

    const { loading, currency, cloudAPI, isMobile } = useContext(ShopContext);

    const dispatch = useDispatch();

    const [imageFly, setimageFly] = useState(false);

    const handleAddToCart = () => {
        setimageFly(false);
        requestAnimationFrame(() => {
            setimageFly(true); // Trigger animation
        });

        const data = { productId: id, quantity: 1 };

        dispatch(addToCart(data));

        if (!isMobile) {
            toast.success('Product Added to Cart Successfully!')
        }
    }


    // Utility function
    const convertToSlug = (title, id) => {
        return title
            .trim()
            .toLowerCase()
            .replace(/[^ঀ-৿a-zA-Z0-9\s-]/g, "") // Remove invalid characters (no special chars like `}`)
            .replace(/\s+/g, "-") // Replace spaces with hyphens
            .replace(/-+/g, "-") // Remove consecutive hyphens
            .concat(`-${id}`); // Add the ID at the end
    };

    const slug = convertToSlug(name, id);

    return !loading ? (
        <div className='shadow-sm w-[90%] mx-auto bg-[#ffecf0] rounded-3xl relative'>
            <img src={`${cloudAPI}/image/${image}`} className={`w-[150px] h-[150px] z-[1000] fixed hidden invisible opacity-0 ${imageFly && (index % 2 == 0 ? 'flying-div mobile-home-flying-div-even' : 'flying-div  mobile-home-flying-div-odd')}`}
                onAnimationEnd={() => setimageFly(false)}
                alt={name} />
            <div className='overflow-hidden relative'>
                <Link to={`/singleproduct/${slug}`}>
                    <img loading="lazy" className={`rounded-t-md sm:hover:scale-125 duration-1000 transition ease-in-out w-[100%] ${isCollection ? 'h-[350px]' : 'h-[350px] sm:h-[450px]'}`} src={`${cloudAPI}/image/${image}`} alt={name} />
                </Link>
            </div>
            <p className="lg:font-bold p-2 lg:px-3">{name}</p>
            <div className='flex items-center justify-between mx-auto px-2 lg:px-3 pb-3'>
                <button onClick={() => handleAddToCart()} className='font-semibold text-sm bg-default px-1.5 py-1 sm:px-4 rounded sm:py-2 bg-gra'>
                    {/* bg-gradient-to-r from-yellow-600 via-green-500 to-sky-400 inline-block text-transparent bg-clip-text */}
                    <span className='text-white'>অর্ডার করুন</span></button>
                <p className='text-right font-semibold text-default'>{currency}{price}</p>
            </div>
        </div>)
        :
        (<div className="border-gray-300 px-4 py-5 border rounded animate-pulse w-full">
            <div className="bg-slate-200 p-4 rounded h-[200px]"></div>
            <div className="flex-1 mt-3 py-1">
                <div className="gap-4 grid grid-cols-3">
                    <div className="col-span-2 bg-slate-200 rounded h-20"></div>
                    <div className="col-span-1 bg-slate-200 rounded h-20"></div>
                </div>
            </div>
        </div>)
}

export default TrendingItem