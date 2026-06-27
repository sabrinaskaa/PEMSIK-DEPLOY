const Pagination = ({ page, totalPages, onPrev, onNext }) => {
  if (totalPages <= 0) return null;

  return (
    <div className="flex items-center justify-between mt-4 px-1 select-none">
      {/* Info halaman */}
      <p className="text-sm text-gray-500">
        Halaman{" "}
        <span className="font-semibold text-gray-700">{page}</span>
        {" "}dari{" "}
        <span className="font-semibold text-gray-700">{totalPages}</span>
      </p>

      {/* Tombol navigasi */}
      <div className="flex items-center gap-1">
        <button
          onClick={onPrev}
          disabled={page === 1}
          className="
            inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium
            border border-gray-300 bg-white text-gray-600
            hover:bg-gray-50 active:bg-gray-100
            disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white
            transition-colors duration-150
          "
        >
          {/* Chevron kiri */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Prev
        </button>

        {/* Indikator halaman aktif */}
        <span className="px-3 py-1.5 rounded-md text-sm font-semibold bg-blue-600 text-white min-w-[2.25rem] text-center">
          {page}
        </span>

        <button
          onClick={onNext}
          disabled={page === totalPages}
          className="
            inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium
            border border-gray-300 bg-white text-gray-600
            hover:bg-gray-50 active:bg-gray-100
            disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white
            transition-colors duration-150
          "
        >
          Next
          {/* Chevron kanan */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
