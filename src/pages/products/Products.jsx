import React from 'react'
import ProductTable from '@components/ui/table/ProductTable'
import { AiOutlineProduct } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { PRIVATE_ROUTES } from '@routes/routes'

const Products = () => {
  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
    <div className="flex justify-between items-center">
<div className="flex items-center">
<h2 className="text-xl font-semibold mb-4 flex items-center">Product List  </h2>
<AiOutlineProduct className='ms-2 text-blue-900' />
</div>
<Link
            to={PRIVATE_ROUTES.ADD_PRODUCT}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Add Product
          </Link>
    </div>
    <ProductTable />
  </div>
  )
}

export default Products
