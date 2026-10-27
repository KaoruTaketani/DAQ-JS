import ListenableObject from './ListenableObject.js'

/**
 * @extends ListenableObject<number[]|undefined>
 */
export default class extends ListenableObject {
    /**
     * @param {string} name
     * @param {import('./ListenableObject.js').default<import('h5wasm').File|undefined>} file
     */
    constructor(name, file) {
        super()
        file.addListener(arg => {
            if (arg === undefined) {
                super.assign(undefined)
            } else {
                const value = arg.attrs[name].to_array()
                super.assign(value)
            }
        })
    }
}