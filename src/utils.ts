/**
 * Parses and validates a confidence query parameter.
 *
 * @param input - The confidence value as a string (from query params).
 * @returns A number between 0 and 1 (exclusive), defaulting to 0.9.
 * @throws Error if the input is invalid or out of range.
 */
export function validateAndConvert(input?: string): number {
    // Default if not provided
    if (!input) {
        return 0.9;
    }

    const parsed = parseFloat(input);

    if (isNaN(parsed)) {
        throw new Error(`Invalid confidence value: '${input}' is not a number.`);
    }

    if (parsed <= 0 || parsed >= 1) {
        throw new Error(`Confidence value must be greater than 0 and less than 1. Received: ${parsed}`);
    }

    return parsed;
}
