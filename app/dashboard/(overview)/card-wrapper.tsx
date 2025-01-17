"use server";

import CardList from "@/app/ui/drivers/cards";
import { fetchCardDataDriver } from "../companies/getData";

export default async function CardWrapper() {
	const data = await fetchCardDataDriver();
	const { distance7Days, distanceMonth, hours7Days, hoursMonth } = data;

	const formatWorkedHours = (hours: number, minutes: number) =>
		`${Math.floor(hours)}:${minutes.toString().padStart(2, "0")}`;
	return (
		<CardList
			distance7Days={distance7Days}
			distanceMonth={distanceMonth}
			hours7Days={formatWorkedHours(hours7Days.hours, hours7Days.minutes)}
			hoursMonth={formatWorkedHours(hoursMonth.hours, hoursMonth.minutes)}
		/>
	);
}
