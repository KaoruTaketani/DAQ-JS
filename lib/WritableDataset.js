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
        /** @type {T} */
        this._value
        file.addListener(arg => {
            if (!this._value) return

            let group
            if (ArrayBuffer.isView(this._value)) {
                group = arg.create_dataset({
                    name: name,
                    data: this._value
                })
            } else {
                group = arg.create_dataset({
                    name: name,
                    data: this._value.data,
                    shape: this._value.shape,
                    chunks: this._value.shape,
                    compression: 'gzip'
                })
            }
            if (xlim !== undefined && this._xlim !== undefined) {
                group.create_attribute('_xlabel', xlim._name)
                group.create_attribute('_xlim', this._xlim)
            }
            if (ylim !== undefined && this._ylim !== undefined) {
                group.create_attribute('_ylabel', ylim._name)
                group.create_attribute('_ylim', this._ylim)
            }
            if (zlim !== undefined && this._zlim !== undefined) {
                group.create_attribute('_zlabel', zlim._name)
                group.create_attribute('_zlim', this._zlim)
            }
        })
        /** @type {number[]|undefined} */
        this._xlim
        xlim?.addListener(arg => { this._xlim = arg })
        /** @type {number[]|undefined} */
        this._ylim
        ylim?.addListener(arg => { this._ylim = arg })
        /** @type {number[]|undefined} */
        this._zlim
        zlim?.addListener(arg => { this._zlim = arg })
    }
    /**
     * @override
     * @param {T} arg 
     */
    assign(arg) {
        this._value = arg
        super.assign(arg)
    }
}