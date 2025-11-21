const Input = ({ label, type = "text", placeholder, required = false, name, value, onChange }) => {
  return (
    <div className="w-full">
      <label className="block text-base md:text-lg font-semibold text-gray-800 mb-1.5">
        {label} {required && <span className="text-pink-ia">*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 text-sm md:text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-ia transition-colors"
      />
    </div>
  )
}

export default Input
