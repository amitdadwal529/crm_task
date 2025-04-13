const ProductTablePagination = ({ table }) => (
    <div className="flex items-center justify-between mt-4">
      <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
        {'<<'}
      </button>
      <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
        {'<'}
      </button>
      <span>
        Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of {table.getPageCount()}
      </span>
      <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
        {'>'}
      </button>
      <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
        {'>>'}
      </button>
    </div>
  );
  
  export default ProductTablePagination;
  