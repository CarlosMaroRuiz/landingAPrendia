import { useState, useEffect } from 'react';
import { UsersManagementTemplate } from '../components/templates';
import { useFilters } from '../hooks';
import { getInteresados } from '../../services/gestionService';

export const UsersPage = ({ onNavigate, onLogout }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);

  const {
    searchValue,
    filters,
    isFilterActive,
    isModalOpen,
    handleSearchChange,
    handleModalToggle,
    handleApplyFilters,
    resetFilters
  } = useFilters({});

  // Fetch data from API with pagination, search, and filters
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await getInteresados({
          page: currentPage,
          search: searchValue,
          community: filters.community,
          municipality: filters.municipality
        });

        if (result.error) {
          setError(result.error);
          setUsers([]);
          setTotalResults(0);
        } else {
          setUsers(result.data || []);
          setTotalResults(result.total || 0);
        }
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Error al cargar los interesados');
        setUsers([]);
        setTotalResults(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage, searchValue, filters.community, filters.municipality]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleApplyFiltersAndClose = (newFilters) => {
    handleApplyFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleClearFilters = () => {
    resetFilters();
    setCurrentPage(1);
  };

  return (
    <UsersManagementTemplate
      users={users}
      onNavigate={onNavigate}
      onLogout={onLogout}
      isLoading={isLoading}
      totalResults={totalResults}
      currentPage={currentPage}
      onPageChange={handlePageChange}
      searchValue={searchValue}
      onSearchChange={handleSearchChange}
      isFilterActive={isFilterActive}
      onFilterClick={handleModalToggle}
      isModalOpen={isModalOpen}
      onModalClose={handleModalToggle}
      onApplyFilters={handleApplyFiltersAndClose}
      onClearFilters={handleClearFilters}
      currentFilters={filters}
      error={error}
    />
  );
};
