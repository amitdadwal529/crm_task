import React, { useEffect, useState } from "react";

const Pagination = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [visiblePages, setVisiblePages] = useState(3);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const updateVisiblePages = () => {
    const width = window.innerWidth;
    let newVisiblePages = 3;

    if (width <= 480) newVisiblePages = 2;
    else if (width <= 768) newVisiblePages = 3;
    else if (width <= 1024) newVisiblePages = 5;

    setVisiblePages(newVisiblePages);
  };

  useEffect(() => {
    setCurrentPage(1);
    updateVisiblePages();
    const handleResize = () => updateVisiblePages();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [totalPages]);

  const renderPageNumbers = () => {
    const half = Math.floor(visiblePages / 2);
    let start = currentPage - half;
    let end = currentPage + half;

    if (start < 1) {
      start = 1;
      end = Math.min(totalPages, visiblePages);
    }

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, totalPages - visiblePages + 1);
    }

    const pages = [];

    if (start > 1) {
      pages.push(
        <Page key="first" number={1} onClick={handlePageChange} />,
        <Ellipsis key="start-ellipsis" />
      );
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <Page key={i} number={i} current={i === currentPage} onClick={handlePageChange} />
      );
    }

    if (end < totalPages) {
      pages.push(
        <Ellipsis key="end-ellipsis" />,
        <Page key="last" number={totalPages} onClick={handlePageChange} />
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-end py-4">
      <NavButton
        label="Previous"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
      />
      <div className="flex">{renderPageNumbers()}</div>
      <NavButton
        label="Next"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
      />
    </div>
  );
};

const Page = ({ number, current, onClick }) => (
  <p className="mx-1">
    <span
      onClick={() => onClick(number)}
      className={`px-2 py-1 cursor-pointer rounded ${
        current
          ? "bg-gray-200 font-semibold text-black"
          : "bg-gray-200 text-gray-500 hover:bg-gray-300"
      }`}
    >
      {number}
    </span>
  </p>
);

const Ellipsis = () => (
  <p className="mx-1">
    <span className="text-gray-500">...</span>
  </p>
);

const NavButton = ({ label, disabled, onClick }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-3 py-1 mx-1 text-sm rounded ${
      disabled
        ? "cursor-not-allowed bg-gray-200 text-gray-500 hover:bg-gray-300"
        : "cursor-pointer text-white bg-black opacity-90 hover:opacity-100"
    }`}
  >
    {label}
  </button>
);

export default Pagination;
