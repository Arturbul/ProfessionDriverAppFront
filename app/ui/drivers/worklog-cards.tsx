"use client";

import { useState } from "react";
import { lusitana } from "@/app/ui/fonts";
import {
	ClockIcon,
	MapIcon,
	PlayIcon,
	StopIcon,
} from "@heroicons/react/24/outline";
import { WorkLogForm } from "./worklogform";

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
	const [isModalOpen, setIsModalOpen] = useState(false); // Stan modalu
	const [formType, setFormType] = useState<"start" | "stop">("start");

	// Funkcja obsługi start/stop
	const handleStartStop = () => {
		setFormType(isWorkStarted ? "stop" : "start");
		setIsModalOpen(true); // Otwórz modal
	};

	// Obsługa zamknięcia modalu
	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	// Obsługa wysyłania formularza
	const handleFormSubmit = (data: any) => {
		alert(`Work log ${formType} submitted: ${JSON.stringify(data)}`);
		setIsWorkStarted(formType === "start");
		setIsModalOpen(false);
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

			{/* Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<div className="w-full max-w-md bg-white rounded-lg p-6 shadow-lg">
						<WorkLogForm
							type={formType}
							onSubmit={handleFormSubmit}
							isPending={false}
						/>
						<button
							onClick={handleModalClose}
							className="mt-4 w-full text-center text-sm text-gray-500 hover:underline"
						>
							Close
						</button>
					</div>
				</div>
			)}
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
