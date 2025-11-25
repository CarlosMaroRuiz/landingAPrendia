export const RadiusSelect = ({ option, checked, onChange, name = "community" }) => {
    const id = `${name}-${option}`;

    return (
        <div className="flex items-center gap-2">
            <input
                type="radio"
                id={id}
                name={name}
                value={option}
                checked={checked}
                onChange={onChange}
                className="w-4 h-4 text-pink-ia focus:ring-pink-ia cursor-pointer"
            />
            <label
                htmlFor={id}
                className="cursor-pointer text-sm text-gray-700"
            >
                {option}
            </label>
        </div>
    );
};