import express from 'express';
import multer from 'multer';
import { Request, Response } from 'express';

const app = express();
const port = 3000;
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
