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
    // header length 1024 is fixed
    const headerBytes = 1024
    // 8byte/64bit is fixed
    // 501 length is variable
    const waveformBytes = 8 * 501

    res.send(`numWaveforms: ${((stat.size - headerBytes) / waveformBytes).toLocaleString()}, waveform.length: ${waveformBytes / 8}`)
})

export default router;