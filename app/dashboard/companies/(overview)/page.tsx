"use client";
import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns, CompanyBasic } from "./columns";
import { getCompaniBasicData } from "./getData";
import { useActionButtons } from "./tableActionsConfig";

export default function CompaniesPage() {
	// Explicitly type the state
	const [data, setData] = useState<CompanyBasic[]>([]);
	const actionButtons = useActionButtons();

	useEffect(() => {
		async function fetchData() {
			const fetchedData = await getCompaniBasicData();
			setData(fetchedData);
		}
		fetchData();
	}, []);

	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={data} actionButtons={actionButtons} />
		</div>
	);
}
