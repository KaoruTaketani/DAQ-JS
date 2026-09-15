import ListenableNumber from '../lib/ListenableNumber.js'

export default class extends ListenableNumber {
    /**
     * @param {string} name
     * @param {import('../lib/ListenableObject.js').default<import('h5wasm').File|undefined>} hdf5File 
     * @param {import('./ReadableDataset.js')} [readable]
     */
    constructor(name, hdf5File, readable) {
        super()
        hdf5File.addListener(arg => {
            if (!arg) {
                super.assign(Number.NaN)
            } else {
                if (readable) {
                    const dataset = /** @type {import('h5wasm').Dataset|null} */(arg.get(readable.name()))
                    const value = dataset.attrs[name]?.value
                    super.assign(Array.from(value))
                } else {
                    const value = arg.attrs[name]?.value
                    super.assign(value)
                }
            }
        })
    }
}