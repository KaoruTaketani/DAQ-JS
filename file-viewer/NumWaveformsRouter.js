import express from 'express';
import { statSync } from 'fs';
import { join,resolve } from 'path';

const router = express.Router();

router.get('/numWaveforms', (req, res) => {
    if (!process.env.sigbPath
        || typeof req.query.path !== 'string'
        || typeof req.query.fileName !== 'string') {
        res.sendStatus(404)
        return
    }

    const filePath = resolve(join(process.env.sigbPath, req.query.path, req.query.fileName))
    if (!filePath.startsWith(resolve(process.env.sigbPath))) {
        res.sendStatus(500)
        return
    }

    const stat = statSync(filePath)
    // header length 1024 is fixed
    const headerBytes = 1024
    // 8byte/64bit is fixed
    // 501 length is variable
    const waveformBytes = 8 * 501

    res.send(`numWaveforms: ${((stat.size - headerBytes) / waveformBytes).toLocaleString()}, waveform.length: ${waveformBytes / 8}`)
})

export default router;