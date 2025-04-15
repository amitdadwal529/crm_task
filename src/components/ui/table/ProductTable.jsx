import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactTable, getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
import { getProducts, deleteProduct } from '@redux/thunk/productThunk';
import ProductTableHeader from '@components/ui/table/Header';
import ProductTableBody from '@components/ui/table/Body';
import ProductTablePagination from '@components/ui/table/Pagination';
import Delete from '@components/ui/modal/Delete';
import Spinner from '@components/ui/loader/Spinner';
import GetProductTableColumns from '@components/ui/table/Columns';

const ProductTable = () => {
  const dispatch = useDispatch();

  // pagination state 
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  // product data & loading state
  const { products, loading,  } = useSelector(state => state.product);

  const paginatedData = useMemo(() => {
    const start = pagination.pageIndex * pagination.pageSize;
    const end = start + pagination.pageSize;
    return products.slice(start, end);
  }, [products, pagination]);
  


  // ref to hold selected product id to delete
  const selectedProduct = useRef(null);
  const [showModal, setShowModal] = useState(false);

  // Open delete modal & store product id
  const openModal = id => {
    selectedProduct.current = id;
    setShowModal(true);
  };

  // Close delete modal & clear selected product id
  const closeModal = () => {
    selectedProduct.current = null;
    setShowModal(false);
  };

  // handle product delete & close modal
  const handleDelete = () => {
    dispatch(deleteProduct(selectedProduct.current));
    closeModal();
  };

  //fetch products
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch, pagination]);

  const columns = useMemo(() => GetProductTableColumns(openModal), []);

  const table = useReactTable({
    data: paginatedData,
    columns,
    pageCount: Math.ceil(products.length / pagination.pageSize),
    state: { pagination },
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      {/* display spinner while loading */}
      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full border border-gray-200">
            {/* table header */}
            <ProductTableHeader table={table} />
            {/* table body */}
            <ProductTableBody table={table} />
          </table>
          {/* Pagination */}
          <div>
            <ProductTablePagination table={table} />
          </div>
        </div>
      )}

      {/* delete modal */}
      {showModal && (
        <Delete
          isOpen={showModal}
          title="product"
          onClose={closeModal}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default ProductTable;
