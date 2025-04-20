import express from 'express';
import multer from 'multer';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Access environment variables
const port = process.env.PORT;
const apiKey = process.env.API_KEY;
const app = express();

const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());

app.post('/describe', upload.single('photo'), (req: Request, res: Response) => {

});

app.post('/recognizable', upload.single('photo'), (req: Request, res: Response) => {
   return;
});

app.listen(port, () => {
    console.log(`Facial Analysis API is running at http://localhost:${port}`);
});
