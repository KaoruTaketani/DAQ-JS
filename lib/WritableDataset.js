import ListenableObject from './ListenableObject.js'

/**
 * @template T
 * @extends ListenableObject<T>
 */
export default class extends ListenableObject {
    /**
     * @param {string} name
     * @param {import('./ListenableObject.js').default<import('h5wasm').File>} file 
     * @param {import('./WritableArray.js').default} [xlim]
     * @param {import('./WritableArray.js').default} [ylim]
     * @param {import('./WritableArray.js').default} [zlim]
     */
    constructor(name, file, xlim, ylim, zlim) {
        super()
        /** @type {string} */
        this._name = name
        /** @type {number[]} */
        this._xlim
        xlim?.addListener(arg => { this._xlim = arg })
        /** @type {number[]} */
        this._ylim
        ylim?.addListener(arg => { this._ylim = arg })
        /** @type {number[]} */
        this._zlim
        zlim?.addListener(arg => { this._zlim = arg })
        /** @type {T} */
        this._value
        file.addListener(arg => {
            if (this._value) {
                let group
                if (ArrayBuffer.isView(this._value)) {
                    group = arg.create_dataset({
                        name: this._name,
                        data: this._value
                    })
                } else {
                    group = arg.create_dataset({
                        name: this._name,
                        data: this._value.data,
                        shape: this._value.shape,
                        chunks: this._value.shape,
                        compression: 'gzip'
                    })
                }
                if (xlim) {
                    group.create_attribute('_xlabel', xlim._name.substring(1))
                    group.create_attribute('_xlim', this._xlim)
                }
                if (ylim) {
                    group.create_attribute('_ylabel', ylim._name.substring(1))
                    group.create_attribute('_ylim', this._ylim)
                }
                if (zlim) {
                    group.create_attribute('_zlabel', zlim._name.substring(1))
                    group.create_attribute('_zlim', this._zlim)
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