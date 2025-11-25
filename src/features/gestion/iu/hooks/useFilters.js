import { useState, useCallback } from 'react';

export const useFilters = (initialFilters = {}) => {
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState({
    community: '',
    municipality: '',
    ...initialFilters
  });
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchChange = useCallback((value) => {
    setSearchValue(value);
  }, []);

  const handleFilterToggle = useCallback(() => {
    setIsFilterActive((prev) => !prev);
  }, []);

  const handleModalToggle = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  const handleFilterChange = useCallback((filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value
    }));
  }, []);

  const handleApplyFilters = useCallback((newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters
    }));

    // Set filter active state based on whether any filters are applied
    const hasActiveFilters = Object.values(newFilters).some(value => value && value !== '');
    setIsFilterActive(hasActiveFilters);
  }, []);

  const resetFilters = useCallback(() => {
    setSearchValue('');
    setFilters({
      community: '',
      municipality: '',
      ...initialFilters
    });
    setIsFilterActive(false);
  }, [initialFilters]);

  const getActiveFilters = useCallback(() => {
    const active = {};
    if (searchValue) active.search = searchValue;
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '' && value !== 'all') {
        active[key] = value;
      }
    });
    return active;
  }, [searchValue, filters]);

  return {
    searchValue,
    filters,
    isFilterActive,
    isModalOpen,
    handleSearchChange,
    handleFilterToggle,
    handleModalToggle,
    handleFilterChange,
    handleApplyFilters,
    resetFilters,
    getActiveFilters
  };
};
