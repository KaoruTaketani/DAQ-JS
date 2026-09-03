import express from 'express';
import { close, open, read, readFile, readdirSync } from 'fs';
import h5wasm from "h5wasm/node";
import { basename, join } from 'path';

const router = express.Router();

router.get('/attributes', (req, res) => {
    if (!process.env.hdf5Path
        || !process.env.jsonPath
        || !process.env.sigbPath
        || typeof req.query.extname !== 'string'
        || typeof req.query.path !== 'string'
        || !['h5', 'json', 'sigb'].includes(req.query.extname)) {
        res.status(404).send()
        return
    }

    /** @type {Map<string,object>} */
    const attributes = new Map()
    if (req.query.extname === 'h5') {
        h5wasm.ready.then(() => {
            const hdf5Path = process.env.hdf5Path
            const path = req.query.path
            const basePath = join(hdf5Path, path)
            const files = readdirSync(basePath, { withFileTypes: true })
                .filter(file => file.name.endsWith(`.${req.query.extname}`))
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
        })
    } else if (req.query.extname === 'json') {
        const startTime = Date.now()
        const jsonPath = process.env.jsonPath
        const path = req.query.path
        const basePath = join(jsonPath, path)
        const files = readdirSync(basePath, { withFileTypes: true })
            .filter(file => file.name.endsWith(`.${req.query.extname}`))

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
            files.forEach((file, i) => { attributes.set(file.name, objects[i]) })
            res.json(Object.fromEntries(attributes))
            console.log(`${basename(import.meta.url)} extname:${req.query.extname}, elapsedTime: ${Date.now() - startTime}ms`)
        })
    } else if (req.query.extname === 'sigb') {
        const startTime = Date.now()
        const sigbPath = process.env.sigbPath
        const path = req.query.path
        const basePath = join(sigbPath, path)
        const files = readdirSync(basePath, { withFileTypes: true })
            .filter(file => file.name.endsWith(`.${req.query.extname}`))

        Promise.all(files.map(file => new Promise(resolve => {
            if (typeof file.name !== 'string') {
                resolve({})
            } else {
                const filePath = join(basePath, file.name)
                const buffer = Buffer.alloc(1024)
                open(filePath, 'r', (err, fd) => {
                    if (err) throw err

                    read(fd, buffer, (err, _bytesRead, buffer) => {
                        if (err) throw err

                        close(fd)
                        const matrix = buffer.toString().trim().split('\n').map(line => line.split('='))

                        resolve(Object.fromEntries(matrix))
                    })
                })
            }
        }))).then(objects => {
            files.forEach((file, i) => { attributes.set(file.name, objects[i]) })
            res.json(Object.fromEntries(attributes))
            console.log(`${basename(import.meta.url)} extname:${req.query.extname}, elapsedTime: ${Date.now() - startTime}ms`)
        })
    }
})

export default router;