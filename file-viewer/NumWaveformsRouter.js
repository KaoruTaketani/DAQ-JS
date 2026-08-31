import express from 'express';
import { statSync } from 'fs';
import { join } from 'path';

const router = express.Router();

router.get('/numWaveforms', (req, res) => {
    if (!process.env.sigbPath
        || typeof req.query.path !== 'string'
        || typeof req.query.fileName !== 'string') {
        res.status(404).send()
        return
    }

    const filePath = join(process.env.sigbPath, req.query.path, req.query.fileName)
    const stat = statSync(filePath)
    const headerBytes = 1024
    const waveformBytes = 8 * 501

    res.send(`${((stat.size - headerBytes) / waveformBytes).toLocaleString()} events`)
})

export default router;