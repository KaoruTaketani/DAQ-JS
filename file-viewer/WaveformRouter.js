import express from 'express';
import { join } from 'path';
import linspace from '../lib/linspace.js';
import h5wasm from "h5wasm/node";
await h5wasm.ready;

const router = express.Router();

router.get('/waveform', (req, res) => {
    // use mode "r" for reading.  All modes can be found in h5wasm.ACCESS_MODES
    let f = new h5wasm.File(join(process.env.hdf5Path, req.query.path, req.query.fileName), "r")

    /** @type {import('h5wasm').Dataset|null} */
    const dataset =/** @type {import('h5wasm').Dataset|null} */ (f.get(`${req.query.key}BinCounts`))
    if (!dataset) {
        res.status(404).send()
        f.close()
        return
    }
    const y = Array.from(/** @type {Float64Array} */(dataset.value))
    let xlabel
    let groupPath
    let attrKey = ''
    if (req.query.key === 'horizontalProjection') {
        groupPath = req.query.key + 'BinCounts'
        attrKey = 'binLimitsInMillimeters'
        xlabel = 'coordinate (mm)'
    }
    if (req.query.key === 'verticalProjection') {
        groupPath = req.query.key + 'BinCounts'
        attrKey = 'binLimitsInMillimeters'
        xlabel = 'coordinate (mm)'
    }
    if (req.query.key === 'pulseHeightHistogram') {
        groupPath = req.query.key + 'BinCounts'
        attrKey = 'binLimits'
        xlabel = 'pulse height'
    }
    if (req.query.key === 'tofHistogram') {
        groupPath = req.query.key + 'BinCounts'
        attrKey = 'binLimitsInNanoseconds'
        xlabel = 'tof (ns)'
    }
    if (req.query.key === 'tofDifferenceHistogram') {
        groupPath = req.query.key + 'BinCounts'
        attrKey = 'binLimitsInNanoseconds'
        xlabel = 'tof (ns)'
    }
    if (attrKey === '') {
        res.status(404).send()
        f.close()
        return
    }
    const lims = /** @type {number[]} */(f.get(groupPath).attrs[attrKey].value)
    if (lims.length !== 2) {
        res.status(404).send()
        f.close()
        return
    }
    const x = linspace(lims[0], lims[1], y.length + 1)

    res.json({
        x: x,
        y: y,
        xlabel: xlabel
    })
    f.close()
})

export default router;