import { useEffect, useState } from 'react';


export const InterestModal = ({ isOpen, onClose, content }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setIsVisible(true);
        } else {
            document.body.style.overflow = 'unset';
            setIsVisible(false);
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
                }`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-xl shadow-xl w-[90%] max-w-md p-6 transform transition-all scale-100">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Motivo de interés
                    </h3>
                 
                </div>

                <div className="mt-2">
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                        {content || "No se especificó ningún motivo."}
                    </p>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-pink-ia text-white text-sm font-medium rounded-lg hover:bg-pink-ia/90 transition-colors"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};
