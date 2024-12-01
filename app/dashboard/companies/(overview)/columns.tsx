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

import {
	filterDate,
	filterDateRange,
	filterNumberRange,
	filterSelect,
	filterText,
} from "@/app/lib/table-filters";
import { getDateCell } from "@/components/ui/datatabe_comp/table-cell-filters";
import { getActionsForCompany } from "./rowActionsConfig";
import ActionsDropdown from "@/app/ui/actions-dropdown";

export interface Address {
	city: string;
	street: string;
	postalCode: string;
	country: string;
}

export interface CompanyBasic {
	name: string;
	address: Address;
}

export const columns: ExtendedColumnDef<CompanyBasic>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => (
			<div className="text-left">
				<DataTableColumnHeader column={column} title="Name" />
			</div>
		),
		enableColumnFilter: true,
		filterMeta: {
			title: "Name",
			type: "text",
			placeholder: "Filter by name...",
		},
		filterFn: filterText,
	},
	{
		accessorKey: "address.city",
		header: ({ column }) => (
			<div className="text-left">
				<DataTableColumnHeader column={column} title="City" />
			</div>
		),
		enableColumnFilter: true,
		filterMeta: {
			title: "City",
			type: "text",
			placeholder: "Filter by city...",
		},
		filterFn: filterText,
	},
	{
		accessorKey: "address.street",
		header: ({ column }) => (
			<div className="text-left">
				<DataTableColumnHeader column={column} title="Street" />
			</div>
		),
		enableColumnFilter: true,
		filterMeta: {
			title: "Street",
			type: "text",
			placeholder: "Filter by street...",
		},
		filterFn: filterText,
	},
	{
		accessorKey: "address.postalCode",
		header: ({ column }) => (
			<div className="text-left">
				<DataTableColumnHeader column={column} title="Postal Code" />
			</div>
		),
		enableColumnFilter: true,
		filterMeta: {
			title: "Postal Code",
			type: "text",
			placeholder: "Filter by postal code...",
		},
		filterFn: filterText,
	},
	{
		accessorKey: "address.country",
		header: ({ column }) => (
			<div className="text-left">
				<DataTableColumnHeader column={column} title="Country" />
			</div>
		),
		enableColumnFilter: true,
		filterMeta: {
			title: "Country",
			type: "select",
			options: ["PL", "USA", "UK", "Canada", "Germany", "France"],
			placeholder: "Filter by country...",
		},
		filterFn: filterSelect,
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const actions = getActionsForCompany(row.original);
			return <ActionsDropdown actions={actions} />;
		},
	},
];
