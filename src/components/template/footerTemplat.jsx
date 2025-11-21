import up from "../../../public/img/UP.png"
import secretaria from "../../../public/img/secretaria.png"

const Footer = () => {
    return (
        <footer className="bg-green-ia w-full mt-7 py-4 px-4 md:px-16">
            <p className="w-full text-white text-center font-semibold text-xl md:text-2xl">
                Equipo de desarrollo
            </p>

            <section className="w-full justify-center md:justify-evenly flex flex-col md:flex-row items-center gap-8 mt-8 md:mt-16">
                <img src={up} alt="Universidad Politécnica" className="w-48 md:w-96 h-auto" />
                <img src={secretaria} alt="Secretaría" className="w-48 md:w-96 h-auto" />
            </section>
        </footer>
    )
}

export default Footer
