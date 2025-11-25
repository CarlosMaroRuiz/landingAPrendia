import { useState, useCallback } from 'react';

export const usePagination = (initialPage = 1, initialPerPage = 7) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [perPage, setPerPage] = useState(initialPerPage);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handlePerPageChange = useCallback((newPerPage) => {
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  }, []);

  const reset = useCallback(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  return {
    currentPage,
    perPage,
    handlePageChange,
    handlePerPageChange,
    reset
  };
};
