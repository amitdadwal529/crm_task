import React from 'react'
import ProductTable from '@components/ui/table/ProductTable'
import { AiOutlineProduct } from 'react-icons/ai'

const Products = () => {
  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <h2 className="text-xl font-semibold mb-4 flex items-center">Product List <AiOutlineProduct className='ms-2 text-blue-900' />
      </h2>
      <ProductTable />
    </div>
  )
}

export default Products
