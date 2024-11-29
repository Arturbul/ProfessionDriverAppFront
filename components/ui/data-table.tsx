"use client";
//https://ui.shadcn.com/docs/components/data-table
import * as React from "react";
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { ExtendedColumnDef } from "@/app/lib/extensions";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FilterComponent from "./datatabe_comp/filter-table";

interface ActionButtonProps {
	label: string;
	onClick: () => void;
}

interface DataTableProps<TData> {
	columns: ExtendedColumnDef<TData>[]; // Kolumny z rozszerzonym typem
	data: TData[];
	actionButtons?: ActionButtonProps[];
}
function generateFilters<TData>(
	table: any,
	columns: ExtendedColumnDef<TData>[]
) {
	return columns
		.filter((col) => col.enableColumnFilter && col.filterMeta)
		.map((col) => {
			if (!col.accessorKey) {
				console.warn("Missing accessorKey for column:", col);
				return null;
			}

			const { type, placeholder, options, title } = col.filterMeta!;

			return (
				<FilterComponent
					key={col.accessorKey}
					column={table.getColumn(col.accessorKey)}
					type={type}
					placeholder={placeholder}
					options={options}
					title={title}
				/>
			);
		})
		.filter(Boolean);
}

export function DataTable<TData>({
	columns,
	data,
	actionButtons = [],
}: DataTableProps<TData>) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [isFiltersVisible, setIsFiltersVisible] = React.useState(false);
	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		filterFns: {
			number: (row, columnId, filterValue) => {
				const rowValue: number = row.getValue(columnId);
				return rowValue >= Number(filterValue);
			},
		},
		state: {
			sorting,
			columnFilters,
			columnVisibility,
		},
	});

	const toggleFiltersVisibility = () => {
		setIsFiltersVisible(!isFiltersVisible);
	};
	return (
		<div>
			<Button
				onClick={toggleFiltersVisibility}
				variant="outline"
				className="ml-auto bg-gray-100"
			>
				{isFiltersVisible ? "Hide Filters" : "Show Filters"}
			</Button>

			<div
				className={`filters flex flex-wrap items-center py-4 gap-4 transition-all duration-300 ease-in-out overflow-hidden ${
					isFiltersVisible ? "opacity-100 max-h-screen" : "opacity-0 max-h-0"
				}`}
			>
				{isFiltersVisible && (
					<>
						{generateFilters(table, columns).map((filter, index) => (
							<div key={index} className="basis-full sm:basis-1/4 md:basis-1">
								{filter}
							</div>
						))}
					</>
				)}
			</div>
			<div className="flex items-center py-4">
				<div className="flex gap-4">
					{actionButtons.map((button, index) => (
						<Button
							key={index}
							onClick={button.onClick}
							variant="outline"
							className="ml-auto"
						>
							{button.label}
						</Button>
					))}
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							Columns
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="rounded-md border overflow-x-hidden md:overflow-x-auto w-full sm:w-full md:w-auto">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex justify-between">
				<div className="flex items-center justify-start space-x-2 py-4">
					<p className="ml-1 text-sm">Total: {data.length}</p>
				</div>
				<div className="flex items-center justify-end space-x-2 py-4">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
