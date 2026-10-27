import WritableString from './WritableString.js'

export default class extends WritableString {
    /**
     * @param {string} name
     * @param {import('./ListenableObject.js').default<import('h5wasm').File>} file 
     * @param {import('./ListenableObject.js').default<object>} parameters
     */
    constructor(name, file, parameters) {
        super(name, file)
        parameters.addListener(arg => {
            super.assign('')
            
            Object.entries(arg).forEach(([key, value]) => {
                if (key !== name) return
 
                super.assign(value)
            })
        })
    }
}