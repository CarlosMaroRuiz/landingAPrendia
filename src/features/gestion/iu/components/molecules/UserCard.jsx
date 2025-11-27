import { useState, useRef } from 'react';
import { Badge } from '../atoms';
import { EyeIcon } from '@heroicons/react/24/outline';
import { AttendedModal } from './AttendedModal';

export const UserCard = ({ user, onView, onSelect, onAttendedUpdate, onViewInterest, isSelected }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);

  const handleActionClick = (e) => {
    e.stopPropagation();

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.bottom + window.scrollY + 5, // 5px below the button
        left: rect.left + window.scrollX - 80, // Center the modal under the button
      });
    }

    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalAccept = (attended) => {
    console.log('User attended:', attended, 'User ID:', user.id);
    // Call the onAttendedUpdate callback with user ID and attended status
    onAttendedUpdate?.(user.id, attended);
    setShowModal(false);
  };

  return (
    <>
      <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
        <td className="px-3 py-2">
          <div className="flex flex-col">
            <p className="font-medium text-xs text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.lastName}</p>
          </div>
        </td>
        <td className="px-3 py-2">
          <span className="text-xs text-gray-600">{user.email}</span>
        </td>
        <td className="px-3 py-2">
          <span className="text-xs text-gray-600">{user.phone}</span>
        </td>
        <td className="px-3 py-2">
          <span className="text-xs text-gray-600">{user.city}</span>
        </td>
        <td className="px-3 py-2">
          <Badge variant="primary" size="sm">{user.community}</Badge>
        </td>
        <td className="px-3 py-2">
          <button
            onClick={() => onViewInterest?.(user.interest)}
            className="text-pink-ia hover:text-pink-ia/70 transition-colors"
            title="Ver interés"
          >
            <EyeIcon className="h-4 w-4" />
          </button>
        </td>
        <td className="px-3 py-2">
          <span className="text-xs text-gray-600">{user.registrationDate}</span>
        </td>
        <td className="px-3 py-2 relative">
          <button
            ref={buttonRef}
            onClick={handleActionClick}
            className="inline-flex items-center justify-center hover:opacity-70 transition-opacity"
            title="Ver detalles"
          >
            <img src="/img/carpeta.png" alt="Ver detalles" className="h-5 w-5" />
          </button>
        </td>
      </tr>

      <AttendedModal
        isOpen={showModal}
        onClose={handleModalClose}
        onAccept={handleModalAccept}
        position={modalPosition}
      />
    </>
  );
};
