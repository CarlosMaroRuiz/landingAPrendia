import { useState, useEffect, useRef } from 'react';
import { SearchBar, Pagination } from '../components/molecules';
import { UsersTable, ModalGestion } from '../components/organisms';
import { useFilters } from '../hooks';
import { useAsync } from '../../../../common/iu/hooks';
import { updateAttendedStatus } from '../../services/gestionService';

export const UsersPage = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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

  // Local state for users and loading
  const [usersData, setUsersData] = useState({ data: [], total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Worker ref
  const workerRef = useRef(null);

  // Use useAsync for updating status (keep this one)
  const { execute: updateStatus } = useAsync(updateAttendedStatus);

  // Initial load and polling via Worker
  useEffect(() => {
    // Instantiate worker
    workerRef.current = new Worker(new URL('../../workers/usersPolling.worker.js', import.meta.url));

    // Handle messages from worker
    workerRef.current.onmessage = (e) => {
      const { type, payload, error: workerError } = e.data;

      if (type === 'DATA_UPDATED') {
        setUsersData(payload);
        setIsLoading(false);
        setError(null);
      } else if (type === 'ERROR') {
        console.error('Worker error:', workerError);
        setError(workerError);
        setIsLoading(false);
      }
    };

    // Start worker
    const token = localStorage.getItem('token');
    const baseUrl = import.meta.env.MODE === 'development'
      ? '/api'
      : (import.meta.env.VITE_API_URL || '');

    workerRef.current.postMessage({
      action: 'START',
      payload: {
        token,
        baseUrl,
        params: {
          page: currentPage,
          search: searchValue,
          community: filters.community,
          municipality: filters.municipality
        }
      }
    });

    // Cleanup
    return () => {
      if (workerRef.current) {
        workerRef.current.postMessage({ action: 'STOP' });
        workerRef.current.terminate();
      }
    };
  }, []); // Run once on mount

  // Update worker params when filters change
  useEffect(() => {
    if (workerRef.current) {
      workerRef.current.postMessage({
        action: 'UPDATE_PARAMS',
        payload: {
          params: {
            page: currentPage,
            search: searchValue,
            community: filters.community,
            municipality: filters.municipality
          }
        }
      });
    }
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
      const result = await updateStatus(userId, attended);

      if (result.success) {
        // Force refresh via worker
        if (workerRef.current) {
          workerRef.current.postMessage({
            action: 'UPDATE_PARAMS',
            payload: {
              params: {
                page: currentPage,
                search: searchValue,
                community: filters.community,
                municipality: filters.municipality
              }
            }
          });
        }
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
  const totalResults = usersData?.total || 0;
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
