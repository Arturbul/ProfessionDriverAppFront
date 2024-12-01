import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { getActionButtons } from "./tableActionsConfig";
import { getCompaniBasicData } from "./getData";

export default async function CompaniesPage() {
	const data = await getCompaniBasicData();
	const actionButtons = getActionButtons;
	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={data} actionButtons={actionButtons} />
		</div>
	);
}
