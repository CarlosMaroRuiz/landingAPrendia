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
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300 ${isVisible ? 'bg-black/40' : 'bg-black/0'
        }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`relative w-[90%] aspect-square md:w-[80%] md:h-[90%] md:aspect-auto bg-white rounded-2xl overflow-hidden flex flex-col shadow-2xl transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
      >
        {/* Botón cerrar aún más arriba y en la esquina */}
        <button
          onClick={handleClose}
          className="absolute top-1 right-1 z-10 w-6 h-6 bg-pink-ia text-white rounded-full hover:bg-opacity-90 transition-colors flex items-center justify-center"
        >
          <svg
            className="w-4 h-4"
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

        {/* Área del video */}
        <div className="flex-1 p-6 pb-0">
          <iframe
            className="w-full h-full rounded-xl"
            src="https://www.youtube.com/embed/kX77h7EpPOk?autoplay=1"
            title="Video APRENDIA"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Línea de decoración */}
        <div className="h-20 flex items-center justify-center border-t border-gray-100">
          <img
            src="/img/decoracion.png"
            alt="Decoración"
            className="h-12 object-contain"
          />
        </div>
      </div>
    </div>
  )
}

export default VideoModal
