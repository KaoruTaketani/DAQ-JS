import ListenableObject from './ListenableObject.js'

/**
 * @extends ListenableObject<import('./index.js').Histogram>
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
        /** @type {import('./index.js').Histogram} */
        this._value
        hdf5File.addListener(arg => {
            if (this._value) {
                const dataset = arg.create_dataset({
                    name: this._name,
                    data: this._value.binCounts,
                    dtype: '<i4'
                })
                dataset.create_attribute('binLimitsMin', this._value.binLimits[0], null, '<f')
                dataset.create_attribute('binLimitsMax', this._value.binLimits[1], null, '<f')
                dataset.create_attribute('toal', this._value.binCounts.reduce((a, b) => a + b, 0), null, '<i')
            }
        })
    }
    /**
     * @override
     * @param {import('./index.js').Histogram} arg 
     */
    assign(arg) {
        super.assign(arg)
        this._value = arg
    }
}