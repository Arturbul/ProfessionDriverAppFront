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
import { useState } from "react";
import { useRouter } from "next/navigation";

// Validation schema
const companySchema = z.object({
	name: z
		.string()
		.min(2, { message: "Company name must be at least 2 characters long." }),
	managerUserName: z.string().min(2, {
		message: "Manager username must be at least 2 characters long.",
	}),
	address: z.object({
		city: z.string().min(1, { message: "City is required." }),
		street: z.string().optional(),
		postalCode: z.string().optional(),
		country: z.string().optional(),
	}),
});
interface CompanyFormProps {
	authToken: string;
}
export function CompanyForm({ authToken }: CompanyFormProps) {
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [isPending, setIsPending] = useState(false);
	const router = useRouter();

	// Initialize form
	const form = useForm<z.infer<typeof companySchema>>({
		resolver: zodResolver(companySchema),
		defaultValues: {
			name: "",
			managerUserName: "",
			address: {
				city: "",
				street: "",
				postalCode: "",
				country: "",
			},
		},
	});

	// Define submit handler
	async function onSubmit(values: z.infer<typeof companySchema>) {
		setErrorMessage(null);
		setIsPending(true);
		try {
			const apiUrl = process.env.NEXT_PUBLIC_API_URL;
			const response = await fetch(`${apiUrl}/companies`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${authToken}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(values),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Company creation failed");
			}

			router.push("/dashboard");
		} catch (error) {
			setErrorMessage((error as Error).message);
		} finally {
			setIsPending(false);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<div className="rounded-lg bg-gray-50 px-6 pb-4 pt-8">
					<h1 className="mb-3 text-2xl font-bold">Create Company Profile</h1>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Company Name</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="Enter company name"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="managerUserName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Manager Username</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="Enter manager username"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<h2 className="mt-4 text-lg font-semibold">Address</h2>
					<FormField
						control={form.control}
						name="address.city"
						render={({ field }) => (
							<FormItem>
								<FormLabel>City</FormLabel>
								<FormControl>
									<Input type="text" placeholder="Enter city" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="address.street"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Street</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="Enter street (optional)"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="address.postalCode"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Postal Code</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="Enter postal code (optional)"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="address.country"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Country</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="Enter country (optional)"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="mt-4 w-full"
						aria-disabled={isPending}
					>
						Create Company
					</Button>
					{errorMessage && (
						<div className="mt-4 text-sm text-red-500">{errorMessage}</div>
					)}
				</div>
			</form>
		</Form>
	);
}