
import { Request, Response, NextFunction } from 'express';

import fs from 'fs/promises';
import path from 'path';
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

/**
 * Global error-handling middleware.
 * Catches thrown errors and sends 400 with message.
 */
export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    console.error('[Error]:', err.message || err);
    res.status(400).json({
        error: err.message || 'Something went wrong.',
    });
}


export const cleanupUploadedFile = (req: Request, res: Response, next: NextFunction): void => {
    const cleanup = () => {
        if (req.file && req.file.path) {
            const filePath = path.resolve(req.file.path);
            fs.unlink(filePath)
                .then(() => console.log(`Deleted uploaded file: ${filePath}`))
                .catch((err) => console.error(`Failed to delete uploaded file: ${err}`));
        }
    };

    res.on('finish', cleanup); // After successful response
    res.on('close', cleanup);  // After aborted connection

    next(); // Continue to next middleware
};

