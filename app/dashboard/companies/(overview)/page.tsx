"use client";
import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { useActionButtons } from "./tableActionsConfig";
import { CompanyBasicDTO, getCompaniesBasicData } from "../getData";

export default function CompaniesPage() {
	// Explicitly type the state
	const [data, setData] = useState<CompanyBasicDTO[]>([]);
	const actionButtons = useActionButtons();
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		async function fetchData() {
			const fetchedData = await getCompaniesBasicData();
			setData(fetchedData);
			setIsLoading(false);
		}
		fetchData();
	}, []);

	return (
		<div className="container mx-auto py-10">
			<DataTable
				columns={columns}
				data={data}
				actionButtons={actionButtons}
				isLoading={isLoading}
			/>
		</div>
	);
}
