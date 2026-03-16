import { join } from 'path'
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
        /** @type {import('http').ServerResponse} */
        this._response
        variables.response.prependListener(arg => { this._response = arg })
        /** @type {URL} */
        this._url
        variables.url.addListener(arg => {
            this._url = arg
            this._operation()
        })
        this._operation = () => {
            if (this._url.pathname !== '/attributes') return

            const path = this._url.searchParams.get('path')
            if (!path) return
            const fileName = this._url.searchParams.get('fileName')
            if (!fileName) return

            if (fileName.split(',').length === 0) {
                this._response.writeHead(200)
                this._response.end('')
                return
            }
            if (fileName.split(',').length === 1) {
                // use mode "r" for reading.  All modes can be found in h5wasm.ACCESS_MODES
                let f = new h5wasm.File(join(this._hdf5Path, path, fileName), "r")
                //     variables.hdf5File.assign(f)
                const tmp = Object.keys(f.attrs).map(key => {
                    return `${key}: ${f.attrs[key].value}`
                }).join('\n')
                this._response.writeHead(200)
                this._response.end(tmp)
                f.close()
                return
            }
            const startTime=Date.now()
            /** @type {any[]} */
            const attributes = []
            fileName.split(',').forEach(name => {
                // use mode "r" for reading.  All modes can be found in h5wasm.ACCESS_MODES
                let f = new h5wasm.File(join(this._hdf5Path, path, name), "r")
                //     variables.hdf5File.assign(f)
                const tmp=Object.keys(f.attrs).map(key => [key, f.attrs[key].value])
                // console.log(tmp)
                attributes.push(Object.fromEntries(tmp))
                // const tmp = Object.keys(f.attrs).map(key => {
                //     return `${key}: ${f.attrs[key].value}`
                // }).join('\n')
                f.close()
            })
            this._response.writeHead(200)
            this._response.end([
                '<thead>',
                '<tr>',
                Object.keys(attributes[0]).map(key => `<th>${key}</th>`).join(''),
                '</tr>',
                '</thead>',
                '<tbody align="right">',
                attributes.map(obj => ['<tr>',
                    Object.keys(obj).map(key => {
                        /** @type {any} */
                        const tmp = obj
                        return `<td>${tmp[key].toLocaleString()}</td>`
                    }).join(''),
                    '</tr>'].join('')
                ).join(''),
                '</tbody>'
            ].join(''))
            console.log(`elapsedTime: ${Date.now()-startTime}ms`)
        }
    }
}

