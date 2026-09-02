import express from 'express';
import { join } from 'path';
import linspace from '../lib/linspace.js';
import h5wasm from "h5wasm/node";
await h5wasm.ready;

const router = express.Router();

router.get('/waveform', (req, res) => {
    if (!process.env.hdf5Path
        || typeof req.query.path !== 'string'
        || typeof req.query.key !== 'string'
        || typeof req.query.fileName !== 'string') {
        res.status(404).send()
        return
    }

    // use mode "r" for reading.  All modes can be found in h5wasm.ACCESS_MODES
    let f = new h5wasm.File(join(process.env.hdf5Path, req.query.path, req.query.fileName), "r")

    /** @type {import('h5wasm').Dataset|null} */
    const dataset =/** @type {import('h5wasm').Dataset|null} */ (f.get(req.query.key))
    if (!dataset) {
        res.status(404).send()
        f.close()
        return
    }
    const y = Array.from(/** @type {Float64Array} */(dataset.value))
    let xlabel
    if (req.query.key === 'imageVProjectionBinCounts') {
        xlabel = 'coordinate (mm)'
    }
    if (req.query.key === 'imageHProjectionBinCounts') {
        xlabel = 'coordinate (mm)'
    }
    if (req.query.key === 'pulseHeightHistogramBinCounts') {
        xlabel = 'pulse height'
    }
    if (req.query.key === 'tofHistogramBinCounts') {
        xlabel = 'tof (ns)'
    }
    if (req.query.key === 'tofDifferenceHistogramBinCounts') {
        xlabel = 'tof (ns)'
    }
    const attrKeys = Object.keys(dataset.attrs)
    // attrKeys.length is 1
    const lims = /** @type {number[]} */(dataset.attrs[attrKeys[0]].value)
    const x = linspace(lims[0], lims[1], y.length + 1)

    res.json({
        x: x,
        y: y,
        xlabel: xlabel
    })
    f.close()
})

export default router;