import express from 'express';
import { close, open, read, readFile, readdirSync } from 'fs';
import h5wasm from "h5wasm/node";
import { resolve, basename, join } from 'path';

const router = express.Router();

router.get('/attributes', (req, res) => {
    if (!process.env.hdf5Path
        || !process.env.jsonPath
        || !process.env.sigbPath
        || typeof req.query.extname !== 'string'
        || typeof req.query.path !== 'string'
        || !['h5', 'json', 'sigb'].includes(req.query.extname)) {
        res.sendStatus(404)
        return
    }

    const basePaths = new Map()
    basePaths.set('h5', process.env.hdf5Path)
    basePaths.set('json', process.env.jsonPath)
    basePaths.set('sigb', process.env.sigbPath)

    const folderPath = resolve(join(basePaths.get(req.query.extname), req.query.path))
    if (!folderPath.startsWith(resolve(basePaths.get(req.query.extname)))) {
        res.sendStatus(500)
        return
    }

    const files = readdirSync(folderPath, { withFileTypes: true })
        .filter(file => file.name.endsWith(`.${req.query.extname}`))

    /** @type {Map<string,object>} */
    const attributes = new Map()
    if (req.query.extname === 'h5') {
        h5wasm.ready.then(() => {
            const startTime = Date.now()
            files.forEach(file => {
                let f = new h5wasm.File(join(folderPath, file.name), "r")
                const tmp = new Map()
                Object.keys(f.attrs).forEach(key => {
                    tmp.set(key, f.attrs[key]?.value)
                })
                attributes.set(file.name, Object.fromEntries(tmp))
                f.close()
            })
            res.json(Object.fromEntries(attributes))
            console.log(`${basename(import.meta.url)} extname:${req.query.extname}, elapsedTime: ${Date.now() - startTime}ms`)
        })
    } else if (req.query.extname === 'json') {
        const startTime = Date.now()

        Promise.all(files.map(file => new Promise(resolve => {
            if (typeof file.name !== 'string') {
                resolve({})
            } else {
                readFile(join(folderPath, file.name), 'utf8', (err, data) => {
                    if (err) {
                        res.sendStatus(500)
                        return
                    }

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

        Promise.all(files.map(file => new Promise(resolve => {
            if (typeof file.name !== 'string') {
                resolve({})
            } else {
                const filePath = join(folderPath, file.name)
                const buffer = Buffer.alloc(1024)
                open(filePath, 'r', (err, fd) => {
                    if (err) {
                        res.sendStatus(500)
                        return
                    }

                    read(fd, buffer, (err, _bytesRead, buffer) => {
                        if (err) {
                            res.sendStatus(500)
                            return
                        }

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