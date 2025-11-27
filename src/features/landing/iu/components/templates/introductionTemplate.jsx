import alfi from "/img/Alfi.png"
import { TitlePrimary, Button } from "../../../../../common/iu/components"
import { useInView } from "../../../../../common/iu/hooks"
import { motion } from "framer-motion"
import { useSpringAnimation } from "../../hooks/useSpringAnimation"

const IntroductionTemplate = () => {
    const [refText, isTextInView] = useInView()
    const [refTitle, isTitleInView] = useInView()
    const springGentle = useSpringAnimation('gentle')

    const handleMeInteresa = () => {
        const element = document.getElementById('me-interesa')
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    }

    return (
        <section className="flex flex-col items-center justify-start pt-12 sm:justify-center sm:py-0 min-h-fit sm:min-h-screen w-full">
            <motion.div
                className="
                        flex flex-col-reverse sm:flex-row
                        justify-center items-center
                        gap-1 sm:gap-x-4 md:gap-x-8 lg:gap-x-12
                        w-full max-w-7xl mx-auto px-3 sm:px-4
                    "
            >
                {/* TEXT SECTION */}
                <article className="
                        flex flex-col w-full sm:w-[55%] md:w-[55%] lg:w-[60%]
                        items-center justify-center
                        gap-y-1 sm:gap-y-3 md:gap-y-5 lg:gap-y-6
                        transition-transform will-change-transform
                    ">
                    {/* TITLE */}
                    <motion.div
                        ref={refTitle}
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        animate={isTitleInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ ...springGentle, delay: 0.1 }}
                        className="w-full text-center"
                    >
                        <TitlePrimary text={"¡Aprendamos Todos!"} />
                    </motion.div>

                    {/* PARAGRAPH */}
                    <motion.p
                        ref={refText}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ ...springGentle, delay: 0.2 }}
                        className="
                                text-base sm:text-lg md:text-2xl lg:text-4xl
                                text-justify w-[98%] sm:w-full
                                max-w-[750px] font-medium
                            "
                    >
                        APREND
                        <span className="text-pink-ia">IA</span> es mucho más que una aplicación,
                        es un puente hacia el conocimiento, la inclusión y el futuro.
                    </motion.p>

                    {/* BUTTON */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 10 }}
                        animate={isTextInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.85, y: 10 }}
                        transition={{ ...springGentle, delay: 0.3 }}
                    >
                        <Button
                            text="Me interesa"
                            onClick={handleMeInteresa}
                            className="mx-auto mt-3 sm:mt-7"
                        />
                    </motion.div>
                </article>

                {/* IMAGE */}
                <div className="w-full sm:w-[45%] md:w-[45%] lg:w-[40%] flex justify-center items-center will-change-transform relative">
                    <motion.img
                        src={alfi}
                        alt="alfi"
                        whileHover={{ scale: 1.05 }}
                        transition={{ ...springGentle, duration: 0.4 }}
                        className="
                                image-3d-hover
                                w-56 h-auto
                                sm:w-auto sm:h-64
                                md:w-auto md:h-72
                                lg:w-auto lg:h-[86vh]
                                xl:h-[79vh]
                                rounded-lg cursor-pointer
                                object-contain
                            "
                        style={{ filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.2))' }}
                    />
                </div>
            </motion.div>
        </section>
    )
}

export default IntroductionTemplate
