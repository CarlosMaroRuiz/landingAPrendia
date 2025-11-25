import { DecoratedLayout, ContactForm } from "../index"
import { useInView } from "../../hooks"

const InterestTemplate = () => {
    const [refTitle, isTitleInView] = useInView()
    const [refText, isTextInView] = useInView()
    const [refForm, isFormInView] = useInView()

    return (
        <div className="w-full">
            <DecoratedLayout>
                <h2
                    ref={refTitle}
                    className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl w-full text-pink-ia font-extrabold text-center flex flex-wrap justify-center mb-4 transition-all duration-1000 ease-out ${
                        isTitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                    }`}
                >
                    Me interesa
                </h2>
                <p
                    ref={refText}
                    className={`text-sm sm:text-base md:text-xl lg:text-2xl w-full text-center mt-4 px-2 transition-all duration-1000 ease-out ${
                        isTextInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                    style={{ transitionDelay: '200ms' }}
                >
                    Registrate para recibir más información de APREND<span className="text-pink-ia">IA</span>.
                </p>

                <div
                    ref={refForm}
                    className={`transition-all duration-1000 ease-out w-full ${
                        isFormInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
                    style={{ transitionDelay: '400ms' }}
                >
                    <ContactForm />
                </div>
            </DecoratedLayout>
        </div>
    )
}

export default InterestTemplate
