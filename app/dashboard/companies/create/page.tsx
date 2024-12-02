import { cookies } from "next/headers";
import { CompanyForm } from "./company-from";

export default function CreateCompanyPage() {
	const cookieStore = cookies();
	const token = cookieStore.get("auth_token")?.value;

	return (
		<div className="container mx-auto mt-8">
			<CompanyForm authToken={token || ""} />
		</div>
	);
}
