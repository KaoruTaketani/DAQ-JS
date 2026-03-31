import { join } from 'path'
import { ok } from 'assert'
import Operator from './Operator.js'
// @ts-ignore
const h5wasm = await import("h5wasm/node")
await h5wasm.ready

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {string} */
        this._hdf5Path
        variables.hdf5Path.prependListener(arg => { this._hdf5Path = arg })
        /** @type {Map<URL,import('http').ServerResponse>} */
        this._responses
        variables.responses.prependListener(arg => { this._responses = arg })
        /** @type {URL} */
        this._url
        variables.url.addListener(arg => {
            this._url = arg
            this._operation()
        })
        this._operation = () => {
            if (this._url.pathname !== '/attributes') return

            const response = this._responses.get(this._url)
            ok(response)
            this._responses.delete(this._url)
            const path = this._url.searchParams.get('path')
            if (!path) {
                response.writeHead(400)
                response.end()
                return
            }
            const fileName = this._url.searchParams.get('fileName')
            if (!fileName) {
                response.writeHead(400)
                response.end()
                return
            }

            if (fileName.split(',').length === 0) {
                response.writeHead(200)
                response.end()
                return
            }
            if (fileName.split(',').length === 1) {
                // use mode "r" for reading.  All modes can be found in h5wasm.ACCESS_MODES
                let f = new h5wasm.File(join(this._hdf5Path, path, fileName), "r")
                //     variables.hdf5File.assign(f)
                // console.log('xxx')
                const tmp = Object.keys(f.attrs).map(key => {
                    // if (key === 'roiInMillimeters') {
                    //     console.log(f.attrs[key])
                    //     console.log(f.attrs[key].value)
                    // }
                    if (Array.isArray(f.attrs[key].value)) {
                        return `${key}: [${f.attrs[key].value.map(v=>v.toString()).join(' ')}]`
                    } else {
                        return `${key}: ${f.attrs[key].value}`
                    }
                }).join('\n')
                response.writeHead(200)
                response.end(tmp)
                f.close()
                return
            }
            const startTime = Date.now()
            const keys = new Set()
            keys.add('_name')
            fileName.split(',').forEach(name => {
                // use mode "r" for reading.  All modes can be found in h5wasm.ACCESS_MODES
                let f = new h5wasm.File(join(this._hdf5Path, path, name), "r")
                Object.keys(f.attrs).forEach(key => { keys.add(key) })
                f.close()
            })
            /** @type {any[]} */
            const attributes = []
            fileName.split(',').forEach(name => {
                // use mode "r" for reading.  All modes can be found in h5wasm.ACCESS_MODES
                let f = new h5wasm.File(join(this._hdf5Path, path, name), "r")
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
                            if (shape) {
                                if (shape.length === 1) {
                                    tmp.set(key, '[' + value.map((/** @type {number} */v) => v.toString()).join(' ') + ']')
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
                            } else {
                                // string
                                if (dtype === 'S') tmp.set(key, value)
                            }
                        }
                    }
                })
                attributes.push(Object.fromEntries(tmp))
                f.close()
            })
            response.writeHead(200)
            response.end([
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
    }
}

