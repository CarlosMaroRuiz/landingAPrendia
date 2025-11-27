export const TableHeader = ({ headers = [] }) => {
  return (
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        {headers.map((header, idx) => (
          <th
            key={idx}
            className="px-3 py-2 text-left text-xs font-bold text-gray-700 whitespace-nowrap uppercase tracking-wider"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};
