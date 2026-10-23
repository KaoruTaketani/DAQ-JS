import ListenableObject from './ListenableObject.js'

/**
 * @extends ListenableObject<number[]|undefined>
 */
export default class extends ListenableObject {
    /**
     * @param {string} name
     * @param {import('./ListenableObject.js').default<import('h5wasm').File|undefined>} hdf5File 
     * @param {import('./ReadableDataset.js').default<import('./index.js').NDArray|undefined>} [readable]
     */
    constructor(name, hdf5File, readable) {
        super()
        hdf5File.addListener(arg => {
            if (arg === undefined) {
                super.assign(undefined)
            } else {
                if (readable !== undefined) {
                    const dataset = /** @type {import('h5wasm').Dataset|null} */(arg.get(readable.name()))
                    if (dataset === null) {

                    } else {
                        const value = dataset.attrs[name].to_array()
                        // console.log(name, readable.name(), value,value[0])
                        super.assign(value)
                    }
                } else {
                    const value = arg.attrs[name].to_array()
                    super.assign(value)
                }
            }
        })
    }
}