// app/components/DriverDistanceChart.tsx
"use client";

import { generateYAxisDistance } from "@/app/lib/utils";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import { NoDataChartSkeleton, RevenueChartSkeleton } from "../skeletons";

type DriverDistanceChartProps = {
	distances: { month: string; distance: number }[];
};

export default function DriverDistanceChart({
	distances,
}: DriverDistanceChartProps) {
	const chartHeight = 350;

	// Generowanie osi Y
	const { yAxisLabels, topLabel } = generateYAxisDistance(distances);

	if (!distances || distances.length === 0) {
		return <NoDataChartSkeleton />;
	}

	return (
		<div className="w-full md:col-span-4">
			<h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
				Driver's Distance Overview
			</h2>

			<div className="rounded-xl bg-gray-50 p-4">
				<div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
					<div
						className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
						style={{ height: `${chartHeight}px` }}
					>
						{yAxisLabels.map((label) => (
							<p key={label}>{label}</p>
						))}
					</div>

					{distances.map((month) => (
						<div key={month.month} className="flex flex-col items-center gap-2">
							<div
								className="w-full rounded-md bg-sky-400"
								style={{
									height: `${(chartHeight / topLabel) * month.distance}px`,
								}}
							></div>
							<p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
								{month.month}
							</p>
						</div>
					))}
				</div>
				<div className="flex items-center pb-2 pt-6">
					<CalendarIcon className="h-5 w-5 text-gray-500" />
					<h3 className="ml-2 text-sm text-gray-500">Last 12 months</h3>
				</div>
			</div>
		</div>
	);
}
