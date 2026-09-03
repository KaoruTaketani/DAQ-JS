import BroadcastObject from './BroadcastObject.js'
import ListenableObject from './ListenableObject.js'

export default class {
    constructor() {
        /** @type {import('./ListenableObject.js').default<import('worker_threads').Worker[]>} */
        this.workers = new ListenableObject()

        /** @type {import('./ListenableObject.js').default<Buffer>} */
        this.eventBuffer = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('h5wasm').File>} */
        this.hdf5File = new ListenableObject()

        this.tofHistogramWorker = new BroadcastObject('tofHistogramPort', this.workers)
    }
}
