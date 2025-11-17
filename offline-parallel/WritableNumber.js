import ListenableNumber from './ListenableNumber.js'

export default class extends ListenableNumber {
    /**
     * @param {string} name
     * @param {import('./ListenableObject.js').default<import('h5wasm').File>} hdf5File 
     */
    constructor(name, hdf5File) {
        super()
        /** @type {string} */
        this._name = name
        /** @type {number} */
        this._value
        hdf5File.addListener(arg => {
            if (!this._value) return

            if (Number.isInteger(this._value)) {
                arg.create_attribute(this._name, this._value, null, '<i')
            } else {
                arg.create_attribute(this._name, this._value, null, '<f')
            }
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