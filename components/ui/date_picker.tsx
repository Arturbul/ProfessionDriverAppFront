import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

type CalendarFilterProps = {
	selectedDate?: Date;
	onDateChange: (date?: Date) => void;
};

export const DatePicker: React.FC<CalendarFilterProps> = ({
	selectedDate,
	onDateChange,
}) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className={`w-36 justify-start font-normal ${
						!selectedDate && "text-muted-foreground"
					}`}
				>
					{selectedDate ? format(selectedDate, "LLL dd, y") : "Select a date"}
					<CalendarIcon />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					selected={selectedDate}
					onSelect={(date) => onDateChange(date)}
					disabled={(date) =>
						date > new Date() || date < new Date("1900-01-01")
					}
				/>
			</PopoverContent>
		</Popover>
	);
};
