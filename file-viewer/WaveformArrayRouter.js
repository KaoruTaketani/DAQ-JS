import express from 'express';
import { close, open, read } from 'fs';
import { join } from 'path';
import colon from '../lib/colon.js';

const router = express.Router();

router.get('/waveformArray', (req, res) => {
    if (!process.env.sigbPath
        || typeof req.query.offset !== 'string'
        || typeof req.query.path !== 'string'
        || typeof req.query.fileName !== 'string') {
        res.status(404).send()
        return
    }
    const offset = parseInt(req.query.offset)
    if (!Number.isFinite(offset)) {
        res.status(404).send()
        return
    }

    const filePath = join(process.env.sigbPath, req.query.path, req.query.fileName)
    const numSamples = 501
    const headerBytes = 1024
    const waveformBytes = 8 * numSamples
    const buffer = Buffer.alloc(waveformBytes)
    const poistionBytes = headerBytes + waveformBytes * offset

    open(filePath, 'r', (err, fd) => {
        if (err) throw err

        read(fd, buffer, { position: poistionBytes }, (err, _bytesRead, buffer) => {
            if (err) throw err

            close(fd)
            const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength)
            const y = new Array(numSamples)
            for (let j = 0; j < numSamples; ++j) {
                y[j] = view.getFloat64(j * 8)
            }

            res.json({
                x: colon(0, numSamples),
                y: y,
                xlabel: 'rf frequency'
            })
        })
    })
})

export default router;