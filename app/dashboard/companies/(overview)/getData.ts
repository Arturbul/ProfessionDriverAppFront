"use server";

import { cookies } from "next/headers";
import { CompanyBasic } from "./columns";

export async function getCompaniBasicData(): Promise<CompanyBasic[]> {
	try {
		const cookieStore = cookies();
		const token = cookieStore.get("auth_token")?.value;

		if (!token) {
			throw new Error("JWT token not found");
		}

		const apiUrl = process.env.NEXT_PUBLIC_API_URL;
		const response = await fetch(`${apiUrl}/companies`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch data: ${response.statusText}`);
		}
		let result = await response.json();
		console.log(result);
		const data: CompanyBasic[] = result;
		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
}
