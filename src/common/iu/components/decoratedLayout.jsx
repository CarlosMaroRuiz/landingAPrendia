import decoracion from "/img/decoracion.png"

const DecoratedLayout = ({ children }) => {
  return (
    <div className="w-full min-h-fit flex flex-col items-center justify-center py-2 sm:py-4 md:py-8 lg:py-12">
      <img
        src={decoracion}
        alt=""
        className="w-full mb-2 sm:mb-3 md:mb-4 lg:mb-6"
      />

      <div className="w-full py-1 sm:py-2 md:py-3 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default DecoratedLayout;
