import ListenableObject from './ListenableObject.js'

/**
 * @extends ListenableObject<number[]|undefined>
 */
export default class extends ListenableObject {
    /**
     * @param {string} name
     * @param {import('./ListenableObject.js').default<import('h5wasm').File>} [file]
     */
    constructor(name, file) {
        super()
        /** @type {string} */
        this._name = name // accessed by WritableDataset
        /** @type {number[]|undefined} */
        this._value
        file?.addListener(arg => {
            if (this._value !== undefined)
                arg.create_attribute(name, new Float64Array(this._value))
        })
    }
    /**
     * @override
     * @param {number[]|undefined} arg 
     */
    assign(arg) {
        this._value = arg
        super.assign(arg)
    }
}