import { flexRender } from '@tanstack/react-table';

const ProductTableBody = ({ table }) => (
  <tbody>
    {/* Loop through each row in the table's row model */}
    {table.getRowModel().rows.map(row => (
      <tr key={row.id} className="hover:bg-gray-50">
        {/* Loop through each visible cell in the row */}
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
