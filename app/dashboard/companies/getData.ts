"use server";
import { cookies } from "next/headers";
import {
	getJsonResponse,
	getRolesFromJWT,
	ValidateResponse,
} from "@/lib/utils";
import { Address } from "@/app/lib/interfaces/ValueObjects";

export interface CompanyBasicDTO extends Address {
	name: string;
}
export async function getCompaniesBasicData(): Promise<CompanyBasicDTO[]> {
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

		await ValidateResponse(response);

		let result = await response.json();
		const data: CompanyBasicDTO[] = result;
		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
}
interface CompanyBasic {
	name: string;
	managerUserName?: string;
	address?: {
		city: string;
		street?: string;
		postalCode?: string;
		country?: string;
	};
}

export async function getCompanyBasicData(
	companyName?: string | null
): Promise<CompanyBasic> {
	try {
		const cookieStore = cookies();
		const token = cookieStore.get("auth_token")?.value;

		if (!token) {
			throw new Error("JWT token not found");
		}

		const roles = getRolesFromJWT(token);
		const apiUrl = process.env.NEXT_PUBLIC_API_URL;
		const url = new URL(`${apiUrl}/companies/details`);

		if (roles && roles.includes("Admin") && companyName) {
			url.searchParams.append("name", companyName);
		}

		const response = await fetch(url.toString(), {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});

		const result = await getJsonResponse(response);
		const data: CompanyBasicDTO = result;
		const companyBasic: CompanyBasic = {
			name: data.name,
			address: {
				city: data.city,
				street: data.street,
				postalCode: data.postalCode,
				country: data.country,
			},
		};
		return companyBasic;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
}

export async function fetchCardDataCompanies(companyName?: string | null) {
	try {
		const totalDistance = await getTotalDistance(companyName);
		console.log(totalDistance);
		const PolicyOC = await getPolicyOc(companyName);
		const PolicyAC = await getPolicyAc(companyName);
		const VehicleInspection = await getVehicleInspection(companyName);
		return {
			totalDistance,
			PolicyOC,
			PolicyAC,
			VehicleInspection,
		};
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch card data.");
	}
}

export async function getTotalDistance(
	companyName?: string | null
): Promise<number> {
	try {
		const cookieStore = cookies();
		const token = cookieStore.get("auth_token")?.value;

		if (!token) {
			throw new Error("JWT token not found");
		}

		const roles = getRolesFromJWT(token);
		const apiUrl = process.env.NEXT_PUBLIC_API_URL;
		const url = new URL(`${apiUrl}/worklog/distance`);

		if (roles && roles.includes("Admin") && companyName) {
			url.searchParams.append("companyName", companyName);
		}

		const response = await fetch(url.toString(), {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});

		const result = await getJsonResponse(response, false);
		const data: number = result ?? "343343";

		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
}

export async function getPolicyAc(
	companyName?: string | null
): Promise<string> {
	try {
		const cookieStore = cookies();
		const token = cookieStore.get("auth_token")?.value;

		if (!token) {
			throw new Error("JWT token not found");
		}

		const roles = getRolesFromJWT(token);
		const apiUrl = process.env.NEXT_PUBLIC_API_URL;
		const url = new URL(`${apiUrl}/worklog/distance`);

		if (roles && roles.includes("Admin") && companyName) {
			url.searchParams.append("name", companyName);
		}

		const response = await fetch(url.toString(), {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});

		const result = await getJsonResponse(response);
		const data: string = result;

		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
}

export async function getPolicyOc(
	companyName?: string | null
): Promise<string> {
	try {
		const cookieStore = cookies();
		const token = cookieStore.get("auth_token")?.value;

		if (!token) {
			throw new Error("JWT token not found");
		}

		const roles = getRolesFromJWT(token);
		const apiUrl = process.env.NEXT_PUBLIC_API_URL;
		const url = new URL(`${apiUrl}/worklog/distance`);

		if (roles && roles.includes("Admin") && companyName) {
			url.searchParams.append("name", companyName);
		}

		const response = await fetch(url.toString(), {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});

		const result = await getJsonResponse(response);
		const data: string = result;

		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
}

export async function getVehicleInspection(
	companyName?: string | null
): Promise<string> {
	try {
		const cookieStore = cookies();
		const token = cookieStore.get("auth_token")?.value;

		if (!token) {
			throw new Error("JWT token not found");
		}

		const roles = getRolesFromJWT(token);
		const apiUrl = process.env.NEXT_PUBLIC_API_URL;
		const url = new URL(`${apiUrl}/worklog/distance`);

		if (roles && roles.includes("Admin") && companyName) {
			url.searchParams.append("name", companyName);
		}

		const response = await fetch(url.toString(), {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});

		const result = await getJsonResponse(response);
		const data: string = result;

		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
}
