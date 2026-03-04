import React from "react";

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
}) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  return (
    <div className="flex gap-2 items-center justify-center mt-6">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="px-3 py-1 bg-gray-700 rounded disabled:opacity-40"
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-1 rounded ${
            page === currentPage
              ? "bg-blue-600"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="px-3 py-1 bg-gray-700 rounded disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
