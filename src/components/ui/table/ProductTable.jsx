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
  const { products, loading, total } = useSelector(state => state.product);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const selectedProduct = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = id => {
    selectedProduct.current = id;
    setShowModal(true);
  };

  const closeModal = () => {
    selectedProduct.current = null;
    setShowModal(false);
  };

  const handleDelete = () => {
    dispatch(deleteProduct(selectedProduct.current));
    closeModal();
  };

  useEffect(() => {
    const skip = pagination.pageIndex * pagination.pageSize;
    dispatch(getProducts(`?skip=${skip}&limit=${pagination.pageSize}`));
  }, [dispatch, pagination]);

  const columns = useMemo(() => GetProductTableColumns(openModal), []);

  const table = useReactTable({
    data: products,
    columns,
    pageCount: total > 0 ? Math.ceil(total / pagination.pageSize) : 0,
    state: { pagination },
    onPaginationChange: setPagination,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full border border-gray-200">
            <ProductTableHeader table={table} />
            <ProductTableBody table={table} />
          </table>
          <div>
            <ProductTablePagination table={table} />
          </div>
        </div>
      )}
      {showModal && (
        <Delete isOpen={showModal} title="product" onClose={closeModal} onDelete={handleDelete} />
      )}
    </>
  );
};

export default ProductTable;
