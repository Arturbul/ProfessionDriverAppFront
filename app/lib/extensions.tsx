import { ColumnDef as BaseColumnDef } from "@tanstack/react-table";

export type ExtendedColumnDef<TData> = BaseColumnDef<TData> & {
	accessorKey?: string; // accessorKey musi być opcjonalne
	filterMeta?: {
		type: "text" | "number" | "select" | "number-range" | "date" | "date-range";
		placeholder?: string;
		options?: string[];
		title?: string;
	};
};
