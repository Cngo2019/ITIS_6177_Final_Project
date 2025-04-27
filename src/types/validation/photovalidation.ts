import {RequestHandler} from 'express';
import fs from 'fs';
import path from 'path';

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif']; // <-- you can add more if needed

export const validateUploadedPhoto: RequestHandler = (req, res, next) => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'No photo uploaded.' });
            return;
        }

        // Check MIME type
        if (!allowedMimeTypes.includes(req.file.mimetype)) {
            console.warn('Blocked file upload:', req.file.mimetype);
            res.status(400).json({ error: 'Invalid file type. Only images are allowed.' });
            return;
        }

        next();
    } catch (error: any) {
        console.error('Photo validation error:', error.message);
        res.status(500).json({ error: 'Internal server error during photo validation.' });
        return;
    }
};
