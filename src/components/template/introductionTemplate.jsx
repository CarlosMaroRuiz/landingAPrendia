import educator from "../../../public/img/educador.png"
import TitlePrimary from "../atoms/titlePrimary"
import useParallax from "../../hooks/useParallax"
import useInView from "../../hooks/useInView"

const IntroductionTemplate = () => {
    const offsetY = useParallax(0.3)
    const [refImage, isImageInView] = useInView()
    const [refText, isTextInView] = useInView()
    const [refTitle, isTitleInView] = useInView()

    return (
        <section className="flex flex-col items-center justify-start pt-8 min-h-[85vh] w-full">
            <div className="flex justify-between items-center gap-x-36 w-full">
                
                <img
                    ref={refImage}
                    src={educator}
                    alt="Educador"
                    className={`w-88 h-[28rem] image-hover rounded-lg cursor-pointer transition-all duration-1000 ease-out ${
                        isImageInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                    }`}
                    style={{ transform: isImageInView ? `translateY(${offsetY}px)` : 'translateY(0)' }}
                />

                <article className="flex flex-col w-full items-center gap-y-24">
                    <p
                        ref={refText}
                        className={`text-4xl transition-all duration-1000 ease-out ${
                            isTextInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                        style={{ transitionDelay: '200ms' }}
                    >
                        Una forma visual, simple y accesible para el proceso de enseñanza de español escrito a personas sordas.
                    </p>

                    <div
                        ref={refTitle}
                        className={`transition-all duration-1000 ease-out ${
                            isTitleInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                        }`}
                        style={{ transitionDelay: '400ms' }}
                    >
                        <TitlePrimary text={"¡Aprendamos Todos!"} />
                    </div>
                </article>
            </div>
        </section>
    )
}

export default IntroductionTemplate
