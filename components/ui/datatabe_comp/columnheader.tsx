"use client";

import React from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type DataTableColumnHeaderProps = {
	column: {
		toggleSorting: (isSortedAsc: boolean) => void;
		getIsSorted: () => "asc" | "desc" | false;
	};
	title: string;
};

const DataTableColumnHeader: React.FC<DataTableColumnHeaderProps> = ({
	column,
	title,
}) => {
	const isSorted = column.getIsSorted();

	return (
		<Button
			variant="ghost"
			onClick={() => column.toggleSorting(isSorted === "asc")}
		>
			{title}
			<ArrowUpDown className="ml-2 h-4 w-4" />
		</Button>
	);
};

export default DataTableColumnHeader;
