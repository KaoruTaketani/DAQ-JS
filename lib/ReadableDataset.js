import ListenableObject from './ListenableObject.js'

/**
 * @template T
 * @extends ListenableObject<T|undefined>
 */
export default class extends ListenableObject {
    /**
     * @param {string} name
     * @param {import('./ListenableObject.js').default<import('h5wasm').File|undefined>} file 
     * @param {import('./ListenableObject.js').default<number[]|undefined>} [xlim]
     * @param {import('./ListenableObject.js').default<number[]|undefined>} [ylim]
     * @param {import('./ListenableObject.js').default<number[]|undefined>} [zlim]
     */
    constructor(name, file, xlim, ylim, zlim) {
        super()
        /** @type {string} */
        this._name = name
        file.addListener(arg => {
            if (arg === undefined) {
                super.assign(undefined)
            } else {
                const dataset = /** @type {import('h5wasm').Dataset|null} */(arg.get(this._name))

                if (dataset === null) {
                    console.log(`${this._name} was not found in ${arg.path}`)
                    throw new Error()
                } else {
                    if (dataset.shape && dataset.shape.length > 1) {
                        super.assign({
                            shape: dataset.shape,
                            data: dataset.value
                        })
                    } else {
                        super.assign(dataset.value)
                    }

                    if (xlim) {
                        const value = dataset.attrs['_xlim'].to_array()
                        if (value !== null) xlim.assign(value)
                    }
                    if (ylim) {
                        const value = dataset.attrs['_ylim'].to_array()
                        ylim.assign(value)
                    }
                    if (zlim) {
                        const value = dataset.attrs['_zlim'].to_array()
                        zlim.assign(value)
                    }
                }
            }
        })
    }
}