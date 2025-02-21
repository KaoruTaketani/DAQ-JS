import ListenableString from './ListenableString.js'

export default class extends ListenableString {
    /**
     * @param {string} name
     * @param {import('./ListenableObject.js').default<import('h5wasm').File>} hdf5File 
     */
    constructor(name, hdf5File) {
        super()
        /** @type {string} */
        this._name = name
        /** @type {string|undefined} */
        this._value
        hdf5File.addListener(arg => {
            if (!this._value) return

            arg.create_attribute(this._name, this._value, null, '<S')
        })
    }
    /**
     * @override
     * @param {string|undefined} arg 
     */
    assign(arg) {
        this._value = arg
        if (arg !== undefined) super.assign(arg)
    }
}