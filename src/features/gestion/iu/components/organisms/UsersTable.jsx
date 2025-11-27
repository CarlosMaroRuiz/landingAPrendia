import { useState } from 'react';
import { UserCard, TableHeader, InterestModal } from '../molecules';
import { Loading } from '../../../../../common/iu/components';
import { UserNotFound } from '../atoms';

export const UsersTable = ({
  users = [],
  selectedUsers = [],
  onSelectUser,
  onViewUser,
  onAttendedUpdate,
  isLoading = false,
  className = ''
}) => {
  const [interestModalOpen, setInterestModalOpen] = useState(false);
  const [currentInterest, setCurrentInterest] = useState('');

  const handleViewInterest = (interest) => {
    setCurrentInterest(interest);
    setInterestModalOpen(true);
  };

  const headers = [

    'Nombre completo',
    'Email',
    'Teléfono',
    'Municipio',
    'Comunidad perteneciente',
    'Interés',
    'Fecha de registro',
    'Acciones'
  ];

  if (isLoading) {
    return (
      <Loading />
    );
  }

  if (users.length === 0) {
    return (
      <UserNotFound />
    );
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <TableHeader headers={headers} />
          <tbody>
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onView={() => onViewUser?.(user.id)}
                onSelect={onSelectUser}
                onAttendedUpdate={onAttendedUpdate}
                onViewInterest={handleViewInterest}
                isSelected={selectedUsers.includes(user.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
      <InterestModal
        isOpen={interestModalOpen}
        onClose={() => setInterestModalOpen(false)}
        content={currentInterest}
      />
    </div>
  );
};
