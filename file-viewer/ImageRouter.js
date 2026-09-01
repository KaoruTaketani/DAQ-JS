import express from 'express';
import h5wasm from "h5wasm/node";
import { join } from 'path';
await h5wasm.ready;

const router = express.Router();

router.get('/image', (req, res) => {
    if (!process.env.hdf5Path
        || typeof req.query.path !== 'string'
        || typeof req.query.fileName !== 'string') {
        res.status(404).send()
        return
    }

    let f = new h5wasm.File(join(process.env.hdf5Path, req.query.path, req.query.fileName), "r");
    /** @type {import('h5wasm').Dataset|null} */
    const dataset = /** @type {import('h5wasm').Dataset|null} */(f.get(req.query.key + 'BinCounts'))
    // const dataset = /** @type {import('h5wasm').Dataset|null} */(f.get('rawImageBinCounts'))
    if (!dataset) {
        res.status(404).send()
        return
    }

    let xlabel
    let ylabel
    let groupPath = ''
    let xlimKey = ''
    let ylimKey = ''
    if (req.query.key === 'rawImage') {
        groupPath = req.query.key + 'BinCounts'
        xlimKey = 'xBinLimitsInMillimeters'
        ylimKey = 'yBinLimitsInMillimeters'
        xlabel = 'coordinate (mm)'
        ylabel = 'coordinate (mm)'
    }
    if (req.query.key === 'filteredImage') {
        groupPath = req.query.key + 'BinCounts'
        xlimKey = 'xBinLimitsInMillimeters'
        ylimKey = 'yBinLimitsInMillimeters'
        xlabel = 'coordinate (mm)'
        ylabel = 'coordinate (mm)'
    }
    if (req.query.key === 'tofImageVProjection') {
        groupPath = req.query.key + 'BinCounts'
        xlimKey = 'xBinLimitsInMillimeters'
        ylimKey = 'yBinLimitsInNanoseconds'
        xlabel = 'coordinate (mm)'
        ylabel = 'tof (ns)'
    }
    const group = /** @type {import('h5wasm').Group} */(f.get(groupPath))
    const xlim = Array.from(/** @type {Float64Array} */(group.attrs[xlimKey].value))
    if (xlim.length !== 2) {
        res.status(404).send()
        f.close()
        return
    }
    const ylim = Array.from(/** @type {Float64Array} */(group.attrs[ylimKey].value))
    if (ylim.length !== 2) {
        res.status(404).send()
        f.close()
        return
    }

    res.json({
        xlim: xlim,
        ylim: ylim,
        xlabel: xlabel,
        ylabel: ylabel,
        shape: /** @type {number[]} */(dataset.shape),
        data: JSON.stringify(Array.from(/** @type {Uint32Array} */(dataset.value)))
    })
    // must be closed after response.end
    f.close()
    // console.log(JSON.stringify(dataset.value))
})

export default router;