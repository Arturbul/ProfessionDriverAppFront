import AcmeLogo from "@/app/ui/app-logo";
//import LoginForm from "@/app/ui/old_login-form";
import { LoginForm } from "../ui/login-form";
import { Metadata } from "next";
import { RegistrationForm } from "../ui/register-form";

export const metadata: Metadata = {
	title: "Login",
};
export default function RegisterPage() {
	return (
		<main className="flex items-center justify-center md:h-screen">
			<div className="relative mx-auto flex w-full max-w-md flex-col space-y-2.5 p-4 md:-mt-32">
				<div className="flex h-20 w-full items-center rounded-lg bg-stone-900 p-3 md:h-36">
					<div className="w-full text-white md:w-full justify-center align-middle">
						<AcmeLogo />
					</div>
				</div>
				<RegistrationForm />
			</div>
		</main>
	);
}
