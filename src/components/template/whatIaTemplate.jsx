import logo from "../../../public/img/logo_xl.png"
import useInView from "../../hooks/useInView"

const WhatIaTemplate = () => {
    const [ref, isInView] = useInView()
    const [refTitle, isTitleInView] = useInView()
    const [refContent, isContentInView] = useInView()

    return (
        <div ref={ref} className={`transition-all duration-1500 ease-in-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
            <h2
                ref={refTitle}
                className={`text-3xl md:text-5xl w-full text-pink-ia font-extrabold text-center flex flex-wrap justify-center mb-8 md:mb-12 transition-all duration-1000 ease-out ${
                    isTitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                }`}
            >
                ¿Qué es APREND
                <span className="text-green-ia">IA</span>
                ?
            </h2>

            <section
                ref={refContent}
                className={`flex flex-col-reverse md:flex-row items-center gap-8 md:gap-x-20 transition-all duration-1000 ease-out ${
                    isContentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: '300ms' }}
            >
                <p className="text-lg md:text-4xl text-justify leading-relaxed">
                    APRENDIA es una aplicación diseñada especialmente para apoyar en el proceso de alfabetización a personas sordas en el Estado de Chiapas, teniendo como premisa la educación bilingüe bicultural, centrándose en la enseñanza del español escrito como segunda lengua.
                </p>

                <img src={logo} alt="Logo APRENDIA" className="h-48 md:h-96 w-auto" />
            </section>
        </div>
    )
}

export default WhatIaTemplate
