import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerWithRangeProps = {
	selectedRange: { from?: Date; to?: Date }; // Typ dla zakresu dat
	onSelect: (range: { from?: Date | null; to?: Date | null }) => void; // Funkcja aktualizująca wybór daty
	className?: string;
};

export function DatePickerWithRange({
	selectedRange,
	onSelect,
	className,
}: DatePickerWithRangeProps) {
	const [date, setDate] = React.useState<DateRange | undefined>({
		from: selectedRange.from,
		to: selectedRange.to,
	});

	// Aktualizacja stanu po wybraniu nowego zakresu daty
	const handleSelect = (newDateRange: DateRange | undefined) => {
		setDate(newDateRange);
		if (newDateRange) {
			onSelect({ from: newDateRange.from, to: newDateRange.to });
		}
	};

	return (
		<div className={cn("grid gap-2", className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={"outline"}
						className={cn(
							"w-[300px] justify-start text-left font-normal",
							!date && "text-muted-foreground"
						)}
					>
						<CalendarIcon />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, "LLL dd, y")} -{" "}
									{format(date.to, "LLL dd, y")}
								</>
							) : (
								format(date.from, "LLL dd, y")
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={date?.from}
						selected={date}
						onSelect={handleSelect} // Przekazywanie funkcji do obsługi wyboru daty
						numberOfMonths={2}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
