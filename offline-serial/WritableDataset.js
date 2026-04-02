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
        this._value
        hdf5File.addListener(arg => {
            if (this._value) {
                if (ArrayBuffer.isView(this._value)) {
                    arg.create_dataset({
                        name: this._name,
                        data: this._value
                    })
                } else {
                    arg.create_dataset({
                        name: this._name,
                        data: this._value.data,
                        shape: this._value.shape,
                        chunks: this._value.shape,
                        compression: 'gzip'
                    })
                }
            }
        })
    }
    /**
     * @override
     * @param {T} arg 
     */
    assign(arg) {
        super.assign(arg)
        this._value = arg
    }
}