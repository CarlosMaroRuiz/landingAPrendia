import DecoratedLayout from "../../common/iu/components/decoratedLayout";
import useInView from "../../hooks/useInView"
import ContentCard from "../molecule/contentCard"
import feat1 from "../../../public/img/feat-1.png"
import feat2 from "../../../public/img/feat-2.png"
import feat3 from "../../../public/img/feat-3.png"

const FeatureTemplate = () => {
    const [ref, isInView] = useInView()

    return (
        <div ref={ref} className={`transition-all duration-1500 ease-in-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
            <DecoratedLayout>
                <h2 className="text-3xl md:text-5xl w-full text-pink-ia font-extrabold text-center flex flex-wrap justify-center mb-4">
                    Características
                </h2>
                <div className="w-full max-w-6xl px-2 md:px-8">
                    <ContentCard
                        urlImage={feat1}
                        titulo="Ejercicios interactivos"
                        parrafo="Los ejercicios interactivos de la aplicación permiten al usuario aprender de forma dinámica, convirtiendo las actividades tradicionales en experiencias digitales que facilitan la comprensión."
                        alineacion="imagen-texto"
                        delay={200}
                    />

                    <ContentCard
                        urlImage={feat2}
                        titulo="Aprende a tu ritmo"
                        parrafo="El enfoque de la aplicación permite al usuario aprender a su propio ritmo, ofreciendo actividades diseñadas para adaptarse a su avance y facilitar un proceso de aprendizaje práctico y personalizado."
                        alineacion="texto-imagen"
                        delay={400}
                    />

                    <ContentCard
                        urlImage={feat3}
                        titulo="Diseño amigable e intuitivo"
                        parrafo="Es una herramienta tecnológica pensada para facilitar el proceso de alfabetización en personas sordas, con métodos adaptados a su forma de comunicación y aprendizaje."
                        alineacion="imagen-texto"
                        delay={600}
                    />
                </div>
            </DecoratedLayout>
        </div>
    )
}

export default FeatureTemplate
