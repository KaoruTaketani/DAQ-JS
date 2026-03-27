import ListenableObject from './ListenableObject.js'

/**
 * @template T
 * @extends ListenableObject<T|undefined>
 */
export default class extends ListenableObject {
    /**
     * @param {string} name
     * @param {import('./ListenableObject.js').default<import('h5wasm').File|undefined>} file 
     */
    constructor(name, file) {
        super()
        /** @type {string} */
        this._name = name
        file.addListener(arg => {
            if (!arg) {
                super.assign(undefined)
            } else {
                const dataset = /** @type {import('h5wasm').Dataset} */(arg.get(this._name))

                super.assign(dataset.data)
            }
        })
    }
}