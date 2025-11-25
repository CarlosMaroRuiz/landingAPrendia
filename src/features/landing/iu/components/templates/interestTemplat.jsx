import { DecoratedLayout, ContactForm } from "../../../../../common/iu/components"
import { useInView } from "../../../../../common/iu/hooks"
import { motion } from "framer-motion"
import { useSpringAnimation } from "../../hooks/useSpringAnimation"

const InterestTemplate = () => {
    const [refTitle, isTitleInView] = useInView()
    const [refText, isTextInView] = useInView()
    const [refForm, isFormInView] = useInView()
    const springGentle = useSpringAnimation('gentle')

    return (
        <div className="w-full">
            <DecoratedLayout>
                <motion.h2
                    ref={refTitle}
                    initial={{ opacity: 0, y: -25, scale: 0.95 }}
                    animate={isTitleInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -25, scale: 0.95 }}
                    transition={{ ...springGentle, delay: 0.1 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl w-full text-pink-ia font-extrabold text-center flex flex-wrap justify-center mb-4"
                >
                    Me interesa
                </motion.h2>
                <motion.p
                    ref={refText}
                    initial={{ opacity: 0, y: 15, filter: "blur(3px)" }}
                    animate={isTextInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 15, filter: "blur(3px)" }}
                    transition={{ ...springGentle, delay: 0.18 }}
                    className="text-sm sm:text-base md:text-xl lg:text-2xl w-full text-center mt-4 px-2"
                >
                    Registrate para recibir más información de APREND<span className="text-pink-ia">IA</span>.
                </motion.p>

                <motion.div
                    ref={refForm}
                    initial={{ opacity: 0, y: 25, scale: 0.95 }}
                    animate={isFormInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 25, scale: 0.95 }}
                    transition={{ ...springGentle, delay: 0.25 }}
                    className="w-full"
                >
                    <ContactForm />
                </motion.div>
            </DecoratedLayout>
        </div>
    )
}

export default InterestTemplate
