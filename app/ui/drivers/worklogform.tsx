"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MapPinIcon, TruckIcon, UserIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { DatePicker } from "@/components/ui/date_picker";
import { DateTimePicker } from "@/components/ui/datetime-picker";

const formSchema = z.object({
	registrationNumber: z
		.string()
		.min(1, { message: "Registration number is required." })
		.max(12, {
			message: "Registration number must be at most 12 characters long.",
		}),
	registrationNumberTrailer: z
		.string()
		.min(0, { message: "Trailer registration number is optional." })
		.max(12, {
			message: "Registration number must be at most 12 characters long.",
		})
		.optional(),
	logTime: z.date({
		required_error: "Log time is required.",
	}),
	place: z.string({ required_error: "Log time is required." }),
	mileage: z.preprocess(
		(value) => (typeof value === "string" ? parseFloat(value) : value),
		z.number().nonnegative({ message: "Mileage must be a positive number." }),
		{ required_error: "Log time is required." }
	),
	driverUserName: z.string().optional(),
});

type WorkLogFormProps = {
	type: "start" | "stop";
	onSubmit: (data: z.infer<typeof formSchema>) => void;
	isPending: boolean;
};

export function WorkLogForm({ type, onSubmit, isPending }: WorkLogFormProps) {
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	// Initialize form
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			registrationNumber: undefined,
			registrationNumberTrailer: undefined,
			logTime: new Date(),
			place: undefined,
			mileage: undefined,
			driverUserName: undefined,
		},
	});

	const handleSubmit = async (values: z.infer<typeof formSchema>) => {
		setErrorMessage(null); // Clear errors
		try {
			onSubmit(values); // Pass data to parent
		} catch (error) {
			setErrorMessage((error as Error).message);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
				<h3 className="text-xl font-bold">
					{type === "start" ? "Start Work Entry" : "Stop Work Entry"}
				</h3>

				{/* Registration Number */}
				<FormField
					control={form.control}
					name="registrationNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Registration Number</FormLabel>
							<FormControl>
								<div className="relative">
									<Input
										type="text"
										placeholder="Enter registration number"
										{...field}
										className="pl-10"
									/>
									<TruckIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Registration Number Trailer */}
				<FormField
					control={form.control}
					name="registrationNumberTrailer"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Trailer Registration Number</FormLabel>
							<FormControl>
								<div className="relative">
									<Input
										type="text"
										placeholder="Enter trailer registration number (optional)"
										{...field}
										className="pl-10"
									/>
									<TruckIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Log Time */}
				<FormField
					control={form.control}
					name="logTime"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Log Time</FormLabel>
							<FormControl>
								<DateTimePicker
									selectedDate={field.value} // Date part from form
									selectedTime={
										field.value
											? `${field.value
													.getHours()
													.toString()
													.padStart(2, "0")}:${field.value
													.getMinutes()
													.toString()
													.padStart(2, "0")}`
											: ""
									} // Extract "HH:mm" in local time
									onDateTimeChange={(date, time) => {
										if (date && time) {
											const [hours, minutes] = time.split(":").map(Number);
											const updatedDate = new Date(date); // Use local date context
											updatedDate.setHours(hours);
											updatedDate.setMinutes(minutes);
											field.onChange(updatedDate); // Update the complete date
										} else {
											field.onChange(undefined); // Reset if no date/time
										}
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Place */}
				<FormField
					control={form.control}
					name="place"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Place</FormLabel>
							<FormControl>
								<div className="relative">
									<Input
										type="text"
										placeholder="Enter place"
										{...field}
										className="pl-10"
									/>
									<MapPinIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Mileage */}
				<FormField
					control={form.control}
					name="mileage"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Mileage</FormLabel>
							<FormControl>
								<Input type="number" placeholder="Enter mileage" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="driverUserName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Driver User Name</FormLabel>
							<FormControl>
								<div className="relative">
									<Input
										type="text"
										placeholder="Enter driver user name"
										{...field}
										className="pl-10"
									/>
									<UserIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{/* TODO dodać user field jak jest adminem ale wypełnione domyslnie userNmae admina */}
				{/* Submit Button */}
				<Button type="submit" className="w-full" aria-disabled={isPending}>
					Submit
				</Button>

				{/* Error Message */}
				{errorMessage && (
					<p className="mt-2 text-sm text-red-500">{errorMessage}</p>
				)}
			</form>
		</Form>
	);
}
