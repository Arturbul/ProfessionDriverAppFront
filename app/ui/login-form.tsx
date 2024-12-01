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
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Validation schema
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
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [isPending, setIsPending] = useState(false);
	const router = useRouter();
	const searchParams = useSearchParams();

	const redirectTo = searchParams.get("redirectTo") || "/dashboard";

	// Initialize form
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			identifier: "",
			password: "",
		},
	});

	// Define submit handler
	async function onSubmit(values: z.infer<typeof formSchema>) {
		setErrorMessage(null); // Clear previous errors
		setIsPending(true);
		try {
			const apiUrl = process.env.NEXT_PUBLIC_API_URL;
			// Send login request
			const response = await fetch(`${apiUrl}/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					identifier: values.identifier,
					password: values.password,
				}),
			});
			if (!response.ok) {
				const contentType = response.headers.get("Content-Type");
				if (contentType && contentType.includes("application/json")) {
					console.log(contentType);
					const errorData = await response.json();
					throw new Error(
						errorData.message || "Invalid credentials, try again."
					);
				} else {
					const errorData = await response.text();
					throw new Error(errorData || "Invalid credentials, try again.");
				}
			}

			const data = await response.json();
			document.cookie = `auth_token=${data.token}; path=/`;

			// Redirect to dashboard
			router.push(redirectTo);
		} catch (error) {
			setErrorMessage((error as Error).message);
		} finally {
			setIsPending(false); // Reset pending state after completion
		}
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
