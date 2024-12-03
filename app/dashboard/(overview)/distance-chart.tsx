"use server";

import { getDriverDistanceByYear } from "../companies/getData";
import DriverDistanceChart from "@/app/ui/drivers/revenue-chart";

export default async function DistanceChart() {
	const distances = await getDriverDistanceByYear();

	return <DriverDistanceChart distances={distances} />;
}