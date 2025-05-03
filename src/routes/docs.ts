import {Router} from 'express';
import * as path from "node:path";


const router = Router();
router.get("/describe", (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public/describe', 'describe.html'));
});

router.get("/extract-words", (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public/extract-words', 'extract-words.html'));
});

router.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'docs.html'));
})

export default router;