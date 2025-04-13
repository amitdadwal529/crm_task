import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const ProductTablePagination = ({ table }) => {
  const pages = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;

  const getPaginationPages = () => {
    const pagination = [];
    
    if (currentPage > 0) pagination.push(currentPage - 1); 
    pagination.push(currentPage); 
    if (currentPage < pages - 1) pagination.push(currentPage + 1); 

    if (currentPage > 1) pagination.unshift("..."); 
    if (currentPage < pages - 2) pagination.push("..."); 

    return pagination;
  };

  return (
    <div className="flex items-center justify-end my-4 px-4 ">
      <button
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <MdOutlineKeyboardDoubleArrowLeft className="text-xl cursor-pointer" />
      </button>
      <button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <MdKeyboardArrowLeft className="text-xl cursor-pointer" />
      </button>

      {/* Pagination */}
      <div className="flex space-x-2">
        {getPaginationPages().map((page, index) =>
          page === "..." ? (
            <span key={index} className="text-sm">...</span>
          ) : (
            <button
              key={index}
              onClick={() => table.setPageIndex(page)}
              className={`px-1  py-0.5 rounded-full text-sm ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-50 text-black"
              }`}
            >
              {page + 1} 
            </button>
          )
        )}
      </div>

      <span>
        <p className="text-sm">
          of {pages}
        </p>
      </span>

      <button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <MdKeyboardArrowRight className="text-xl cursor-pointer" />
      </button>
      <button
        onClick={() => table.setPageIndex(pages - 1)}
        disabled={!table.getCanNextPage()}
      >
        <MdOutlineKeyboardDoubleArrowRight className="text-xl cursor-pointer" />
      </button>
    </div>
  );
};

export default ProductTablePagination;
