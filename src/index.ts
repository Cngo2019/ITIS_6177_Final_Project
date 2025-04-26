import visionRoutes from "./routes/computervision.routes";
import docsRoutes from "./routes/docs"
import express, {urlencoded} from 'express';
import {errorHandler} from "./utils";
import * as path from "node:path";
const app = express();
const port = 3000;


// ONLY apply JSON parser after file routes
app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(errorHandler);
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/api', visionRoutes);
app.use('/docs', docsRoutes);

app.listen(port, () => {
    console.log(`Facial Analysis API is running at http://localhost:${port}`);
});
