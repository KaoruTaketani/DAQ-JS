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
        /** @type {number[]|undefined} */
        this._value
        readable.addListener(arg => {
            if (this._value) {
                arg.create_dataset({
                    name: this._name,
                    data: this._value,
                    dtype: '<f'
                })
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