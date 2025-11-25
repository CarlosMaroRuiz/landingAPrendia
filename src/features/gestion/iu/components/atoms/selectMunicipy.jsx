export const SelectMunicipy = ({ options = [], value, onChange, isLoading = false }) => {
    return (
        <div className="flex flex-col gap-y-2">
            <h3 className="font-bold text-lg">Municipio</h3>
            <select
                value={value}
                onChange={onChange}
                disabled={isLoading}
                className="px-4 py-2 text-gray-600 bg-[#F5F5F5] rounded-lg border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-pink-ia focus:border-transparent cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <option value="">Cargando municipios...</option>
                ) : (
                    <>
                        <option value="">Todos</option>
                        {
                            options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))
                        }
                    </>
                )}
            </select>
        </div>
    );
};