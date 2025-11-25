import { Avatar, Badge } from '../atoms';
import { EyeIcon, CheckIcon } from '@heroicons/react/24/solid';

export const UserCard = ({ user, onView, onSelect, isSelected }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <span className="text-sm font-medium text-gray-900">{user.id}</span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <Avatar src={user.avatar} alt={user.name} size="md" />
          <div>
            <p className="font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">{user.lastName}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-gray-600">{user.email}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-gray-600">{user.phone}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-gray-600">{user.city}</span>
      </td>
      <td className="px-6 py-4">
        <Badge variant="primary">{user.community}</Badge>
      </td>
      <td className="px-6 py-4">
        <EyeIcon className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-700" />
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-gray-600">{user.registrationDate}</span>
      </td>
      <td className="px-6 py-4">
        <button
          onClick={() => onSelect?.(user.id)}
          className="inline-flex items-center justify-center text-pink-ia hover:text-pink-ia/70 transition-colors"
        >
          {isSelected ? <CheckIcon className="h-5 w-5" /> : <div className="h-5 w-5 border-2 border-gray-300 rounded" />}
        </button>
      </td>
    </tr>
  );
};
