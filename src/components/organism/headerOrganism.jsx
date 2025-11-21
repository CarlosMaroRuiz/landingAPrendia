import { useState } from "react"
import logoApr from "../../../public/img/LogoApren.png"
import NavLink from "../molecule/navLink"

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    return (
        <nav className="w-full flex items-center flex-row px-4 md:px-8 pt-1 pb-2 justify-between border-[#6B7280] border-b fixed top-0 left-0 bg-white z-50">
            <section className="flex flex-row items-center">
                <img src={logoApr} alt="Logo APRENDIA" className="w-16 h-14 md:w-30 md:h-26"/>
                <h1 className="flex font-bold text-xl md:text-3xl">APREND<span className="text-pink-ia">IA</span></h1>
            </section>

            {/* Botón hamburguesa - solo visible en móvil */}
            <button
                className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
                onClick={toggleMenu}
                aria-label="Menú"
            >
                <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>

            {/* NavLink desktop */}
            <div className="hidden md:block">
                <NavLink />
            </div>

            {/* Menú móvil */}
            <div className={`absolute top-full left-0 w-full bg-white border-b border-[#6B7280] shadow-lg md:hidden transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <NavLink isMobile={true} onLinkClick={closeMenu} />
            </div>
        </nav>
    )
}

export default Header
