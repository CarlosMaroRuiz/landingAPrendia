import alfi from "/img/Alfi.png"
import { TitlePrimary, Button } from "../../../../../common/iu/components"
import { useInView } from "../../../../../common/iu/hooks"
import { motion } from "framer-motion"
import { useSpringAnimation } from "../../hooks/useSpringAnimation"

const IntroductionTemplate = () => {
    const [refImage, isImageInView] = useInView()
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
        <section className="
            flex flex-col items-center justify-center
            pt-4 sm:pt-2 md:pt-0
            min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-[60vh]
            w-full
        ">

            <div className="
                flex flex-col-reverse sm:flex-row
                justify-center items-center
                gap-4 sm:gap-x-6 md:gap-x-8 lg:gap-x-12
                w-full max-w-7xl mx-auto px-4
            ">

                {/* TEXT SECTION */}
                <article className="
                    flex flex-col w-full sm:w-[55%] md:w-[55%] lg:w-[60%]
                    items-center justify-center
                    gap-y-3 sm:gap-y-4 md:gap-y-5 lg:gap-y-6
                ">

                    {/* TITLE */}
                    <motion.div
                        ref={refTitle}
                        initial={{ opacity: 0, scale: 0.9, y: -20, filter: "blur(4px)" }}
                        animate={isTitleInView ? { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, scale: 0.9, y: -20, filter: "blur(4px)" }}
                        transition={{ ...springGentle, delay: 0.1 }}
                        className="w-full text-center"
                    >
                        <TitlePrimary text={"¡Aprendamos Todos!"} />
                    </motion.div>

                    {/* PARAGRAPH */}
                    <motion.p
                        ref={refText}
                        initial={{ opacity: 0, y: 20, filter: "blur(3px)" }}
                        animate={isTextInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 20, filter: "blur(3px)" }}
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
                            className="mx-auto mt-7"
                        />
                    </motion.div>

                </article>

                {/* IMAGE */}
                <motion.div
                    className="w-full sm:w-[45%] md:w-[45%] lg:w-[40%] flex justify-center items-center"
                    initial={{ opacity: 0, x: 40, scale: 0.9, filter: "blur(4px)" }}
                    animate={isImageInView ? { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" } : { opacity: 0, x: 40, scale: 0.9, filter: "blur(4px)" }}
                    transition={{ ...springGentle, delay: 0.25 }}
                >
                    <motion.img
                        ref={refImage}
                        src={alfi}
                        alt="alfi"
                        whileHover={{ scale: 1.05 }}
                        transition={{ ...springGentle, duration: 0.4 }}
                        className="
                            image-3d-hover
                            w-56 h-auto
                            sm:w-auto sm:h-64
                            md:w-auto md:h-72
                            lg:w-auto lg:h-[80vh]
                            xl:h-[85vh]
                            rounded-lg cursor-pointer
                            object-contain
                        "
                    />
                </motion.div>

            </div>
        </section>
    )
}

export default IntroductionTemplate
