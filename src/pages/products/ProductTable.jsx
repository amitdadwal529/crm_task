import React, { useEffect, useMemo, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from '@tanstack/react-table';
import { FaEye, FaTrash } from 'react-icons/fa';
import { AiFillEdit } from "react-icons/ai";


const ProductTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  console.log(products, "products")

  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor('title', {
        header: 'Product ',
        cell: info =>
          <span>
            <img src={info?.row?.original?.thumbnail} alt="" className='w-14 h-14' />
          </span>,
      }),
      columnHelper.accessor('title', {
        header: 'Product Name',
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
            <FaEye className='text-blue-900' />
            <AiFillEdit className='text-blue-900' />
            <FaTrash className='text-blue-900' />
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
    </div>
  );
};

export default ProductTable;
