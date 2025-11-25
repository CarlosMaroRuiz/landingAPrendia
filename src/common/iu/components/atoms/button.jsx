const PrimaryButton = ({ text, onClick, className = "" }) => {
    return (
        <button 
            onClick={onClick} 
            className={`
                rounded-lg bg-pink-ia text-white py-4 px-6 
                font-medium text-xl cursor-pointer 
                
                /* estilos tuyos originales */
                hover:brightness-110
                transition-all duration-200 ease-in-out

                /* efecto premium suave tipo duolingo */
                hover:scale-[1.04]
                active:scale-[0.97]

                /* sombra suave y elegante */
                shadow-[0_6px_14px_rgba(0,0,0,0.12)]
                hover:shadow-[0_8px_20px_rgba(0,0,0,0.18)]

                /* animación micro-bounce sutil */
                hover:animate-[buttonBounce_0.38s_ease-out]

                ${className}
            `}
            style={{ transformOrigin: "center" }}
        >
            {text}
        </button>
    );
}

export default PrimaryButton;
