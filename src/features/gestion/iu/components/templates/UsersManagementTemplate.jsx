import { useState } from 'react';
import { Sidebar, Header, UsersTable, ModalGestion } from '../organisms';
import { SearchBar, Pagination } from '../molecules';

export const UsersManagementTemplate = ({
  users = [],
  onNavigate,
  onLogout,
  isLoading = false,
  totalResults = 0,
  currentPage = 1,
  onPageChange,
  searchValue = '',
  onSearchChange,
  isFilterActive = false,
  onFilterClick,
  isModalOpen = false,
  onModalClose,
  onApplyFilters,
  onClearFilters,
  currentFilters = {}
}) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const resultsPerPage = 7;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        activeSection="interesados"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          title="Gestión Interesados"
          breadcrumbs={['Inicio', 'Agregar', 'Usuarios']}
          adminName="Admin"
          adminEmail="admin@example.com"
          notificationCount={1}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          {/* Search Bar */}
          <SearchBar
            searchValue={searchValue}
            onSearchChange={onSearchChange}
            onFilterClick={onFilterClick}
            isFilterActive={isFilterActive}
          />

          {/* Users Table */}
          <UsersTable
            users={users}
            selectedUsers={selectedUsers}
            onSelectUser={handleSelectUser}
            isLoading={isLoading}
          />

          {/* Pagination */}
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onPageChange={onPageChange}
            />
          </div>
        </main>
      </div>

      {/* Filter Modal */}
      <ModalGestion
        isOpen={isModalOpen}
        onClose={onModalClose}
        onApplyFilters={onApplyFilters}
        onClearFilters={onClearFilters}
        initialFilters={currentFilters}
      />
    </div>
  );
};
