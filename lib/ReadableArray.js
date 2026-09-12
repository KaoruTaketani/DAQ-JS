import ListenableObject from './ListenableObject.js'

/**
 * @extends ListenableObject<number[]>
 */
export default class extends ListenableObject {
    /**
     * @param {string} name
     * @param {import('./ListenableObject.js').default<import('h5wasm').File|undefined>} file 
     */
    constructor(name, file) {
        super()
        file.addListener(arg => {
            if (!arg) {
                super.assign([])
            } else {
                const value = arg.attrs[name]?.value
                super.assign(value)
            }
        })
    }
}