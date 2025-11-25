import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalResults = 0,
  resultsPerPage = 7,
  className = ''
}) => {
  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  const getVisiblePages = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');

      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="text-sm text-gray-600">
        Mostrando {startResult} a {endResult} de {totalResults} resultados
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
          title="Anterior"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>

        {visiblePages.map((page, idx) => (
          page === '...' ? (
            <span key={`ellipsis-${idx}`} className="px-3 py-2 text-gray-600">...</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange?.(page)}
              className={`px-3 py-2 rounded transition-colors ${
                currentPage === page
                  ? 'bg-pink-ia text-white font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          )
        ))}

        <button
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
          title="Siguiente"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
