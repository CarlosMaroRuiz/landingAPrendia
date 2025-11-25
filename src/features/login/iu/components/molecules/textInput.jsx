import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

export default function TextInput({ label, placeholder, type = "text", name, value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';
  const inputType = isPasswordField && !showPassword ? 'password' : 'text';

  return (
    <div className="flex flex-col w-full">
      <label className="text-[#374151] font-medium text-sm mb-1 font-medium">{label}</label>
      <div className="relative flex items-center">
        <input
          type={inputType}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full border border-[#D1D5DB] bg-[#F9FAFB] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#374151] font-medium"
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-[#6B7280] hover:text-[#374151] transition-colors"
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

