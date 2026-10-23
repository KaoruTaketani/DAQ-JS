import ListenableObject from './ListenableObject.js'

/**
 * @template T
 * @extends ListenableObject<number[]>
 */
export default class extends ListenableObject {
    /**
     * @param {string} name
     * @param {import('./ListenableObject.js').default<import('h5wasm').File>} readable 
     * @param {import('./WritableDataset.js').default<T>} [dataset]
     */
    constructor(name, readable, dataset) {
        super()
        /** @type {number[]|undefined} */
        this._value
        readable.addListener(arg => {
            if (this._value === undefined) return

            if (dataset === undefined) {
                arg.create_attribute(name, new Float64Array(this._value))
            } else {
                const group = /** @type {import('h5wasm').Group|null} */(arg.get(dataset.name()))
                // const group = arg.get(dataset.name())
                // if the group has not been created by the dataset, thet dataset is undefined
                // in that case do nothing
                if (group !== null)
                    group.create_attribute(name, new Float64Array(this._value))
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