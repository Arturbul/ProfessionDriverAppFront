"use client";

import { useRouter } from "next/navigation";
import { lusitana } from "@/app/ui/fonts";
import {
	BuildingLibraryIcon,
	GlobeEuropeAfricaIcon,
	TruckIcon,
} from "@heroicons/react/24/outline";

// Ikony
const iconMap = {
	oc: BuildingLibraryIcon,
	ac: BuildingLibraryIcon,
	distance: GlobeEuropeAfricaIcon,
	inspection: TruckIcon,
};

// Typy właściwości
type CardListProps = {
	totalDistance: number;
	PolicyOC: string;
	PolicyAC: string;
	VehicleInspection: string;
};

export default function CardList({
	totalDistance,
	PolicyOC,
	PolicyAC,
	VehicleInspection,
}: CardListProps) {
	const router = useRouter(); // Router klienta

	// Mapowanie tras
	const routes = {
		distance: "",
		inspection: "/dashboard/inspection-details",
		oc: "/dashboard/oc-policy",
		ac: "/dashboard/ac-policy",
	};

	// Obsługa kliknięcia
	const handleClick = (type: "inspection" | "distance" | "ac" | "oc") => {
		const route = routes[type];
		if (route) {
			router.push(route);
		} else {
			console.error(`Route for type "${type}" not defined.`);
		}
	};

	// Render kart
	return (
		<>
			<Card
				key="distance"
				title="Total Driven Distance"
				value={totalDistance}
				type="distance"
				unit="km"
			/>
			<Card
				key="oc"
				title="OC Policy"
				value={PolicyOC}
				type="oc"
				onClick={() => handleClick("oc")}
			/>
			<Card
				key="ac"
				title="AC Policy"
				value={PolicyAC}
				type="ac"
				onClick={() => handleClick("ac")}
			/>
			<Card
				key="inspection"
				title="Vehicle Inspection"
				value={VehicleInspection}
				type="inspection"
				onClick={() => handleClick("inspection")}
			/>
		</>
	);
}

// Komponent pojedynczej karty
function Card({
	title,
	value,
	type,
	onClick,
	unit,
}: {
	title: string;
	value: number | string;
	type: "inspection" | "distance" | "ac" | "oc";
	onClick?: () => void;
	unit?: string;
}) {
	const Icon = iconMap[type];

	return (
		<div className="rounded-xl bg-gray-50 p-2 shadow-sm" onClick={onClick}>
			<div className="flex p-4">
				{Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
				<h3 className="ml-2 text-sm font-medium">{title}</h3>
			</div>
			<p
				className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
			>
				{value} {unit}
			</p>
		</div>
	);
}
