import React, { useEffect, useState } from "react";

function Pagination({ totalPages, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [visiblePages, setVisiblePages] = useState(3); // Default number of visible pages

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const halfVisible = Math.floor(visiblePages / 2);
    const pages = [];
    let start = currentPage - halfVisible;
    let end = currentPage + halfVisible;

    if (start < 1) {
      start = 1;
      end = Math.min(totalPages, visiblePages);
    }

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, totalPages - visiblePages + 1);
    }

    if (start > 1) {
      pages.push(
        <p className="mx-1">
          <span
            key={`page1`}
            onClick={() => handlePageChange(1)}
            className="px-2 py-1 cursor-pointer bg-gray-200 rounded hover:bg-gray-300"
          >
            1
          </span>
        </p>,
        <p className="mx-1">
          <span key="ellipsStart" className="text-gray-500">
            ...
          </span>
        </p>
      );
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <p className="mx-1">
          <span
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-2 py-1 cursor-pointer rounded ${
              i === currentPage
                ? "bg-gray-200 font-semibold text-black"
                : "bg-gray-200 text-gray-500 hover:bg-gray-300"
            }`}
          >
            {i}
          </span>
        </p>
      );
    }

    if (end < totalPages) {
      pages.push(
        <p className="mx-1">
          <span key="ellipsisEnd" className="bg-gray-200 text-gray-500 hover:bg-gray-300">
            ...
          </span>
        </p>,
        <p className="mx-1">
          <span
            key={`page${totalPages}`}
            onClick={() => handlePageChange(totalPages)}
            className="px-2 py-1 cursor-pointer bg-gray-100 text-gray-500 rounded hover:bg-gray-300"
          >
            {totalPages}
          </span>
        </p>
      );
    }

    return pages;
  };

  function updateVisiblePages() {
    const screenWidth = window.innerWidth;

    let newVisiblePages = 3;

    if (screenWidth <= 480) {
      newVisiblePages = 2;
    } else if (screenWidth <= 768) {
      newVisiblePages = 3;
    } else if (screenWidth <= 1024) {
      newVisiblePages = 5;
    }

    setVisiblePages(newVisiblePages);
  }

  useEffect(() => {
    setCurrentPage(1);

    function handleVisiblePage() {
      updateVisiblePages();
    }

    window.addEventListener("resize", handleVisiblePage);

    return () => {
      window.removeEventListener("resize", handleVisiblePage);
    };
  }, [totalPages]);

  return (
    <div className="flex items-center justify-end py-4">
      <button
        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
        className={`px-3 py-1 mx-1 rounded text-sm   ${
          currentPage === 1 
         ? "cursor-not-allowed bg-gray-200 text-gray-500 hover:bg-gray-300 "
            : "cursor-pointer text-white bg-black opacity-90 hover:opacity-100"
        }`}
        disabled={currentPage === 1}
      >
       Previous
      </button>

      <div className="flex">{renderPageNumbers()}</div>

      <button
        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
        className={`px-3 py-1 mx-1 text-sm rounded    ${
          currentPage === totalPages
            ? "cursor-not-allowed bg-gray-200 text-gray-500 hover:bg-gray-300 "
            : "cursor-pointer text-white bg-black opacity-90 hover:opacity-100"
        }`}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
