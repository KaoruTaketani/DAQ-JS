import { ok } from 'assert'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {string} */
        this._clientUrl
        variables.clientUrl.prependListener(arg => { this._clientUrl = arg })
        /** @type {import('h5wasm').File} */
        this._hdf5File
        variables.hdf5File.addListener(arg => {
            this._hdf5File = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._clientUrl.endsWith('Attributes.js')) return

            // console.log(this._hdf5File.keys())
            // console.log(this._hdf5File.name)
            // console.log(Object.assign({},this._hdf5File.attrs))
            // console.log(Object.values(this._hdf5File.attrs))
            // console.log(Object.values(this._hdf5File.attrs).map(attr=>`${attr.name}:${this._hdf5File.attrs[attr]}`))
            let tmp = '<p><b>/</b></p>'
            tmp += '<table>'
            Object.keys(this._hdf5File.attrs).forEach(key => {
                // console.log(`key:${key}, dtype: ${this._hdf5File.attrs[key].dtype}, value: ${this._hdf5File.attrs[key].value}, typeof: ${typeof this._hdf5File.attrs[key].value}`)
                const value = this._hdf5File.attrs[key].value
                ok(value)
                // tmp += `<p>${key}: ${this._hdf5File.attrs[key].dtype === '<i' ? value.toLocaleString() : value}</p>`

                tmp += `<tr>`
                tmp += `<td align="right">${key}</td>`
                tmp += `<td>:</td>`
                tmp += `<td style="text-indent: 1rem;">${Number.isInteger(value) ? value.toLocaleString() : value}</td>`
                tmp += `</tr>`
            })
            tmp += '</table>'
            this._hdf5File.keys().forEach((/** @type {string} */key) => {
                /** @type {any} */
                const entity = this._hdf5File.get(key)
                // console.log(`key: ${key}, ${entity}, ${entity instanceof Group}, ${entity instanceof Dataset}, ${entity instanceof Datatype}, ${entity instanceof RegionReference}`)
                // ok(entity)
                if (entity.dtype) {
                    console.log(`${key} ${entity.dtype} truthy`)
                    /** @type {import('h5wasm').Dataset} */
                    const dataset = entity
                    //dataset
                    tmp += `<p><b>/${key}</b></p>`
                    tmp += '<table>'

                    tmp += `<tr>`
                    tmp += `<td align="right">shape</td>`
                    tmp += `<td>:</td>`
                    tmp += `<td style="text-indent: 1rem;">[${dataset.shape}]</td>`
                    tmp += `</tr>`

                    // Object.keys(dataset.attrs).forEach((/** @type {string} */key) => {
                    //     const value = dataset.attrs[key].value
                    //     // tmp += `<p>${key}: ${this._hdf5File.attrs[key].dtype === '<i' ? value.toLocaleString() : value}</p>`
                    //     ok(value)
                    //     tmp += `<tr>`
                    //     tmp += `<td align="right">${key}</td>`
                    //     tmp += `<td>:</td>`
                    //     tmp += `<td style="text-indent: 1rem;">${Number.isInteger(value) ? value.toLocaleString() : value}</td>`
                    //     tmp += `</tr>`
                    // })
                    tmp += '</table>'
                } else {
                    console.log(`${key} ${entity.dtype} falsy`)
                    /** @type {import('h5wasm').Group} */
                    const group = entity
                    group.keys().forEach((/** @type {string} */key2) => {
                        const dataset2 = entity.get(key2)
                        //dataset
                        tmp += `<p><b>/${key}/${key2}</b></p>`
                        tmp += '<table>'


                        const s = dataset2.shape

                        tmp += `<tr>`
                        tmp += `<td align="right">shape</td>`
                        tmp += `<td>:</td>`
                        tmp += `<td style="text-indent: 1rem;">[${s}]</td>`
                        tmp += `</tr>`
                        if (s !== null && s.length === 1 && s[0] == 2) {
                            tmp += `<tr>`
                            tmp += `<td align="right">value</td>`
                            tmp += `<td>:</td>`
                            tmp += `<td style="text-indent: 1rem;">[${dataset2.value}]</td>`
                            tmp += `</tr>`
                        }


                        tmp += '</table>'
                    })
                }
            })

            variables.clientInnerHTML.assign(tmp)
        }
    }
}

