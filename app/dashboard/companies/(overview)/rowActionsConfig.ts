import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import { ActionItem } from "@/app/lib/utils";
import { CompanyBasicDTO } from "../getData";

export const getActionsForCompany = (
	company: CompanyBasicDTO
): ActionItem[] => {
	const router = useRouter(); // Initialize useRouter

	return [
		{
			type: "action",
			label: "View company details",
			onClick: (params) => {
				// Navigate to the details page (relative path)
				router.push(`companies/details/${company.name}`);
			},
			params: { name: company.name },
		},
		{ type: "separator" },
		{
			type: "action",
			label: "Edit company",
			onClick: (params) => {
				// Navigate to the edit page (relative path)
				router.push(`companies/${company.name}/edit`);
			},
			params: { name: company.name },
		},
		{ type: "separator" },
		{
			type: "action",
			label: "View company address",
			onClick: (params) => {
				// Navigate to the address page (relative path)
				router.push(`companies/address/${company.name}`);
			},
			params: { address: company },
		},
	];
};
