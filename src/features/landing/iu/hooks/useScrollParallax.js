import { useEffect, useRef, useState } from 'react'

export const useScrollParallax = () => {
    const ref = useRef(null)
    const [parallaxValues, setParallaxValues] = useState({
        imageScale: 1,
        imageOpacity: 1,
        textOpacity: 1,
        imageY: 0,
    })

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return

            // Obtener posición del elemento
            const rect = ref.current.getBoundingClientRect()
            const elementTop = rect.top
            const elementHeight = rect.height
            const windowHeight = window.innerHeight

            // Calcular progreso del scroll (0 = arriba, 1 = abajo)
            const progress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight)))

            // Efectos progresivos
            const imageScale = 1 + progress * 0.3 // Crece hasta 1.3x
            const imageOpacity = Math.max(0, 1 - progress * 0.5) // Se desvanece gradualmente
            const textOpacity = Math.max(0, 1 - progress * 0.8) // El texto se desvanece más rápido
            const imageY = progress * -40 // Se mueve hacia arriba suavemente

            setParallaxValues({
                imageScale,
                imageOpacity,
                textOpacity,
                imageY,
            })
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return { ref, parallaxValues }
}
