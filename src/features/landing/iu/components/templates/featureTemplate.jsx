import { DecoratedLayout, ContentCard } from "../../../../../common/iu/components"
import { useInView } from "../../../../../common/iu/hooks"
import { motion } from "framer-motion"
import { useSpringAnimation } from "../../hooks/useSpringAnimation"
import feat1 from "/img/feat-1.png"
import feat2 from "/img/feat-2.png"
import feat3 from "/img/feat-3.png"

// Componente para cada card de característica
const FeatureCard = ({ feature, index, cardVariants, imageVariants, titleVariants, paragraphVariants, textVariants }) => {
    const [cardRef, isCardInView] = useInView()

    return (
        <motion.section
            key={index}
            ref={cardRef}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate={isCardInView ? "visible" : "hidden"}
            whileHover="hover"
            className={`flex flex-col-reverse sm:flex-row items-center gap-4 sm:gap-x-8 md:gap-x-12 lg:gap-x-16 w-full mb-10 sm:mb-14 md:mb-16 lg:mb-20 cursor-pointer ${
                feature.alignment === "texto-imagen" ? "sm:flex-row-reverse" : ""
            }`}
        >
            <motion.div
                className="shrink-0 relative"
                custom={index}
                variants={imageVariants}
                initial="hidden"
                animate={isCardInView ? "visible" : "hidden"}
                whileHover="hover"
            >
                <motion.div
                    className="absolute inset-0 bg-pink-ia/8 blur-2xl -z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                />
                <img
                    src={feature.image}
                    alt={feature.title}
                    loading="lazy"
                    className="w-40 h-40 sm:w-48 sm:h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 object-contain"
                />
            </motion.div>

            <motion.article
                className="flex flex-col gap-y-2 sm:gap-y-3 md:gap-y-4 lg:gap-y-6 flex-1"
                custom={index}
                variants={textVariants}
                initial="hidden"
                animate={isCardInView ? "visible" : "hidden"}
            >
                <motion.h3
                    custom={index}
                    variants={titleVariants}
                    initial="hidden"
                    animate={isCardInView ? "visible" : "hidden"}
                    whileHover="hover"
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-green-ia leading-tight text-center sm:text-left transition-colors duration-300"
                >
                    {feature.title}
                </motion.h3>
                <motion.p
                    custom={index}
                    variants={paragraphVariants}
                    initial="hidden"
                    animate={isCardInView ? "visible" : "hidden"}
                    className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-700 leading-relaxed text-justify"
                >
                    {feature.text}
                </motion.p>
            </motion.article>
        </motion.section>
    )
}

const FeatureTemplate = () => {
    const [ref, isInView] = useInView()
    const springGentle = useSpringAnimation('gentle')

    // Variantes de animación suave
    const cardVariants = {
        hidden: {
            opacity: 0,
            scale: 0.9,
            y: 30,
            filter: "blur(4px)",
        },
        visible: (i) => ({
            opacity: 1,
            scale: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                ...springGentle,
                delay: 0.2 + i * 0.15,
            },
        }),
        hover: {
            scale: 1.01,
            y: -4,
            transition: { ...springGentle, duration: 0.4 },
        },
    }

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.85, rotate: -10, y: 20, filter: "blur(4px)" },
        visible: (i) => ({
            opacity: 1,
            scale: 1,
            rotate: 0,
            y: 0,
            filter: "blur(0px)",
            transition: { ...springGentle, delay: 0.3 + i * 0.15, duration: 0.6 },
        }),
        hover: {
            scale: 1.05,
            rotate: 2,
            transition: { ...springGentle, duration: 0.4 },
        },
    }

    const textVariants = {
        hidden: { opacity: 0, x: -30, y: 15, filter: "blur(3px)" },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            y: 0,
            filter: "blur(0px)",
            transition: { ...springGentle, delay: 0.25 + i * 0.15 },
        }),
    }

    const titleVariants = {
        hidden: { opacity: 0, x: -30, y: 15, filter: "blur(3px)" },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            y: 0,
            filter: "blur(0px)",
            transition: { ...springGentle, delay: 0.3 + i * 0.15 },
        }),
        hover: {
            x: 4,
            color: "#E91E8C",
            transition: { ...springGentle, duration: 0.3 },
        },
    }

    const paragraphVariants = {
        hidden: { opacity: 0, x: -30, y: 15, filter: "blur(3px)" },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            y: 0,
            filter: "blur(0px)",
            transition: { ...springGentle, delay: 0.35 + i * 0.15 },
        }),
    }

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ ...springGentle }}
        >
            <DecoratedLayout>
                <motion.h2
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ ...springGentle, delay: 0.05 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl w-full text-pink-ia font-extrabold text-center flex flex-wrap justify-center mb-4"
                >
                    Características
                </motion.h2>
                <div className="w-full max-w-6xl px-2 md:px-8">
                    {[
                        {
                            image: feat1,
                            title: "Ejercicios interactivos",
                            text: "Los ejercicios interactivos de la aplicación permiten al usuario aprender de forma dinámica, convirtiendo las actividades tradicionales en experiencias digitales que facilitan la comprensión.",
                            alignment: "imagen-texto",
                        },
                        {
                            image: feat2,
                            title: "Aprende a tu ritmo",
                            text: "El enfoque de la aplicación permite al usuario aprender a su propio ritmo, ofreciendo actividades diseñadas para adaptarse a su avance y facilitar un proceso de aprendizaje práctico y personalizado.",
                            alignment: "texto-imagen",
                        },
                        {
                            image: feat3,
                            title: "Diseño amigable e intuitivo",
                            text: "Es una herramienta tecnológica pensada para facilitar el proceso de alfabetización en personas sordas, con métodos adaptados a su forma de comunicación y aprendizaje.",
                            alignment: "imagen-texto",
                        },
                    ].map((feature, index) => (
                        <FeatureCard
                            key={index}
                            feature={feature}
                            index={index}
                            cardVariants={cardVariants}
                            imageVariants={imageVariants}
                            titleVariants={titleVariants}
                            paragraphVariants={paragraphVariants}
                            textVariants={textVariants}
                        />
                    ))}
                </div>
            </DecoratedLayout>
        </motion.div>
    )
}

export default FeatureTemplate
