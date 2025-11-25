import { useState, useEffect } from 'react';

export const useTableData = (dataFetcher, dependencies = []) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await dataFetcher({ page: currentPage });
        setData(result.data || []);
        setTotalResults(result.total || 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage, ...dependencies]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return {
    data,
    isLoading,
    error,
    currentPage,
    totalResults,
    setCurrentPage: handlePageChange
  };
};
