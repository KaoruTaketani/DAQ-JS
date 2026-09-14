import express from 'express';
import h5wasm from "h5wasm/node";
import { readdirSync } from 'fs';
import { resolve, basename, join } from 'path';
await h5wasm.ready;

const router = express.Router();

router.get('/keys', (req, res) => {
    if (!process.env.hdf5BasePath
        || typeof req.query.path !== 'string'
        || typeof req.query.dataType !== 'string') {
        res.sendStatus(404)
        return
    }

    const basePath = resolve(join(process.env.hdf5BasePath, req.query.path))
    if (!basePath.startsWith(resolve(process.env.hdf5BasePath))) {
        res.sendStatus(500)
        return
    }

    const files = readdirSync(basePath, { withFileTypes: true })
    const keys = new Set()
    const startTime = Date.now()

    files.filter(file => file.name.endsWith('.h5'))
        .forEach(file => {
            let f = new h5wasm.File(join(basePath, file.name), "r");
            f.keys().forEach(key => {

                if (req.query.dataType === 'image') {
                    /** @type {import('h5wasm').Dataset|null} */
                    const dataset = /** @type {import('h5wasm').Dataset|null} */(f.get(key))
                    // if (file.name === '4.h5' &&
                    //     key, dataset?.attrs['_labels'])
                    //     console.log(key, dataset?.attrs['_labels'].shape)
                    // if (dataset && Object.keys(dataset.attrs).length === 2) {

                    if (dataset) {
                        const labels = dataset.attrs['_labels']
                        if (labels && labels.shape && labels.shape[0] === 2) {
                            keys.add(key)
                        }
                    }
                }
                if (req.query.dataType === 'waveform') {
                    /** @type {import('h5wasm').Dataset|null} */
                    const dataset = /** @type {import('h5wasm').Dataset|null} */(f.get(key))
                    // if (file.name === '4.h5' &&
                    //     key, dataset?.attrs['_labels'])
                    //     console.log(key, dataset?.attrs['_labels'].shape)
                    // if (dataset && Object.keys(dataset.attrs).length === 1) {

                    if (dataset) {
                        const labels = dataset.attrs['_labels']
                        if (labels && labels.shape && labels.shape[0] === 1) {
                            keys.add(key)
                        }
                    }
                }
                if (req.query.dataType === 'xy') {
                    /** @type {import('h5wasm').Dataset|null} */
                    const dataset = /** @type {import('h5wasm').Dataset|null} */(f.get(key))
                    // if (file.name === '4.h5' &&
                    //     key, dataset?.attrs['_labels'])
                    //     console.log(key, dataset?.attrs['_labels'].shape)
                    // if (dataset && Object.keys(dataset.attrs).length === 0) {
                    if (dataset && !dataset.attrs['_labels']) {
                        keys.add(key)
                    }
                }
            })
            f.close()
        })
    console.log(`${basename(import.meta.url)} elapsedTime: ${Date.now() - startTime}ms`)
    res.json(Array.from(keys).sort())
})

export default router;