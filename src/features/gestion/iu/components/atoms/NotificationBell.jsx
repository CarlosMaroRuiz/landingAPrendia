import { BellIcon } from '@heroicons/react/24/solid';

export const NotificationBell = ({ count = 0, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`relative p-2 text-gray-600 hover:text-gray-900 transition-colors ${className}`}
      title="Notificaciones"
    >
      <BellIcon className="h-6 w-6" />
      {count > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
          {count}
        </span>
      )}
    </button>
  );
};
