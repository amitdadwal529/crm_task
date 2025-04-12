import React, { useEffect, useMemo, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from '@tanstack/react-table';

const ProductTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
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
      columnHelper.accessor('stock', {
        header: 'Stock',
        cell: info => info.getValue(),
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
    <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Product List</h2>
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100 text-gray-700">
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
                <td key={cell.id} className="px-4 py-2 border-b">
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
    