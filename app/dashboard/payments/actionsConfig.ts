import { ActionItem } from "@/app/lib/utils";
import { Payment } from "./columns";

export const getActionsForPayment = (payment: Payment): ActionItem[] => [
	{
		type: "action",
		label: "Copy payment ID",
		onClick: (params) => {
			navigator.clipboard.writeText(params?.id);
			console.log("Copied payment ID:", params?.id);
		},
		params: { id: payment.id },
	},
	{ type: "separator" },
	{
		type: "action",
		label: "View customer",
		onClick: (params) => console.log("View customer:", params?.customer),
		params: { customer: payment.status },
	},
	{
		type: "action",
		label: "View payment details",
		onClick: (params) => console.log("View payment details:", params),
		params: { id: payment.id, status: payment.status },
	},
	{ type: "separator" },
	{
		type: "action",
		label: "Refund payment",
		onClick: (params) => console.log("Refund payment:", params?.email),
		params: { email: payment.email },
	},
];
