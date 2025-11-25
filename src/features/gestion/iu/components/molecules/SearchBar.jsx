import { SearchInput, FilterButton, ExportButton } from '../atoms';

export const SearchBar = ({
  searchValue,
  onSearchChange,
  onFilterClick,
  isFilterActive = false,
  className = ''
}) => {
  return (
    <div className={`flex items-center gap-4 mb-6 ${className} justify-between`}>
      
        <SearchInput
          placeholder="Buscar por nombre, email o identificador..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
 
     <div className='flex gap-x-4'>
       <FilterButton
        onClick={onFilterClick}
        isActive={isFilterActive}
      />
      {
        
        /*
        algun dia se usara esta exportacion
             <ExportButton/>
        */
      }
     
     </div>
     
    </div>
  );
};
