
export default function TextInput({ label, placeholder, type = "text", name, value, onChange }) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-[#374151] font-medium text-sm mb-1 font-medium">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border border-[#D1D5DB] bg-[#F9FAFB] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#374151] font-medium"
      />
    </div>
  );
}

