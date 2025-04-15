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
                // tmp += `<p>${key}: ${this._hdf5File.attrs[key].dtype === '<i' ? value.toLocaleString() : value}</p>`

                tmp += `<tr>`
                tmp += `<td align="right">${key}</td>`
                tmp += `<td>:</td>`
                tmp += `<td style="text-indent: 1rem;">${Number.isInteger(value) ? value.toLocaleString() : value}</td>`
                tmp += `</tr>`
            })
            tmp += '</table>'
            this._hdf5File.keys().forEach((/** @type {string} */key) => {
                const dataset = this._hdf5File.get(key)
                tmp += `<p><b>/${key}</b></p>`
                tmp += '<table>'

                tmp += `<tr>`
                tmp += `<td align="right">dtype</td>`
                tmp += `<td>:</td>`
                // starts from < will cause problem here
                tmp += `<td style="text-indent: 1rem;">&lt;${dataset.dtype.substring(1)}</td>`
                tmp += `</tr>`

                tmp += `<tr>`
                tmp += `<td align="right">shape</td>`
                tmp += `<td>:</td>`
                tmp += `<td style="text-indent: 1rem;">[${dataset.shape}]</td>`
                tmp += `</tr>`

                Object.keys(dataset.attrs).forEach((/** @type {string} */key) => {
                    const value = dataset.attrs[key].value
                    // tmp += `<p>${key}: ${this._hdf5File.attrs[key].dtype === '<i' ? value.toLocaleString() : value}</p>`

                    tmp += `<tr>`
                    tmp += `<td align="right">${key}</td>`
                    tmp += `<td>:</td>`
                    tmp += `<td style="text-indent: 1rem;">${Number.isInteger(value) ? value.toLocaleString() : value}</td>`
                    tmp += `</tr>`
                })
                tmp += '</table>'
            })

            variables.clientInnerHTML.assign(tmp)
        }
    }
}

