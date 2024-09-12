import ListenableString from './ListenableString.js'

export default class extends ListenableString {
    /**
     * @param {string} channel
     * @param {import('./ListenableObject.js').default<import('worker_threads').Worker>} newWorker
     */
    constructor(channel, newWorker) {
        super()
        /** @type {string} */
        this._value
        /** @type {string} */
        this._channel = channel
        /** @type {Set<import('worker_threads').Worker>} */
        this._workers = new Set()
        newWorker.addListener(arg => {
            this._workers.add(arg)
            /** @type {import('./index.js').WorkerMessage} */
            const msg = { channel: this._channel, value: this._value }
            arg.postMessage(JSON.stringify(msg))
        })
    }
    /** @override @param {string} arg */
    assign(arg) {
        super.assign(arg)
        this._value = arg
        this._workers.forEach(worker => {
            /** @type {import('./index.js').WorkerMessage} */
            const msg = { channel: this._channel, value: this._value }

            worker.postMessage(JSON.stringify(msg))
        })
    }
}
