"use client";

import { useEffect, useState } from "react";
import { lusitana } from "@/app/ui/fonts";
import {
	ClockIcon,
	MapIcon,
	PlayIcon,
	StopIcon,
} from "@heroicons/react/24/outline";
import { WorkLogForm } from "./worklogform";
import clsx from "clsx";

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
	const [startTime, setStartTime] = useState<Date | null>(null); // Czas rozpoczęcia pracy
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formType, setFormType] = useState<"start" | "stop">("start");

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null;

		if (isWorkStarted && startTime) {
			// Aktualizuj czas pracy co sekundę
			interval = setInterval(() => {
				const now = new Date();
				const diffInSeconds = Math.floor(
					(now.getTime() - startTime.getTime()) / 1000
				);
				setWorkTime(diffInSeconds / 3600); // Przekształć na godziny
			}, 1000);
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [isWorkStarted, startTime]);

	const handleStartStop = () => {
		setFormType(isWorkStarted ? "stop" : "start");
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	const handleFormSubmit = (data: { mileage: number }) => {
		alert(`Work log ${formType} submitted: ${JSON.stringify(data)}`);
		if (formType === "start") {
			setIsWorkStarted(true);
			setStartTime(new Date()); // Ustaw aktualny czas jako czas rozpoczęcia
			setMileage(data.mileage); // Ustaw wartość mileage z formularza
		} else {
			setIsWorkStarted(false);
			setStartTime(null); // Zresetuj czas rozpoczęcia
			setWorkTime(0); // Zeruj czas pracy
			setMileage(0); // Zeruj przebieg
		}
		setIsModalOpen(false);
	};

	const displayedWorkTime = isWorkStarted ? workTime.toFixed(2) : "0.00";
	const displayedMileage = isWorkStarted ? mileage : 0;

	return (
		<>
			{/* Przycisk Start/Stop */}
			<Card
				title={isWorkStarted ? "End Work" : "Start Work"}
				value={isWorkStarted ? "Click to End" : "Click to Start"}
				type="startStop"
				onClick={handleStartStop}
				Icon={isWorkStarted ? StopIcon : PlayIcon}
				className={
					isWorkStarted
						? "bg-rose-400 hover:bg-rose-300"
						: "bg-sky-400 hover:bg-sky-300"
				}
			/>

			{/* Aktualnie przejechane kilometry */}
			<Card
				title="Start Mileage"
				value={displayedMileage}
				type="mileage"
				unit="km"
				Icon={MapIcon}
			/>

			{/* Aktualny czas pracy */}
			<Card
				title="Work Time"
				value={displayedWorkTime}
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
	className,
}: {
	title: string;
	value: number | string;
	type: string;
	onClick?: () => void;
	unit?: string;
	Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	className?: string;
}) {
	return (
		<div
			className={clsx(
				"rounded-xl bg-gray-50 p-2 shadow-sm",
				{
					"cursor-pointer hover:bg-gray-100": onClick,
				},
				className
			)}
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
