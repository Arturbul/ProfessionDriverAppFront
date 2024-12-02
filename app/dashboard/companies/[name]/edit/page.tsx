import { cookies } from "next/headers";
import { CompanyForm } from "../../../../ui/companies/forms/company-from";
import { getCompanyBasicData } from "../../getData";

export default async function EditCompanyPage({
	params,
}: {
	params: { name?: string };
}) {
	const cookieStore = cookies();
	const token = cookieStore.get("auth_token")?.value;
	const companyName = params.name;

	const companyData = await getCompanyBasicData(companyName);
	return (
		<div className="container mx-auto mt-8">
			<CompanyForm
				authToken={token || ""}
				initialData={companyData}
				isEditMode={true}
			/>
		</div>
	);
}
