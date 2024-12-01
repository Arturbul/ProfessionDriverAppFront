// Client-side component
"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { ActionItem } from "@/app/lib/utils";

const ActionsDropdown = ({ actions }: { actions: ActionItem[] }) => {
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
};

export default ActionsDropdown;
