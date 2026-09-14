import ListenableObject from '../lib/ListenableObject.js'

/**
 * @template T
 * @extends ListenableObject<number[]>
 */
export default class extends ListenableObject {
    /**
     * @param {string} name
     * @param {import('../lib/ListenableObject.js').default<import('h5wasm').File>} readable 
     * @param {import('./WritableDataset.js').default<T>} [dataset]
     */
    constructor(name, readable, dataset) {
        super()
        /** @type {number[]|undefined} */
        this._value
        readable.addListener(arg => {
            if (this._value) {
                if (dataset === undefined) {
                    arg.create_attribute(name, new Float64Array(this._value))
                } else {
                    /** @type {import('h5wasm').Group} */
                    const group = /** @type {import('h5wasm').Group} */(arg.get(dataset.name()))
                    // assuming the group has been already created by writable dataset
                    group.create_attribute(name, new Float64Array(this._value))
                }
            }
        })
    }
    /**
     * @override
     * @param {number[]|undefined} arg 
     */
    assign(arg) {
        this._value = arg
        if (arg !== undefined) super.assign(arg)
    }
}