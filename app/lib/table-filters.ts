// filters.ts

// Filtr dla tekstu (np. wyszukiwanie fragmentu tekstu)
export const filterText = (row: any, columnId: any, filterValue: any) => {
	const rowValue = row.getValue(columnId)?.toString()?.toLowerCase() ?? "";
	return rowValue.includes(filterValue.toLowerCase()); // Filtruj po fragmencie tekstu
};

// Filtr dla zakresu liczb (np. dla kwoty)
export const filterNumberRange = (
	row: any,
	columnId: any,
	filterValue: any
) => {
	const rowValue: number = row.getValue(columnId);
	const { from, to } = filterValue || {};
	if (from != null && rowValue < from) return false;
	if (to != null && rowValue > to) return false;
	return true; // Spełnia warunki
};

// Filtr dla opcji z listy (np. dla statusu)
export const filterSelect = (row: any, columnId: any, filterValue: any) => {
	if (filterValue === "All") return true; // Brak filtrowania
	const rowValue = row.getValue(columnId);
	return rowValue === filterValue; // Filtruj po dokładnej wartości
};

// Filtr dla pojedynczej daty
export const filterDate = (row: any, columnId: any, filterValue: any) => {
	if (!filterValue) return true; // Brak filtra
	const rowValue = new Date(row.getValue(columnId)).setHours(0, 0, 0, 0); // Ustaw godzinę na 00:00:00
	const filterDate = new Date(filterValue).setHours(0, 0, 0, 0);
	return rowValue === filterDate; // Porównanie wybranej daty
};

// Filtr dla zakresu dat
export const filterDateRange = (row: any, columnId: any, filterValue: any) => {
	if (!filterValue || (!filterValue.from && !filterValue.to)) return true; // Brak filtra lub brak zakresu
	const rowValue = new Date(row.getValue(columnId)).setHours(0, 0, 0, 0); // Ustaw godzinę na 00:00:00
	const { from, to } = filterValue;

	// Sprawdzamy, czy data mieści się w zakresie
	const fromDate = from ? new Date(from).setHours(0, 0, 0, 0) : null;
	const toDate = to ? new Date(to).setHours(0, 0, 0, 0) : null;

	if (fromDate && rowValue < fromDate) return false;
	if (toDate && rowValue > toDate) return false;

	return true; // Pasuje do zakresu
};
