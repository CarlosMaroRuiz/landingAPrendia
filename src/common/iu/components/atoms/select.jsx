const Select = ({
  label,
  options = [],
  required = false,
  name,
  value,
  onChange,
  placeholder = "Seleccionar"
}) => {
  return (
    <div className="w-full">
      <label className="block text-base md:text-lg font-semibold text-gray-800 mb-1.5">
        {label} {required && <span className="text-pink-ia">*</span>}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2 text-sm md:text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-ia transition-colors bg-white"
      >
        <option value="">{placeholder}</option>

        {options.map((option, index) => (
          <option key={index} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
