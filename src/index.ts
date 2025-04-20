import express, {Request, response, Response} from 'express';
import multer from 'multer';
import * as dotenv from 'dotenv';
import { IMAGE_ANALYSIS_URL, SEGMENT_IMAGE_URL } from './config/endpoints';
import axios from 'axios';
import {ImageAnalysisResult} from "./types/azureresponses/responses";
import {errorHandler, validateAndConvert} from "./utils";

// Load environment variables from .env file
dotenv.config();

// Access environment variables
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;
const app = express();

// Configure multer to store files in memory
const upload = multer({ storage: multer.memoryStorage() });

// File upload endpoint
app.post('/describe', upload.single('photo'), async (req: Request, res: Response): Promise<any> => {
    if (!req.file) {
        return res.status(400).send('No photo uploaded');
    }

    const imageToUpload = req.file.buffer;
    const data = await callAnalyzeImageEndpoint(imageToUpload);
    const confThreshold = validateAndConvert(req.query.confidence as string);
    const tags = data.tagsResult.values.filter(it => it.confidence >= confThreshold);


    return res.send( {
        description: data.captionResult.text,
        associatedWords: tags.map(it => it.name),
        width: data.metadata.width,
        height: data.metadata.height,
        confidence: confThreshold
    } );
});

// File upload endpoint
app.post('/remove-background', upload.single('photo'), async (req: Request, res: Response): Promise<any> => {
    if (!req.file) {
        return res.status(400).send('No photo uploaded');
    }
    const imageToUpload = req.file.buffer;
    const data = await callImageSegmentEndpoint(imageToUpload);
    res.setHeader('Content-Type', 'image/png');
    res.send(Buffer.from(data as Uint8Array));
});


async function callAnalyzeImageEndpoint(image: Buffer): Promise<ImageAnalysisResult> {
    try {
        const response = await axios.post(IMAGE_ANALYSIS_URL, image, {
            headers: {
                'Ocp-Apim-Subscription-Key': apiKey,
                'Content-Type': 'application/octet-stream',
            },
        });

        return response.data;
    } catch (error: any) {
        const azureErrorMessage =
            error?.response?.data?.error?.message ||
            error?.response?.data?.message ||
            error?.message;
        throw new Error("An error occurred while calling the computer vision api: " + azureErrorMessage);
    }
}

async function callImageSegmentEndpoint(
    image: Buffer
): Promise<ArrayBuffer> {
    try {
        const response = await axios.post(SEGMENT_IMAGE_URL, image, {
            headers: {
                'Ocp-Apim-Subscription-Key': apiKey,
                'Content-Type': 'application/octet-stream',
            },
            responseType: 'arraybuffer'
        });

        return response.data;
    } catch (error: any) {
        const azureErrorMessage =
            error?.response?.data?.error?.message ||
            error?.response?.data?.message ||
            error?.message;
        throw new Error("An error occurred while calling the computer vision api: " + azureErrorMessage);
    }
}



// ONLY apply JSON parser after file routes
app.use(express.json());
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Facial Analysis API is running at http://localhost:${port}`);
});
