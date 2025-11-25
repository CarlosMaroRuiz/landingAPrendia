import { Avatar } from '../atoms';

export const ProfileWidget = ({ name, email, avatar, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 hover:opacity-80 transition-opacity ${className}`}
    >
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900">{name}</p>
        <p className="text-xs text-gray-500">{email}</p>
      </div>
      <Avatar src={avatar} alt={name} size="md" />
    </button>
  );
};
