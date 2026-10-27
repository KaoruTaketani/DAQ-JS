import ListenableString from './ListenableString.js'

export default class extends ListenableString {
    /**
     * @param {string} name
     * @param {import('./ListenableObject.js').default<import('h5wasm').File|undefined>} file 
     */
    constructor(name, file) {
        super()
        file.addListener(arg => {
            if (arg === undefined) {
                super.assign('')
            } else {
                super.assign(/** @type {string} */(arg.attrs[name].value))
            }
        })
    }
}