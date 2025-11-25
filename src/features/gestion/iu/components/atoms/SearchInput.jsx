import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export const SearchInput = ({ placeholder = 'Buscar...', value, onChange, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-12 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-ia focus:border-transparent"
      />
    </div>
  );
};
