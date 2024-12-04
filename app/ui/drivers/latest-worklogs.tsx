import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import { lusitana } from "@/app/ui/fonts";
import { fetchLatestInvoices } from "@/app/lib/data";
import { DriverWorkLogSummaryDTO } from "@/app/lib/interfaces/DTOs";

interface LatestWorkLogsProps {
	workLogs: DriverWorkLogSummaryDTO[];
}

export default function LatestWorkLogs({ workLogs }: LatestWorkLogsProps) {
	return (
		<div className="flex w-full flex-col md:col-span-4">
			<h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
				Latest Work Logs
			</h2>
			<div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
				<div className="bg-white px-6">
					{workLogs.length === 0 ? (
						<p className="text-gray-500 text-sm text-center py-4">
							No work logs available.
						</p>
					) : (
						workLogs.map((log) => (
							<div
								key={log.driverWorkLogId} // Użyj driverWorkLogId jako klucz
								className={clsx(
									"flex flex-row items-center justify-between py-4",
									{
										"border-t": log !== workLogs[0],
									}
								)}
							>
								<div className="flex flex-col">
									<a
										href={`/worklogs/${log.driverWorkLogId}`}
										className="truncate text-sm font-semibold md:text-base text-blue-500 hover:underline"
									>
										{log.startPlace || "Unknown Start"} →{" "}
										{log.endPlace || "Unknown End"}
									</a>
									<p className="text-sm text-gray-500">
										{log.vehicleBrand || "Unknown Brand"} (
										{log.vehicleNumber || "No Reg"}
										{log.trailerNumber ? ` | ${log.trailerNumber}` : ""})
									</p>
								</div>
								<div className="flex flex-col items-end">
									<p
										className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
									>
										{log.totalDistance
											? `${log.totalDistance.toFixed(1)} km`
											: "N/A"}
									</p>
									<p className="text-sm text-gray-500">
										{log.totalHours
											? `${log.totalHours.toFixed(1)} hrs`
											: "N/A"}
									</p>
								</div>
							</div>
						))
					)}
				</div>
				<div className="flex items-center pb-2 pt-6">
					<ArrowPathIcon className="h-5 w-5 text-gray-500" />
					<h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
				</div>
			</div>
		</div>
	);
}
