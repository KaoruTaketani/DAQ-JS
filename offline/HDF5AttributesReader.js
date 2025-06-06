import { basename, join } from 'path'
import Operator from './Operator.js'
const h5wasm = await import('h5wasm/node')
await h5wasm.ready

export default class extends Operator {
    /**
     * @param {import('./ServerVariables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {string} */
        this._hdf5Path
        variables.hdf5Path.prependListener(arg => { this._hdf5Path = arg })
        /** @type {string[]} */
        this._hdf5FileNames
        variables.hdf5FileNames.addListener(arg => {
            this._hdf5FileNames = arg
            this._operation()
        })
        this._operation = () => {
            const startTime = Date.now()
            /** @type {object[]} */
            const attributes = []
            this._hdf5FileNames.forEach(hdf5FileName => {
                const tmp = new Map()
                tmp.set('_name', basename(hdf5FileName, '.h5'))
                const f = new h5wasm.File(join(this._hdf5Path, hdf5FileName), 'r')
                Object.keys(f.attrs).forEach(key => {
                    tmp.set(key, f.attrs[key].value)
                })
                f.close()
                attributes.push(Object.fromEntries(tmp))
            })
            console.log(`readMetadata elapsedTime: ${Date.now() - startTime}ms`)
            variables.hdf5Attributes.assign(attributes)
        }
    }
}
