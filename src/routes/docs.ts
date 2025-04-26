import {Router} from 'express';
import * as path from "node:path";


const router = Router();
router.get("/describe", (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'describe.html'));
});

router.get("/remove-background", (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'remove-background.html'));
});

export default router;