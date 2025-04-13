import { createColumnHelper } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { FaEye, FaTrash } from 'react-icons/fa';
import { AiFillEdit } from "react-icons/ai";
import { PRIVATE_ROUTES } from '@routes/routes';
import { generateRoute } from '@utils/utils';

const columnHelper = createColumnHelper();
 const GetProductTableColumns = (openModal) => [
  columnHelper.accessor('thumbnail', {
    header: 'Product',
    cell: info => <img src={info.row.original.thumbnail} alt="" className='w-14 h-14' />,
  }),
  columnHelper.accessor('title', {
    header: 'Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('brand', {
    header: 'Brand',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('category', {
    header: 'Category',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('price', {
    header: 'Price ($)',
    cell: info => `$${info.getValue()}`,
  }),
  columnHelper.accessor('availabilityStatus', {
    header: 'Status',
    cell: info => (
      <span className={`px-4 py-0.5 rounded-2xl shadow-lg ${
        info.row.original.availabilityStatus === 'Low Stock'
          ? 'bg-amber-300'
          : 'bg-green-300'
      }`}>
        {info.row.original.availabilityStatus}
      </span>
    ),
  }),
  columnHelper.accessor('actions', {
    header: 'Actions',
    cell: info => (
      <div className='flex items-center justify-between'>
        <Link to={generateRoute(PRIVATE_ROUTES.PRODUCT_DETAIL, { id: info.row.original.id })}>
          <FaEye className='text-blue-900 cursor-pointer' />
        </Link>
        <Link to={generateRoute(PRIVATE_ROUTES.UPDATE_PRODUCT, { id: info.row.original.id })}>
          <AiFillEdit className='text-blue-900 cursor-pointer' />
        </Link>
        <span onClick={() => openModal(info.row.original.id)}>
          <FaTrash className='text-blue-900 cursor-pointer' />
        </span>
      </div>
    ),
  }),
];

export default GetProductTableColumns;
