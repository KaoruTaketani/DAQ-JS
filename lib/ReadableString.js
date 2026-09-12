import ListenableString from './ListenableString.js'

export default class extends ListenableString {
    /**
     * @param {string} name
     * @param {import('./ListenableObject.js').default<import('h5wasm').File|undefined>} hdf5File 
     */
    constructor(name, hdf5File) {
        super()
        hdf5File.addListener(arg => {
            if (!arg) {
                super.assign('')
            } else {
                const value = arg.attrs[name]?.value
                super.assign(value)
            }
        })
    }
}