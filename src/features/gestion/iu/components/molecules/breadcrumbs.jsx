export const Breadcrumbs = ({ items = [] }) => {
  if (!items.length) return null;

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600">
      {items.map((crumb, idx) => (
        <div key={idx} className="flex items-center gap-2">
          {idx > 0 && <span>/</span>}
          <a
            href="#"
            className="text-gray-600 hover:text-pink-ia transition-colors"
          >
            {crumb}
          </a>
        </div>
      ))}
    </nav>
  );
};
