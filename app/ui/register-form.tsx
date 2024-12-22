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
	UserIcon,
	AtSymbolIcon,
	KeyIcon,
	IdentificationIcon,
	ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Validation schema
const formSchema = z.object({
	userName: z
		.string()
		.min(2, { message: "User name must be at least 2 characters long." }),
	email: z.string().email({ message: "Must be a valid email address." }),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters long." }),
	firstName: z.string().min(1, { message: "First name is required." }),
	lastName: z.string().min(1, { message: "Last name is required." }),
});

export function RegistrationForm() {
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [isPending, setIsPending] = useState(false);
	const router = useRouter();

	// Initialize form
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			userName: "",
			email: "",
			password: "",
			firstName: "",
			lastName: "",
		},
	});

	// Define submit handler
	async function onSubmit(values: z.infer<typeof formSchema>) {
		setErrorMessage(null); // Clear previous errors
		setIsPending(true);
		try {
			const apiUrl = process.env.NEXT_PUBLIC_API_URL;
			// Send registration request
			const response = await fetch(`${apiUrl}/auth/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			});

			if (!response.ok) {
				const contentType = response.headers.get("Content-Type");
				if (contentType && contentType.includes("application/json")) {
					console.log(contentType);
					const errorData = await response.json();
					throw new Error(errorData.message || "Register failed");
				} else {
					const errorData = await response.text();
					throw new Error(errorData || "Register failed");
				}
			}
			const data = await response.json();
			document.cookie = `auth_token=${data.token}; path=/`;

			router.push("/dashboard");
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
					<h1 className="mb-3 text-2xl font-bold">Create your account</h1>
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<div className="relative">
										<Input
											type="text"
											placeholder="Enter your first name"
											{...field}
											className="pl-10"
										/>
										<IdentificationIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<div className="relative">
										<Input
											type="text"
											placeholder="Enter your last name"
											{...field}
											className="pl-10"
										/>
										<IdentificationIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="userName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>User Name</FormLabel>
								<FormControl>
									<div className="relative">
										<Input
											type="text"
											placeholder="Enter your user name"
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
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<div className="relative">
										<Input
											type="email"
											placeholder="Enter your email"
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
											placeholder="Enter your password"
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
						Register <ArrowRightIcon className="ml-2 h-5 w-5" />
					</Button>
					<div className="mt-4 text-center">
						<span className="text-sm text-gray-600">
							Already have an account?{" "}
							<a href="/login" className="text-blue-600 hover:underline">
								Back to log in
							</a>
						</span>
					</div>
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
