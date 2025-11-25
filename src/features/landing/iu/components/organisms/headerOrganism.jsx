import { useState } from "react"
import logoApr from "/img/LogoApren.png"
import { NavLink } from "../../../../../common/iu/components"
import { motion } from "framer-motion"
import { useSpringAnimation } from "../../hooks/useSpringAnimation"

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const springGentle = useSpringAnimation('gentle')

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springGentle, delay: 0.1 }}
            className="w-full flex items-center flex-row px-4 sm:px-6 md:px-8 lg:px-12 pt-1 pb-2 justify-between border-[#6B7280] border-b fixed top-0 left-0 bg-white z-50"
        >
            <motion.section
                className="flex flex-row items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...springGentle, delay: 0.2 }}
            >
                <img src={logoApr} alt="Logo APRENDIA" className="w-14 h-12 sm:w-16 sm:h-14 md:w-24 md:h-20 lg:w-30 lg:h-26"/>
                <h1 className="flex font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">APREND<span className="text-pink-ia">IA</span></h1>
            </motion.section>

            {/* Botón hamburguesa - visible en móvil y tablet portrait */}
            <motion.button
                className="sm:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
                onClick={toggleMenu}
                aria-label="Menú"
                whileTap={{ scale: 0.95 }}
            >
                <motion.span
                    className="w-6 h-0.5 bg-gray-700"
                    animate={isMenuOpen ? { rotate: 45, translateY: 8 } : { rotate: 0, translateY: 0 }}
                    transition={{ ...springGentle }}
                />
                <motion.span
                    className="w-6 h-0.5 bg-gray-700"
                    animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ ...springGentle }}
                />
                <motion.span
                    className="w-6 h-0.5 bg-gray-700"
                    animate={isMenuOpen ? { rotate: -45, translateY: -8 } : { rotate: 0, translateY: 0 }}
                    transition={{ ...springGentle }}
                />
            </motion.button>

            {/* NavLink desktop y tablet landscape */}
            <motion.div
                className="hidden sm:block"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...springGentle, delay: 0.25 }}
            >
                <NavLink />
            </motion.div>

            {/* Menú móvil */}
            <motion.div
                className="absolute top-full left-0 w-full bg-white border-b border-[#6B7280] shadow-lg sm:hidden"
                initial={{ opacity: 0 }}
                animate={isMenuOpen ? { opacity: 1, visibility: 'visible' } : { opacity: 0, visibility: 'hidden' }}
                transition={{ ...springGentle }}
            >
                <NavLink isMobile={true} onLinkClick={closeMenu} />
            </motion.div>
        </motion.nav>
    )
}

export default Header
