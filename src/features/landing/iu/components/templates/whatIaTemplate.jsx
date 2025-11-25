import logo from "/img/educador.png"
import { DecoratedLayout } from "../../../../../common/iu/components"
import { useInView } from "../../../../../common/iu/hooks"
import { motion } from "framer-motion"
import { useSpringAnimation } from "../../hooks/useSpringAnimation"

const WhatIaTemplate = () => {
    const [ref, isInView] = useInView()
    const [refTitle, isTitleInView] = useInView()
    const [refContent, isContentInView] = useInView()
    const springGentle = useSpringAnimation('gentle')

    return (
        <DecoratedLayout>
        <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ ...springGentle }}
        >
            <motion.h2
                ref={refTitle}
                initial={{ opacity: 0, y: -25, scale: 0.95 }}
                animate={isTitleInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -25, scale: 0.95 }}
                transition={{ ...springGentle, delay: 0.1 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl w-full text-pink-ia font-extrabold text-center flex flex-wrap justify-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
            >
                ¿Qué es APREND
                <span className="text-green-ia">IA</span>
                ?
            </motion.h2>

            <motion.section
                ref={refContent}
                initial={{ opacity: 0, scale: 0.92, y: 25 }}
                animate={isContentInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.92, y: 25 }}
                transition={{ ...springGentle, delay: 0.15 }}
                className="flex flex-col-reverse sm:flex-row items-center gap-6 sm:gap-x-10 md:gap-x-16 lg:gap-x-20"
            >
                <motion.p
                    initial={{ opacity: 0, x: -25, filter: "blur(3px)" }}
                    animate={isContentInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: -25, filter: "blur(3px)" }}
                    transition={{ ...springGentle, delay: 0.25 }}
                    className="text-base sm:text-lg md:text-2xl lg:text-3xl text-justify leading-relaxed"
                >
                    APREND<span className="text-pink-ia">IA</span> es una aplicación diseñada especialmente para apoyar en el proceso de alfabetización a personas sordas en el Estado de Chiapas, teniendo como premisa la educación bilingüe bicultural, centrándose en la enseñanza del español escrito como segunda lengua.
                </motion.p>

                <motion.div
                    className="shrink-0 relative"
                    initial={{ opacity: 0, x: 25, rotate: 8, filter: "blur(4px)" }}
                    animate={isContentInView ? { opacity: 1, x: 0, rotate: 0, filter: "blur(0px)" } : { opacity: 0, x: 25, rotate: 8, filter: "blur(4px)" }}
                    transition={{ ...springGentle, delay: 0.3 }}
                >
                    <motion.div
                        className="absolute inset-0 bg-green-ia/8 blur-2xl -z-10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.img
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{ ...springGentle, duration: 0.4 }}
                        src={logo}
                        alt="Educador de APRENDIA enseñando lengua de señas"
                        loading="lazy"
                        className="h-40 sm:h-48 md:h-72 lg:h-116 w-auto cursor-pointer"
                    />
                </motion.div>
            </motion.section>
        </motion.div>
        </DecoratedLayout>
    )
}

export default WhatIaTemplate
