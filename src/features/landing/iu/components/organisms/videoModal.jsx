import { useEffect, useState } from 'react'
import Lottie from 'lottie-react'

const VideoModal = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showHandTap, setShowHandTap] = useState(true)
  const [handTapAnimation, setHandTapAnimation] = useState(null)

  // Cargar la animación de Lottie
  useEffect(() => {
    fetch('/img/Hand tap.json')
      .then(response => response.json())
      .then(data => setHandTapAnimation(data))
      .catch(error => console.error('Error loading animation:', error))
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setIsAnimating(true)
      setShowHandTap(true)
      requestAnimationFrame(() => {
        setIsVisible(true)
      })
    } else {
      document.body.style.overflow = 'unset'
      setIsVisible(false)
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

  // Esta función maneja el click en la animación
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false)

  const handleTapClick = () => {
    setShowHandTap(false)
    setShouldPlayVideo(true)
  }

  if (!isOpen && !isAnimating) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300 ${isVisible ? 'bg-black/60' : 'bg-black/0'
        } backdrop-blur-sm`}
      onClick={handleBackdropClick}
    >
      <div
        className={`relative w-[90%] aspect-square md:w-[85%] md:h-[90%] md:aspect-auto bg-white rounded-2xl overflow-hidden flex flex-col shadow-2xl transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
      >
        {/* Botón cerrar */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleClose()
          }}
          className="absolute top-3 right-3 z-30 w-10 h-10 bg-pink-ia/90 text-white rounded-full hover:bg-pink-ia transition-colors flex items-center justify-center shadow-lg"
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

        {/* Cuadro blanco superior - Reducido a h-14 para dar más espacio al video */}
        <div className="h-14 bg-white border-b border-gray-100 shrink-0"></div>

        {/* Contenedor central - Padding reducido a p-2 */}
        <div className="relative flex-1 flex items-center justify-center bg-white p-2 md:p-4 overflow-hidden">
          {/* Video */}
          <iframe
            className="w-full h-full rounded-lg border-2 border-white shadow-md"
            src={`https://www.youtube.com/embed/6_DJSWGGiDw?${shouldPlayVideo ? 'autoplay=1&' : ''}mute=1&rel=0&modestbranding=1`}
            title="Video APRENDIA"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

          {/* Hand Tap Animation - Overlay con Click */}
          {showHandTap && handTapAnimation && (
            <div
              onClick={handleTapClick}
              className="absolute inset-0 flex flex-col items-center justify-end rounded-lg z-20 cursor-pointer pb-1 md:pb-8"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 drop-shadow-lg">
                <Lottie animationData={handTapAnimation} loop={true} />
              </div>
              {/* Texto indicativo opcional */}
              <span className="mt-1 text-xs md:text-sm font-medium text-gray-600">
                Toca para ver
              </span>
            </div>
          )}
        </div>

        {/* Línea de decoración - shrink-0 evita que se aplaste */}
        <div className="flex items-center justify-center border-t border-gray-100 py-2 bg-white z-10 shrink-0 h-16 md:h-20">
          <img
            src="/img/decoracion-ia.png"
            alt="Decoración"
            className="h-full object-contain"
          />
        </div>
      </div>
    </div>
  )
}

export default VideoModal