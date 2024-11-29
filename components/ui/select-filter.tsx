import React from "react";

interface SelectFilterProps {
	value: string; // Aktualna wartość filtra
	onChange: (value: string) => void; // Funkcja do ustawiania wartości
	options: string[]; // Opcje w liście rozwijanej
	className?: string; // Klasa CSS dla stylizacji
	placeholder?: string; // Opcjonalne placeholder
}

const SelectFilter: React.FC<SelectFilterProps> = ({
	value,
	onChange,
	options,
	className = "",
	placeholder = "Select...",
}) => {
	return (
		<select
			value={value}
			onChange={(event) => onChange(event.target.value)}
			className={`rounded-md border px-3 py-2 pr-10 ${className} appearance-none`}
		>
			<option value="">{placeholder}</option>
			{options.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>
	);
};

export default SelectFilter;
