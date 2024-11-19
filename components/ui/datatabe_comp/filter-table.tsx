import React from "react";
import { Input } from "@/components/ui/input";
import SelectFilter from "../select-filter";
interface FilterComponentProps {
	column: any; // Typ kolumny z tanstack-react-table
	placeholder?: string;
	type: "text" | "number" | "select"; // Typ danych do filtrowania
	options?: string[]; // Opcje dla typu "select"
}

const FilterComponent: React.FC<FilterComponentProps> = ({
	column,
	placeholder = "Filter...",
	type,
	options,
}) => {
	if (type === "select") {
		return (
			<SelectFilter
				value={(column?.getFilterValue() as string) ?? ""}
				onChange={(value) => column?.setFilterValue(value)}
				options={options ?? []}
				placeholder={placeholder}
				className="max-w-sm"
			/>
		);
	}

	if (type === "number") {
		return (
			<Input
				type="number"
				placeholder={placeholder}
				value={(column?.getFilterValue() as string) ?? ""}
				onChange={(event) => {
					const value = event.target.value;
					column?.setFilterValue(value ? Number(value) : undefined);
				}}
				className="max-w-sm"
			/>
		);
	}

	// Domyślny typ: text
	return (
		<Input
			placeholder={placeholder}
			value={(column?.getFilterValue() as string) ?? ""}
			onChange={(event) => column?.setFilterValue(event.target.value)}
			className="max-w-sm"
		/>
	);
};

export default FilterComponent;
