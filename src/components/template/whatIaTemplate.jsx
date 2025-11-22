import logo from "../../../public/img/educador.png"
import DecoratedLayout from "../../common/iu/components/decoratedLayout"
import useInView from "../../hooks/useInView"

const WhatIaTemplate = () => {
    const [ref, isInView] = useInView()
    const [refTitle, isTitleInView] = useInView()
    const [refContent, isContentInView] = useInView()

    return (
        <DecoratedLayout>
        <div ref={ref} className={`transition-all duration-1500 ease-in-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
            <h2
                ref={refTitle}
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl w-full text-pink-ia font-extrabold text-center flex flex-wrap justify-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 transition-all duration-1000 ease-out ${
                    isTitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                }`}
            >
                ¿Qué es APREND
                <span className="text-green-ia">IA</span>
                ?
            </h2>

            <section
                ref={refContent}
                className={`flex flex-col-reverse sm:flex-row items-center gap-6 sm:gap-x-10 md:gap-x-16 lg:gap-x-20 transition-all duration-1000 ease-out ${
                    isContentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: '300ms' }}
            >
                <p className="text-base sm:text-lg md:text-2xl lg:text-3xl text-justify leading-relaxed">
                    APREND<span className="text-pink-ia">IA</span> es una aplicación diseñada especialmente para apoyar en el proceso de alfabetización a personas sordas en el Estado de Chiapas, teniendo como premisa la educación bilingüe bicultural, centrándose en la enseñanza del español escrito como segunda lengua.
                </p>

                <img src={logo} alt="Educador de APRENDIA enseñando lengua de señas" loading="lazy" className="h-40 sm:h-48 md:h-72 lg:h-[29rem] w-auto" />
            </section>
        </div>
        </DecoratedLayout>
    )
}

export default WhatIaTemplate
