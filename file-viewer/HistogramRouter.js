import express from 'express';
import { resolve, join } from 'path';
import linspace from '../lib/linspace.js';
import h5wasm from "h5wasm/node";
await h5wasm.ready;

const router = express.Router();

router.get('/histogram', (req, res) => {
    if (!process.env.hdf5Path
        || typeof req.query.path !== 'string'
        || typeof req.query.key !== 'string'
        || typeof req.query.fileName !== 'string') {
        res.sendStatus(404)
        return
    }
    
    const filePath = resolve(join(join(process.env.hdf5Path, req.query.path, req.query.fileName)))
    if (!filePath.startsWith(resolve(process.env.hdf5Path))) {
        res.sendStatus(500)
        return
    }

    // use mode "r" for reading.  All modes can be found in h5wasm.ACCESS_MODES
    let f = new h5wasm.File(filePath, "r")

    /** @type {import('h5wasm').Dataset|null} */
    const dataset =/** @type {import('h5wasm').Dataset|null} */ (f.get(req.query.key))
    if (!dataset) {
        res.sendStatus(404)
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