import express, {Request, Response} from 'express';
import multer from 'multer';
import * as dotenv from 'dotenv';
import {AZURE_FACE_ENDPOINT} from "./config/endpoints";
import axios from "axios";

// Load environment variables from .env file
dotenv.config();

// Access environment variables
const port = process.env.PORT;
const apiKey = process.env.API_KEY;
const endpoint = AZURE_FACE_ENDPOINT;
const app = express();

const upload = multer({storage: multer.memoryStorage()});

app.use(express.json());

async function fetchData(image: Buffer): Promise<any> {
    try {
        const response = await axios.post(endpoint, image, {
            headers: {
                'Ocp-Apim-Subscription-Key': apiKey,
                'Content-Type': 'application/octet-stream',
            },
            params: {
                returnFaceId: true,
            },
        });

        return response.data;
    } catch (error: any) {
        console.error('Error detecting faces:', error.response?.data || error.message);
        throw new Error('Face detection failed');
    }
}

app.post('/describe', upload.single('photo'), async (req: Request, res: Response): Promise<any> => {

    if (!req.file) {
        return res.status(400).send('No photo uploaded')
    }

    const imageToUpload = req.file.buffer;
    const data = await fetchData(imageToUpload);
    return res.send(data);
});

app.post('/recognizable', upload.single('photo'), (req: Request, res: Response) => {
    return;
});

app.listen(port, () => {
    console.log(`Facial Analysis API is running at http://localhost:${port}`);
});
