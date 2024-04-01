function convertToShortFormat(number: string | number): string {
	// Define the suffixes for each magnitude
	const suffixes = ["", "K", "M", "B", "T"];
	// Determine the magnitude of the number
	const magnitude = Math.floor((number.toString().length - 1) / 3);
	// Calculate the short number
	const shortNumber = (+number / Math.pow(1000, magnitude)).toFixed(1);
	// Append the appropriate suffix
	return shortNumber + suffixes[magnitude];
}

export default convertToShortFormat