import express from 'express';
import h5wasm from "h5wasm/node";
import { resolve, join } from 'path';
await h5wasm.ready;

const router = express.Router();

router.get('/image', (req, res) => {
    if (!process.env.hdf5BasePath
        || typeof req.query.path !== 'string'
        || typeof req.query.key !== 'string'
        || typeof req.query.fileName !== 'string') {
        res.sendStatus(404)
        return
    }

    const filePath = resolve(join(process.env.hdf5BasePath, req.query.path, req.query.fileName))
    if (!filePath.startsWith(resolve(process.env.hdf5BasePath))) {
        res.sendStatus(500)
        return
    }

    let f = new h5wasm.File(filePath, "r");
    /** @type {import('h5wasm').Dataset|null} */
    const dataset = /** @type {import('h5wasm').Dataset|null} */(f.get(req.query.key))
    if (!dataset) {
        res.sendStatus(404)
        return
    }

    const xlabel = /** @type {string[]} */(dataset.attrs['_labels'].to_array())[0]
    const ylabel = /** @type {string[]} */(dataset.attrs['_labels'].to_array())[1]
    const xlim = /** @type {number[]} */(dataset.attrs['_xlim'].to_array())
    const ylim = /** @type {number[]} */(dataset.attrs['_ylim'].to_array())
    const data = Array.from(/** @type {Uint32Array} */(dataset.value))

    res.json({
        xlim: xlim,
        ylim: ylim,
        xlabel: xlabel,
        ylabel: ylabel,
        shape: /** @type {number[]} */(dataset.shape),
        data: data
    })
    f.close()
})

export default router;