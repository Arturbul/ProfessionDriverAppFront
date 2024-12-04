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
import { MapPinIcon, TruckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { DatePicker } from "@/components/ui/date_picker";

const formSchema = z.object({
	registrationNumber: z
		.string()
		.min(1, { message: "Registration number is required." })
		.max(12, {
			message: "Registration number must be at most 12 characters long.",
		}),
	logTime: z.date({
		required_error: "Log time is required.",
	}),
	place: z.string().optional(),
	mileage: z
		.number()
		.nonnegative({ message: "Mileage must be a positive number." })
		.optional(),
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
			registrationNumber: "",
			logTime: new Date(),
			place: "",
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

				{/* Log Time */}
				<FormField
					control={form.control}
					name="logTime"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Log Time</FormLabel>
							<FormControl>
								<DatePicker
									selectedDate={field.value}
									onDateChange={(date) => field.onChange(date)}
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
										placeholder="Enter place (optional)"
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
								<Input
									type="number"
									placeholder="Enter mileage (optional)"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

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
