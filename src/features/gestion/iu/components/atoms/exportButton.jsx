import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid';

export const ExportButton = ({ className = '', onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 text-pink-ia font-medium
        hover:text-pink-ia/80 transition-colors
        ${className}
      `}
    >
      <ArrowRightStartOnRectangleIcon className="w-5 h-5 text-pink-ia" />
      <span>Exportar</span>
    </button>
  );
};
