"use server";

import { fetchWorkLogData } from "../companies/getData";
import WorkLogCards from "@/app/ui/drivers/worklog-cards";
import { cookies } from "next/headers";

export default async function WorkLogWrapper() {
	// Pobierz dane serwerowe
	const {
		isWorkStarted,
		mileage,
		startTime,
		registrationNumber,
		registrationNumberTrailer,
	} = await fetchWorkLogData();

	const cookieStore = cookies();
	const token = cookieStore.get("auth_token")?.value;
	return (
		<WorkLogCards
			isWorkStarted={isWorkStarted}
			mileage={mileage}
			startTime={startTime}
			registrationNumber={registrationNumber}
			registrationNumberTrailer={registrationNumberTrailer}
			token={token}
		/>
	);
}
