import { Request, Response, NextFunction, RequestHandler } from 'express';
import fs from 'fs';
import path from 'path';

export const validateUploadedPhoto: RequestHandler = (req, res, next) => {
    try {
        if (!req.file || !req.file.path) {
            res.status(400).json({ error: 'No photo uploaded.' });
            return;
        }

        const filePath = path.resolve(req.file.path);

        if (!fs.existsSync(filePath)) {
            res.status(400).json({ error: 'Uploaded photo is missing or was deleted.' });
            return;
        }

        next();
    } catch (error: any) {
        console.error('Photo validation error:', error.message);
        res.status(500).json({ error: 'Internal server error during photo validation.' });
        return;
    }
};
