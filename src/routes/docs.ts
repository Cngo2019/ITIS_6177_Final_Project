import {Router} from 'express';
import * as path from "node:path";


const router = Router();
router.get("/describe", (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public/describe', 'describe.html'));
});

router.get("/remove-background", (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public/remove-background', 'remove-background.html'));
});

router.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'docs.html'));
})

export default router;