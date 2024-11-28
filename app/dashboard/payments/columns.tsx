"use client";

import { ExtendedColumnDef } from "@/app/lib/extensions";
import { ArrowUpDown } from "lucide-react";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DataTableColumnHeader from "@/components/ui/datatabe_comp/columnheader";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
	id: string;
	amount: number;
	status: "pending" | "processing" | "success" | "failed";
	email: string;
};

export const columns: ExtendedColumnDef<Payment>[] = [
	{
		accessorKey: "status",
		header: "Status",
		enableColumnFilter: true,
		filterMeta: {
			type: "select",
			options: ["pending", "processing", "success", "failed"],
			placeholder: "All",
		},
	},
	{
		accessorKey: "email",
		header: "Email",
		enableColumnFilter: true,
		filterMeta: {
			type: "text",
			placeholder: "Filter emails...",
		},
	},
	{
		accessorKey: "amount",
		header: ({ column }) => (
			<div className="text-center">
				<DataTableColumnHeader column={column} title="Amount" />
			</div>
		),
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("amount"));
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(amount);

			return <div className="text-center font-medium">{formatted}</div>;
		},
		enableColumnFilter: true,
		filterFn: (row, columnId, filterValue) => {
			// `filterValue` to wartość z komponentu
			const rowValue: number = row.getValue(columnId);
			return rowValue >= Number(filterValue); // Filtruj na podstawie wartości liczbowej
		},
		filterMeta: {
			type: "number",
			placeholder: "Filter amount...",
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const payment = row.original;
			type ActionItem =
				| {
						type: "action";
						label: string;
						onClick: (params?: any) => void;
						params?: any;
				  }
				| { type: "separator" };

			const actions: ActionItem[] = [
				{
					type: "action",
					label: "Copy payment ID",
					onClick: (params) => {
						navigator.clipboard.writeText(params?.id);
						console.log("Copied payment ID:", params?.id);
					},
					params: { id: payment.id },
				},
				{
					type: "separator",
				},
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
				{
					type: "separator",
				},
				{
					type: "action",
					label: "Refund payment",
					onClick: (params) => console.log("Refund payment:", params?.email),
					params: { email: payment.email },
				},
			];
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						{actions.map((action, index) => {
							if (action.type === "action") {
								return (
									<DropdownMenuItem
										key={index}
										onClick={() => action.onClick(action.params)}
									>
										{action.label}
									</DropdownMenuItem>
								);
							}
							return <DropdownMenuSeparator key={index} />;
						})}
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
