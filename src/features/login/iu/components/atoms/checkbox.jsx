export default function Checkbox({ label, checked, onChange }) {
return (
<label className="flex items-center gap-2 cursor-pointer select-none text-[#374151] font-medium">
<input
type="checkbox"
checked={checked}
onChange={onChange}
className="w-4 h-4 border border-[#D1D5DB] rounded bg-white focus:ring-2 focus:ring-blue-500"
/>
{label}
</label>
);
}