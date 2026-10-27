import ListenableObject from './ListenableObject.js'

/**
 * @extends ListenableObject<number[]>
 */
export default class extends ListenableObject {
    /**
     * @param {string} name
     * @param {import('./ListenableObject.js').default<import('h5wasm').File>} file 
     */
    constructor(name, file) {
        super()
        /** @type {string} */
        this._name = name
        /** @type {number[]|undefined} */
        this._value
        file.addListener(arg => {
            if (!name.startsWith('_') && this._value !== undefined)
                arg.create_attribute(name, new Float64Array(this._value))
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