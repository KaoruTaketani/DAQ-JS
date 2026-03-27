import ListenableObject from './ListenableObject.js'

/**
 * @template T
 * @extends ListenableObject<T>
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
        /** @type {T} */
        this._dataset
        hdf5File.addListener(arg => {
            if (this._dataset) {
                arg.create_dataset({
                    name: this._name,
                    data: this._dataset.data,
                    shape: this._dataset.shape
                })
            }
        })
    }
    /**
     * @override
     * @param {T} arg 
     */
    assign(arg) {
        super.assign(arg)
        this._dataset = arg
    }
}