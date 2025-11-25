import ScrollIndicator from "../atoms/scrollIndicator"

const ScrollButton = () => {
  const handleScroll = () => {
    window.scrollBy({
      top: window.innerHeight * 0.8,
      behavior: 'smooth'
    })
  }

  return (
    <button
      onClick={handleScroll}
      className="fixed bottom-8 right-8 flex items-center justify-center p-3 hover:opacity-80 transition-opacity duration-200 cursor-pointer bg-white rounded-full shadow-lg z-40"
      aria-label="Scroll down to see more"
    >
      <ScrollIndicator />
    </button>
  )
}

export default ScrollButton
