import { UserCard, TableHeader } from '../molecules';
import { Loading } from '../../../../../common/iu/components';
import { UserNotFound } from '../atoms';

export const UsersTable = ({
  users = [],
  selectedUsers = [],
  onSelectUser,
  onViewUser,
  isLoading = false,
  className = ''
}) => {

    const headers = [
    'ID',
    'Nombre completo',
    'Email',
    'Teléfono',
    'Municipio',
    'Comunidad perteneciente',
    'Interés',
    'Fecha de registro',
    'Atendidos'
  ];
  if (isLoading) {
    return (
     <Loading/>
    );
  }

  if (users.length === 0) {
    return (
   <UserNotFound/>
    );
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <TableHeader headers={headers}/>
          <tbody>
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onView={() => onViewUser?.(user.id)}
                onSelect={() => onSelectUser?.(user.id)}
                isSelected={selectedUsers.includes(user.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
