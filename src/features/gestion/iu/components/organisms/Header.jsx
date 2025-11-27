import { useState, useEffect, useRef } from 'react';

import { ProfileWidget } from '../molecules';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export const Header = ({
  title,
  onNotificationClick,
  notificationCount = 0,
  adminName = 'Admin',
  adminAvatar,
  onLogout
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="border-b border-gray-200 px-8 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>

        <div className="flex items-center gap-6">

          <div className="relative" ref={dropdownRef}>
            <ProfileWidget
              name={adminName}
           
              avatar={adminAvatar}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-100 transform transition-all">
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-900 stroke-2" />
                  <span className="font-medium">Cerrar sesión</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
