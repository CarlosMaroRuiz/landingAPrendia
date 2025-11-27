import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

const ModalMessage = ({ message, type = 'success', isOpen, onClose, duration = 2000 }) => {
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  const isSuccess = type === 'success';
  const iconColor = isSuccess ? 'text-green-ia' : 'text-red-500';
  const Icon = isSuccess ? CheckCircleIcon : ExclamationCircleIcon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            {/* Modal cuadrado */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateX: 10 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
                mass: 0.8
              }}
              className="bg-white rounded-2xl p-12 w-80 h-80 flex flex-col items-center justify-center gap-6 shadow-2xl"
              style={{ perspective: 1000 }}
            >
              {/* Icono animado */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.1
                }}
              >
                <Icon className={`w-24 h-24 ${iconColor}`} />
              </motion.div>

              {/* Texto animado */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.3
                }}
                className="text-center text-gray-800 text-xl font-semibold"
              >
                {message}
              </motion.p>

              {/* Barra de progreso */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-200 rounded-b-2xl overflow-hidden"
              >
                <motion.div
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: duration / 1000, ease: "linear" }}
                  className={`h-full ${isSuccess ? 'bg-green-ia' : 'bg-red-500'} origin-left`}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ModalMessage;
