import { createColumnHelper } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { FaEye, FaTrash } from 'react-icons/fa';
import { AiFillEdit } from "react-icons/ai";
import { PRIVATE_ROUTES } from '@routes/routes';
import { generateRoute } from '@utils/utils';

// Helper function for creating columns in the table
const columnHelper = createColumnHelper();

// Function to get the columns configuration for the product table
const GetProductTableColumns = (openModal) => [
  // Column for displaying product thumbnail
  columnHelper.accessor('thumbnail', {
    header: 'Product',
    cell: info => (
      <Link to={generateRoute(PRIVATE_ROUTES.PRODUCT_DETAIL, { id: info.row.original.id })}>
        <img src={info.row.original.thumbnail} alt="" className='w-14 h-14' />
      </Link>
    ),
  }),

  // Column for displaying product name
  columnHelper.accessor('title', {
    header: 'Name',
    cell: info => (
      <Link to={generateRoute(PRIVATE_ROUTES.PRODUCT_DETAIL, { id: info.row.original.id })}>
        <span>{info.getValue()}</span>
      </Link>
    ),
  }),

  // Column for displaying product brand
  columnHelper.accessor('brand', {
    header: 'Brand',
    cell: info => info.getValue(),
  }),

  // Column for displaying product category
  columnHelper.accessor('category', {
    header: 'Category',
    cell: info => info.getValue(),
  }),

  // Column for displaying product price
  columnHelper.accessor('price', {
    header: 'Price ($)',
    cell: info => `$${info.getValue()}`,
  }),

  // Column for displaying product availability status with conditional styling
  columnHelper.accessor('availabilityStatus', {
    header: 'Status',
    cell: info => (
      <span className={`px-4 py-0.5 rounded-2xl shadow-lg ${info.row.original.availabilityStatus === 'Low Stock' ?
          'bg-amber-300' :
          info.row.original.availabilityStatus === 'Out of Stock' ?
            "bg-red-400" :
            'bg-green-300'
        }`}>
        {info.row.original.availabilityStatus}
      </span>
    ),
  }),

  // Column for displaying actions (view, edit, delete) for each product
  columnHelper.accessor('actions', {
    header: 'Actions',
    cell: info => (
      <div className='flex items-center justify-between'>
        {/* Link to view product details */}
        <Link to={generateRoute(PRIVATE_ROUTES.PRODUCT_DETAIL, { id: info.row.original.id })}>
          <FaEye className='text-blue-900 cursor-pointer' />
        </Link>

        {/* Link to edit the product */}
        <Link to={generateRoute(PRIVATE_ROUTES.UPDATE_PRODUCT, { id: info.row.original.id })}>
          <AiFillEdit className='text-blue-900 cursor-pointer' />
        </Link>

        {/* Trash icon to delete the product */}
        <span onClick={() => openModal(info.row.original.id)}>
          <FaTrash className='text-blue-900 cursor-pointer' />
        </span>
      </div>
    ),
  }),
];

export default GetProductTableColumns;
