import { useEffect } from 'react';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

const ModalMessage = ({ message, type = 'success', isOpen, onClose, duration = 2000 }) => {
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const isSuccess = type === 'success';
  const iconColor = isSuccess ? 'text-green-ia' : 'text-red-500';
  const Icon = isSuccess ? CheckCircleIcon : ExclamationCircleIcon;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-12 w-80 h-80 flex flex-col items-center justify-center gap-6 shadow-2xl">
        <Icon className={`w-24 h-24 ${iconColor}`} />
        <p className="text-center text-gray-800 text-xl font-semibold">{message}</p>
      </div>
    </div>
  );
};

export default ModalMessage;
