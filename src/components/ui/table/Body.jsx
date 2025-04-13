import { flexRender } from '@tanstack/react-table';

const ProductTableBody = ({ table }) => (
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
);

export default ProductTableBody;
