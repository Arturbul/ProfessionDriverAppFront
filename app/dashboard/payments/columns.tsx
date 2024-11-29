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
import { DatePickerWithRange } from "@/components/ui/date-picker-range";
import {
	filterDate,
	filterDateRange,
	filterNumberRange,
	filterSelect,
	filterText,
} from "@/app/lib/table-filters";
import { getDateCell } from "@/components/ui/datatabe_comp/table-cell-filters";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
	id: string;
	amount: number;
	status: "pending" | "processing" | "success" | "failed";
	email: string;
	createdAt: Date;
	processed?: Date | null;
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
		filterFn: filterSelect,
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
		filterFn: filterText,
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
				currency: "PLN",
			}).format(amount);

			return <div className="text-center font-medium">{formatted}</div>;
		},
		enableColumnFilter: true,
		filterFn: filterNumberRange,
		filterMeta: {
			title: "Amount",
			type: "number-range",
			placeholder: "Filter range...",
		},
	},
	{
		accessorKey: "createdAt",
		header: ({ column }) => (
			<div className="text-center">
				<DataTableColumnHeader column={column} title="Created" />
			</div>
		),
		enableColumnFilter: true,
		filterMeta: {
			title: "Date",
			type: "date",
			placeholder: "Select a date...",
		},
		cell: ({ row }) => getDateCell(row, "createdAt", true, "none"),
		filterFn: filterDate,
	},
	{
		accessorKey: "processed",
		header: ({ column }) => (
			<div className="text-center">
				<DataTableColumnHeader column={column} title="Processed" />
			</div>
		),
		enableColumnFilter: true,
		filterMeta: {
			title: "Date",
			type: "date-range", // Typ filtra jako zakres dat
			placeholder: "Select date range...",
		},
		cell: ({ row }) => getDateCell(row, "processed", true, "none"),
		filterFn: filterDateRange,
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
function removeTime(date: Date) {
	const newDate = new Date(date);
	newDate.setHours(0, 0, 0, 0); // Ustawiamy godzinę na 00:00:00
	return newDate;
}
