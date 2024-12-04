import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import { lusitana } from "@/app/ui/fonts";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { Suspense } from "react";
import {
	RevenueChartSkeleton,
	LatestInvoicesSkeleton,
} from "@/app/ui/skeletons";
import { CardsSkeleton } from "@/app/ui/skeletons";
import { Metadata } from "next";
import CardWrapper from "./card-wrapper";
import DistanceChart from "./distance-chart";
import LatestWorkLogsSummary from "./work-log-summary";
import WorkLogWrapper from "./worklog-wrapper";

export const metadata: Metadata = {
	title: "Dashboard",
};

export default async function Page() {
	return (
		<>
			<h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
				Dashboard
			</h1>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				<Suspense fallback={<CardsSkeleton />}>
					<WorkLogWrapper />
				</Suspense>
			</div>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				<Suspense fallback={<CardsSkeleton />}>
					<CardWrapper />
				</Suspense>
			</div>
			<div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
				<Suspense fallback={<RevenueChartSkeleton />}>
					<DistanceChart />
				</Suspense>
				<Suspense fallback={<LatestInvoicesSkeleton />}>
					<LatestWorkLogsSummary />
				</Suspense>
			</div>
		</>
	);
}
