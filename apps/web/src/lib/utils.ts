export function formatTime(date: string | undefined): string {
	if (!date) {
		return 'Ukendt';
	}

	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	const splitDate = date.split('-');
	if (splitDate.length < 2) return date;

	// + operator coerces it to be a number at runtime
	const month = months[+splitDate[1]];
	const year = splitDate[0];
	return `${month} ${year}`;
}
