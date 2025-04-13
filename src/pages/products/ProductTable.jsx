import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from '@tanstack/react-table';
import { FaEye, FaTrash } from 'react-icons/fa';
import { AiFillEdit } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { generateRoute } from '@utils/utils';
import { PRIVATE_ROUTES } from '@routes/routes';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProducts } from '@redux/thunk/productThunk';
import Delete from '@components/ui/modal/Delete';
import Spinner from '@components/ui/loader/Spinner';
import Pagination from '@components/ui/table/Pagination';


const ProductTable = () => {
  const dispatch = useDispatch();
  const{products, loading, total} = useSelector((state)=>state.product);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const selectedProduct = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (id) => {
    selectedProduct.current = id;
    setShowModal(true);
  };

  const closeModal = () => {
    selectedProduct.current = null;
    setShowModal(false);
  };

  const handledelete= () => {
    const id = selectedProduct.current;
    dispatch(deleteProduct(id))
    closeModal();
  };

  useEffect(() => {
    const skip = (currentPage - 1) * limit;
    const query = `?limit=${limit}&skip=${skip}`;
    dispatch(getProducts(query));
  }, [dispatch, currentPage]);

  const totalPages = Math.ceil(total / limit);


  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor('thumbnail', {
        header: 'Product ',
        cell: info =>
          <span>
            <img src={info?.row?.original?.thumbnail} alt="" className='w-14 h-14' />
          </span>,
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
        cell: info => 
          <span className={`px-4 py-0.5 rounded-2xl shadow-lg ${info?.row?.original?.availabilityStatus=='Low Stock'?"bg-amber-300":"bg-green-300"}`}>
            {info?.row?.original?.availabilityStatus}
          </span>
          ,
      }),
      columnHelper.accessor('actions', {
        header: 'Actions',
        cell: info =>
          <div className='flex items-center justify-between'>
           <Link to={generateRoute(PRIVATE_ROUTES.PRODUCT_DETAIL, {id:info.row.original.id})}>
          <FaEye className='text-blue-900 cursor-pointer' />
        </Link>
        <Link to={generateRoute(PRIVATE_ROUTES.UPDATE_PRODUCT, {id:info.row.original.id})}>
          <AiFillEdit className='text-blue-900 cursor-pointer' />
        </Link>
       
        <span onClick={() => openModal(info.row.original.id)}>
    <FaTrash className='text-blue-900 cursor-pointer' />
  </span>
        
          </div>,
      }),
    ],
    []
  );

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>

    {
      loading ? <Spinner/>:
      <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-200 text-gray-700">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="px-4 py-2 text-left border-b">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-2 border-b text-sm truncate">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
      {
        showModal && 
          <Delete
            isOpen={showModal}
        title="product"
        onClose={closeModal}
        onDelete={handledelete}
          />
        
      }
    </div>
    }
    </>
   
  );
};

export default ProductTable;
