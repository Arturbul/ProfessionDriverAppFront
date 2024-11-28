import React from "react";
import { Input } from "@/components/ui/input";
import SelectFilter from "../select-filter";
interface FilterComponentProps {
	column: any;
	placeholder?: string;
	type: "text" | "number" | "number-range" | "select";
	options?: string[];
	title?: string; // Dodaj pole dla tytułu
}

const FilterComponent: React.FC<FilterComponentProps> = ({
	column,
	placeholder = "Filter...",
	type,
	options,
	title,
}) => {
	return (
		<div className="flex flex-col space-y-2 max-w-sm">
			{/* Tytuł filtra */}
			{title && <span className="text-sm text-gray-700">{title}</span>}

			{/* Filtry dla różnych typów */}
			{type === "select" && (
				<SelectFilter
					value={(column?.getFilterValue() as string) ?? ""}
					onChange={(value) => column?.setFilterValue(value)}
					options={options ?? []}
					placeholder={placeholder}
					className="max-w-sm"
				/>
			)}

			{type === "number" && (
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
			)}

			{type === "number-range" &&
				(() => {
					const columnFilterValue = column.getFilterValue() || {}; // Wartości zakresu
					const { from, to } = columnFilterValue;

					return (
						<div className="flex items-center space-x-2">
							<Input
								type="number"
								placeholder="From"
								value={from ?? ""}
								onChange={(event) => {
									const value = event.target.value;
									column?.setFilterValue({
										...columnFilterValue,
										from: value ? Number(value) : undefined,
									});
								}}
								className="w-20"
							/>
							<Input
								type="number"
								placeholder="To"
								value={to ?? ""}
								onChange={(event) => {
									const value = event.target.value;
									column?.setFilterValue({
										...columnFilterValue,
										to: value ? Number(value) : undefined,
									});
								}}
								className="w-20"
							/>
						</div>
					);
				})()}

			{type === "text" && (
				<Input
					placeholder={placeholder}
					value={(column?.getFilterValue() as string) ?? ""}
					onChange={(event) => column?.setFilterValue(event.target.value)}
					className="max-w-sm"
				/>
			)}
		</div>
	);
};

export default FilterComponent;
