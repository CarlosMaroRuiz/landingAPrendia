
import LinkPrimary from "../atoms/LinkPrimary"

const NavLink = ({ isMobile = false, onLinkClick }) => {
   

    const handleLinkClick = () => {
        if (onLinkClick) onLinkClick()
    }

    if (isMobile) {
        return (
            <nav className="flex flex-col items-center gap-4 py-6 px-4">
                <a
                    href="#que-es"
                    onClick={handleLinkClick}
                    className="text-lg font-medium text-gray-700 hover:text-pink-ia transition-colors w-full text-center py-2"
                >
                    ¿Qué es?
                </a>
                <a
                    href="#caracteristicas"
                    onClick={handleLinkClick}
                    className="text-lg font-medium text-gray-700 hover:text-pink-ia transition-colors w-full text-center py-2"
                >
                    Características
                </a>

                 <a
                    href="#me-interesa"
                    onClick={handleLinkClick}
                    className="text-lg font-medium text-gray-700 hover:text-pink-ia transition-colors w-full text-center py-2"
                >
                   Me interesa
                </a>
               
            </nav>
        )
    }

    return (
        <nav className="flex items-center gap-x-10">
            <LinkPrimary text={"¿Qué es?"} url="#que-es" />
            <LinkPrimary text={"Características"} url="#caracteristicas" />
            <LinkPrimary text={"Me interesa"} url="#me-interesa" />
        
        </nav>
    )
}

export default NavLink
