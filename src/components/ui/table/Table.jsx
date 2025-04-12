import Pagination from "@components/ui/table/Pagination";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import NoDataMessage from "@pages/notFound/NotFound";
const CommonTable = (props) => {
  const {handleUrl,tableData,columns,totalPages} = props
  // Define columns using useMemo for performance optimization
  // Create table instance using useReactTable
  
  const table = useReactTable({
    data: tableData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
   
  });
  return (
    <>
       <div className="rounded-lg mt-5" style={{ overflowX: 'auto' }} >
        <table className=" w-full bg-white  rounded-lg ">
              <thead>
                {table.getHeaderGroups().map((headerGroup, idx) => (
                  <tr key={headerGroup.id || `headerGroup-${idx}`} className="bg-gray-200  ">
                    {headerGroup.headers.map((header, index) => (
                      <th key={header.id || `header-${index}`} className="text-left px-3 py-5 border-b text-normal-text border-gray-300">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row, rowIndex) => (
                  <tr key={row.id || `row-${rowIndex}`} className="hover:bg-gray-200 text-normal-text">
                    {row.getVisibleCells().map((cell, cellIndex) => (
                      <td key={cell.id || `cell-${cellIndex}`} className="p-3  text-normal-text">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
        </table>
   
    </div>
       {/* Pagination Controls */}
       {tableData?.length> 0 ?  <Pagination  totalPages={totalPages} onPageChange={handleUrl} />   : <NoDataMessage/>}
    </>
  )
 

 
};

export default CommonTable;
