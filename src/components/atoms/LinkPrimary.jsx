const LinkPrimary = ({ text, url }) => {

    return <a href={url} className="font-bold text-black text-xl transition-all duration-300 ease-in-out hover:text-pink-ia hover:scale-105 cursor-pointer">{text}</a>
}
export default LinkPrimary;