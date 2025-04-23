import visionRoutes from "./routes/computervision.routes";
import express, {urlencoded} from 'express';
import {errorHandler} from "./utils";
import {html} from "./docs/docs"
const app = express();
const port = 3000;


// ONLY apply JSON parser after file routes
app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(errorHandler);
app.use('/api', visionRoutes);
app.get('/docs', (req, res) => {
    res.set('Content-Type', 'text/html')
    res.send(html);
})

app.listen(port, () => {
    console.log(`Facial Analysis API is running at http://localhost:${port}`);
});
