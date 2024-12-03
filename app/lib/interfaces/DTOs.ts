export type DriverWorkLogSummaryDTO = {
	driverWorkLogId: string;
	startPlace: string | null;
	endPlace: string | null;
	totalDistance: number | null;
	totalHours: number | null;
	vehicleNumber: string | null;
	trailerNumber: string | null;
	vehicleBrand: string | null;
};
