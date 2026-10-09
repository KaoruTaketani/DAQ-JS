import ListenableString from '../lib/ListenableString.js'

export default class extends ListenableString {
    /**
     * @param {string} name
     * @param {import('../lib/ListenableObject.js').default<import('h5wasm').File>} hdf5File 
     */
    constructor(name, hdf5File) {
        super()
        /** @type {string} */
        this._name = name
        /** @type {string} */
        this._value
        hdf5File.addListener(arg => {
            if (!this._value) return

            arg.create_attribute(this._name, this._value)
        })
    }
    /**
     * @override
     * @param {string} arg 
     */
    assign(arg) {
        this._value = arg
        super.assign(arg)
    }
}