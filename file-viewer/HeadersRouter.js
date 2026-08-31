import express from 'express';
import { join } from 'path'
import h5wasm from "h5wasm/node"
import { open, read, close } from 'fs';
await h5wasm.ready;

const router = express.Router();

router.get('/headers', (req, res) => {
    if (!Array.isArray(req.query.fileName)) {
        if (!process.env.sigbPath
            || typeof req.query.path !== 'string'
            || typeof req.query.fileName !== 'string') {
            res.status(404).send()
            return
        }
        const filePath = join(process.env.sigbPath, req.query.path, req.query.fileName)
        const buffer = Buffer.alloc(1024)
        open(filePath, 'r', (err, fd) => {
            if (err) throw err

            read(fd, buffer, { length: buffer.length }, (err, _bytesRead, buffer) => {
                if (err) throw err

                close(fd)
                res.send(JSON.stringify({ fileName: req.query.fileName, header: buffer.toString() }))
            })
        })
    } else {
        if (!process.env.sigbPath
            || typeof req.query.path !== 'string') {
            res.status(404).send()
            return
        }

        const startTime = Date.now()
        const sigbPath = process.env.sigbPath
        const path = req.query.path

        Promise.all(req.query.fileName.map(fileName => new Promise(resolve => {
            // // use mode "r" for reading.  All modes can be found in h5wasm.ACCESS_MODES
            // let f = new h5wasm.File(join(hdf5Path, path, /** @type {string} */(name)), "r")
            // Object.keys(f.attrs).forEach(key => { keys.add(key) })
            // f.close()
            if (typeof fileName !== 'string') {
                resolve({})
            } else {
                const filePath = join(sigbPath, path, fileName)
                const buffer = Buffer.alloc(1024)
                open(filePath, 'r', (err, fd) => {
                    if (err) throw err

                    read(fd, buffer, { length: buffer.length }, (err, _bytesRead, buffer) => {
                        if (err) throw err

                        close(fd)
                        resolve({ fileName: fileName, header: buffer.toString() })
                    })
                })
            }
        }))).then(objects => {
            res.send(JSON.stringify(objects))
            console.log(`elapsedTime: ${Date.now() - startTime}ms`)
        })
    }
})

export default router;