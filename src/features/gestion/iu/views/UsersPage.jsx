import { useState, useEffect, useCallback } from 'react';
import { SearchBar, Pagination } from '../components/molecules';
import { UsersTable, ModalGestion } from '../components/organisms';
import { useFilters } from '../hooks';
import { useAsync } from '../../../../common/iu/hooks';
import { getInteresados, updateAttendedStatus } from '../../services/gestionService';

export const UsersPage = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

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

  // Use useAsync for fetching users
  const {
    execute: fetchUsers,
    data: usersData,
    loading: isLoading,
    error: fetchError
  } = useAsync(getInteresados);

  // Use useAsync for updating status
  const { execute: updateStatus } = useAsync(updateAttendedStatus);

  const loadUsers = useCallback(async () => {
    try {
      const result = await fetchUsers({
        page: currentPage,
        search: searchValue,
        community: filters.community,
        municipality: filters.municipality
      });

      if (result.error) {
        setTotalResults(0);
      } else {
        setTotalResults(result.total || 0);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setTotalResults(0);
    }
  }, [fetchUsers, currentPage, searchValue, filters.community, filters.municipality]);

  // Fetch data from API with pagination, search, and filters
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleApplyFiltersAndClose = (newFilters) => {
    handleApplyFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    resetFilters();
    setCurrentPage(1);
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleAttendedUpdate = async (userId, attended) => {
    try {
      const result = await updateStatus(userId, attended);

      if (result.success) {
        // Refresh the data to show updated status
        setTimeout(() => {
          loadUsers();
        }, 500);
      } else {
        console.error('Error al actualizar estado:', result.error);
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error updating attended status:', error);
      alert('Error al actualizar el estado de atendido');
    }
  };

  const resultsPerPage = 10;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  // Extract users from data structure
  const users = usersData?.data || [];

  return (
    <>
      {/* Search Bar */}
      <SearchBar
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onFilterClick={handleModalToggle}
        isFilterActive={isFilterActive}
      />

      {/* Users Table */}
      <UsersTable
        users={users}
        selectedUsers={selectedUsers}
        onSelectUser={handleSelectUser}
        onAttendedUpdate={handleAttendedUpdate}
        isLoading={isLoading}
      />

      {/* Pagination */}
      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalResults={totalResults}
          resultsPerPage={resultsPerPage}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Filter Modal */}
      <ModalGestion
        isOpen={isModalOpen}
        onClose={handleModalToggle}
        onApplyFilters={handleApplyFiltersAndClose}
        onClearFilters={handleClearFilters}
        initialFilters={filters}
      />
    </>
  );
};
