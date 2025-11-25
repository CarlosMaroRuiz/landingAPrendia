export const UserNotFound = ({className}) =>{
   
      return (
      <div className={`bg-white rounded-lg border border-gray-200 p-8 text-center ${className}`}>
        <p className="text-gray-600">No se encontraron usuarios</p>
      </div>
    );
}
