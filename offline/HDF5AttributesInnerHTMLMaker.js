import Operator from './Operator.js'
const h5wasm = await import('h5wasm/node')
await h5wasm.ready

export default class extends Operator {
    /**
     * @param {import('./ServerVariables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {object[]} */
        this._hdf5Attributes
        variables.hdf5Attributes.addListener(arg => {
            this._hdf5Attributes = arg
            this._operation()
        })
        this._operation = () => {
            const keys = new Set()
            this._hdf5Attributes.forEach(row => {
                Object.keys(row).forEach(key => {
                    keys.add(key)
                })
            })
            variables.hdf5AttributesInnerHTML.assign(Array.from(keys).sort().map(key => `<option selected>${key}</option>`).join('\n'))
        }
    }
}
