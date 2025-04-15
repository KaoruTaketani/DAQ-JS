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
            if (!this._clientUrl.endsWith('attrs.js')) return

            const data = this._hdf5File.keys().map((/** @type {string}*/key) => `<p>${key}</p>`).join('')
            
            variables.clientInnerHTML.assign(data)
        }
    }
}

