import visionRoutes from "./routes/computervision.routes";
import express from 'express';
import {errorHandler} from "./utils";

const app = express();
const port = 3000;
app.use('/api', visionRoutes);
// ONLY apply JSON parser after file routes
app.use(express.json());
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Facial Analysis API is running at http://localhost:${port}`);
});
