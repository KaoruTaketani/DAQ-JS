import ListenableObject from './ListenableObject.js'

/**
 * @extends ListenableObject<import('./index.js').Histogram3D>
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
        /** @type {import('./index.js').Histogram3D} */
        this._value
        hdf5File.addListener(arg => {
            if (this._value) {
                arg.create_dataset({
                    name: this._name,
                    data: this._value.binCounts,
                    shape: this._value.numBins,
                    dtype: '<i4',
                    chunks: this._value.numBins,
                    compression: 'gzip'
                })
            }
        })
    }
    /**
     * @override
     * @param {import('./index.js').Histogram3D} arg 
     */
    assign(arg) {
        super.assign(arg)
        this._value = arg
    }
}