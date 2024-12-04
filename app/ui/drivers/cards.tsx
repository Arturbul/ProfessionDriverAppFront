"use client";

import { useRouter } from "next/navigation";
import { lusitana } from "@/app/ui/fonts";
import { MapIcon, ClockIcon } from "@heroicons/react/24/outline";

// Ikony
const iconMap = {
	distance7Days: MapIcon,
	distanceMonth: MapIcon,
	hours7Days: ClockIcon,
	hoursMonth: ClockIcon,
};

// Typy właściwości
type CardListProps = {
	distance7Days: number;
	distanceMonth: number;
	hours7Days: string;
	hoursMonth: string;
};

export default function CardList({
	distance7Days,
	distanceMonth,
	hours7Days,
	hoursMonth,
}: CardListProps) {
	const router = useRouter(); // Router klienta

	// Mapowanie tras
	const routes = {
		distance7Days: "",
		distanceMonth: "",
		hours7Days: "",
		hoursMonth: "",
	};

	// Obsługa kliknięcia
	const handleClick = (
		type: "distance7Days" | "distanceMonth" | "hours7Days" | "hoursMonth"
	) => {
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
				key="distance7Days"
				title="Last 7 days distance"
				value={distance7Days}
				type="distance7Days"
			/>
			<Card
				key="hours7Days"
				title="Last 7 days worked hours"
				value={hours7Days}
				type="hours7Days"
			/>
			<Card
				key="distanceMonth"
				title="Current month distance"
				value={distanceMonth}
				type="distanceMonth"
			/>
			<Card
				key="hoursMonth"
				title="Current month worked hours"
				value={hoursMonth}
				type="hoursMonth"
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
	type: "distance7Days" | "distanceMonth" | "hours7Days" | "hoursMonth";
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
