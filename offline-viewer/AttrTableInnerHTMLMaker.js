import { readdir } from 'fs'
import { join } from 'path'
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
            this._attrMap = new Map()
            readdir(this._hdf5Path, (err, files) => {
                if (err) throw err

                files.forEach(file => {
                    const f = new h5wasm.File(join(this._hdf5Path, file), 'r')
                    Object.keys(f.attrs).forEach(key => {
                        this._attrMap.set(key, f.attrs[key].value)
                    })
                    f.close()
                })
                console.log('attr done')
                variables.attrTableInnerHTML.assign(['<html>',
                    '<head>',
                    '    <meta charset="utf-8">',
                    '</head>',
                    '<body>',
                    '    <p>attr table</p>',
                    '</body>',
                    '</html>'
                ].join('\n'))
            })
        }
    }
}

