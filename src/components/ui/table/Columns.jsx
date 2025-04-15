import { createColumnHelper } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { FaEye, FaTrash } from 'react-icons/fa';
import { AiFillEdit } from "react-icons/ai";
import { PRIVATE_ROUTES } from '@routes/routes';
import { generateRoute } from '@utils/utils';
import { placeholderThumbnailImage } from '@config/config';

const columnHelper = createColumnHelper();

const GetProductTableColumns = (openModal) => [
  columnHelper.accessor('thumbnail', {
    header: 'Product',
    cell: info => {
      const image = info.row.original.thumbnail || placeholderThumbnailImage;
      const id = info.row.original.id;
      return (
        <Link to={generateRoute(PRIVATE_ROUTES.PRODUCT_DETAIL, { id })}>
          <img src={image} alt="Product" className="w-14 h-14 object-cover rounded" />
        </Link>
      );
    },
  }),

  columnHelper.accessor('title', {
    header: 'Name',
    cell: info => {
      const title = info.getValue() || 'N/A';
      const id = info.row.original.id;
      return (
        <Link to={generateRoute(PRIVATE_ROUTES.PRODUCT_DETAIL, { id })}>
          <span>{title}</span>
        </Link>
      );
    },
  }),

  columnHelper.accessor('brand', {
    header: 'Brand',
    cell: info => info.getValue() || 'N/A',
  }),

  columnHelper.accessor('category', {
    header: 'Category',
    cell: info => info.getValue() || 'N/A',
  }),

  columnHelper.accessor('price', {
    header: 'Price ($)',
    cell: info => {
      const price = info.getValue();
      return price !== null && price !== undefined ? `$${price}` : 'N/A';
    },
  }),

  columnHelper.accessor('availabilityStatus', {
    header: 'Status',
    cell: info => {
      const status = info.row.original.availabilityStatus || 'Unknown';
      const statusColor = status === 'Low Stock'
        ? 'bg-amber-300'
        : status === 'Out of Stock'
          ? 'bg-red-400'
          : status === 'Unknown'
            ? 'bg-gray-300'
            : 'bg-green-300';

      return (
        <span className={`px-4 py-0.5 rounded-2xl shadow-lg ${statusColor}`}>
          {status}
        </span>
      );
    },
  }),

  columnHelper.accessor('actions', {
    header: 'Actions',
    cell: info => {
      const id = info.row.original.id;
      return (
        <div className='flex items-center justify-between'>
          <Link to={generateRoute(PRIVATE_ROUTES.PRODUCT_DETAIL, { id })}>
            <FaEye className='text-blue-900 cursor-pointer' />
          </Link>
          <Link to={generateRoute(PRIVATE_ROUTES.UPDATE_PRODUCT, { id })}>
            <AiFillEdit className='text-blue-900 cursor-pointer' />
          </Link>
          <span onClick={() => openModal(id)}>
            <FaTrash className='text-blue-900 cursor-pointer' />
          </span>
        </div>
      );
    },
  }),
];

export default GetProductTableColumns;
