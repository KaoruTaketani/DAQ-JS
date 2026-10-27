import ListenableNumber from './ListenableNumber.js'

export default class extends ListenableNumber {
    /**
     * @param {string} name
     * @param {import('./ListenableObject.js').default<import('h5wasm').File|undefined>} file 
     */
    constructor(name, file) {
        super()
        file.addListener(arg => {
            if (arg === undefined) {
                super.assign(Number.NaN)
            } else {
                super.assign(/** @type {number} */(arg.attrs[name].value))
            }
        })
    }
}