import ListenableObject from './ListenableObject.js'
import ListenableString from './ListenableString.js'

export default class {
    constructor() {
        /** @type {import('./ListenableObject.js').default<HTMLSelectElement>} */
        this.selectElement = new ListenableObject()
        this.hdf5File = new ListenableObject()

        this.path = new ListenableString()
        this.divInnerText = new ListenableString()
    }
}

