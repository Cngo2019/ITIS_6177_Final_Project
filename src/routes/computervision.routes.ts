import {Request, Response, Router} from 'express';
import multer from 'multer';
import {IMAGE_ANALYSIS_URL, EXTRACT_TEXT_URL} from '../config/endpoints';
import axios from 'axios';
import {ImageAnalysisResult, ReadResult} from "../types/azureresponses/responses";
import {validateAndConvert, cleanupUploadedFile} from "../utils";
import * as dotenv from 'dotenv';
import {validateUploadedPhoto} from "../types/validation/photovalidation";

dotenv.config()

// Access environment variables
const apiKey = process.env.API_KEY;
const router = Router();

// Configure multer to store files in memory
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // Max 5 MB
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

router.post('/describe',
    upload.single('photo'),
    validateUploadedPhoto,
    cleanupUploadedFile,
    async (req: Request, res: Response): Promise<any> => {
        if (!req.file) {
            return res.status(400).send('No photo uploaded');
        }

        const imageToUpload = req.file.buffer;
        const data = await callAnalyzeImageEndpoint(imageToUpload);
        const confThreshold = validateAndConvert(req.query.confidence as string);
        const tags = data.tagsResult.values.filter(it => it.confidence >= confThreshold);


        return res.send({
            description: data.captionResult.text,
            associatedWords: tags.map(it => it.name),
            width: data.metadata.width,
            height: data.metadata.height,
            confidence: confThreshold
        });
    });

router.post('/extract-words',
    upload.single('photo'),
    validateUploadedPhoto,
    cleanupUploadedFile,
    async (req: Request, res: Response): Promise<any> => {
        if (!req.file) {
            return res.status(400).send('No photo uploaded');
        }

        const imageToUpload = req.file.buffer;
        const data = await callExtractTextEndpoint(imageToUpload);
        console.log(data.blocks);
        return res.send(extractSentencesFromReadResult(data));
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

async function callExtractTextEndpoint(
    image: Buffer
): Promise<ReadResult> {
    try {
        const response = await axios.post(EXTRACT_TEXT_URL, image, {
            headers: {
                'Ocp-Apim-Subscription-Key': apiKey,
                'Content-Type': 'application/octet-stream',
            },
            responseType: 'json'
        });

        console.log("Response was: " ,response.data);
        return response.data.readResult;
    } catch (error: any) {
        const azureErrorMessage =
            error?.response?.data?.error?.message ||
            error?.response?.data?.message ||
            error?.message;
        throw new Error("An error occurred while calling the computer vision api: " + azureErrorMessage);
    }
}
export function extractSentencesFromReadResult(readResult: ReadResult): string[] {
    console.log(readResult);
    const sentences: string[] = [];
    for (const block of readResult.blocks) {
        for (const lines of block.lines) {
            console.log(lines.text)
            sentences.push(lines.text);
        }
    }

    return sentences;
}


export default router;