import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function ValidateResponse(response: Response) {
	if (!response.ok) {
		const contentType = response.headers.get("Content-Type");
		if (contentType && contentType.includes("application/json")) {
			console.log(contentType);
			const errorData = await response.json();
			throw new Error(errorData.message || "Invalid operation, try again.");
		} else {
			const errorData = await response.text();
			throw new Error(errorData || "Invalid operation, try again.");
		}
	}
}

export function getRolesFromJWT(token: string): string[] | null {
	try {
		const base64Url = token.split(".")[1]; // Bierzemy część payload (druga część tokenu)
		const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Zmieniamy '-' na '+' i '_' na '/' w Base64
		const decodedPayload = JSON.parse(atob(base64)); // Rozkodowujemy Base64 na JSON

		// Wydobycie ról z właściwego pola
		const roles =
			decodedPayload[
				"http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
			];

		// Zwracamy tablicę ról lub null
		return roles ? (Array.isArray(roles) ? roles : [roles]) : null;
	} catch (error) {
		console.error("Error decoding JWT:", error);
		return null;
	}
}

export async function getJsonResponse(response: Response) {
	await ValidateResponse(response);

	const rawResponse = await response.text();
	if (!rawResponse) {
		throw new Error("No data returned from the server.");
	}

	const result = JSON.parse(rawResponse);
	return result;
}
