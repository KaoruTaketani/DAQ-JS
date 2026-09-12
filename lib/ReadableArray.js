import ListenableObject from './ListenableObject.js'

/**
 * @extends ListenableObject<number[]>
 */
export default class extends ListenableObject {
    /**
     * @param {string} path
     * @param {string} name
     * @param {import('./ListenableObject.js').default<import('h5wasm').File|undefined>} file 
     */
    constructor(path, name, file) {
        super()
        file.addListener(arg => {
            if (!arg) {
                super.assign([])
            } else {
                if (path === '') {
                    const value = arg.attrs[name]?.value
                    super.assign(value)
                } else {

                }
            }
        })
    }
}