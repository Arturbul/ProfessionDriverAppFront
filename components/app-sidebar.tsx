"use client";

import * as React from "react";
import {
	AudioWaveform,
	BookOpen,
	Bot,
	Command,
	Frame,
	GalleryVerticalEnd,
	Map,
	PieChart,
	Settings2,
	SquareTerminal,
	TruckIcon,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	teams: [
		{
			name: "Profession Driver Profile",
			logo: GalleryVerticalEnd,
			plan: "Enterprise",
		},
	],
	navMain: [
		{
			title: "Driver",
			url: "/dashboard",
			icon: TruckIcon,
			isActive: true,
			items: [
				{
					title: "Dashboard",
					url: "/dashboard",
				},
				{
					title: "Work Log History",
					url: "/dashboard/worklogs",
				},
			],
		},
		{
			title: "Company",
			url: "/dashboard/companies",
			icon: Bot,
			items: [
				{
					title: "Company overview",
					url: "/dashboard/companies/ /details",
				},
				{
					title: "Drivers",
					url: "/dashboard/drivers",
				},
				{
					title: "Employees",
					url: "/dashboard/employees",
				},
				{
					title: "Vehicles",
					url: "/dashboard/vehicles",
				},
				{
					title: "LGVs",
					url: "/dashboard/lgvs",
				},
				{
					title: "Insuraces",
					url: "/dashboard/insurances",
				},
				{
					title: "Vehicle Inspections",
					url: "/dashboard/inspections",
				},
				{
					title: "Companies",
					url: "/dashboard/companies",
				},
			],
		},
		{
			title: "Settings",
			url: "#",
			icon: Settings2,
			items: [
				{
					title: "Driver profile",
					url: "/dashboard/drivers/ /details",
				},
				{
					title: "Employee profile",
					url: "/dashboard/employees/ /details",
				},
				{
					title: "Company profile",
					url: "/dashboard/companies/ /details",
				},
			],
		},
	],
	projects: [],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavProjects projects={data.projects} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
