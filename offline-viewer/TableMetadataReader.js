import { readdir } from 'fs'
import { basename, join } from 'path'
import Operator from './Operator.js'
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
        variables.httpServer.addListener(_ => {
            this._operation()
        })
        this._operation = () => {
            readdir(this._hdf5Path, (err, files) => {
                if (err) throw err

                /** @type {object[]} */
                const metadata = []
                files.forEach(file => {
                    if (!file.endsWith('.h5')) return

                    const tmp = new Map()
                    tmp.set('_name', basename(file, '.h5'))
                    const f = new h5wasm.File(join(this._hdf5Path, file), 'r')
                    Object.keys(f.attrs).forEach(key => {
                        tmp.set(key, f.attrs[key].value)
                    })
                    f.close()
                    metadata.push(Object.fromEntries(tmp))
                })
                console.log('metadata done')
                const keys = new Set()
                metadata.forEach(row => {
                    Object.keys(row).forEach(key => {
                        keys.add(key)
                    })
                })
                variables.tableColumns.assign(Array.from(keys).sort())

                variables.tableMetadata.assign(metadata)
            })
        }
    }
}

