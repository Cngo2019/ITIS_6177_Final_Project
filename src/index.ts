import express, {Request, response, Response} from 'express';
import multer from 'multer';
import * as dotenv from 'dotenv';
import { AZURE_CV_ENDPOIONT } from './config/endpoints';
import axios from 'axios';
import {ImageAnalysisResult} from "./types/azureresponses/responses";
import {validateAndConvert} from "./utils";

// Load environment variables from .env file
dotenv.config();

// Access environment variables
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;
const endpoint = AZURE_CV_ENDPOIONT;
const app = express();

// Configure multer to store files in memory
const upload = multer({ storage: multer.memoryStorage() });

async function fetchData(image: Buffer): Promise<ImageAnalysisResult> {
    try {
        const response = await axios.post(endpoint, image, {
            headers: {
                'Ocp-Apim-Subscription-Key': apiKey,
                'Content-Type': 'application/octet-stream',
            },
        });

        return response.data;
    } catch (error: any) {
        throw new Error('An error occurred trying to fetch the data');
    }
}

// File upload endpoint
app.post('/describe', upload.single('photo'), async (req: Request, res: Response): Promise<any> => {
    if (!req.file) {
        return res.status(400).send('No photo uploaded');
    }

    const imageToUpload = req.file.buffer;
    const data = await fetchData(imageToUpload);
    const confThreshold = validateAndConvert(req.params.confidence);
    const tags = data.tagsResult.values.filter(it => it.confidence >= confThreshold);
    return res.send( {
        description: data.captionResult.text,
        associatedWords: tags.map(it => it.name),
        width: data.metadata.width,
        height: data.metadata.height,
        confidence: confThreshold
    } );
});

// ONLY apply JSON parser after file routes
app.use(express.json());

app.listen(port, () => {
    console.log(`Facial Analysis API is running at http://localhost:${port}`);
});
