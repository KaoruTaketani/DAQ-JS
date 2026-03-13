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
            if (!this._url.pathname.endsWith('.h5')) return
            if (this._url.searchParams.get('type') !== 'attributes') return

            // use mode "r" for reading.  All modes can be found in h5wasm.ACCESS_MODES
            let f = new h5wasm.File(join(this._hdf5Path, this._url.pathname), "r")
            //     variables.hdf5File.assign(f)
            const tmp = Object.keys(f.attrs).map(key => {
                return `${key}: ${f.attrs[key].value}`
            }).join('\n')
            this._response.writeHead(200)
            this._response.end(tmp)
            f.close()
        }
    }
}

