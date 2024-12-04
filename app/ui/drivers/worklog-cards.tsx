"use client";

import { useState } from "react";
import { lusitana } from "@/app/ui/fonts";
import {
	ClockIcon,
	MapIcon,
	PlayIcon,
	StopIcon,
} from "@heroicons/react/24/outline";

type WorkLogCardsProps = {
	isWorkStarted: boolean;
	mileage: number;
	workTime: number;
};

export default function WorkLogCards({
	isWorkStarted: initialWorkStarted,
	mileage: initialMileage,
	workTime: initialWorkTime,
}: WorkLogCardsProps) {
	const [isWorkStarted, setIsWorkStarted] = useState(initialWorkStarted);
	const [mileage, setMileage] = useState(initialMileage);
	const [workTime, setWorkTime] = useState(initialWorkTime);

	// Funkcja obsługi start/stop
	const handleStartStop = () => {
		if (isWorkStarted) {
			alert("Work log entry completed.");
		} else {
			alert("Work log started.");
		}
		setIsWorkStarted(!isWorkStarted);
	};

	return (
		<>
			{/* Przycisk Start/Stop */}
			<Card
				title={isWorkStarted ? "End Work" : "Start Work"}
				value={isWorkStarted ? "Click to End" : "Click to Start"}
				type="startStop"
				onClick={handleStartStop}
				Icon={isWorkStarted ? StopIcon : PlayIcon}
			/>

			{/* Aktualnie przejechane kilometry */}
			<Card
				title="Current Mileage"
				value={mileage}
				type="mileage"
				unit="km"
				Icon={MapIcon}
			/>

			{/* Aktualny czas pracy */}
			<Card
				title="Work Time"
				value={workTime}
				type="workTime"
				unit="h"
				Icon={ClockIcon}
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
	Icon,
}: {
	title: string;
	value: number | string;
	type: string;
	onClick?: () => void;
	unit?: string;
	Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) {
	return (
		<div
			className="rounded-xl bg-gray-50 p-2 shadow-sm cursor-pointer hover:bg-gray-100"
			onClick={onClick}
		>
			<div className="flex items-center p-4">
				{Icon ? <Icon className="h-6 w-6 text-gray-700" /> : null}
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
