import DecoratedLayout from "../../common/iu/components/decoratedLayout"
import ContactForm from "../organism/contactForm"
import useInView from "../../hooks/useInView"

const InterestTemplate = () => {
    const [refTitle, isTitleInView] = useInView()
    const [refText, isTextInView] = useInView()
    const [refForm, isFormInView] = useInView()

    return (
        <div className="w-full">
            <DecoratedLayout>
                <h2
                    ref={refTitle}
                    className={`text-3xl md:text-5xl w-full text-pink-ia font-extrabold text-center flex flex-wrap justify-center mb-4 transition-all duration-1000 ease-out ${
                        isTitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                    }`}
                >
                    Me interesa
                </h2>
                <p
                    ref={refText}
                    className={`text-base md:text-2xl w-full text-center mt-4 px-2 transition-all duration-1000 ease-out ${
                        isTextInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                    style={{ transitionDelay: '200ms' }}
                >
                    Regístrate para ponernos en contacto contigo y enviarte más información.
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
