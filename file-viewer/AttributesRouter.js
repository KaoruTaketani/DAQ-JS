import express from 'express';
import { readFile, readdirSync } from 'fs';
import h5wasm from "h5wasm/node";
import { basename, join } from 'path';
await h5wasm.ready;

const router = express.Router();

router.get('/attributes', (req, res) => {
    if (!process.env.hdf5Path
        || !process.env.jsonPath
        || typeof req.query.extname !== 'string'
        || typeof req.query.path !== 'string') {
        res.status(404).send()
        return
    }

    /** @type {Map<string,object>} */
    const attributes = new Map()
    if (req.query.extname === 'h5') {
        const hdf5Path = process.env.hdf5Path
        const path = req.query.path
        const basePath = join(hdf5Path, path)
        const files = readdirSync(basePath, { withFileTypes: true })
            .filter(file => file.name.endsWith('.h5'))
        const startTime = Date.now()
        files.forEach(file => {
            let f = new h5wasm.File(join(basePath, file.name), "r")
            const tmp = new Map()
            Object.keys(f.attrs).forEach(key => {
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
            })
            attributes.set(file.name, Object.fromEntries(tmp))
            f.close()
        })
        res.json(Object.fromEntries(attributes))
        console.log(`${basename(import.meta.url)} extname:${req.query.extname}, elapsedTime: ${Date.now() - startTime}ms`)
    } else if (req.query.extname === 'json') {
        const startTime = Date.now()
        const jsonPath = process.env.jsonPath
        const path = req.query.path
        const basePath = join(jsonPath, path)
        const files = readdirSync(basePath, { withFileTypes: true })
            .filter(file => file.name.endsWith('.json'))

        Promise.all(files.map(file => new Promise(resolve => {
            if (typeof file.name !== 'string') {
                resolve({})
            } else {
                readFile(join(jsonPath, path, file.name), 'utf8', (err, data) => {
                    if (err) throw err

                    const tmp = JSON.parse(data)
                    attributes.set(file.name, tmp)
                    resolve(tmp)
                })
            }
        }))).then(objects => {
            files.forEach((file,i) => { attributes.set(file.name, objects[i]) })
            res.json(Object.fromEntries(attributes))
            console.log(`elapsedTime: ${Date.now() - startTime}ms`)
        })
    } else {
        res.status(404).send()
    }
})

export default router;