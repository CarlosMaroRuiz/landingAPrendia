import up from "/img/UP.png"
import footerLanding from "/img/foot_landing.png"
const Footer = () => {
    return (
        <footer className="bg-green-ia w-full mt-2 py-1 px-2 sm:px-8 md:px-12 lg:px-24">

            <section className="w-full justify-center sm:justify-evenly flex flex-col sm:flex-row items-center gap-1 sm:gap-8 mt-2 sm:mt-10 md:mt-12 lg:mt-16">
                <img
                    src={footerLanding}
                    alt="Logo Universidad Politécnica de Chiapas"
                    loading="lazy"
                    className="w-20 sm:w-56 md:w-72 lg:w-[700px] xl:w-[850px] h-auto"
                />

            </section>

            <p className="w-full text-white text-center mt-1 text-xs sm:text-lg opacity-90">
                Todos los derechos reservados | © 2025 APRENDIA
            </p>
        </footer>
    )
}

export default Footer
