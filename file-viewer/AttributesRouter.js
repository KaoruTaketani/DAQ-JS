import express from 'express';
import { basename, join } from 'path'
import { readdirSync } from 'fs';
import h5wasm from "h5wasm/node"
await h5wasm.ready;

const router = express.Router();

router.get('/attributes', (req, res) => {
    if (!process.env.hdf5Path
        || typeof req.query.path !== 'string') {
        res.status(404).send()
        return
    }

    const hdf5Path = process.env.hdf5Path
    const path = req.query.path
    const basePath = join(hdf5Path, path)
    const files = readdirSync(basePath, { withFileTypes: true })
        .filter(file => file.name.endsWith('.h5'))
    const startTime = Date.now()
    const keys = new Set()
    keys.add('_name')
    files.forEach(file => {
        let f = new h5wasm.File(join(basePath, file.name), "r")
        Object.keys(f.attrs).forEach(key => { keys.add(key) })
        f.close()
    })
    /** @type {any[]} */
    const attributes = []
    files.forEach(file => {
        let f = new h5wasm.File(join(basePath, file.name), "r")
        const tmp = new Map()
        keys.forEach(key => {
            if (key === '_name') {
                tmp.set('_name', file.name)
            } else {
                const value = f.attrs[key]?.value,
                    shape = f.attrs[key]?.shape,
                    dtype = f.attrs[key]?.dtype

                if (!value) {
                    tmp.set(key, value)
                } else {
                    // string
                    if (dtype === 'S') {
                        tmp.set(key, value)
                        return
                    }
                    if (shape) {
                        if (shape.length === 1) {
                            tmp.set(key, '"' +/** @type {number[]} */ (value).map((/** @type {number} */v) => v.toString()).join(' ') + '"')
                        } else {
                            // Int32
                            if (dtype === '<i') tmp.set(key, `"${value.toLocaleString()}"`)
                            // Uint32
                            if (dtype === '<I') tmp.set(key, `"${value.toLocaleString()}"`)
                            // Float32
                            if (dtype === '<f') tmp.set(key, value.toString())
                            // Float64
                            if (dtype === '<d') tmp.set(key, value.toString())
                        }
                    }
                }
            }
        })
        attributes.push(Object.fromEntries(tmp))
        f.close()
    })
    res.json(attributes)
    console.log(`${basename(import.meta.url)} elapsedTime: ${Date.now() - startTime}ms`)
})

export default router;