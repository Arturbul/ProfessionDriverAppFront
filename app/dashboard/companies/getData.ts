"use server";
import { cookies } from "next/headers";
import {
	getJsonResponse,
	getRolesFromJWT,
	ValidateResponse,
} from "@/lib/utils";
import { Address } from "@/app/lib/interfaces/ValueObjects";
import { DistanceData } from "@/app/lib/utils";
import { DriverWorkLogSummaryDTO } from "@/app/lib/interfaces/DTOs";
import { NextResponse } from "next/server";

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

export async function fetchCardDataDriver(driverUserName?: string | null) {
	try {
		const distance7Days = await getDriverDistance(driverUserName, "last7Days");
		const distanceMonth = await getDriverDistance(
			driverUserName,
			"currentMonth"
		);
		const hours7Days = await getDriverWorkedHours(driverUserName, "last7Days");
		const hoursMonth = await getDriverWorkedHours(
			driverUserName,
			"currentMonth"
		);

		return {
			distance7Days,
			distanceMonth,
			hours7Days,
			hoursMonth,
		};
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch card data.");
	}
}

export async function getDriverWorkedHours(
	driverUserName?: string | null,
	filterType?: "last7Days" | "currentMonth" | "currentYear" | "custom",
	startDate?: string | null,
	endDate?: string | null
): Promise<{ hours: number; minutes: number }> {
	try {
		const cookieStore = cookies();
		const token = cookieStore.get("auth_token")?.value;

		if (!token) {
			throw new Error("JWT token not found");
		}

		const apiUrl = process.env.NEXT_PUBLIC_API_URL;
		const url = new URL(`${apiUrl}/drivers/hours`);

		// Dodaj parametry do URL
		if (driverUserName) {
			url.searchParams.append("driverName", driverUserName);
		}
		if (filterType) {
			url.searchParams.append("filterType", filterType);
		}
		if (filterType === "custom" && startDate && endDate) {
			url.searchParams.append("startDate", startDate);
			url.searchParams.append("endDate", endDate);
		}

		const response = await fetch(url.toString(), {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});

		const result = await getJsonResponse(response, false);

		if (!result) {
			throw new Error("No data received from the server");
		}

		return {
			hours: result.hours ?? 0,
			minutes: result.minutes ?? 0,
		};
	} catch (error) {
		console.error("Error fetching worked hours:", error);
		throw error;
	}
}

export async function getDriverDistance(
	driverUserName?: string | null,
	filterType?: "last7Days" | "currentMonth" | "currentYear" | "custom",
	startDate?: string | null,
	endDate?: string | null
): Promise<number> {
	try {
		const cookieStore = cookies();
		const token = cookieStore.get("auth_token")?.value;

		if (!token) {
			throw new Error("JWT token not found");
		}

		const apiUrl = process.env.NEXT_PUBLIC_API_URL;
		const url = new URL(`${apiUrl}/drivers/distance`);

		// Dodaj parametry do URL
		if (driverUserName) {
			url.searchParams.append("driverName", driverUserName);
		}
		if (filterType) {
			url.searchParams.append("filterType", filterType);
		}
		if (filterType === "custom" && startDate && endDate) {
			url.searchParams.append("startDate", startDate);
			url.searchParams.append("endDate", endDate);
		}

		const response = await fetch(url.toString(), {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});

		const result = await getJsonResponse(response, false);

		if (typeof result !== "number") {
			throw new Error("Invalid data received from the server");
		}

		return result;
	} catch (error) {
		console.error("Error fetching distance:", error);
		throw error;
	}
}

export async function getDriverDistanceByYear(
	driverUserName?: string | null
): Promise<DistanceData[]> {
	try {
		const cookieStore = cookies();
		const token = cookieStore.get("auth_token")?.value;

		if (!token) {
			throw new Error("JWT token not found");
		}

		const roles = getRolesFromJWT(token);
		const apiUrl = process.env.NEXT_PUBLIC_API_URL;
		const url = new URL(`${apiUrl}/drivers/distance/year`);

		if (roles && roles.includes("Admin") && driverUserName) {
			url.searchParams.append("driverUserName", driverUserName);
		}

		const response = await fetch(url.toString(), {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});

		const result = await getJsonResponse(response);
		const data: DistanceData[] = result;
		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
}

export async function getLatestWorkLogs(
	count: number,
	driverUserName?: string | null
): Promise<DriverWorkLogSummaryDTO[]> {
	try {
		const cookieStore = cookies();
		const token = cookieStore.get("auth_token")?.value;

		if (!token) {
			throw new Error("JWT token not found");
		}

		const roles = getRolesFromJWT(token);
		const apiUrl = process.env.NEXT_PUBLIC_API_URL;
		const url = new URL(`${apiUrl}/drivers/worklogs/recent`);

		url.searchParams.append("logCount", count.toString());
		if (roles && roles.includes("Admin") && driverUserName) {
			url.searchParams.append("driverUserName", driverUserName);
		}

		const response = await fetch(url.toString(), {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});

		const result = await getJsonResponse(response);
		const data: DriverWorkLogSummaryDTO[] = result;
		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
}

export async function fetchWorkLogData(
	active: boolean = true,
	driverUserName?: string
): Promise<{
	isWorkStarted: boolean;
	mileage: number;
	startTime: Date | null;
	registrationNumber: string;
	registrationNumberTrailer: string;
}> {
	try {
		const cookieStore = cookies();
		const token = cookieStore.get("auth_token")?.value;

		if (!token) {
			throw new Error("JWT token not found");
		}

		const apiUrl = process.env.NEXT_PUBLIC_API_URL;
		const url = new URL(`${apiUrl}/worklog/latest`);

		// Append query parameters
		if (driverUserName) {
			url.searchParams.append("driverUserName", driverUserName);
		}
		if (active !== undefined) {
			url.searchParams.append("active", active.toString());
		}

		const response = await fetch(url.toString(), {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});

		if (response.status === 204) {
			return {
				isWorkStarted: false,
				mileage: 0,
				startTime: null,
				registrationNumber: "",
				registrationNumberTrailer: "",
			};
		}
		if (!response.ok) {
			throw new Error(`Failed to fetch data: ${response.statusText}`);
		}

		const data: {
			driverWorkLogId: string;
			transportUnit: {
				brand: string;
				registrationNumber: string;
				brandTrailer: string;
				registrationNumberTrailer: string;
			};
			startEntry: {
				logTime: string;
				place: string;
				mileage: number;
			} | null;
			endEntry: any;
		} = await response.json();

		return {
			isWorkStarted: data.startEntry !== null,
			mileage: data.startEntry?.mileage || 0,
			startTime: data.startEntry ? new Date(data.startEntry.logTime) : null,
			registrationNumber: data.transportUnit?.registrationNumber || "",
			registrationNumberTrailer:
				data.transportUnit?.registrationNumberTrailer || "",
		};
	} catch (error) {
		console.error("Error fetching work log data:", error);
		throw error;
	}
}
