import React from 'react';

type Props = {
  currentPage: number;
  totalCount: number;
  perPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalCount, perPage, onPageChange }: Props) {
  const totalPages = Math.ceil(totalCount / perPage);
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-between items-center mt-6">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        <h1 className='text-blue-600'> ← Prev </h1>
      </button>
      <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        <h1 className='text-blue-600'> Next → </h1>
      </button>
    </div>
  );
}
