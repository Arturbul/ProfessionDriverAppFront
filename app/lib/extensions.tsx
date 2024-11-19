import { ColumnDef as BaseColumnDef } from "@tanstack/react-table";

export type ExtendedColumnDef<TData> = BaseColumnDef<TData> & {
	accessorKey?: string; // accessorKey musi być opcjonalne
	filterMeta?: {
		type: "text" | "number" | "select";
		placeholder?: string;
		options?: string[];
	};
};
