import ListenableObject from './ListenableObject.js'

/**
 * @extends ListenableObject<import('./index.js').Histogram2D>
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
        /** @type {import('./index.js').Histogram2D} */
        this._value
        hdf5File.addListener(arg => {
            if (this._value) {
                const group = arg.create_group(this._name)
                group.create_dataset({
                    name: 'binCounts',
                    data: this._value.binCounts,
                    shape: this._value.numBins,
                    dtype: '<i4',
                    chunks: [1, this._value.numBins[1]],
                    compression: 'gzip'
                })
                group.create_dataset({
                    name: 'xBinLimits',
                    data: this._value.xBinLimits,
                    shape: [2],
                    dtype: '<d'
                })
                group.create_dataset({
                    name: 'yBinLimits',
                    data: this._value.yBinLimits,
                    shape: [2],
                    dtype: '<d'
                })
                // group.create_attribute('total', this._value.binCounts.reduce((a, b) => a + b, 0), null, '<i')
            }
        })
    }
    /**
     * @override
     * @param {import('./index.js').Histogram2D} arg 
     */
    assign(arg) {
        super.assign(arg)
        this._value = arg
    }
}