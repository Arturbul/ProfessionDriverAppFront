"use client";

import { useRouter } from "next/navigation";

export function useActionButtons() {
	const router = useRouter();

	return [
		{
			label: "Create",
			onClick: () => {
				router.push("companies/create");
			},
		},
		{
			label: "Export",
			onClick: () => {
				console.log("Export action triggered");
			},
		},
	];
}
