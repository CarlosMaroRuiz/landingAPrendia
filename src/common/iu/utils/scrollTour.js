/**
 * Realiza un scroll secuencial por todas las secciones de la página
 * creando un efecto de "tour" visual
 * @param {string[]} sectionIds - Array de IDs de las secciones en orden
 * @param {number} delayBetweenSections - Tiempo en ms entre cada scroll
 */
export const scrollTour = (sectionIds, delayBetweenSections = 1500) => {
    let currentIndex = 0

    const scrollToNextSection = () => {
        if (currentIndex < sectionIds.length) {
            const sectionId = sectionIds[currentIndex]
            const element = document.getElementById(sectionId)

            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
            }

            currentIndex++

            if (currentIndex < sectionIds.length) {
                setTimeout(scrollToNextSection, delayBetweenSections)
            }
        }
    }

    scrollToNextSection()
}
