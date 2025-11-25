export const TableHeader = ({headers = []}) => {


  return (
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        {headers.map((header, idx) => (
          <th
            key={idx}
            className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};
