import ListenableObject from './ListenableObject.js'

/**
 * @extends ListenableObject<import('../lib/index.js').Histogram>
 */
export default class extends ListenableObject {
    /**
     * @param {string} name
     * @param {import('./ListenableObject.js').default<import('h5wasm').File>} hdf5File 
     */
    constructor(name, hdf5File) {
        super()
        /** @type {string} */
        this._name = name
        /** @type {import('../lib/index.js').Histogram} */
        this._value
        hdf5File.addListener(arg => {
            if (this._value) {
                arg.create_dataset({
                    name: this._name,
                    data: this._value.binCounts,
                    dtype: '<i4'
                })
            }
        })
    }
    /**
     * @override
     * @param {import('../lib/index.js').Histogram} arg 
     */
    assign(arg) {
        super.assign(arg)
        this._value = arg
    }
}