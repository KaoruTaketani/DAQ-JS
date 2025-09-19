import Operator from './Operator.js'
// const h5wasm = await import("h5wasm/node")
// await h5wasm.ready

export default class extends Operator {
    /**
     * @param {import('./OfflineVariables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {string} */
        this._hdf5Path
        variables.hdf5Path.prependListener(arg => { this._hdf5Path = arg })
        /** @type {string} */
        this._hdf5FileReaderFileName
        variables.hdf5FileReaderFileName.addListener(arg => {
            this._hdf5FileReaderFileName = arg
            this._operation()
        })
        this._operation = () => {
            console.log(`OfflineReader filename: ${this._hdf5FileReaderFileName}`)
        }
    }
}

