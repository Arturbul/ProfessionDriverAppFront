import * as React from "react";
import { Input } from "@/components/ui/input";

// Typy danych filtra, mogą być dopasowane w zależności od kolumny
interface FilterComponentProps {
	columnId: string; // Identyfikator kolumny, dla której filtrujemy
	columnFilterValue: string | undefined; // Bieżąca wartość filtru dla tej kolumny
	setFilterValue: (value: string) => void; // Funkcja do ustawiania filtra
}

const FilterComponent: React.FC<FilterComponentProps> = ({
	columnId,
	columnFilterValue,
	setFilterValue,
}) => {
	return (
		<div className="flex items-center space-x-2">
			<Input
				placeholder={`Filter by ${columnId}...`}
				value={columnFilterValue ?? ""}
				onChange={(event) => setFilterValue(event.target.value)}
				className="max-w-sm"
			/>
		</div>
	);
};

export default FilterComponent;
