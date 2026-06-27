const TableControls = ({
  search,
  onSearch,
  sortBy,
  onSortBy,
  sortOrder,
  onSortOrder,
  limit,
  onLimit,
  searchPlaceholder = "Cari...",
  sortOptions = [],
}) => {
  const selectClass =
    "border border-gray-300 bg-white text-sm text-gray-700 px-3 py-1.5 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition";

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {/* Search input */}
      <div className="relative flex-grow min-w-[180px]">
        <span className="absolute inset-y-0 left-2.5 flex items-center pointer-events-none text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
        </span>
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full border border-gray-300 bg-white text-sm text-gray-700 pl-8 pr-3 py-1.5 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
      </div>

      {/* Sort by field */}
      {sortOptions.length > 0 && (
        <select
          value={sortBy}
          onChange={(e) => onSortBy(e.target.value)}
          className={selectClass}
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {/* Sort order */}
      <select
        value={sortOrder}
        onChange={(e) => onSortOrder(e.target.value)}
        className={selectClass}
      >
        <option value="asc">↑ A–Z</option>
        <option value="desc">↓ Z–A</option>
      </select>

      {/* Per page */}
      <select
        value={limit}
        onChange={(e) => onLimit(Number(e.target.value))}
        className={selectClass}
      >
        <option value={5}>5 / halaman</option>
        <option value={10}>10 / halaman</option>
        <option value={25}>25 / halaman</option>
      </select>
    </div>
  );
};

export default TableControls;
