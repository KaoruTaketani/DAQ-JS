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
                const dataset = arg.create_dataset({
                    name: this._name,
                    data: this._value.binCounts,
                    shape: this._value.numBins,
                    dtype: '<i4',
                    chunks: [1, this._value.numBins[1], this._value.numBins[2]],
                    compression: 'gzip'
                })
                dataset.create_attribute('xBinLimitsMin', this._value.xBinLimits[0], null, '<f')
                dataset.create_attribute('xBinLimitsMax', this._value.xBinLimits[1], null, '<f')
                dataset.create_attribute('yBinLimitsMin', this._value.yBinLimits[0], null, '<f')
                dataset.create_attribute('yBinLimitsMax', this._value.yBinLimits[1], null, '<f')
                dataset.create_attribute('zBinLimitsMin', this._value.zBinLimits[0], null, '<f')
                dataset.create_attribute('zBinLimitsMax', this._value.zBinLimits[1], null, '<f')
                dataset.create_attribute('total', this._value.binCounts.reduce((a, b) => a + b, 0), null, '<i')
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