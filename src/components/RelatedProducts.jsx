import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'
import { Link } from 'react-router-dom'
// import RelatedProductItems from './RelatedProductItems'

const RelatedProducts = ({ category, id }) => {
  const { products } = useContext(ShopContext)

  const [related, setRelated] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      const relatedProducts = products
        .filter(item => item.category.name === category && item.id !== id)
        .slice(0, 8)
      setRelated(relatedProducts)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products])
  if (related.length == 0) {
    return (
      <div className='text-right'>
        <Link
          to='/collections'
          className='font-medium px-4 py-2 rounded-xl text-2xl bg-default text-white'
        >
          Explore All Products
        </Link>
      </div>
    )
  }
  return (
    <div className=''>
      <div className='py-2 text-3xl text-center'>
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>
      <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-5'>
        {related?.map((item, index) => (
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

export default RelatedProducts
