import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, ClockIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

type CalendarFilterProps = {
	selectedDate?: Date;
	selectedTime?: string; // New: Selected time as a string in "HH:mm" format
	onDateTimeChange: (date?: Date, time?: string) => void;
};

export const DateTimePicker: React.FC<CalendarFilterProps> = ({
	selectedDate,
	selectedTime,
	onDateTimeChange,
}) => {
	const handleDateChange = (date?: Date) => {
		onDateTimeChange(date, selectedTime); // Pass updated date
	};

	const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const time = event.target.value; // Retrieve time in "HH:mm" format
		onDateTimeChange(selectedDate, time); // Pass updated time
	};

	return (
		<div className="flex  gap-2">
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className={`w-36 justify-start font-normal ${
							!selectedDate && "text-muted-foreground"
						}`}
					>
						{selectedDate ? format(selectedDate, "LLL dd, y") : "Select a date"}
						<CalendarIcon className="ml-2 h-4 w-4" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0 flex" align="start">
					<Calendar
						mode="single"
						selected={selectedDate}
						onSelect={handleDateChange}
						disabled={(date) =>
							date > new Date() || date < new Date("1900-01-01")
						}
					/>
					<Input
						type="time"
						value={selectedTime || ""}
						onChange={handleTimeChange}
						className="w-36 text-lg mt-10 justify-center"
					/>
				</PopoverContent>
			</Popover>

			<Input
				type="time"
				value={selectedTime || ""}
				onChange={handleTimeChange}
				className="w-36 justify-center"
			/>
		</div>
	);
};
