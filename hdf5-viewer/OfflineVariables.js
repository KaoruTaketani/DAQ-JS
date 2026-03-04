import ListenableObject from './ListenableObject.js'
import ListenableString from './ListenableString.js'

export default class {
    constructor() {
        /** @type {import('./ListenableObject.js').default<HTMLParagraphElement>} */
        this.pathElement = new ListenableObject()

        this.path = new ListenableString()
    }
}

