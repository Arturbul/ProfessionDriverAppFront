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
import { getActionsForPayment } from "./actionsConfig";
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
		header: ({ column }) => (
			<div className="text-left">
				<DataTableColumnHeader column={column} title="Status" />
			</div>
		),
		enableColumnFilter: true,
		filterMeta: {
			title: "Status",
			type: "select",
			options: ["pending", "processing", "success", "failed"],
			placeholder: "All",
		},
		filterFn: (row, columnId, filterValue) => {
			if (filterValue === "All") return true; // Brak filtrowania
			const rowValue = row.getValue(columnId);
			return rowValue === filterValue; // Filtruj po dokładnej wartości
		},
	},
	{
		accessorKey: "email",
		header: ({ column }) => (
			<div className="text-left">
				<DataTableColumnHeader column={column} title="Email" />
			</div>
		),
		enableColumnFilter: true,
		filterMeta: {
			title: "Email",
			type: "text",
			placeholder: "Filter emails...",
		},
		filterFn: (row, columnId, filterValue) => {
			const rowValue = row.getValue(columnId)?.toString()?.toLowerCase() ?? "";
			return rowValue.includes(filterValue.toLowerCase()); // Filtruj po fragmencie tekstu
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
			const rowValue: number = row.getValue(columnId);
			const { from, to } = filterValue || {};
			if (from != null && rowValue < from) return false;
			if (to != null && rowValue > to) return false;
			return true; // Spełnia warunki
		},
		filterMeta: {
			title: "Amount",
			type: "number-range",
			placeholder: "Filter range...",
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const actions = getActionsForPayment(row.original);
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
