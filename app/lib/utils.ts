import { Revenue } from "./definitions";
import FilterComponent from "@/components/ui/datatabe_comp/filter-table";
import { ColumnDef } from "@tanstack/react-table";
export const formatCurrency = (amount: number) => {
	return (amount / 100).toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
	});
};

export const formatDateToLocal = (
	dateStr: string,
	locale: string = "en-US"
) => {
	const date = new Date(dateStr);
	const options: Intl.DateTimeFormatOptions = {
		day: "numeric",
		month: "short",
		year: "numeric",
	};
	const formatter = new Intl.DateTimeFormat(locale, options);
	return formatter.format(date);
};

export const generateYAxis = (revenue: Revenue[]) => {
	// Calculate what labels we need to display on the y-axis
	// based on highest record and in 1000s
	const yAxisLabels = [];
	const highestRecord = Math.max(...revenue.map((month) => month.revenue));
	const topLabel = Math.ceil(highestRecord / 1000) * 1000;

	for (let i = topLabel; i >= 0; i -= 1000) {
		yAxisLabels.push(`$${i / 1000}K`);
	}

	return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
	// If the total number of pages is 7 or less,
	// display all pages without any ellipsis.
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	// If the current page is among the first 3 pages,
	// show the first 3, an ellipsis, and the last 2 pages.
	if (currentPage <= 3) {
		return [1, 2, 3, "...", totalPages - 1, totalPages];
	}

	// If the current page is among the last 3 pages,
	// show the first 2, an ellipsis, and the last 3 pages.
	if (currentPage >= totalPages - 2) {
		return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
	}

	// If the current page is somewhere in the middle,
	// show the first page, an ellipsis, the current page and its neighbors,
	// another ellipsis, and the last page.
	return [
		1,
		"...",
		currentPage - 1,
		currentPage,
		currentPage + 1,
		"...",
		totalPages,
	];
};

export type ActionItem =
	| {
			type: "action";
			label: string;
			onClick: (params?: any) => void;
			params?: any;
	  }
	| { type: "separator" };

// Typ reprezentujący dane o dystansie
export type DistanceData = {
	month: string;
	distance: number;
};

export const generateYAxisDistance = (distances: DistanceData[]) => {
	// Oblicz, jakie etykiety chcemy wyświetlić na osi Y
	// na podstawie najwyższej wartości w danych i zaokrąglone w tysiącach
	const yAxisLabels: string[] = [];
	const highestRecord = Math.max(...distances.map((month) => month.distance));

	// Ustalamy górny limit etykiety na osi Y (zaokrąglony w tysiącach)
	let topLabel = Math.ceil(highestRecord / 1000) * 1000;

	// Dodanie etykiety ">15k" jeśli najwyższy dystans przekracza 15k
	if (topLabel > 15000) {
		yAxisLabels.push(">15K");
		topLabel = 15000; // Ustalamy topLabel na 15k, aby dostosować do nowych etykiet
	}

	// Generowanie etykiet dla osi Y, przy czym każda etykieta to dystans w tysiącach
	for (let i = topLabel; i >= 0; i -= 1000) {
		if (i === 0 && topLabel > 15000) {
			// Jeśli mamy etykietę ">15k", nie dodajemy zerowego dystansu
			continue;
		}
		yAxisLabels.push(`${i / 1000}K`);
	}

	return { yAxisLabels, topLabel };
};
