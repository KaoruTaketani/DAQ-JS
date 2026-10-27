import WritableArray from './WritableArray.js'

/**
 * @extends WritableArray
 */
export default class extends WritableArray {
    /**
     * @param {string} name
     * @param {import('./ListenableObject.js').default<import('h5wasm').File>} file 
     * @param {import('./ListenableObject.js').default<object>} parameters
     */
    constructor(name, file, parameters) {
        super(name, file)
        parameters.addListener(arg => {
            super.assign(undefined)

            Object.entries(arg).forEach(([key, value]) => {
                if (key !== name) return

                super.assign(value)
            })
        })
    }
}