import alfi from "../../../public/img/Alfi.png"
import TitlePrimary from "../atoms/titlePrimary"
import useParallax from "../../hooks/useParallax"
import useInView from "../../hooks/useInView"
import PrimaryButton from "../atoms/button"

const IntroductionTemplate = () => {
    const offsetY = useParallax(0.3)
    const [refImage, isImageInView] = useInView()
    const [refText, isTextInView] = useInView()
    const [refTitle, isTitleInView] = useInView()

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
                    <div
                        ref={refTitle}
                        className={`
                            transition-all duration-1000 ease-out
                            w-full text-center
                            ${
                                isTitleInView
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-95"
                            }
                        `}
                        style={{ transitionDelay: "400ms" }}
                    >
                        <TitlePrimary text={"¡Aprendamos Todos!"} />
                    </div>

                    {/* PARAGRAPH */}
                    <p
                        ref={refText}
                        className={`
                            text-base sm:text-lg md:text-2xl lg:text-4xl
                            transition-all duration-1000 ease-out
                            text-justify w-[98%] sm:w-full
                            max-w-[750px] font-medium
                            ${
                                isTextInView
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                            }
                        `}
                        style={{ transitionDelay: "200ms" }}
                    >
                        APREND
                        <span className="text-pink-ia">IA</span> es mucho más que una aplicación,
                        es un puente hacia el conocimiento, la inclusión y el futuro.
                    </p>

                    {/* BUTTON */}
                    <PrimaryButton
                        text="Me interesa"
                        onClick={handleMeInteresa}
                        className="mx-auto"
                    />

                </article>

                {/* IMAGE */}
                <div className="w-full sm:w-[45%] md:w-[45%] lg:w-[40%] flex justify-center items-center">
                    <img
                        ref={refImage}
                        src={alfi}
                        alt="alfi"
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
                </div>

            </div>
        </section>
    )
}

export default IntroductionTemplate
