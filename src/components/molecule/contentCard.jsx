import useInView from "../../hooks/useInView"

const ContentCard = ({ urlImage, titulo, parrafo, alineacion = "imagen-texto", delay = 0 }) => {
  const isImageFirst = alineacion === "imagen-texto"
  const [ref, isInView] = useInView()

  return (
    <section
      ref={ref}
      className={`flex flex-col md:flex-row items-center gap-6 md:gap-x-16 w-full mb-12 md:mb-20 transition-all duration-1000 ease-out ${!isImageFirst ? 'md:flex-row-reverse' : ''} ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="shrink-0">
        <img src={urlImage} alt={titulo} className="w-48 h-48 md:w-96 md:h-96 object-contain" />
      </div>

      <article className="flex flex-col gap-y-3 md:gap-y-6 flex-1">
        <h3 className="text-2xl md:text-4xl font-extrabold text-green-ia leading-tight text-center md:text-left">{titulo}</h3>
        <p className="text-base md:text-2xl text-gray-700 leading-relaxed text-justify">{parrafo}</p>
      </article>
    </section>
  )
}

export default ContentCard
