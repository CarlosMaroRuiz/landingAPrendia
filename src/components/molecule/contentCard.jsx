import useInView from "../../hooks/useInView"

const ContentCard = ({ urlImage, titulo, parrafo, alineacion = "imagen-texto", delay = 0 }) => {
  const isImageFirst = alineacion === "imagen-texto"
  const [ref, isInView] = useInView()

  return (
    <section
      ref={ref}
      className={`flex flex-col-reverse sm:flex-row items-center gap-4 sm:gap-x-8 md:gap-x-12 lg:gap-x-16 w-full mb-10 sm:mb-14 md:mb-16 lg:mb-20 transition-all duration-1000 ease-out ${!isImageFirst ? 'sm:flex-row-reverse' : ''} ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="shrink-0">
        <img src={urlImage} alt={titulo} loading="lazy" className="w-40 h-40 sm:w-48 sm:h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 object-contain" />
      </div>

      <article className="flex flex-col gap-y-2 sm:gap-y-3 md:gap-y-4 lg:gap-y-6 flex-1">
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-green-ia leading-tight text-center sm:text-left">{titulo}</h3>
        <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-700 leading-relaxed text-justify">{parrafo}</p>
      </article>
    </section>
  )
}

export default ContentCard
