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
        const buffer = Buffer.alloc(1024);
        open(filePath, 'r', (err, fd) => {
            if (err) throw err

            read(fd, buffer, { length: buffer.length }, (err, _bytesRead, buffer) => {
                if (err) throw err
                console.log(_bytesRead)
                res.send(buffer.toString())
                close(fd)
            })
        })
    } else {
        // if (!process.env.jsonPath
        //     || typeof req.query.path !== 'string') {
        //     res.status(404).send()
        //     return
        // }

        // const startTime = Date.now()
        // const jsonPath = process.env.jsonPath
        // const path = req.query.path

        // Promise.all(req.query.fileName.map(fileName => new Promise(resolve => {
        //     // // use mode "r" for reading.  All modes can be found in h5wasm.ACCESS_MODES
        //     // let f = new h5wasm.File(join(hdf5Path, path, /** @type {string} */(name)), "r")
        //     // Object.keys(f.attrs).forEach(key => { keys.add(key) })
        //     // f.close()
        //     if (typeof fileName !== 'string') {
        //         resolve({})
        //     } else {
        //         readFile(join(jsonPath, path, fileName), 'utf8', (err, data) => {
        //             if (err) throw err

        //             const tmp = JSON.parse(data)
        //             tmp['_name'] = fileName
        //             resolve(tmp)
        //         })
        //     }
        // }))).then(objects => {
        //     const keys = new Set()
        //     keys.add('_name')
        //     objects.forEach(object => {
        //         Object.keys(object).forEach(key => keys.add(key))
        //     })
        //     res.send([
        //         '<thead>',
        //         '<tr>',
        //         Array.from(keys).map(key => `<th>${key}</th>`).join(''),
        //         '</tr>',
        //         '</thead>',
        //         '<tbody align="right">',
        //         objects.map(obj => [
        //             '<tr>',
        //             Array.from(keys).map(key => `<td>${obj[key]}</td>`).join(''),
        //             '</tr>'
        //         ].join('')).join(''),
        //         '</tbody>'
        //     ].join(''))
        //     console.log(`elapsedTime: ${Date.now() - startTime}ms`)
        // })
    }
})

export default router;