import WritableString from './WritableString.js'

export default class extends WritableString {
    /**
     * @param {string} name
     * @param {import('./ListenableObject.js').default<import('h5wasm').File>} hdf5File 
     * @param {import('./ListenableObject.js').default<import('./index.js').Parameters>} parameters
     */
    constructor(name, hdf5File, parameters) {
        super(name, hdf5File)
        parameters.addListener(arg => {
            super.assign('')
            
            Object.entries(arg).forEach(([key, value]) => {
                if (key !== this._name) return
 
                super.assign(value)
            })
        })
    }
}