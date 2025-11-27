import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';

export const AttendedModal = ({ isOpen, onClose, onAccept, position }) => {
    const [attended, setAttended] = useState(null);
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleAccept = () => {
        if (attended !== null) {
            onAccept(attended);
            setAttended(null);
        }
    };

    const modalContent = (
        <div
            ref={modalRef}
            className="absolute bg-white rounded-lg shadow-xl border-2 border-gray-200 p-4 z-50 w-48"
            style={{
                top: position?.top || 0,
                left: position?.left || 0,
            }}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
                <XMarkIcon className="h-4 w-4" />
            </button>

            {/* Title */}
            <h3 className="text-center font-semibold text-gray-900 mb-4 text-sm">
                ¿Se atendió?
            </h3>

            {/* Radio buttons */}
            <div className="flex justify-center gap-6 mb-4">
                {/* Sí option */}
                <label className="flex flex-col items-center cursor-pointer">
                    <span className="text-sm font-medium text-gray-700 mb-1">Sí</span>
                    <div
                        onClick={() => setAttended(true)}
                        className={`w-8 h-8 rounded-full border-4 flex items-center justify-center transition-all ${attended === true
                            ? 'border-pink-ia bg-white'
                            : 'border-gray-300 bg-white'
                            }`}
                    >
                        {attended === true && (
                            <div className="w-4 h-4 rounded-full bg-pink-ia"></div>
                        )}
                    </div>
                </label>

                {/* No option */}
                <label className="flex flex-col items-center cursor-pointer">
                    <span className="text-sm font-medium text-gray-700 mb-1">No</span>
                    <div
                        onClick={() => setAttended(false)}
                        className={`w-8 h-8 rounded-full border-4 flex items-center justify-center transition-all ${attended === false
                            ? 'border-pink-ia bg-white'
                            : 'border-gray-300 bg-white'
                            }`}
                    >
                        {attended === false && (
                            <div className="w-4 h-4 rounded-full bg-pink-ia"></div>
                        )}
                    </div>
                </label>
            </div>

            {/* Accept button */}
            <button
                onClick={handleAccept}
                disabled={attended === null}
                className={`w-full py-2 rounded-lg font-semibold text-white text-sm transition-all ${attended === null
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-pink-ia hover:bg-pink-ia/90'
                    }`}
            >
                Aceptar
            </button>
        </div>
    );

    return createPortal(modalContent, document.body);
};
