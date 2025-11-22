import up from "../../../public/img/UP.png"
import secretaria from "../../../public/img/secretaria.png"

const Footer = () => {
    return (
        <footer className="bg-green-ia w-full mt-7 py-4 px-4 sm:px-8 md:px-12 lg:px-16">
            <p className="w-full text-white text-center font-semibold text-lg sm:text-xl md:text-2xl">
                Equipo de desarrollo
            </p>

            <section className="w-full justify-center sm:justify-evenly flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mt-6 sm:mt-10 md:mt-12 lg:mt-16">
                <img src={up} alt="Logo Universidad Politécnica de Chiapas" loading="lazy" className="w-40 sm:w-56 md:w-72 lg:w-96 h-auto" />
                <img src={secretaria} alt="Logo Secretaría de Educación de Chiapas" loading="lazy" className="w-40 sm:w-56 md:w-72 lg:w-96 h-auto" />
            </section>
        </footer>
    )
}

export default Footer
