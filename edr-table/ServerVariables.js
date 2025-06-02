import ListenableObject from './ListenableObject.js'

export default class {
    constructor() {
        /** @type {import('./ListenableObject.js').default<import('http').Server>} */
        this.httpServer = new ListenableObject()
    }
}

