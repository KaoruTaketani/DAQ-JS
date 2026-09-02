import express from 'express';
import h5wasm from "h5wasm/node";
import { readdirSync } from 'fs';
import { basename, join } from 'path';
await h5wasm.ready;

const router = express.Router();

router.get('/keys', (req, res) => {
    if (!process.env.hdf5Path
        || typeof req.query.path !== 'string'
        || typeof req.query.type !== 'string') {
        res.status(404).send()
        return
    }
    const basePath = join(process.env.hdf5Path, req.query.path)
    const files = readdirSync(basePath, { withFileTypes: true })
    const keys = new Set()
    const startTime = Date.now()

    files.filter(file => file.name.endsWith('.h5'))
        .forEach(file => {
            let f = new h5wasm.File(join(basePath, file.name), "r");
            f.keys().forEach(key => {
                /** @type {import('h5wasm').Dataset|null} */
                const dataset = /** @type {import('h5wasm').Dataset|null} */(f.get(key))
                if (dataset && Object.keys(dataset.attrs).length === 2) {
                    keys.add(key)
                }
            })
            f.close()
        })
    console.log(`${basename(import.meta.url)} elapsedTime: ${ Date.now() - startTime }ms`)
    res.json(Array.from(keys))
})

export default router;