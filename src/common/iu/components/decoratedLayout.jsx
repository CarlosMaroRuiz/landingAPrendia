import decoracion from "/img/decoracion.png"

const DecoratedLayout = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center py-12">
      <img
        src={decoracion}
        alt=""
        className="w-full mb-8"
      />

      <div className="w-full py-4 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default DecoratedLayout;
