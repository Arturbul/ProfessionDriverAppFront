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
import {
	AtSymbolIcon,
	KeyIcon,
	ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { authenticate } from "@/app/lib/actions"; // Assuming this is the same function as before
import { useActionState } from "react";

// Define the schema for form validation
const formSchema = z.object({
	identifier: z
		.string()
		.min(2, { message: "Must be a valid email or username." })
		.refine((value) => value.includes("@") || value.length >= 2, {
			message: "Provide a valid email or username.",
		}),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters." }),
});

export function LoginForm() {
	const [errorMessage, formAction, isPending] = useActionState(
		authenticate,
		undefined
	);

	// Initialize form using react-hook-form with zod validation
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			identifier: "",
			password: "",
		},
	});

	// Define the form submission handler
	async function onSubmit(values: z.infer<typeof formSchema>) {
		const formData = new FormData();
		formData.append("email", values.identifier); //aktualnie obsluga tylo email
		formData.append("password", values.password);

		// Authenticate the user
		await formAction(formData);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<div className="rounded-lg bg-gray-50 px-6 pb-4 pt-8">
					<h1 className="mb-3 text-2xl font-bold">
						Please log in to continue.
					</h1>
					<FormField
						control={form.control}
						name="identifier"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email or Username</FormLabel>
								<FormControl>
									<div className="relative">
										<Input
											type="text"
											placeholder="Enter your email or username"
											{...field}
											className="pl-10"
										/>
										<AtSymbolIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<div className="relative">
										<Input
											type="password"
											placeholder="Enter password"
											{...field}
											className="pl-10"
										/>
										<KeyIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
									</div>
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
						Log in <ArrowRightIcon className="ml-2 h-5 w-5" />
					</Button>
					<div
						className="flex h-8 items-center space-x-1 mt-4"
						aria-live="polite"
						aria-atomic="true"
					>
						{errorMessage && (
							<>
								<ExclamationCircleIcon className="h-5 w-5 text-red-500" />
								<p className="text-sm text-red-500">{errorMessage}</p>
							</>
						)}
					</div>
				</div>
			</form>
		</Form>
	);
}
