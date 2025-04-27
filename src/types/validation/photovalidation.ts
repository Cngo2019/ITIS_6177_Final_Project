import { Request, Response, NextFunction, RequestHandler } from 'express';
import fs from 'fs';
import path from 'path';

export const validateUploadedPhoto: RequestHandler = (req, res, next) => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'No photo uploaded.' });
            return;
        }
        next();
    } catch (error: any) {
        console.error('Photo validation error:', error.message);
        res.status(500).json({ error: 'Internal server error during photo validation. Please verify that the photo was not deleted from your system' });
        return;
    }
};
