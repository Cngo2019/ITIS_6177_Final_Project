import visionRoutes from "./routes/computervision.routes";
import docsRoutes from "./routes/docs"
import express, {urlencoded} from 'express';
import {errorHandler} from "./utils";
import * as path from "node:path";
import rateLimit from "express-rate-limit";
const app = express();
const port = 3000;

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per window
});
// ONLY apply JSON parser after file routes
app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(errorHandler);
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/api', visionRoutes);
app.use('/docs', docsRoutes);
app.use(limiter);

app.listen(port, () => {
    console.log(`Facial Analysis API is running at http://146.190.147.242:${port}`);
});

