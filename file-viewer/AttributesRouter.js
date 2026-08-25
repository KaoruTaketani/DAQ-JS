import express from 'express';
import { join } from 'path'
import h5wasm from "h5wasm/node"
await h5wasm.ready;

const router = express.Router();

router.get('/attributes', (req, res) => {
    if (!Array.isArray(req.query.fileName)) {
        if (!process.env.hdf5Path
            || typeof req.query.path !== 'string'
            || typeof req.query.fileName !== 'string') {
            res.status(404).send()
            return
        }

        // use mode "r" for reading.  All modes can be found in h5wasm.ACCESS_MODES
        let f = new h5wasm.File(join(process.env.hdf5Path, req.query.path, req.query.fileName), "r")
        //     variables.hdf5File.assign(f)
        // console.log('xxx')
        let tmp = '<table>'
        tmp += Object.keys(f.attrs).map(key => {
            // if (key === 'roiInMillimeters') {
            //     console.log(f.attrs[key])
            //     console.log(f.attrs[key].value)
            // }
            // console.log(f.attrs[key])
            // if (Array.isArray(f.attrs[key].value)) {
            //     // return `${key}: [${f.attrs[key].value.map((/** @type {any} */v) => v.toString()).join(' ')}]`
            //     return `<tr><th>${key}</th><td>[${f.attrs[key].value.map((/** @type {any} */v) => v.toString()).join(' ')}]</td></tr>`
            // } else {
            //     // return `${key}: ${f.attrs[key].value}`
            //     return `<tr><th>${key}</th><td>${f.attrs[key].value}</td></tr>`
            // }
            const value = f.attrs[key]?.value,
                shape = f.attrs[key]?.shape,
                dtype = f.attrs[key]?.dtype

            if (dtype === 'S') {
                return `<tr><th>${key}</th><td>${value}</td></tr>`
            }
            if (shape) {
                if (shape.length === 1) {
                    return `<tr><th>${key}</th><td>[${/** @type {number[]} */ (value).map((/** @type {number} */v) => v.toString()).join(' ')}]</td></tr>`
                } else {
                    // Int32
                    if (dtype === '<i') return `<tr><th>${key}</th><td>${value?.toLocaleString()}</td></tr>`
                    // Uint32
                    if (dtype === '<I') return `<tr><th>${key}</th><td>${value?.toLocaleString()}</td></tr>`
                    // Float32
                    if (dtype === '<f') return `<tr><th>${key}</th><td>${value?.toString()}</td></tr>`
                    // Float64
                    if (dtype === '<d') return `<tr><th>${key}</th><td>${value?.toString()}</td></tr>`
                    // unexpected
                }
            }
        }).join('\n')
        tmp += '</table>'
        res.send(tmp)
        f.close()
    } else {
        if (!process.env.hdf5Path
            || typeof req.query.path !== 'string') {
            res.status(404).send()
            return
        }

        const startTime = Date.now()
        const keys = new Set()
        keys.add('_name')
        const hdf5Path = process.env.hdf5Path
        const path = req.query.path

        req.query.fileName.forEach(name => {
            // use mode "r" for reading.  All modes can be found in h5wasm.ACCESS_MODES
            let f = new h5wasm.File(join(hdf5Path, path, /** @type {string} */(name)), "r")
            Object.keys(f.attrs).forEach(key => { keys.add(key) })
            f.close()
        })
        /** @type {any[]} */
        const attributes = []
        req.query.fileName?.forEach(name => {
            // use mode "r" for reading.  All modes can be found in h5wasm.ACCESS_MODES
            let f = new h5wasm.File(join(hdf5Path, path, /** @type {string} */(name)), "r")
            //     variables.hdf5File.assign(f)
            // const tmp = Object.keys(f.attrs).map(key => [key, f.attrs[key].value])
            const tmp = new Map()
            keys.forEach(key => {
                if (key === '_name') {
                    tmp.set('_name', name)
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
        res.send([
            '<thead>',
            '<tr>',
            Object.keys(attributes[0]).map(key => `<th>${key}</th>`).join(''),
            '</tr>',
            '</thead>',
            '<tbody align="right">',
            attributes.map(obj => [
                '<tr>',
                Object.keys(obj).map(key => `<td>${obj[key]}</td>`).join(''),
                '</tr>'
            ].join('')).join(''),
            '</tbody>'
        ].join(''))
        console.log(`elapsedTime: ${Date.now() - startTime}ms`)
    }
})

export default router;