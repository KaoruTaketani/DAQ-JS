import express from 'express';
import h5wasm from "h5wasm/node";
import { join } from 'path';
await h5wasm.ready;

const router = express.Router();

router.get('/image', (req, res) => {
    if (!process.env.hdf5Path
        || typeof req.query.path !== 'string'
        || typeof req.query.key !== 'string'
        || typeof req.query.fileName !== 'string') {
        res.status(404).send()
        return
    }

    let f = new h5wasm.File(join(process.env.hdf5Path, req.query.path, req.query.fileName), "r");
    /** @type {import('h5wasm').Dataset|null} */
    const dataset = /** @type {import('h5wasm').Dataset|null} */(f.get(req.query.key))
    // const dataset = /** @type {import('h5wasm').Dataset|null} */(f.get('rawImageBinCounts'))
    if (!dataset) {
        res.status(404).send()
        return
    }

    let xlabel
    let ylabel
    if (req.query.key === 'rawImageBinCounts') {
        xlabel = 'coordinate (mm)'
        ylabel = 'coordinate (mm)'
    }
    if (req.query.key === 'filteredImageBinCounts') {
        xlabel = 'coordinate (mm)'
        ylabel = 'coordinate (mm)'
    }
    if (req.query.key === 'tofImageVProjectionBinCounts') {
        ylabel = 'coordinate (mm)'
        xlabel = 'tof (ns)'
    }
    const attrKeys = Object.keys(dataset.attrs)
    // attrKeys.length is 2 and first is xBinLimit... and the second is yBinLimit...
    const xlim = Array.from(/** @type {Float64Array} */(dataset.attrs[attrKeys[0]].value))
    const ylim = Array.from(/** @type {Float64Array} */(dataset.attrs[attrKeys[1]].value))
    const data = Array.from(/** @type {Uint32Array} */(dataset.value))

    res.json({
        xlim: xlim,
        ylim: ylim,
        xlabel: xlabel,
        ylabel: ylabel,
        shape: /** @type {number[]} */(dataset.shape),
        data: data
    })
    // must be closed after response.end
    f.close()
    // console.log(JSON.stringify(dataset.value))
})

export default router;