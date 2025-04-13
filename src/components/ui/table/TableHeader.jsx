import { flexRender } from '@tanstack/react-table';

// ProductTableHeader component renders the table header based on the table data
const ProductTableHeader = ({ table }) => (
  <thead className="bg-gray-200 text-gray-700">
    {/* Loop through each header group (to support grouped headers) */}
    {table.getHeaderGroups().map(headerGroup => (
      <tr key={headerGroup.id}>
        {/* Loop through each header in the group */}
        {headerGroup.headers.map(header => (
          <th key={header.id} className="px-4 py-2 text-left border-b">
            {/* Render the header using flexRender with the appropriate context */}
            {flexRender(header.column.columnDef.header, header.getContext())}
          </th>
        ))}
      </tr>
    ))}
  </thead>
);

export default ProductTableHeader;
