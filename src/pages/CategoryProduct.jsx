import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link, useParams } from 'react-router-dom'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import { assets } from '../assets/assets'

const CategoryProduct = () => {
  // const location = useLocation()

  const { categoryId } = useParams() // Extract the slug and ID from the route
  console.log(categoryId)
  const { products } = useContext(ShopContext)

  const [related, setRelated] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      const relatedProducts = products.filter(
        item => item.category_id == categoryId
      )
      setRelated(relatedProducts)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, categoryId])

  return (
    <div className='py-5 sm:py-10 xl:py-20 px-3 lg:px-0 container mx-auto'>
      <Link to='/'>
        <img src={assets.logo} className='w-24 sm:hidden' alt='Logo' />
      </Link>
      <div className='py-2 text-3xl text-center'>
        <Title text1={''} text2={related[0]?.category?.name} />
      </div>
      <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-5'>
        {related.map((item, index) => (
          //   <RelatedProductItems
          //     key={index}
          //     id={item.id}
          //     image={item.image}
          //     name={item.name}
          //     price={item.price}
          //     index={index}
          //   />
          <ProductItem
            key={index}
            id={item.id}
            name={item.name}
            product={item}
          />
        ))}
      </div>
    </div>
  )
}
export default CategoryProduct
