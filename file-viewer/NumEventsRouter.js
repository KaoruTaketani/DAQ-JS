import express from 'express';
import { statSync } from 'fs';
import { resolve, join } from 'path';

const router = express.Router();

router.get('/numEvents', (req, res) => {
    if (!process.env.edrPath
        || typeof req.query.path !== 'string'
        || typeof req.query.fileName !== 'string') {
        res.sendStatus(404)
        return
    }

    const filePath = resolve(join(process.env.edrPath, req.query.path, req.query.fileName))
    if (!filePath.startsWith(resolve(process.env.edrPath))) {
        res.sendStatus(500)
        return
    }

    const stat = statSync(filePath)

    res.send(`${(stat.size / 8).toLocaleString()} events`)
})

export default router;