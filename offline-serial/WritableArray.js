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
                if (this._name.includes('/')) {
                    let group
                    group = arg.get(this._name.split('/')[0])
                    if (group === null) {
                        console.log('not exist')
                        group = arg.create_group(this._name.split('/')[0])
                    }
                    group.create_attribute(this._name.split('/')[1], new Float64Array(this._value))
                    return
                }
                arg.create_attribute(this._name, new Float64Array(this._value))
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