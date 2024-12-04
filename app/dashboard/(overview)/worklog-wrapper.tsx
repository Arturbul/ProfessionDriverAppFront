"use server";

import { lusitana } from "@/app/ui/fonts";
import { fetchWorkLogData } from "../companies/getData";
import WorkLogCards from "@/app/ui/drivers/worklog-cards";

export default async function WorkLogWrapper() {
	// Pobierz dane serwerowe
	const { isWorkStarted, mileage, workTime } = await fetchWorkLogData();

	// Renderuj karty na kliencie
	return (
		<WorkLogCards
			isWorkStarted={isWorkStarted}
			mileage={mileage}
			workTime={workTime}
		/>
	);
}