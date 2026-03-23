import ListenableObject from './ListenableObject.js'
import ListenableString from './ListenableString.js'

export default class {
    constructor() {
        /** @type {import('./ListenableObject.js').default<Map<URL,import('http').ServerResponse>>} */
        this.responses = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<URL>} */
        this.url = new ListenableObject()

        this.edrPath = new ListenableString()
        this.hdf5Path = new ListenableString()
    }
}

