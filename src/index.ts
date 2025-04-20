import express, { Request, Response } from 'express';
import multer from 'multer';
import * as dotenv from 'dotenv';
import { AZURE_CV_ENDPOIONT } from './config/endpoints';
import axios from 'axios';

// Load environment variables from .env file
dotenv.config();

// Access environment variables
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;
const endpoint = AZURE_CV_ENDPOIONT;
const app = express();

// Configure multer to store files in memory
const upload = multer({ storage: multer.memoryStorage() });

async function fetchData(image: Buffer): Promise<any> {
    try {
        const response = await axios.post(endpoint, image, {
            headers: {
                'Ocp-Apim-Subscription-Key': apiKey,
                'Content-Type': 'application/octet-stream',
            },
        });

        return response.data;
    } catch (error: any) {
        console.error('Error detecting faces:', error.response?.data || error.message);
        throw new Error('Face detection failed');
    }
}

// File upload endpoint
app.post('/describe', upload.single('photo'), async (req: Request, res: Response): Promise<any> => {
    console.log('Content-Type:', req.headers['content-type']);
    console.log('File:', req.file);

    if (!req.file) {
        return res.status(400).send('No photo uploaded');
    }

    const imageToUpload = req.file.buffer;
    console.log(imageToUpload);
    const data = await fetchData(imageToUpload);
    return res.send(data);
});

// ONLY apply JSON parser after file routes
app.use(express.json());

app.listen(port, () => {
    console.log(`Facial Analysis API is running at http://localhost:${port}`);
});
