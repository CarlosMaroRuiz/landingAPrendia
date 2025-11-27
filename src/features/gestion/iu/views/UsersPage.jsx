import { useState, useEffect } from 'react';
import { SearchBar, Pagination } from '../components/molecules';
import { UsersTable, ModalGestion } from '../components/organisms';
import { useFilters } from '../hooks';
import { getInteresados, updateAttendedStatus } from '../../services/gestionService';

export const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
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

  // Fetch data from API with pagination, search, and filters
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const result = await getInteresados({
          page: currentPage,
          search: searchValue,
          community: filters.community,
          municipality: filters.municipality
        });

        if (result.error) {
          setUsers([]);
          setTotalResults(0);
        } else {
          setUsers(result.data || []);
          setTotalResults(result.total || 0);
        }
      } catch (err) {
        console.error('Error fetching users:', err);
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
      const result = await updateAttendedStatus(userId, attended);

      if (result.success) {
        console.log('Estado actualizado exitosamente:', result.data);
        // Refresh the data to show updated status
        const fetchData = async () => {
          setIsLoading(true);
          try {
            const result = await getInteresados({
              page: currentPage,
              search: searchValue,
              community: filters.community,
              municipality: filters.municipality
            });

            if (result.error) {
              setUsers([]);
              setTotalResults(0);
            } else {
              setUsers(result.data || []);
              setTotalResults(result.total || 0);
            }
          } catch (err) {
            console.error('Error fetching users:', err);
            setUsers([]);
            setTotalResults(0);
          } finally {
            setIsLoading(false);
          }
        };
        await fetchData();
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
