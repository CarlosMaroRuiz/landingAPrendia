import { useEffect, useRef } from 'react'
import { useMotionValue, useTransform } from 'framer-motion'

export const useScrollParallax = () => {
    const ref = useRef(null)

    // Motion values para animaciones suaves
    const progress = useMotionValue(0)
    const imageScale = useTransform(progress, [0, 1], [1, 1.5])
    const imageOpacity = useTransform(progress, [0, 1], [1, 0])
    const textOpacity = useTransform(progress, [0, 1], [1, 0])
    const imageY = useTransform(progress, [0, 1], [0, -60])
    const imageX = useTransform(progress, [0, 0.5, 1], [10, 0, 10])

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return

            // Obtener posición del elemento
            const rect = ref.current.getBoundingClientRect()
            const elementTop = rect.top
            const elementHeight = rect.height
            const windowHeight = window.innerHeight

            // Calcular progreso: cuándo la sección entra en viewport y sale
            const totalDistance = windowHeight + elementHeight
            const calculatedProgress = Math.max(0, Math.min(1, (windowHeight - elementTop) / totalDistance))

            // Actualizar el motion value
            progress.set(calculatedProgress)
        }

        // Llamar una vez al montar
        handleScroll()

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [progress])

    return {
        ref,
        parallaxValues: {
            imageScale,
            imageOpacity,
            textOpacity,
            imageY,
            imageX,
        }
    }
}
