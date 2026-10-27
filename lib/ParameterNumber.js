import WritableNumber from './WritableNumber.js'

export default class extends WritableNumber {
    /**
     * @param {string} name
     * @param {import('./ListenableObject.js').default<import('h5wasm').File>} file 
     * @param {import('./ListenableObject.js').default<object>} parameters
     */
    constructor(name, file, parameters) {
        super(name, file)
        parameters.addListener(arg => {
            super.assign(Number.NaN)

            Object.entries(arg).forEach(([key, value]) => {
                if (key !== name) return

                super.assign(value)
            })
        })
    }
}