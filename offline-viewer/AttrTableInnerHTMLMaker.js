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
            readdir(this._hdf5Path, (err, files) => {
                if (err) throw err

                /** @type {object[]} */
                const metadata = []
                files.forEach(file => {
                    const tmp = new Map()
                    tmp.set('name', file)
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
                const headerInnerHTML = '<tr>' + Array.from(keys).map(key => {
                    return `<th>${key}</th>`
                }).join('') + '</tr>'
                const bodyInnerHTML = metadata.map(row => {
                    return '<tr>' + Array.from(keys).map(key => {
                        const cellMap = new Map(Object.entries(row))
                        return `<td>${cellMap.get(key)}</td>`
                    }).join('') + '</tr>'
                }).join('')
                console.log('table done')
                variables.attrTableInnerHTML.assign([
                    '<html>',
                    '<head>',
                    '    <meta charset="utf-8">',
                    '</head>',
                    '<body>',
                    '    <table>',
                    '        <thead>',
                    headerInnerHTML,
                    '        </thead>',
                    '        <tbody>',
                    bodyInnerHTML,
                    '        </tbody>',
                    '    </table>',
                    '</body>',
                    '</html>'
                ].join('\n'))
            })
        }
    }
}

