import { FunnelIcon } from '@heroicons/react/24/solid';

export const FilterButton = ({ onClick, isActive = true, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
        isActive
          ? 'border-pink-ia bg-pink-ia/10 text-pink-ia'
          : 'border-gray-300 bg-white text-gray-700 hover:border-pink-ia'
      } ${className}`}
    >
      <FunnelIcon className="h-5 w-5" />
      <span className="text-sm font-medium">Filtros</span>
    </button>
  );
};
