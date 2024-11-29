export const getDateCell = (
	row: any,
	columnId: string,
	dateOnly: boolean,
	defaultValue: string
) => {
	const processedValue = row.getValue(columnId);

	// Sprawdzenie, czy wartość jest poprawnym typem (data, string, number)
	if (
		!processedValue ||
		(typeof processedValue !== "string" &&
			typeof processedValue !== "number" &&
			!(processedValue instanceof Date))
	) {
		return <div className="text-center">{defaultValue}</div>; // Wartość null, undefined lub nieprawidłowy typ
	}

	// Próba konwersji na datę
	const date = new Date(processedValue);
	if (isNaN(date.getTime())) {
		return <div className="text-center">{defaultValue}</div>; // Jeśli data jest nieprawidłowa
	}

	// Jeśli `dateOnly` jest `true`, to wyświetlamy tylko datę (bez godziny)
	const dateString = dateOnly
		? date.toISOString().slice(0, 10)
		: date.toISOString();

	return <div className="text-center">{dateString}</div>;
};
