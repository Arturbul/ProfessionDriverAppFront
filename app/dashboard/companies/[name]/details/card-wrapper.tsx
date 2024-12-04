"use server";

import CardList from "@/app/ui/companies/(overview)/cards";
import { fetchCardDataCompanies } from "../../getData";

export default async function CardWrapper() {
	const data = await fetchCardDataCompanies(); // Pobranie danych po stronie serwera

	// Rozdzielenie danych
	const { totalDistance, PolicyOC, PolicyAC, VehicleInspection } = data;

	return (
		<CardList
			totalDistance={totalDistance}
			PolicyOC={PolicyOC}
			PolicyAC={PolicyAC}
			VehicleInspection={VehicleInspection}
		/>
	);
}
