import ListenableObject from './ListenableObject.js'

/** 
 * @template T 
 * @extends ListenableObject<T>
 */
export default class extends ListenableObject {
    /**
     * 
     * @param {string} key 
     * @param {import('./ListenableObject').default<any>} message
     */
    constructor(key, message) {
        super()
        this._key = key
        /** @type {T} */
        this._value
        /** @type {import('worker_threads').MessagePort} */
        this._port
        message.addListener(arg => {
            if (arg[this._key + 'Port'] instanceof MessagePort) {
                this._port = arg[this._key + 'Port']
                // console.log(`init port ${this._key}`)
                this._port.on('message', (/** @type {T}}*/message) => {
                    // console.log(`${this._key} init`)
                    this._value = message
                    super.assign(message)
                })
            }
            if (arg instanceof Uint8Array
                && arg.length === 0) {
                // console.log(`gather ${this._key}`)
                this._port.postMessage(this._value)
            }
        })
    }
}

