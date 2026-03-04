export default class {
    /**
     * @param {import('./OfflineVariables.js').default} variables 
     */
    constructor(variables) {
        /** @type {import('h5wasm').File} */
        this._hdf5File
        variables.hdf5File.addListener(arg => {
            this._hdf5File = arg
            this._operation()
        })
        this._operation = () => {
            variables.divInnerText.assign(Object.keys(this._hdf5File.attrs).map(key => {
                return `${key}: ${this._hdf5File.attrs[key].value}`
            }).join('\n'))
        }
    }
}
