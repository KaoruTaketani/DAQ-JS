import ListenableObject from './ListenableObject.js'

/**
 * @extends ListenableObject<number[]>
 */
export default class extends ListenableObject {
    /**
     * @param {string} path
     * @param {string} name
     * @param {import('./ListenableObject.js').default<import('h5wasm').File>} readable 
     */
    constructor(path, name, readable) {
        super()
        /** @type {number[]|undefined} */
        this._value
        readable.addListener(arg => {
            if (this._value) {
                if (path === '') {
                    arg.create_attribute(name, new Float64Array(this._value))
                } else {
                    /** @type {import('h5wasm').Group} */
                    const group = /** @type {import('h5wasm').Group} */(arg.get(path))
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