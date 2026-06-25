import WritableArray from './WritableArray.js'

export default class extends WritableArray {
    /**
     * @param {string} path
     * @param {string} name
     * @param {import('./ListenableObject.js').default<import('h5wasm').File>} hdf5File 
     * @param {import('./ListenableObject.js').default<import('../lib/index.js').Parameters>} parameters
     */
    constructor(path, name, hdf5File, parameters) {
        super(path, name, hdf5File)
        parameters.addListener(arg => {
            super.assign(undefined)

            Object.entries(arg).forEach(([key, value]) => {
                if (key !== name) return

                super.assign(value)
            })
        })
    }
}