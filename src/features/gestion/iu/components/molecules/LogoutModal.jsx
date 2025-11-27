import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-xl shadow-lg w-[90%] max-w-sm p-6 transform transition-all scale-100">
                <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                        <ArrowRightOnRectangleIcon className="h-6 w-6 text-red-600" />
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        ¿Cerrar sesión?
                    </h3>

                    <p className="text-sm text-gray-500 mb-6">
                        ¿Estás seguro que deseas salir de tu cuenta?
                    </p>

                    <div className="flex gap-3 w-full">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
