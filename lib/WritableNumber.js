import ListenableNumber from './ListenableNumber.js'

export default class extends ListenableNumber {
    /**
     * @param {string} name
     * @param {import('./ListenableObject.js').default<import('h5wasm').File>} hdf5File 
     * @param {string} [dtype]
     */
    constructor(name, hdf5File, dtype) {
        super()
        /** @type {string} */
        this._name = name
        /** @type {number} */
        this._value
        hdf5File.addListener(arg => {
            if (Number.isNaN(this._value)) return

            // dtype:
            // '<i': int32
            // '<d': float64
            arg.create_attribute(this._name, this._value, null, dtype === undefined ? '<d': dtype)
        })
    }
    /**
     * @override
     * @param {number} arg 
     */
    assign(arg) {
        this._value = arg
        super.assign(arg)
    }
}