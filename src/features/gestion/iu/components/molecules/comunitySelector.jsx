import { RadiusSelect } from '../atoms';

export const ComunitySelectors = ({ options = [], value, onChange }) => {
    const allOptions = ["Todos", ...options];

    return (
        <div className='flex flex-col gap-y-2'>
            <h3 className='font-bold text-lg'>Comunidad</h3>
            <div className='grid grid-cols-2 gap-x-4 gap-y-2'>
                {
                    allOptions.map((option) => (
                        <RadiusSelect
                            key={option}
                            option={option}
                            checked={value === option}
                            onChange={(e) => onChange(e.target.value)}
                            name="community"
                        />
                    ))
                }
            </div>
        </div>
    );
};