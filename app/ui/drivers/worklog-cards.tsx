"use client";

import { useEffect, useState } from "react";
import { lusitana } from "@/app/ui/fonts";
import {
	ClockIcon,
	MapIcon,
	PlayIcon,
	StopIcon,
	TruckIcon,
} from "@heroicons/react/24/outline";
import { WorkLogForm } from "./worklogform";
import clsx from "clsx";

type WorkLogCardsProps = {
	isWorkStarted: boolean;
	mileage: number;
	startTime: Date | null; // Czas rozpoczęcia pracy
	registrationNumber: string;
	registrationNumberTrailer?: string;
	token?: string | null;
};

export default function WorkLogCards({
	isWorkStarted,
	mileage,
	startTime,
	registrationNumber,
	registrationNumberTrailer,
	token,
}: WorkLogCardsProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formType, setFormType] = useState<"start" | "stop">("start");

	const [lgvDetails, setLgvDetails] = useState<any | null>(null); // Szczegóły pojazdu
	const [isLgvLoading, setIsLgvLoading] = useState(false); // Stan ładowania
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const [formData, setFormData] = useState<{
		registrationNumber: string;
		registrationNumberTrailer?: string;
	}>({
		registrationNumber: registrationNumber,
		registrationNumberTrailer: registrationNumberTrailer || "",
	}); // Przechowywanie danych z formularza

	const [workTime, setWorkTime] = useState<number>(0); // Czas pracy w godzinach

	const fetchLgvDetails = async (registrationNumber: string) => {
		try {
			setIsLgvLoading(true);
			const response = await fetch(`/api/vehicles/lgv/${registrationNumber}`);
			if (!response.ok) {
				throw new Error(registrationNumber);
			}
			const data = await response.json();
			setLgvDetails(data);
			setErrorMessage(null);
		} catch (error) {
			setLgvDetails(null);
			setErrorMessage((error as Error).message);
		} finally {
			setIsLgvLoading(false);
		}
	};

	// Fetch LGV details when registration number is available
	useEffect(() => {
		if (isWorkStarted && registrationNumber) {
			fetchLgvDetails(registrationNumber);
		}
	}, [registrationNumber]);

	// Aktualizowanie czasu pracy, bazując na czasie rozpoczęcia pracy
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

	const handleFormSubmit = async (data: {
		mileage: number;
		registrationNumber: string;
		registrationNumberTrailer?: string;
		place?: string;
	}) => {
		try {
			const started = formType !== "start";
			const apiUrl = process.env.NEXT_PUBLIC_API_URL;
			const url = new URL(`${apiUrl}/worklog/${started}`);

			// Przygotowanie ciała żądania
			const body = {
				registrationNumber: data.registrationNumber,
				registrationNumberTrailer: data.registrationNumberTrailer || null,
				logTime: new Date().toISOString(),
				place: data.place || "Unknown location",
				mileage: data.mileage,
			};

			// Wykonanie żądania
			const response = await fetch(url.toString(), {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});

			if (!response.ok) {
				throw new Error(`Failed to fetch data: ${response.statusText}`);
			}

			alert(`Work log ${formType} submitted: ${JSON.stringify(data)}`);

			if (formType === "start") {
				// Zapisanie danych z formularza
				setFormData({
					registrationNumber: data.registrationNumber,
					registrationNumberTrailer: data.registrationNumberTrailer,
				});

				// Pobranie szczegółów pojazdu
				fetchLgvDetails(data.registrationNumber);
			} else {
				alert(
					`Work log ended: Registration Number: ${formData.registrationNumber}`
				);
			}
			window.location.reload();
		} catch (error) {
			console.error("Error submitting work log entry:", error);
		} finally {
			setIsModalOpen(false);
		}
	};

	const displayedWorkTime = startTime
		? workTime.toFixed(2) // Wyświetlenie czasu pracy z dwoma miejscami po przecinku
		: "Not Started";
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

			{/* Czas rozpoczęcia pracy */}
			<Card
				title="Work Time (Hours)"
				value={displayedWorkTime}
				type="workTime"
				unit="hrs"
				Icon={ClockIcon}
			/>

			<Card
				title="LGV Details"
				value={
					isLgvLoading
						? "Loading..."
						: lgvDetails
						? `${lgvDetails.make} ${lgvDetails.model} (${lgvDetails.year})`
						: errorMessage || "----"
				}
				Icon={TruckIcon}
				type="lgv"
			/>

			{/* Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<div className="w-full max-w-md bg-white rounded-lg p-6 shadow-lg">
						<WorkLogForm
							type={formType}
							onSubmit={handleFormSubmit}
							isPending={false}
							defaultValues={formData}
							token={token}
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
				className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-lg`}
			>
				{value} {unit}
			</p>
		</div>
	);
}
