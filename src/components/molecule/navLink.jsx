import PrimaryButton from "../atoms/button"
import LinkPrimary from "../atoms/LinkPrimary"

const NavLink = ({ isMobile = false, onLinkClick }) => {
    const handleMeInteresa = () => {
        const element = document.getElementById('me-interesa')
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
        if (onLinkClick) onLinkClick()
    }

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
                <button
                    onClick={handleMeInteresa}
                    className="bg-pink-ia text-white py-3 px-6 rounded-lg font-medium text-lg w-full max-w-xs"
                >
                    Me interesa
                </button>
            </nav>
        )
    }

    return (
        <nav className="flex items-center gap-x-10">
            <LinkPrimary text={"¿Qué es?"} url="#que-es" />
            <LinkPrimary text={"Características"} url="#caracteristicas" />
            <PrimaryButton text={"Me interesa"} onClick={handleMeInteresa} />
        </nav>
    )
}

export default NavLink
