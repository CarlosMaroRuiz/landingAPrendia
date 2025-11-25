const TitlePrimary = ({ text, className = "" }) => { 
    const defaultClasses = `
        text-pink-ia 
        font-black 
        text-2xl 
        sm:text-3xl 
        md:text-4xl 
        lg:text-5xl
    `;

    return (
        <p className={`${defaultClasses} ${className}`}>
            {text}
        </p>
    )
}

export default TitlePrimary