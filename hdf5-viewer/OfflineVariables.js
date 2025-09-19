import ListenableObject from './ListenableObject.js'
import ListenableString from './ListenableString.js'

export default class {
    constructor() {
        /** @type {import('./ListenableObject.js').default<Map<string,string>>} */
        this.elementVariables = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<string[]>} */
        this.hdf5FileNames = new ListenableObject()

        this.hdf5Path = new ListenableString()
        this.hdf5FileReaderFileName = new ListenableString()
    }
}

