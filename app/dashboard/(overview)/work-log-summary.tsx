import LatestWorkLogs from "@/app/ui/drivers/latest-worklogs";
import { getLatestWorkLogs } from "../companies/getData";

export default async function LatestWorkLogsSummary() {
	const worklogs = await getLatestWorkLogs(5);

	return <LatestWorkLogs workLogs={worklogs} />;
}
