import { ActionItem } from "@/app/lib/utils";
import { CompanyBasic } from "./columns";

export const getActionsForCompany = (company: CompanyBasic): ActionItem[] => [
	{
		type: "action",
		label: "View company details",
		onClick: (params) => {
			console.log("View company details:", params?.name);
		},
		params: { name: company.name },
	},
	{ type: "separator" },
	{
		type: "action",
		label: "Edit company",
		onClick: (params) => {
			console.log("Edit company:", params?.name);
			// Tutaj możesz przekierować na stronę edycji lub otworzyć formularz edycji
		},
		params: { name: company.name },
	},
	{ type: "separator" },
	{
		type: "action",
		label: "View company address",
		onClick: (params) => {
			console.log("View company address:", params?.street);
		},
		params: { address: company.street },
	},
];
