import { useEffect, useState } from 'react'

const VideoModal = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setIsAnimating(true)
      requestAnimationFrame(() => {
        setIsVisible(true)
      })
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      setIsAnimating(false)
      onClose()
    }, 300)
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  if (!isOpen && !isAnimating) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300 ${
        isVisible ? 'bg-black/60' : 'bg-black/0'
      } backdrop-blur-sm`} // Agregué backdrop-blur y oscurecí un poco más el fondo para resaltar el video
      onClick={handleBackdropClick}
    >
      <div
        className={`relative w-[95%] aspect-square md:w-[80%] md:h-[90%] md:aspect-auto bg-white rounded-2xl overflow-hidden flex flex-col shadow-2xl transition-all duration-300 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Botón cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-pink-ia/90 text-white rounded-full hover:bg-pink-ia transition-colors flex items-center justify-center shadow-lg"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Área del video 
           CAMBIO IMPORTANTE: 
           1. Usamos flex-1 para llenar el espacio.
           2. Agregamos 'relative' para el posicionamiento.
           3. Ajustamos el padding para que no corte el video.
        */}
        <div className="flex-1 w-full h-full p-4 pt-16 md:p-8 md:pt-16 flex items-center justify-center bg-black/5">
          <div className="relative w-full h-full rounded-xl overflow-hidden shadow-inner bg-black">
            <iframe
              className="absolute top-0 left-0 w-full h-full object-cover"
              // CAMBIO CRÍTICO: Agregado mute=1 para permitir autoplay
              src="https://www.youtube.com/embed/6_DJSWGGiDw?autoplay=1&mute=1&rel=0&modestbranding=1"
              title="Video APRENDIA"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Línea de decoración */}
        <div className="flex items-center justify-center border-t border-gray-100 py-2 bg-white z-10">
          <img
            src="/img/decoracion-ia.png"
            alt="Decoración"
            // CAMBIO: h-22 no existe en tailwind por defecto, cambiado a h-20 (80px)
            className="h-20 object-contain"
          />
        </div>
      </div>
    </div>
  )
}

export default VideoModal