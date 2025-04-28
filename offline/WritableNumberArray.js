import ListenableObject from './ListenableObject.js'

/**
 * @extends ListenableObject<number[]>
 */
export default class extends ListenableObject {
    /**
     * @param {string} name
     * @param {import('./ListenableObject.js').default<import('h5wasm').File>} readable 
     */
    constructor(name, readable) {
        super()
        /** @type {string} */
        this._name = name
        /** @type {number[]|undefined|import('./index.js').Histogram} */
        this._value
        readable.addListener(arg => {
            if (this._value) {
                if (Array.isArray(this._value)) {
                    arg.create_dataset({
                        name: this._name,
                        data: this._value,
                        dtype: '<f'
                    })
                } else {
                    arg.create_dataset({
                        name: this._name,
                        data: this._value.binCounts,
                        dtype: '<i'
                    })
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