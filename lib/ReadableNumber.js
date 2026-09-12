import ListenableNumber from './ListenableNumber.js'

export default class extends ListenableNumber {
    /**
     * @param {string} name
     * @param {import('./ListenableObject.js').default<import('h5wasm').File|undefined>} hdf5File 
     */
    constructor(name, hdf5File) {
        super()
        hdf5File.addListener(arg => {
            if (!arg) {
                super.assign(Number.NaN)
            } else {
                const value = arg.attrs[name]?.value
                super.assign(value)
            }
        })
    }
}